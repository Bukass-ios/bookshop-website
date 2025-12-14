/* Main app script: handles rendering, cart, cart persistence, and checkout via WhatsApp */
document.addEventListener('DOMContentLoaded', () => {
  // Basic DOM refs
  const booksGrid = document.getElementById('booksGrid');
  const loadingEl = document.getElementById('loading');
  const categoryFilter = document.getElementById('categoryFilter');
  const searchInput = document.getElementById('searchInput');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const cartSlide = document.getElementById('cartSlide');
  const cartContents = document.getElementById('cartContents');
  const cartPageContents = document.getElementById('cartPageContents');
  const orderList = document.getElementById('orderList');
  const orderTotal = document.getElementById('orderTotal');

  // header year
  document.querySelectorAll('#year,#year2,#year3,#year4,#year5,#year6').forEach(el=>{ if(el) el.textContent = new Date().getFullYear() });

  // fallback for pages that don't include elements
  const hasBooksGrid = !!booksGrid;

  // Cart helpers
  const CART_KEY = 'bookshop_cart_v1';
  function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY))||{} }catch(e){return{}} }
  function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartUI(); }

  function addToCart(id, qty=1){ const cart = getCart(); cart[id] = (cart[id]||0) + qty; saveCart(cart); showToast('Added to cart'); }
  function setQty(id, qty){ const cart = getCart(); if(qty<=0){ delete cart[id]; } else cart[id]=qty; saveCart(cart); }
  function removeFromCart(id){ const cart = getCart(); delete cart[id]; saveCart(cart); }

  function cartItems(){
    const cart = getCart();
    return Object.keys(cart).map(key=>{
      const id = String(key);
      const qty = cart[key];
      const book = (window.BOOKS || []).find(b=>String(b.id) === id);
      if(book){
        return { ...book, qty };
      }
      // fallback when book meta isn't available (shouldn't happen normally)
      return { id, title: 'Unknown book', author: '', price: 0, image: 'assets/images/b1.svg', qty };
    }).filter(Boolean);
  }
  function cartTotalValue(){ return cartItems().reduce((s,i)=>s + (i.price||0)*i.qty,0); }

  function updateCartUI(){ const items = cartItems(); const total = cartTotalValue(); if(cartCount) cartCount.textContent = items.reduce((s,i)=>s+i.qty,0); if(cartTotal) cartTotal.textContent = total.toFixed(2);
    // slide contents
    if(cartContents) renderCartContents(cartContents, items);
    if(cartPageContents) renderCartPage(cartPageContents, items);
    if(orderList) renderOrderSummary(orderList, orderTotal, items);
  }

  // ARIA live announcer for cart updates (accessibility)
  (function setupCartAnnouncer(){
    try{
      let announcer = document.getElementById('cartAnnounce');
      if(!announcer){ announcer = document.createElement('div'); announcer.id='cartAnnounce'; announcer.setAttribute('aria-live','polite'); announcer.setAttribute('aria-atomic','true'); announcer.style.position='absolute'; announcer.style.left='-9999px'; announcer.style.width='1px'; announcer.style.height='1px'; announcer.style.overflow='hidden'; document.body.appendChild(announcer); }
      // patch updateCartUI to also announce
      const origUpdate = updateCartUI;
      updateCartUI = function(){ origUpdate(); try{ const items = cartItems(); const count = items.reduce((s,i)=>s+i.qty,0); announcer.textContent = count>0 ? `${count} items in cart` : 'Cart is empty'; }catch(e){} };
    }catch(e){ /* ignore */ }
  })();

  function renderCartContents(container, items){ container.innerHTML = '';
    if(items.length===0){ container.innerHTML = '<div class="empty">Your cart is empty</div>'; return; }
    items.forEach(it=>{
      const div = document.createElement('div'); div.className='cart-item';
      div.innerHTML = `<img alt="${escapeHtml(it.title)}" src="${it.image}"><div style="flex:1"><div class="book-title">${escapeHtml(it.title)}</div><div class="book-author">${escapeHtml(it.author)}</div><div style="margin-top:.4rem">₵${it.price.toFixed(2)} × <input class="qty-input" data-id="${it.id}" type="number" min="0" value="${it.qty}"></div></div><div><button data-remove="${it.id}">Remove</button></div>`;
      container.appendChild(div);
    });
  }

  function renderCartPage(container, items){ container.innerHTML = '';
    if(items.length===0){ container.innerHTML = '<div class="books-grid empty">Your cart is empty — <a href="shop.html">browse books</a></div>'; return; }
    const list = document.createElement('div'); list.className='cart-list';
    items.forEach(it=>{
      const row = document.createElement('div'); row.className='book-card';
      row.innerHTML = `
        <div style="display:flex;gap:.8rem;align-items:flex-start">
          <a href="book.html?id=${it.id}" class="book-link"><img src="${it.image}" alt="${escapeHtml(it.title)}" style="width:84px;height:120px;object-fit:cover"></a>
          <div class="meta">
            <div class="book-title">${escapeHtml(it.title)}</div>
            <div class="book-author">${escapeHtml(it.author)}</div>
            <div style="margin-top:.6rem">₵${it.price.toFixed(2)}</div>
            <div style="margin-top:.6rem">Qty: <input type="number" min="0" value="${it.qty}" data-id="${it.id}" class="qty-input"></div>
          </div>
          <div style="margin-left:auto;display:flex;flex-direction:column;gap:.6rem;align-items:flex-end">
            <button class="remove-btn" data-remove="${it.id}" aria-label="Remove ${escapeHtml(it.title)}">
              <svg viewBox="0 0 24 24" width="18" height="18" class="icon" aria-hidden="true"><path fill="currentColor" d="M9 3v1H4v2h16V4h-5V3H9zm1 5v9h2V8H10zm4 0v9h2V8h-2zM7 8v9h2V8H7z"/></svg>
              Remove
            </button>
          </div>
        </div>`;
      list.appendChild(row);
    });
    const foot = document.createElement('div'); foot.className='cart-footer'; foot.innerHTML = `<div class="cart-total">Total: ₵${cartTotalValue().toFixed(2)}</div><div class="cart-actions"><a href="checkout.html" class="btn">Checkout</a></div>`;
    container.appendChild(list); container.appendChild(foot);
  }

  function renderOrderSummary(listEl, totalEl, items){ if(!listEl) return; listEl.innerHTML = ''; if(items.length===0){ listEl.innerHTML = '<div class="muted">Cart is empty</div>'; totalEl.textContent='0.00'; return; }
    items.forEach(it=>{ const div = document.createElement('div'); div.textContent = `${it.qty} × ${it.title} — ₵${(it.price*it.qty).toFixed(2)}`; listEl.appendChild(div); }); totalEl.textContent = cartTotalValue().toFixed(2);
  }

  // Escape helper
  function escapeHtml(s){ return String(s).replace(/[&<>"]/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }

  // Toast
  function showToast(msg){ const t = document.createElement('div'); t.className='toast'; t.textContent = msg; t.style.position='fixed'; t.style.right='1rem'; t.style.bottom='1rem'; t.style.background='var(--accent)'; t.style.color='#fff'; t.style.padding='0.6rem 1rem'; t.style.borderRadius='8px'; document.body.appendChild(t); setTimeout(()=>t.remove(),1800); }

  // Book rendering
  function populateCategories(){ if(!categoryFilter) return; const cats = Array.from(new Set(BOOKS.map(b=>b.category))).sort(); cats.forEach(c=>{ const opt = document.createElement('option'); opt.value=c; opt.textContent=c; categoryFilter.appendChild(opt); }); }

  // Render picks on the homepage (first N books)
  function renderHomePicks(){ const container = document.getElementById('homePicks'); if(!container) return; container.innerHTML=''; const picks = BOOKS.slice(0,6); picks.forEach(b=>{
    const card = document.createElement('article'); card.className='book-card';
    card.innerHTML = `<a href="book.html?id=${b.id}" class="book-link"><img src="${b.image}" alt="${escapeHtml(b.title)} cover" loading="lazy"></a><div class="meta"><div class="book-title">${escapeHtml(b.title)}</div><div class="book-author">${escapeHtml(b.author)}</div></div><div class="book-footer"><div class="price">₵${b.price.toFixed(2)}</div><div><button class="btn add" data-id="${b.id}">Add to Cart</button></div></div>`;
    container.appendChild(card);
  }); }

  function renderBooks(filter={q:'',category:''}){
    if(!hasBooksGrid) return;
    loadingEl.style.display='block'; booksGrid.innerHTML=''; setTimeout(()=>{ // simulate slight load
      const q = (filter.q||'').toLowerCase().trim(); const category = filter.category||'';
      let list = BOOKS.filter(b=>(!category||b.category===category) && (!q || (b.title+b.author).toLowerCase().includes(q)));
      if(list.length===0){ booksGrid.innerHTML = '<div class="empty">No books found</div>'; loadingEl.style.display='none'; return; }
      list.forEach(b=>{
        const card = document.createElement('article'); card.className='book-card';
        card.innerHTML = `<a href="book.html?id=${b.id}" class="book-link"><img src="${b.image}" alt="${escapeHtml(b.title)} cover" loading="lazy"></a><div class="meta"><div class="book-title">${escapeHtml(b.title)}</div><div class="book-author">${escapeHtml(b.author)}</div></div><div class="book-footer"><div class="price">₵${b.price.toFixed(2)}</div><div><button class="btn add" data-id="${b.id}">Add to Cart</button></div></div>`;
        booksGrid.appendChild(card);
      });
      loadingEl.style.display='none';
    }, 200);
  }

  // Carousel for featured books
  function initCarousel(){ const track = document.getElementById('carouselTrack'); if(!track) return; const featured = BOOKS.slice(0,6); featured.forEach(b=>{ const el = document.createElement('div'); el.className='book-card'; el.style.minWidth='240px'; el.innerHTML = `<img src="${b.image}" alt="${escapeHtml(b.title)}"><div class="meta"><div class="book-title">${escapeHtml(b.title)}</div><div class="book-author">${escapeHtml(b.author)}</div></div>`; track.appendChild(el); });
    const prev = document.querySelector('.carousel-prev'); const next = document.querySelector('.carousel-next'); let idx=0; const step = 1; const itemW = 240 + 16; function move(i){ idx=Math.max(0,Math.min(i,featured.length-1)); track.style.transform=`translateX(-${idx*itemW}px)` }
    if(prev) prev.addEventListener('click',()=>{ move(idx-1); resetAuto(); }); if(next) next.addEventListener('click',()=>{ move(idx+1); resetAuto(); });
    // autoplay
    let autoId = null;
    function startAuto(){ autoId = setInterval(()=>{ idx = (idx + step) % featured.length; move(idx); }, 3500); }
    function resetAuto(){ if(autoId) clearInterval(autoId); startAuto(); }
    startAuto();
  }

  // Event delegation
  document.body.addEventListener('click', (e)=>{
    if(e.target.matches('.btn.add')){ const id=e.target.dataset.id; addToCart(id,1); }
    if(e.target.matches('#cartToggle')){ cartSlide.classList.add('open'); cartSlide.setAttribute('aria-hidden','false'); }
    if(e.target.matches('#closeCart')){ cartSlide.classList.remove('open'); cartSlide.setAttribute('aria-hidden','true'); }
    if(e.target.matches('[data-remove]')){ removeFromCart(e.target.dataset.remove); }
  });

  document.body.addEventListener('input', (e)=>{ if(e.target.classList.contains('qty-input')){ const id = e.target.dataset.id; const val = parseInt(e.target.value||0,10); setQty(id, isNaN(val)?0:val); } });

  // Search & filter
  if(searchInput){ searchInput.addEventListener('input', ()=> renderBooks({ q: searchInput.value, category: categoryFilter?.value })); }
  if(categoryFilter){ categoryFilter.addEventListener('change', ()=> renderBooks({ q: searchInput?.value, category: categoryFilter.value })); }

  // On load, check for query params to pre-filter or prefill the shop page
  const urlParams = new URLSearchParams(window.location.search);
  const initialCat = urlParams.get('cat');
  const initialQ = urlParams.get('q');

  // If a q param is present (shop search), prefill the search input and render
  if(initialQ && searchInput){
    searchInput.value = initialQ;
    renderBooks({ q: initialQ, category: initialCat || '' });
  } else if(initialCat && categoryFilter){ // fallback: only cat param present
    categoryFilter.value = initialCat;
    renderBooks({ q: searchInput?.value || '', category: initialCat });
  }

  // Hero search on the homepage should redirect to shop with a ?q= query
  const heroSearch = document.getElementById('heroSearch');
  if(heroSearch){
    heroSearch.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter'){
        const q = heroSearch.value.trim();
        const url = q ? `shop.html?q=${encodeURIComponent(q)}` : 'shop.html';
        window.location.href = url;
      }
    });
  }

  // Newsletter
  const newsletterForm = document.getElementById('newsletterForm'); if(newsletterForm){ newsletterForm.addEventListener('submit', e=>{ e.preventDefault(); const em = document.getElementById('newsletterEmail').value; document.getElementById('newsletterMsg').textContent = `Thanks — ${em} subscribed!`; newsletterForm.reset(); }); }
  // footer newsletter forms (multiple pages) — attach to all forms with id footerNewsletterForm
  document.querySelectorAll('#footerNewsletterForm').forEach(frm=>{ frm.addEventListener('submit', e=>{ e.preventDefault(); const input = frm.querySelector('input[type="email"]'); const msgEl = frm.parentElement.querySelector('#footerNewsMsg') || frm.parentElement.querySelector('.muted'); if(input && msgEl){ msgEl.textContent = `Thanks — ${input.value} subscribed!`; } frm.reset(); }); });

  // Contact form
  const contactForm = document.getElementById('contactForm'); if(contactForm){ contactForm.addEventListener('submit', e=>{ e.preventDefault(); document.getElementById('contactMsg').textContent = 'Message sent — we will reply soon.'; contactForm.reset(); }); }

  // Checkout form
  const checkoutForm = document.getElementById('checkoutForm'); if(checkoutForm){ checkoutForm.addEventListener('submit', e=>{ e.preventDefault(); const name = document.getElementById('custName').value; const phone = document.getElementById('custPhone').value; const addr = document.getElementById('custAddress').value; const items = cartItems(); if(!items.length){ document.getElementById('checkoutMsg').textContent='Your cart is empty.'; return; }
      // Build message
      let msg = `Order from Bookshop%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AAddress: ${encodeURIComponent(addr)}%0A%0AItems:%0A`;
      items.forEach(it=>{ msg += `${encodeURIComponent(it.qty)} x ${encodeURIComponent(it.title)} — ${encodeURIComponent('₵' + (it.price*it.qty).toFixed(2))}%0A`; });
      msg += `%0ATotal: ${encodeURIComponent('₵' + cartTotalValue().toFixed(2))}`;
      // Open WhatsApp (SELLER_PHONE is global from data.js)
      const wa = `https://wa.me/${SELLER_PHONE}?text=${msg}`;
      window.open(wa, '_blank');
      document.getElementById('checkoutMsg').textContent='Opening WhatsApp…';
    }); }

  // Hamburger
  const hamburger = document.getElementById('hamburger'); if(hamburger){ hamburger.addEventListener('click', ()=>{ const nav = document.getElementById('mainNav'); nav.classList.toggle('open'); }); }

  // Close mobile nav when a nav link is clicked (better mobile UX)
  document.querySelectorAll('.nav a').forEach(a=>{ a.addEventListener('click', ()=>{ const nav = document.getElementById('mainNav'); if(nav && nav.classList.contains('open')) nav.classList.remove('open'); }); });

  // expose key helpers for pages like book.html to reuse (preview page calls these)
  window.addToCart = (id, qty=1) => addToCart(id, qty);
  window.setQty = (id, qty) => setQty(id, qty);
  window.removeFromCart = (id) => removeFromCart(id);
  window.showToast = (msg) => showToast(msg);

  // initialize
  populateCategories(); renderBooks({}); initCarousel(); renderHomePicks(); updateCartUI();

  // Add fade-in to main content areas for nicer entrance
  // Back to top button: create and wire show/hide + smooth scroll
  (function(){
    try{
      const btn = document.createElement('button'); btn.className='back-to-top'; btn.title='Back to top'; btn.setAttribute('aria-label','Back to top');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8l-6 6h12l-6-6z" fill="currentColor"/></svg>';
      document.body.appendChild(btn);
      btn.addEventListener('click', ()=>{ window.scrollTo({ top:0, behavior:'smooth' }); });
      function check(){ if(window.scrollY>300) btn.classList.add('show'); else btn.classList.remove('show'); }
      window.addEventListener('scroll', check); check();
    }catch(e){/* ignore */}
  })();

  document.querySelectorAll('main > section, .book-card, .hero, .featured, .picks').forEach((el,i)=>{ el.classList.add('fade-in'); el.style.animationDelay = (i * 60) + 'ms'; });

});
