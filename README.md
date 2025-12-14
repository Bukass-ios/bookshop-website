# Bookshop — Static Responsive Website

This is a simple, production-ready static bookshop website built with HTML5, CSS3 and vanilla JavaScript.

Features included:
- Home, Shop, About, Contact, Cart and Checkout pages
- Responsive, mobile-first layout using CSS Grid and Flexbox
- Product grid with search and category filter
- Add to cart, modify quantities, remove items
- Cart persistence using `localStorage`
- Slide-out cart and dedicated cart page
- Checkout via WhatsApp with pre-filled message containing order and customer details
- Accessibility considerations: alt text, aria attributes, keyboard-friendly components

Setup / Usage
1. Open the project folder in a static server or your browser. You can open `index.html` directly, but for some browsers you may prefer a local dev server.

2. Configure the WhatsApp number used for checkout in `assets/js/data.js` by editing the `SELLER_PHONE` variable (E.164 without `+`).

Example:
```
SELLER_PHONE = '15551234567';
```

3. Browse the site and use the shop to add items. Checkout will open WhatsApp Web or the WhatsApp app (depending on the device) with a pre-filled message.

Notes
- Replace placeholder images in `assets/images` with real book covers for production.
- The site is intentionally framework-free for portability.
