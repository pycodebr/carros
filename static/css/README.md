# Futuristic Car Management Design System

## Overview

This CSS design system provides a modern, futuristic interface for the Django car management application with:

- **Dark theme** with automotive-inspired gradients
- **Modern typography** using Inter and Orbitron fonts
- **Advanced animations** and smooth transitions
- **Fully responsive** design for all devices
- **Glassmorphism effects** with backdrop blur
- **Professional automotive industry feel**

## Features

### 🎨 Color Palette
- Primary blues: automotive-inspired color scheme
- Tech gradients: futuristic secondary colors
- Accent colors: success, warning, error, info

### 🔤 Typography
- **Primary Font**: Inter (clean, modern)
- **Accent Font**: Orbitron (futuristic, tech-inspired)
- Responsive font scales

### 🎭 Effects
- Glassmorphism cards with backdrop blur
- Animated background particles
- Smooth hover transitions
- Glowing effects on interactive elements
- Advanced box shadows

### 📱 Responsive Design
- Mobile-first approach
- Flexible grid system
- Responsive breakpoints at 480px, 768px, 1024px
- Adaptive layouts for all screen sizes

### ♿ Accessibility
- High contrast mode support
- Reduced motion preferences
- Focus-visible indicators
- Screen reader friendly classes

## Installation

The CSS file is located at `/static/css/futuristic-carros.css` and is automatically loaded in the base template.

## Components

### Cards
- `.card` - Basic card component with glassmorphism
- `.car-card` - Specialized for car listings with hover effects
- `.card-header`, `.card-body`, `.card-footer` - Card sections

### Buttons
- `.btn` - Base button with shimmer effect
- `.btn-primary`, `.btn-secondary`, `.btn-outline` - Button variants
- `.btn-sm`, `.btn-lg` - Size variations

### Forms
- `.form-container` - Centered form wrapper
- `.form-group` - Form field container
- `.form-input`, `.form-select`, `.form-textarea` - Form controls
- `.form-label` - Styled labels

### Layout
- `.container` - Main content container
- `.grid` - CSS Grid system
- `.grid-cols-1`, `.grid-cols-2`, etc. - Grid columns
- `.page-header` - Page title section

### Navigation
- Modern navigation bar with backdrop blur
- `.nav-brand` - Logo/brand area
- Hover effects on navigation links
- User greeting styles

### Utilities
- Text alignment: `.text-center`, `.text-left`, `.text-right`
- Colors: `.text-primary`, `.text-success`, `.text-error`, etc.
- Spacing: `.mt-1`, `.mb-2`, `.p-3`, etc.
- Display: `.d-flex`, `.flex-center`, `.flex-between`

## Animations

- `.animate-fade-in` - Fade in animation
- `.animate-slide-in` - Slide in animation
- `.animate-pulse` - Pulsing animation
- Staggered animations for grid items

## Usage Example

```html
<div class="card animate-fade-in">
  <div class="card-header">
    <h2 class="card-title">Title</h2>
    <p class="card-subtitle">Subtitle</p>
  </div>
  <div class="card-body">
    <p>Content goes here</p>
  </div>
  <div class="card-footer">
    <a href="#" class="btn btn-primary">Action</a>
  </div>
</div>
```

## Browser Support

- Modern browsers with CSS Grid and CSS Custom Properties support
- Chrome 60+, Firefox 52+, Safari 10.1+, Edge 16+

## Performance

- Optimized CSS custom properties
- Hardware-accelerated animations
- Efficient selectors and minimal repaints
- Lazy loading support for images

---

Created for PycodeBR Multimarcas - Transformando a experiência automotiva