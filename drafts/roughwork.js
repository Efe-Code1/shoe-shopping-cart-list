let products = null;
// get data from file json
fetch('product.json')
.then(response => response.json())
.then(data => {
    products = data;
    addDataToHTML();
})

// show datas in list HTML
function addDataToHTML(){
    // remove datas defaults in HTML
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    // add new datas
    if(products != null){
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src='${product.image}'>
            <h2>${product.name}</h2>
            <div class='price'>${product.price}</div>
            <button onclick='addCart(${product.id})'>Add to Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
}

let listCart = [];
// and to get cookie data cart
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}
checkCart();

function addCart($idProduct){
    let productCopy = JSON.parse(JSON.stringify(products));
    // if this product is not in the cart
    if(!listCart[$idProduct]){
        let dataProduct = productCopy.filter(
            product => product.id == $idProduct
        )[0];
        // add data product in cart
        listCart[$idProduct] = dataProduct;
        listCart[$idProduct].quantity = 1;
    }else{
        // if this product is already in the cart
        // quantity is increased
        listCart[$idProduct].quantity++;
    }
    // save datas cart in cookie
    // save this datas cart when computer/mobile is turned off
    let timeSave = 'expires=Thu, 31 Dec 2025 23:59:59 UTC';
    document.cookie = 'listCart='+JSON.stringify(listCart)+'; '+timeSave+'; path=/;';
    addCartToHTML();
}

addDataToHTML(); 
function addCartToHTML(){
    // clear data default;
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = ' ';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                `<img src='${product.image}'>
                <div class='content'>
                    <div class='name'>
                        ${product.name}
                    </div>
                    <div class='price'>
                        ${product.price}
                    </div>
                    <div class='quantity'>
                        <button onclick='changeQuantity(${product.id}, '-')'> - </button>
                        <span class='value'> 
                            ${product.quantity}
                        </span>
                        <button onclick='changeQuantity(${product.id}, '+')'> + </button>
                    </div>
                </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}

function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;

        default:
            break;
    }
    // save new data in cookie
    let timeSave = 'expires=Thu, 31 Dec 2025 23:59:59 UTC';
    document.cookie = 'listCart='+JSON.stringify(listCart)+'; '+timeSave+'; path=/;';

    // reload list cart in HTML
    addCartToHTML();
}











let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.totalQuantity');


let listProducts = [];
let carts = [];


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