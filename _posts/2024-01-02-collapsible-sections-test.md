---
layout: post
title:  "Testing Collapsible Sections"
date:   2024-01-02 10:00:00 -0500
categories: feature test
---
This post demonstrates the use of collapsible sections. The component is built using only CSS for a lightweight and fast experience.

Below is an example of a collapsible section. Click on the header to expand and collapse the content.

<div class="mw-collapsible">
  <input id="collapsible-1" class="mw-collapsible-toggle" type="checkbox">
  <label for="collapsible-1" class="mw-collapsible-header">
    <span>Click to Expand This Section</span>
    <span class="mw-collapsible-arrow">&#9654;</span>
  </label>
  <div class="mw-collapsible-content">
    <p>This is the content that was hidden. It is now visible because you clicked the header. You can put any kind of content in here, like paragraphs, lists, or even images.</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
</div>

Here is another collapsible section to ensure they can be used multiple times on the same page.

<div class="mw-collapsible">
  <input id="collapsible-2" class="mw-collapsible-toggle" type="checkbox">
  <label for="collapsible-2" class="mw-collapsible-header">
    <span>Another Collapsible Section</span>
    <span class="mw-collapsible-arrow">&#9654;</span>
  </label>
  <div class="mw-collapsible-content">
    <p>This is the second collapsible section's content. It works independently of the first one.</p>
  </div>
</div>
