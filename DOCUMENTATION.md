# Bookshop Website — Documentation

This document describes the Bookshop website: its features, file structure, data model, how components interact, and step-by-step notes for common changes and debugging. Use this as a reference when making edits or extending the project.

---

## Quick overview
- Static, client-side website built with plain HTML, CSS and vanilla JavaScript (no frameworks).
- Main features:
  - Home, Shop, About, Contact, Cart, Checkout pages + Book preview page
  - Responsive header and mobile nav (hamburger)
  - Product (book) catalog with search and category filters
  - Cart with add/remove/update quantity, persisted in `localStorage`
  - Checkout path that prepares a WhatsApp message to place an order
  - Book preview pages (`book.html?id=...`)
  - Carousel and recommended picks on the Home page
  - Accessibility improvements (ARIA, focus outlines, reduced-motion support)

---

## Project layout (important files)

Root files
- `index.html` — Home page (hero, featured carousel, recommended picks)
- `shop.html` — Shop/catalog page with search and filters
- `cart.html` — Cart page with editable quantities and remove button
- `checkout.html` — Checkout form which assembles a WhatsApp message
- `book.html` — Book preview page (single-book detail view)
- `DOCUMENTATION.md` — This file

Assets
- `assets/css/style.css` — All styling, variables, responsive rules, and component styles
- `assets/js/data.js` — Defines the `BOOKS` array and `SELLER_PHONE`. This is the canonical data file for books.
- `assets/js/app.js` — Main application logic: rendering books, cart functions, UI handlers, carousel, search/filter, newsletter, and helper functions. Also exposes helpers to `window` for other pages.
- `assets/js/book.js` — Renders the book preview page (`book.html?id=...`) using `BOOKS` and calls globally-exposed helpers.
- `assets/images/` — Local cover images (SVGs) used by the site (e.g., `b1.svg` ... `b16.svg`)

Notes:
- Many pages include both `assets/js/data.js` and `assets/js/app.js` using `<script defer>`. That ensures `BOOKS` is available globally and `app.js` initializes after DOM ready.

---

## Data model
- `assets/js/data.js` contains a global `BOOKS` array. Each book is an object with fields:
  - `id` (string): unique id, e.g. `b1`
  - `title` (string)
  - `author` (string)
  - `price` (number) — price in local currency (Cedi in this project)
  - `category` (string) — e.g., `Fiction`, `Personal Development`, `Science`, `History`, `Education`
  - `image` (string) — path to image file, e.g., `assets/images/b1.svg`
  - `isbn` (string) — optional
  - `description` (string) — optional

Common change examples:
- Add a book: edit `BOOKS` in `assets/js/data.js` and add a new cover image to `assets/images/`.
- Change categories: update the `category` field on books and the category links in `index.html` / `shop.html`.

---

## Cart behavior and persistence
- LocalStorage key: `bookshop_cart_v1`
- Cart functions (in `assets/js/app.js`):
  - `getCart()` — returns cart object: `{ [id]: qty }`
  - `saveCart(cart)` — writes back to `localStorage` and updates UI
  - `addToCart(id, qty=1)` — increments item qty
  - `setQty(id, qty)` — sets specific qty, deletes item when qty<=0
  - `removeFromCart(id)` — deletes item
  - `cartItems()` — resolves stored items to full book objects (returns fallback item if book metadata missing)
  - `cartTotalValue()` — compute total as sum of price*qty

- Exposed helpers for cross-page use (attached to `window` in `app.js`):
  - `window.addToCart`, `window.setQty`, `window.removeFromCart`, `window.showToast`

Where to change the storage key: modify `CART_KEY` at top of `assets/js/app.js`.

---

## Checkout via WhatsApp
- The checkout form (`checkout.html`) constructs a WhatsApp URL and opens it using `https://wa.me/${SELLER_PHONE}?text=${msg}`.
- `SELLER_PHONE` is defined in `assets/js/data.js` as an E.164 number WITHOUT the `+` (e.g. `233XXXXXXXXX` or `1555...`).
- The message includes name, phone, address, item lines and total with the currency symbol.

How to change the phone number:
- Edit `assets/js/data.js` and set `SELLER_PHONE = 'YOUR_NUMBER_HERE';`

---

## Currency and formatting
- The UI uses the Cedi symbol `₵` throughout.
- Prices are formatted with `toFixed(2)` in `assets/js/app.js`. If you need localization or separators, replace the simple formatting with Intl API, for example:

```js
const fmt = new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' });
fmt.format(123.45); // prints localized currency
```

Search for literal `₵` in the code when changing symbol across the UI.

---

