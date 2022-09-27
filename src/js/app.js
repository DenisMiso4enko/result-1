 // open cart
 const openCartBtn = document.querySelector('.btn-cart')
 const shoppingCart = document.querySelector('.shopping-cart')
 const closeBtnCart = document.querySelector('.btn-close')
 const fadeBlock = document.querySelector('#modal')
 const fade = document.querySelector('.fade-block')
 const body = document.body

 openCartBtn.addEventListener('click', () => {
     fadeBlock.classList.remove('hidden')
     body.classList.toggle('stopscroll')
     fade.addEventListener('click', function() {
         fade.classList.add('hidden')
         body.classList.remove('stopscroll')
     })
 })

 // закрыть корзину
 closeBtnCart.addEventListener('click', () => {
     fadeBlock.classList.add('hidden')
     body.classList.remove('stopscroll')
 })
 shoppingCart.addEventListener('click', (event) =>  event.stopPropagation())



// товары в корзине
 const shoppingCartContainer = document.querySelector('.shopping-cart__container')
 const productTemplateElement = document.querySelector('#product-template')
 const itemInCart = document.querySelector('.counter')
 const searchInputElement = document.querySelector('#search-input')

const data = getData()
 function checkItemsInCart () {
     itemInCart.textContent = data.length
 }
 checkItemsInCart()
checkEmptyCart()


function updateProductsInCart(product) {
     for (let i = 0; i < data.length; i++) {
         if (data[i].id === product.id) {
             data[i].inCart += 1
             return
         }
     }
     data.push(product)
}
 // добавление в корзину
 window.addEventListener('click', (e) => {
     if (e.target.hasAttribute('data-cart')) {
         const card = e.target.closest('.products__card');
         const productInfo = {
             id: card.dataset.id,
             imgHTML: ` <img src="${card.querySelector(".product-img").getAttribute("src")}" alt="product">`,
             title: card.querySelector('.card-title').innerText,
             price: card.querySelector('.price').innerText,
             element: card,
             inCart: 1,
         }
         updateProductsInCart(productInfo)
         render(data)
         calcPrice()
         checkEmptyCart()
         checkItemsInCart()
         alert('Ваш товар добавден в корзину')
     }
 })

function deleteProductFromArray(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            data.splice(i, 1)
        }
    }
}
 // удаление из корзины
 shoppingCart.addEventListener('click', (e) => {
     if (e.target.dataset.action === 'remove') {
         const parent = e.target.closest('.shopping-cart__item')
         const id = parent.dataset.id
         deleteProductFromArray(id)
         parent.remove()
         render(data)
         checkItemsInCart()
         calcPrice()
         checkEmptyCart()
     }
 })

// счетчик товара
shoppingCart.addEventListener('click', function (e) {
    if (e.target.dataset.action === 'plus' || e.target.dataset.action === 'minus') {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === e.target.dataset.id) {
                if (e.target.dataset.action === 'plus') {
                    data[i].inCart += 1
                }
                else if (e.target.dataset.action === 'minus') {
                    data[i].inCart -= 1
                }
            }
            if (data[i].inCart <= 0) {
                data.splice(i, 1);
            }
        }
        render(data)
        checkEmptyCart()
        checkItemsInCart()
        calcPrice()
    }
});


 // Поиск
 searchInputElement.addEventListener('input', (e) => {
     let searchVal = e.target.value.toLowerCase()
     let searchProduct = document.querySelectorAll('.card-title')
     console.log(searchProduct)
     searchProduct.forEach(product => {
         if (!product.textContent.toLowerCase().includes(searchVal)) {
             product.parentElement.parentElement.classList.add('hidden')
         } else {
             product.parentElement.parentElement.classList.remove('hidden')
         }
     })
 })

 //
 searchInputElement.addEventListener('input', (e) => {
     let searchVal = e.target.value.toLowerCase()
     let searchProduct = document.querySelectorAll('.cart-title')
     searchProduct.forEach(product => {
         if (!product.textContent.toLowerCase().includes(searchVal)) {
             product.parentElement.parentElement.classList.add('hidden')
         } else {
             product.parentElement.parentElement.classList.remove('hidden')
         }
     })
 })


 //

 //проверка пусткой корзины
 function checkEmptyCart() {
     if (data.length === 0) {
         const emptyCartHTML = `
         <h3 id="empty">Ваша корзина пустая</h3>
        `
         shoppingCartContainer.insertAdjacentHTML('afterbegin', emptyCartHTML)
     }
     if (data.length > 0) {
         const emptyListEl = document.querySelector('#empty')
         emptyListEl ? emptyListEl.remove() : null
     }
 }

 // счетчик суммы
 function calcPrice() {
     const cartItems = document.querySelectorAll('.shopping-cart__item')
     const totalElem = document.querySelector('.total')
     let totalPrice = 0
     if (data.length === 0) {
         totalElem.textContent = `Итого: 0 BYN`
     }

     cartItems.forEach(item => {
         const amountEl = item.querySelector('[data-counter]').innerText
         const priceEl = item.querySelector('.shopping-cart__price').innerText
         const currentPrice = Number(amountEl) * Number(priceEl.replace('BYN', ''))
         totalPrice += currentPrice
         totalElem.textContent = `Итого: ${totalPrice.toLocaleString('byn', {
            style: 'currency',
            currency: 'byn'
         })}`
     })
 }

 // шаблон
 function buildToDoTemplate (productInfo) {
     let template = productTemplateElement.innerHTML
     const payload = {
         ...productInfo,
     }
     for (let key in payload) {
         template = template.replaceAll(`{{${key}}}`, payload[key])
     }
     return template

 }

 // рендер шаблона
 function render (data) {
     let html = ''
     data.forEach((item) => {
         const template = buildToDoTemplate(item)
         html = html + template
     })
     shoppingCartContainer.innerHTML = html
 }

 // массив данных
 function getData () {
     const dataStorage = localStorage.getItem('product')
     const data = dataStorage ? JSON.parse(dataStorage) : []
     return data
 }

 function handleBeforeUnload () {
     localStorage.setItem('product', JSON.stringify(data))
     calcPrice()
 }
 function handlePageLoad () {
     render(data)
     calcPrice()
     checkEmptyCart()
 }
 window.addEventListener('beforeunload', handleBeforeUnload)
 document.addEventListener('DOMContentLoaded', handlePageLoad)