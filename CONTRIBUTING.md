# Contributing to Bookshop Website

Thanks for helping improve this project! This guide explains how to add books, replace covers, and test changes locally so contributions remain consistent and easy to review.

## Quick checklist for contributors
- Use clear commits with descriptive messages (e.g., "Add book: b17 — The New Dawn").
- Keep images under `assets/images/` and name them `b{ID}.{ext}` to match `BOOKS` id (e.g., `b17.jpg`).
- Update `assets/js/data.js` only for product data (no behavioral changes in this file).
- Run a local server and verify flows: add-to-cart, cart page, checkout (WhatsApp URL), and book preview.

---

## 1) Add a book (step-by-step)

1. Choose a new book `id` following existing pattern: `b17`, `b18`, etc. Use a string id.
2. Add a cover image to `assets/images/`:
   - Preferred formats: `jpg`, `png`, `webp`. SVG is acceptable for stylized covers.
   - Name it to match the id: `b17.jpg` or `b17.webp`.
   - Recommended size/aspect: 300x420 (or similar 5:7 ratio). The CSS uses `object-fit: cover` so slightly different sizes will be ok.
3. Edit `assets/js/data.js` and add an entry to the `BOOKS` array. Example:

```js
BOOKS.push({
  id: 'b17',
  title: 'The New Dawn',
  author: 'A. Writer',
  price: 18.99,
  category: 'Personal Development',
  image: 'assets/images/b17.jpg',
  isbn: '978-1-23456-017-2',
  description: 'Short description of the book.'
});
```

4. Save the file. Since the site is static client-side, there's no backend step.
5. Open the site locally (see Local testing below). Verify:
   - The book appears in `shop.html` when searching or browsing its category.
   - The image loads correctly (no broken image icon).
   - Clicking the image opens `book.html?id=b17` and the preview page shows title, price, and Add-to-Cart works.

Notes:
- Keep `title`, `author` and `description` human-readable.
- `category` values should match the existing categories: `Personal Development`, `Fiction`, `History`, `Science`, `Education`. Update `shop.html` category list if you add a new category.

---

## 2) Replace a cover image (step-by-step)

1. Choose the existing book id (e.g., `b3`).
2. Prepare the new image file. Name it to match `b3` (e.g., `b3.jpg`).
3. Place the file in `assets/images/`.
4. Update `assets/js/data.js` if the `image` field references a different filename or extension. Example change:

```diff
- image: 'assets/images/b3.svg',
+ image: 'assets/images/b3.jpg',
```

5. Save and test locally:
   - Visit `shop.html` and `book.html?id=b3` to confirm the new image displays and scales properly.

Licensing: ensure you have the right to use the cover image. Do not copy copyrighted covers without permission.

---

## 3) Local testing (serve the site)

Some browsers restrict `fetch`/module behavior over `file://`. Use a simple local server:

- Python (if available):

```bash
python -m http.server 5500
# Open http://localhost:5500 in your browser
```

- Node (http-server):

```bash
npm install -g http-server
http-server -c-1 . -p 5500
# Open http://localhost:5500
```

- VS Code: Use the Live Server extension and open the workspace folder.

Test flows:
- Add a book to the cart, open `cart.html` and verify quantities and totals.
- On `checkout.html`, fill the form and submit — it should open a WhatsApp URL (check that the `SELLER_PHONE` is set in `assets/js/data.js`).
- Try viewing `book.html?id=<id>` directly and via clicking thumbnails.

---

## 4) Coding conventions / tips
- Keep JS modular and avoid duplicating logic. `assets/js/app.js` contains central rendering and cart logic.
- If you add new interactive behavior, prefer `data-` attributes and event delegation to minimize direct DOM wiring.
- Use meaningful `alt` text for images — it helps accessibility.
- Respect `prefers-reduced-motion` when adding animations.

---

## 5) Testing & QA checklist before submitting a PR
- [ ] New book thumbnail displays on `shop.html` and `index.html` picks (if included).
- [ ] `book.html?id=<id>` shows correct metadata and Add-to-Cart works (cart count increments).
- [ ] Cart page shows item, quantity control works, remove button works.
- [ ] Checkout constructs the WhatsApp link with encoded message and correct total.
- [ ] Images are optimized (reasonable file size) and load without layout shift.
- [ ] No console errors in DevTools.

---

## 6) Pull requests and review
- Create a branch named `feature/add-book-b17` or similar.
- Include screenshots of the UI changes if applicable.
- In PR description, list manual test steps you performed.
- Maintainer will review and may ask for image size or text tweaks.

---

## 7) Common troubleshooting
- Broken images: check path in `image` field and that file exists in `assets/images/`.
- Cart shows counts but no items: open DevTools → Application → Local Storage → `bookshop_cart_v1`. Ensure keys match `BOOKS` ids (strings).
- Helper functions unavailable on preview page: ensure `assets/js/app.js` and `assets/js/data.js` are both included with `defer` on the page so `window` helpers are available.

---

## 8) Contact / maintainers
- If you need large-scale data changes (bulk import, CSV import), contact the repository maintainer and we can add a small script to help import.

Thanks for contributing! If you'd like, I can also add a small `scripts/import-books.js` helper to assist with bulk updates.