## Book preview page
- `book.html` uses `assets/js/book.js` which reads `?id=` from the URL and finds the book in `BOOKS`.
- `book.js` renders title, author, price, isbn and description, and provides an Add-to-Cart button which calls `window.addToCart(book.id)`.

To edit the preview layout or add fields, update `assets/js/book.js` and `book.html`.

---

## Search, filters, and query params
- Shop search input (`searchInput`) triggers live filtering via `renderBooks({ q, category })`.
- `app.js` supports URL query params:
  - `?cat=CategoryName` — preselects the category filter
  - `?q=search+terms` — pre-fills the search input and renders results
- Hero search on the homepage redirects to `shop.html?q=...` when the user presses Enter.

---

## Carousel and homepage picks
- `initCarousel()` in `app.js` builds a simple horizontal track and auto-plays every 3.5s. Featured picks use the first few items in `BOOKS`.
- `renderHomePicks()` places selected books on the Home page.

---

## Styling and theme
- Top-level CSS variables are in `assets/css/style.css` under `:root`:
  - `--bg`, `--panel`, `--muted`, `--accent`, `--accent-2`, `--border`, `--text`
- To change the color theme, update these variables.
- Buttons are styled with `.btn` and `.btn.outline` classes and use a gradient between `--accent` and `--accent-2`.

Accessibility
- Focus outlines use accessible `outline` styling in CSS.
- Animations respect `prefers-reduced-motion`.
- Use meaningful `alt` text in images (book covers already include titles).

---

## Images
- Current local covers live in `assets/images/b1.svg` … `b16.svg`.
- To replace with photographic covers:
  - Obtain images and save them to `assets/images/` (prefer local files to avoid external dependency)
  - Update the `image` field in `assets/js/data.js` to point to the new path (e.g., `assets/images/b1.jpg`).
  - Keep dimensions or use CSS `object-fit:cover` (already used in styles) so images scale correctly.

Notes about licensing: do not embed copyrighted covers unless you have permission. Use public-domain or licensed images.

---

## Debugging tips
- If cart shows a quantity but no items visible, open DevTools → Console and Application → Local Storage → `bookshop_cart_v1`.
  - The stored value is an object mapping book ids to quantities, e.g. `{ "b3": 2 }`.
  - If ids are numbers or types mismatch, the cart lookup may fail — `app.js` now coerces ids to strings and falls back to a placeholder.
- Common console helpers you can add for debugging in `app.js`:
  - `console.log('Cart', getCart(), cartItems());`
- If `BOOKS` is undefined on a page, ensure `assets/js/data.js` is included before `app.js` and that scripts use `defer`.

Quick reset cart snippet (open DevTools → Console):

```js
localStorage.removeItem('bookshop_cart_v1');
location.reload();
```

---

## Tests & automation
- There is no built-in test runner currently in the project. For smoke tests consider Playwright or Puppeteer to script UI flows (add-to-cart, preview page, checkout URL). We can add a `tests/` folder with Playwright tests if desired.

---

## How to run locally
- Option A: Open `index.html` in a browser (file://). Some browsers might restrict module/asset loading over file://; using a small static server is recommended.
- Option B: Quick Python server from project root:

```bash
# Python 3
python -m http.server 5500
# then open http://localhost:5500
```

- Option C: Use VS Code Live Server extension and open the workspace folder.

---

## Common edits & where to make them
- Add / change book: `assets/js/data.js` (BOOKS)
- Replace covers: `assets/images/` and update `image` paths
- Change theme colors: `assets/css/style.css` `:root` variables
- Adjust cart logic: `assets/js/app.js` (cart helpers, persistence)
- Change checkout phone: `assets/js/data.js` (SELLER_PHONE)
- Edit preview layout: `assets/js/book.js` and `book.html`
- Add new page or static assets: add file to root and link from nav

---

## Extension ideas / next work
- Add server-side checkout or integrate with payment gateways
- Add search indexing for faster client-side full text search on large catalogs
- Add image optimization pipeline and local JPG/WEBP covers
- Add Playwright/E2E tests and/or unit tests for JS functions
- Internationalization/localization (use Intl.NumberFormat) and currency toggles

---

## Contacts & notes for maintainers
- `assets/js/data.js` is the single source of truth for product data — keep it in sync with `assets/images/`.
- If you rename book ids, make sure any existing `localStorage` entries are migrated or cleared.
- Before deploying, verify `SELLER_PHONE` is set correctly and test WhatsApp order messages.


If you want, I can also:
- Add inline comments to critical JS files explaining important functions (cart flow, render logic)
- Add a small contributor guide (how to add books, run local server, test flows)
- Create Playwright smoke tests and a `package.json` script to run them

---

End of documentation.
