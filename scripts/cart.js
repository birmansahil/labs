const ITEMS = [
    {
        id: 1,
        name: 'FRAMED COLLECTION',
        price: 1050,
        image: 'images/my-framed.jpeg',
        qty: 1,
        size: "select",


    },
]



const openBtn = document.getElementById('open_cart_btn')
const cart = document.getElementById('sidecart')
const closeBtn = document.getElementById('close_btn')
const itemsEl = document.querySelector('.items')
const cartItems = document.querySelector('.cart_items')
const itemsNum = document.getElementById('items_num')
const subtotalPrice = document.getElementById('subtotal_price')
const backdrop = document.querySelector('.backdrop')




let cart_data = [];



openBtn.addEventListener('click', openCart)
closeBtn.addEventListener('click', closeCart)

renderItems()
renderCartItems()


// Open Cart
function openCart() {
    cart.classList.add('open')
    backdrop.classList.add('show')
}

// Close Cart
function closeCart() {
    cart.classList.remove('open')
    backdrop.classList.remove('show')
}

// Add Items to Cart
function addItem(idx, itemId) {

      //find same items
    const foundedItem = cart_data.find(
    (item) => item.id.toString() === itemId.toString()
    )
    if (foundedItem) {
      increaseQty(itemId)
    } else {
        cart_data.push(ITEMS[idx])
    }
    updateCart()
    openCart()
}

//Remove Cart Items
function removeCartItem(itemId) {
    cart_data = cart_data.filter((item) => item.id != itemId)

    updateCart()
}

// Increase Qty
function increaseQty(itemId) {
    cart_data = cart_data.map(item =>
     item.id.toString() === itemId.toString()
     ? {...item, qty: item.qty + 1}
     : item

 )

 updateCart()
}
// Decrease Qty
function decreaseQty(itemId) {
    cart_data = cart_data.map(item =>
     item.id.toString() === itemId.toString()
     ? {...item, qty: item.qty > 1 ? item.qty -1 : item.qty }
     : item

 )

 updateCart()
}


// Calculate Items Number
function calcItemsNum(params) {
    let itemsCount = 0

    cart_data.forEach((item) => (itemsCount += item.qty))

    itemsNum.innerText = itemsCount
}

//Calculate Subtotal Price
function calcSubtotalPrice() {
    let subtotal = 0

    cart_data.forEach((item) => (subtotal += item.price * item.qty))

    subtotalPrice.innerText = subtotal
}


// Render Items
function renderItems() {

    ITEMS.forEach((item, idx) => {
        const itemEl = document.createElement('div')
        itemEl.classList.add('item')
        itemEl.onclick = () => addItem(idx, item.id)
        itemEl.innerHTML = `

        <section class="product-details">
        <img src="images/my-framed.jpeg" alt="my framed food photo series" />

        <div>
          <h2>My Framed Collection by Krystal Moodie</h2>
          <h3>CA$ 1,050</h3>

          <h4>Description</h4>
          <p>
            The "My Framed" series captures the vivid colors of food, within the
            condines of a hand painted frame. It conveys the beauty of food,
            with all its imperfections, whilst limiting the contents to the
            confines of a frame.
          </p>

          <h4>Features</h4>
          <p>
            The "My Framed" collection features 14 captivating artworks, where
            each frame is hand-painted to complement and enhance the essence of
            the enclosed food item. This innovative concept seamlessly merges
            the worlds of paintings and photography, offering a unique
            perspective on how we perceive and appreciate food as both
            sustenance and art.
          </p>

          <h4>Dimensions</h4>
          <p>Each artwork - Width: 25cms Length: 20cms Thickness: 2cms</p>

          <a class="btn">Add to Cart</a>
        </div>
      </section>





        `
        itemsEl.appendChild(itemEl)

    })
}


// Display / Render Cart Items
function renderCartItems() {

        //remove everything from cart


        cartItems.innerHTML = ''
        if (cart_data.length === 0) {
            cartItems.innerHTML = '<div class="empty"><p>Your Cart is empty</p></div>';

        }else{
        //add new data

    cart_data.forEach((item) => {
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart_item')
        cartItem.innerHTML= `
        <div class="remove_item" onclick="removeCartItem(${item.id})">
            <span>&times;</span>
          </div>
          <div class="item_img">
            <img src="${item.image}" alt="">
          </div>
          <div class="item_details">
            <p1>${item.name}</p1>
              <strong>$${item.price}</strong>
              <div class="qty">
                <span onclick="decreaseQty(${item.id})">-</span>
                <strong>${item.qty}</strong>
                <span onclick="increaseQty(${item.id})">+</span>
                </div>
              </div>



        `

        cartItems.appendChild(cartItem)
    })
}
}
function updateCart() {
    // render cart items with update data
    renderCartItems()
    // Update Items Number in Cart
    calcItemsNum()
    // Update Subtotal Price
    calcSubtotalPrice()
}
