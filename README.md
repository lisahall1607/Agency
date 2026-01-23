# Modulr — Digital Product Agency Website

A modern, high-end digital product agency website featuring premium design, smooth animations, and interactive elements. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Modern Design**: Clean, minimalist aesthetic with dark theme and gradient accents
- **Smooth Animations**: Scroll-triggered animations, parallax effects, and micro-interactions
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, card animations, and smooth transitions
- **Performance Optimized**: Lightweight and fast-loading

## Sections

1. **Hero Section**: Eye-catching headline with animated gradient background
2. **Services**: Four core services with hover interactions
3. **Case Studies**: Featured project showcase with overlay effects
4. **Process**: Step-by-step workflow visualization
5. **About**: Agency story with key metrics
6. **Testimonials**: Client quotes and feedback
7. **Call to Action**: Contact form and CTA buttons

## Getting Started

### Prerequisites

- Node.js (v14 or higher) and npm - for development tools
- Modern web browser

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   This will automatically open the website in your browser at `http://localhost:8000`

### Alternative: No Installation Required

You can also use the website without npm:
- Simply open `index.html` in your web browser
- Or use any local server (Python, PHP, etc.)

## Deployment to modulrus.com

### GitHub Pages Setup

1. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - Save the changes

2. **Domain Configuration:**
   - The `CNAME` file is already configured with `modulrus.com` and `www.modulrus.com`
   - In your domain registrar (where you bought modulrus.com), add these DNS records:
     - **Type:** A
     - **Name:** @
     - **Value:** 185.199.108.153
     - **Value:** 185.199.109.153
     - **Value:** 185.199.110.153
     - **Value:** 185.199.111.153
   
   - For www subdomain:
     - **Type:** CNAME
     - **Name:** www
     - **Value:** lisahall1607.github.io

3. **Automatic Deployment:**
   - The GitHub Actions workflow will automatically deploy on every push to `main`
   - Your site will be live at https://modulrus.com

### Manual Deployment

If you prefer to deploy manually:
```bash
git add .
git commit -m "Deploy to modulrus.com"
git push origin main
```

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --color-bg: #0a0a0a;
    --color-accent: #6366f1;
    --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
    /* ... */
}
```

### Content

- Update text content directly in `index.html`
- Replace project placeholders with actual images
- Modify service descriptions and case studies
- Update contact information and social links

### Animations

Adjust animation timings and effects in:
- `styles.css` - CSS animations and transitions
- `script.js` - JavaScript-triggered animations

## Development Scripts

```bash
# Start development server with auto-reload
npm start
# or
npm run dev

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check

# Lint JavaScript code
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Build (format + lint)
npm run build
```

## File Structure

```
Agency/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Interactions and JavaScript
├── package.json        # npm dependencies and scripts
├── .prettierrc         # Prettier configuration
├── .eslintrc.json      # ESLint configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Development Tools

This project includes:

- **live-server**: Development server with auto-reload on file changes
- **Prettier**: Code formatter for consistent code style
- **ESLint**: JavaScript linter for code quality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- No external dependencies (except Google Fonts)
- Optimized CSS with minimal repaints
- Throttled scroll events for smooth performance
- Lazy loading ready (can be enhanced with Intersection Observer)

## Future Enhancements

Potential improvements you could add:

- [ ] Add actual project images
- [ ] Integrate with a backend for form submissions
- [ ] Add a blog section
- [ ] Implement dark/light mode toggle
- [ ] Add more case studies with detailed pages
- [ ] Integrate analytics
- [ ] Add SEO meta tags
- [ ] Optimize images with WebP format
- [ ] Add loading states and transitions

## License

This project is open source and available for personal and commercial use.

## Contact

For questions or customizations, feel free to reach out!

---

Built with ❤️ for modern digital agencies
