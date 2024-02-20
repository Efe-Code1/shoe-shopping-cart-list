let listCart = [];
// get data cart from cookie

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

addCartToMemory();

addCartToHTML();
function addCartToHTML(){
    // clear data from HTML
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';
    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');

    let totalQuantity= 0;
    let totalPrice = 0;

    // if has product in cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newP = document.createElement('div');
                newP.classList.add('item');
                newP.innerHTML=
                `<img src="${product.image}" alt="">
                <div class="info">
                    <div class="name down">${product.name}</div>
                    <div class="price down">${product.price} NGN</div>
                </div>
                <div class="quantity down">${product.quantity}</div>
                <div class="returnPrice down">
                ${product.price * product.quantity} NGN
                </div>`;
                listCartHTML.appendChild(newP);
                totalQuantity += product.quantity;
                totalPrice += (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText =  totalPrice + 'NGN';
}
