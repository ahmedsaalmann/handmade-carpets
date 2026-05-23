// Shopping Cart Logic

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let appliedPromo = JSON.parse(localStorage.getItem('promo')) || null;

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('promo', JSON.stringify(appliedPromo));
  updateCartUI();
}

function addToCart(id, name, price, image) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }
  saveCart();
  showToast('تمت الإضافة إلى السلة بنجاح');
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function updateQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      saveCart();
    }
  }
}

function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function toggleCart() {
  document.getElementById('cart-drawer').classList.toggle('open');
}

function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
}

function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  if (countEl) countEl.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  
  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p style="text-align:center; padding: 2rem; color: var(--text-light);">السلة فارغة</p>';
    cartTotalEl.innerText = '0 ج.م';
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${formatPrice(item.price)}</p>
        <div class="cart-qty">
          <button onclick="updateQuantity('${item.id}', -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity('${item.id}', 1)">+</button>
        </div>
      </div>
      <button class="cart-remove" onclick="removeFromCart('${item.id}')">🗑️</button>
    </div>
  `).join('');

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  let discountAmount = 0;
  
  const discountRow = document.getElementById('discount-row');
  const discountAmountEl = document.getElementById('discount-amount');
  
  if (appliedPromo) {
    discountAmount = subtotal * (appliedPromo.percentage / 100);
    if (discountRow) {
      discountRow.style.display = 'flex';
      discountAmountEl.innerText = formatPrice(discountAmount);
    }
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }

  cartTotalEl.innerText = formatPrice(subtotal - discountAmount);
}

async function applyPromo() {
  const codeInput = document.getElementById('promo-input').value.trim().toUpperCase();
  const msgEl = document.getElementById('promo-msg');
  
  if (!codeInput) {
    appliedPromo = null;
    saveCart();
    msgEl.innerHTML = '';
    return;
  }

  try {
    const { data, error } = await db.from('promo_codes')
      .select('*')
      .eq('code', codeInput)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      msgEl.innerHTML = '<span class="promo-error">كود غير صحيح أو منتهي الصلاحية</span>';
      appliedPromo = null;
    } else {
      appliedPromo = { code: data.code, percentage: data.discount_percentage };
      msgEl.innerHTML = `<span class="promo-success">تم تطبيق خصم ${data.discount_percentage}%!</span>`;
    }
    saveCart();
  } catch (e) {
    console.error(e);
  }
}

async function submitCheckout(e) {
  e.preventDefault();
  if (cart.length === 0) return;

  const btn = document.getElementById('checkout-btn');
  btn.disabled = true;
  btn.innerText = '⏳ جاري الطلب...';

  const customer_name = document.getElementById('c-name').value;
  const customer_phone = document.getElementById('c-phone').value;
  const customer_address = document.getElementById('c-address').value;
  const notes = document.getElementById('c-notes').value;

  const tracking_number = 'TRK-' + Date.now().toString().slice(-6);
  
  const subtotal = getCartTotal();
  const discountAmount = appliedPromo ? (subtotal * (appliedPromo.percentage / 100)) : 0;
  const total_price = subtotal - discountAmount;
  
  let finalNotes = notes;
  if (appliedPromo) {
    finalNotes = `(كوبون: ${appliedPromo.code} خصم ${appliedPromo.percentage}%) ` + finalNotes;
  }

  const orderData = {
    tracking_number,
    customer_name,
    customer_phone,
    customer_address,
    notes: finalNotes,
    total_price,
    items: cart, // JSONB column
    status: 'pending'
  };

  try {
    const { error } = await db.from('orders').insert(orderData);
    if (error) throw error;
    
    // Clear cart
    cart = [];
    appliedPromo = null;
    saveCart();
    closeCart();
    
    // Show success modal or alert
    alert(`🎉 تم استلام طلبك بنجاح!\n\nرقم التتبع الخاص بك هو:\n${tracking_number}\n\nيرجى الاحتفاظ بهذا الرقم لتتبع حالة طلبك.`);
    window.location.href = 'track.html';
  } catch (error) {
    console.error(error);
    alert('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً.');
  } finally {
    btn.disabled = false;
    btn.innerText = 'إتمام الطلب';
  }
}

// Initialize UI on load
document.addEventListener('DOMContentLoaded', updateCartUI);
