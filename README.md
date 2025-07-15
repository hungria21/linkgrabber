# Minimalist Dark Jekyll Theme

A minimalist, dark, and responsive Jekyll theme for GitHub Pages, designed for writers who want a clean and simple blog.

![Theme Screenshot](https://user-images.githubusercontent.com/12345/67890.png) <!-- Placeholder image -->

## Features

-   **Minimalist, Dark Design:** No clutter, just your content in a beautiful dark theme.
-   **Fully Responsive:** Looks great on desktops, tablets, and mobile devices.
-   **Syntax Highlighting:** Code blocks are styled for readability.
-   **Collapsible Sections:** A CSS-only component to create expandable sections in your posts.
-   **Jekyll Powered:** Easy to use and deploy on GitHub Pages.

## Getting Started

To use this theme, you can either fork this repository or download the source code and use it as a starting point for your own Jekyll site.

### Prerequisites

You need to have [Ruby](https://www.ruby-lang.org/en/documentation/installation/) and [Bundler](https://bundler.io/) installed.

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    bundle install
    ```

3.  **Run the Jekyll server:**
    ```bash
    bundle exec jekyll serve
    ```

4.  **Open your browser** to `http://localhost:4000` to see your site.

## Creating Posts

To create a new post, add a new Markdown file to the `_posts` directory. The filename must follow the `YYYY-MM-DD-your-post-title.md` format.

The front matter is essential. Here is an example:

```yaml
---
layout: post
title:  "Your Post Title"
date:   YYYY-MM-DD HH:MM:SS -ZZZZ
categories: [category1, category2]
---
```

### Using Collapsible Sections

You can add collapsible sections to your posts using the following HTML structure:

```html
<div class="mw-collapsible">
  <input id="unique-id" class="mw-collapsible-toggle" type="checkbox">
  <label for="unique-id" class="mw-collapsible-header">
    <span>Section Title</span>
    <span class="mw-collapsible-arrow">&#9654;</span>
  </label>
  <div class="mw-collapsible-content">
    <p>Your hidden content goes here.</p>
  </div>
</div>
```
**Important:** Make sure each `id` and `for` attribute pair is unique on the page.

## Customization

You can customize the theme by editing the following files:

-   `_config.yml`: Main site settings (title, description, etc.).
-   `assets/css/style.css`: All the styles for the theme. You can change colors, fonts, and more by editing the CSS variables at the top of the file.

## License

This theme is licensed under the [MIT License](LICENSE).