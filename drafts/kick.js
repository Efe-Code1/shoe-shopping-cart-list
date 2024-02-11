// let iconCart = document.querySelector('.icon-cart');
// let body = document.querySelector('body');

// iconCart.addEventListener('click', () => {
//     body.classList.toggle('showCart')
// });


let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.totalQuantity');


let listProducts = [];
let carts = [];

iconCart.addEventListener('click', ()=>{
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', ()=>{
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})


const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = 
            `<img src='${product.image}'>
            <h2>${product.name}</h2>
            <div class='price'>${product.price}</div>
            <button class='addCart'>Add to Cart</button>`;
            listProductHTML.appendChild(newProduct);
        })
    }
}
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if (positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    // console.log(carts);
    addToCartToHTML();
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
     if(carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = 
            `<div class="item">
                <img src="${info.image}" alt="">
                <div class="content">
                    <div class="name">
                    ${info.name}
                    </div>
                    <div class="price">
                    ${info.price * cart.quantity}
                    </div>
                </div>
                <div class="quantity">
                    <button>-</button>
                    <span>${cart.quantity}</span>
                    <button>+</button>
                </div>
            </div>`;
            listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

const initApp = () => {
    // get data from json file
    fetch('product.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();
    })
}
initApp();