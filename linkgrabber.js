// ==UserScript==
// @name         Telegram Link Grabber Mobile
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Coleta links do Telegram com scroll infinito e interface mobile
// @author       YourName
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_download
// ==/UserScript==

(function() {
    'use strict';

    // Configurações iniciais
    const FILTERS = {
        CHANNEL: 'canal',
        GROUP: 'grupo',
        BOT: 'bot'
    };

    let collectedLinks = [];
    let currentFilter = 'all';
    let observer;

    // Estilos para interface mobile
    GM_addStyle(`
        #link-grabber-container {
            position: fixed;
            bottom: 10px;
            right: 10px;
            z-index: 9999;
            background: rgba(255,255,255,0.95);
            border-radius: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            width: 300px;
            max-height: 80vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            font-family: Arial, sans-serif;
            border: 1px solid #e0e0e0;
        }
        
        #lg-header {
            background: #0088cc;
            color: white;
            padding: 12px 15px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        #lg-toggle {
            background: transparent;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
        }
        
        #lg-content {
            padding: 15px;
            overflow-y: auto;
            flex-grow: 1;
        }
        
        .filter-section {
            margin-bottom: 15px;
        }
        
        .filter-buttons {
            display: flex;
            gap: 8px;
            margin-top: 8px;
        }
        
        .filter-btn {
            flex: 1;
            padding: 8px;
            border: none;
            border-radius: 8px;
            background: #f0f0f0;
            font-size: 14px;
        }
        
        .filter-btn.active {
            background: #0088cc;
            color: white;
        }
        
        .counter-section {
            text-align: center;
            padding: 10px;
            background: #f8f8f8;
            border-radius: 8px;
            margin: 15px 0;
            font-size: 16px;
        }
        
        .action-buttons {
            display: flex;
            gap: 10px;
        }
        
        .action-btn {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 8px;
            background: #f0f0f0;
            font-weight: bold;
        }
        
        .action-btn.export {
            background: #4CAF50;
            color: white;
        }
    `);

    // Criar interface
    const container = document.createElement('div');
    container.id = 'link-grabber-container';
    container.innerHTML = `
        <div id="lg-header">
            <span>Telegram Link Grabber</span>
            <button id="lg-toggle">▼</button>
        </div>
        <div id="lg-content">
            <div class="filter-section">
                <strong>Filtrar:</strong>
                <div class="filter-buttons">
                    <button class="filter-btn active" data-filter="all">Todos</button>
                    <button class="filter-btn" data-filter="${FILTERS.CHANNEL}">Canais</button>
                    <button class="filter-btn" data-filter="${FILTERS.GROUP}">Grupos</button>
                    <button class="filter-btn" data-filter="${FILTERS.BOT}">Bots</button>
                </div>
            </div>
            
            <div class="counter-section">
                Links encontrados: <span id="link-counter">0</span>
            </div>
            
            <div class="action-buttons">
                <button class="action-btn export" id="export-btn">Exportar TXT</button>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // Elementos da UI
    const toggleButton = document.getElementById('lg-toggle');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const counterElement = document.getElementById('link-counter');
    const exportButton = document.getElementById('export-btn');

    // Controle de interface
    toggleButton.addEventListener('click', () => {
        const content = document.getElementById('lg-content');
        if (content.style.display === 'none') {
            content.style.display = 'block';
            toggleButton.textContent = '▼';
        } else {
            content.style.display = 'none';
            toggleButton.textContent = '▲';
        }
    });

    // Filtragem
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            updateCounter();
        });
    });

    // Exportação
    exportButton.addEventListener('click', () => {
        const filteredLinks = filterLinks();
        const content = filteredLinks.join('\n');
        const filename = `telegram_links_${new Date().toISOString().slice(0,10)}.txt`;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Funções principais
    function isTelegramLink(url) {
        return /https?:\/\/(www\.)?t\.me\//.test(url);
    }

    function classifyLink(url) {
        url = url.toLowerCase();
        
        if (url.includes('bot')) return FILTERS.BOT;
        if (url.includes('joinchat') || url.includes('+')) return FILTERS.GROUP;
        if (url.includes('c/') || url.includes('channel')) return FILTERS.CHANNEL;
        
        return 'other';
    }

    function collectLinks() {
        document.querySelectorAll('a[href]').forEach(link => {
            const url = link.href;
            
            if (isTelegramLink(url) && !collectedLinks.includes(url)) {
                collectedLinks.push({
                    url,
                    type: classifyLink(url)
                });
            }
        });
        
        updateCounter();
    }

    function filterLinks() {
        if (currentFilter === 'all') {
            return collectedLinks.map(item => item.url);
        }
        
        return collectedLinks
            .filter(item => item.type === currentFilter)
            .map(item => item.url);
    }

    function updateCounter() {
        const count = currentFilter === 'all' 
            ? collectedLinks.length 
            : collectedLinks.filter(item => item.type === currentFilter).length;
        
        counterElement.textContent = count;
    }

    // Configurar Mutation Observer
    function initObserver() {
        observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length) {
                    collectLinks();
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Inicialização
    collectLinks();
    initObserver();

    // Coleta durante o scroll
    window.addEventListener('scroll', () => {
        collectLinks();
    }, { passive: true });
})();