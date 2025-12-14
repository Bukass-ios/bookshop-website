document.addEventListener('DOMContentLoaded', ()=>{
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const container = document.getElementById('bookPreview');
  if(!container) return;
  const book = (window.BOOKS||[]).find(b=>b.id===id);
  if(!book){ container.innerHTML = '<div class="muted">Book not found</div>'; return; }
  container.innerHTML = `
    <div class="book-detail">
      <div class="book-cover"><img src="${book.image}" alt="${book.title} cover" loading="lazy"></div>
      <div class="book-info">
        <h1>${escapeHtml(book.title)}</h1>
        <div class="muted">by ${escapeHtml(book.author)}</div>
        <div class="book-price" style="margin-top:1rem;font-size:1.1rem;font-weight:700">₵${book.price.toFixed(2)}</div>
        <p style="margin-top:1rem">${escapeHtml(book.description||'')}</p>
        <div style="margin-top:1rem">ISBN: <span class="muted">${escapeHtml(book.isbn||'')}</span></div>
        <div style="margin-top:1.25rem"><button class="btn" id="addPreview">Add to Cart</button> <a class="btn outline" href="shop.html">Back to shop</a></div>
      </div>
    </div>
  `;

  // Related / recommended books (same category)
  try{
    const related = (window.BOOKS || []).filter(b=>b.id !== book.id && b.category === book.category).slice(0,4);
    const relatedHtml = document.createElement('section'); relatedHtml.className = 'related container';
    relatedHtml.innerHTML = `<h2>Recommended in ${escapeHtml(book.category || 'Books')}</h2><div class="books-grid related-grid"></div>`;
    const grid = relatedHtml.querySelector('.books-grid');
    if(related.length===0){
      // fallback: pick some other books
      const fallback = (window.BOOKS || []).filter(b=>b.id !== book.id).slice(0,4);
      fallback.forEach(b=>{
        const card = document.createElement('article'); card.className='book-card';
        card.innerHTML = `
          <a href="book.html?id=${b.id}" class="book-link"><img class="home-thumb" src="${b.image}" alt="${escapeHtml(b.title)}"></a>
          <div class="meta"><div class="book-title">${escapeHtml(b.title)}</div><div class="book-author">${escapeHtml(b.author)}</div></div>
          <div class="book-footer"><div class="price">₵${b.price.toFixed(2)}</div><div><button class="btn add" data-id="${b.id}">Add to Cart</button></div></div>`;
        grid.appendChild(card);
      });
    } else {
      related.forEach(b=>{
        const card = document.createElement('article'); card.className='book-card';
        card.innerHTML = `
          <a href="book.html?id=${b.id}" class="book-link"><img class="home-thumb" src="${b.image}" alt="${escapeHtml(b.title)}"></a>
          <div class="meta"><div class="book-title">${escapeHtml(b.title)}</div><div class="book-author">${escapeHtml(b.author)}</div></div>
          <div class="book-footer"><div class="price">₵${b.price.toFixed(2)}</div><div><button class="btn add" data-id="${b.id}">Add to Cart</button></div></div>`;
        grid.appendChild(card);
      });
    }
    // append after the preview container
    container.parentElement.appendChild(relatedHtml);
  }catch(e){ /* ignore related rendering errors */ }

  // add to cart wiring uses global addToCart if present
  const addBtn = document.getElementById('addPreview');
  if(addBtn){ addBtn.addEventListener('click', ()=>{ if(window.addToCart){ window.addToCart(book.id,1); showToast('Added to cart'); } else { alert('Cart unavailable'); } }); }

  // small helper (duplicate of app.js escapeHtml)
  function escapeHtml(s){ return String(s).replace(/[&<>\"]/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c])); }
});
