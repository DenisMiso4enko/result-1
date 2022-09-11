// import Swiper JS
import Swiper from '../../node_modules/swiper/swiper-bundle';


let swiper = new Swiper('.swiper', {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  });


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


// счетчик
 shoppingCart.addEventListener("click", function (e) {
     let counter
     if (e.target.dataset.action === "plus" || e.target.dataset.action === "minus") {
         const counterWrapper = e.target.closest(".counter-wrapper");
         counter = counterWrapper.querySelector("[data-counter]");
     }
     if (e.target.dataset.action === "plus") {
         counter.innerText = ++counter.innerText;
         calcPrice()
     }
     if (e.target.dataset.action === "minus") {
         if (parseInt(counter.innerText) > 1) {
             counter.innerText = --counter.innerText;
             calcPrice()
         }
     }
 });


// Корзина
 const shoppingCartContainer = document.querySelector('.shopping-cart__container')
 const productTemplateElement = document.querySelector('#product-template')
 const itemInCart = document.querySelector('.counter')
 const searchInputElement = document.querySelector('#search-input')

const data = getData()
 function checkItemsInCart () {
     itemInCart.textContent = data.length
 }
 checkItemsInCart()
checkEmptyCart() // не работает


 // добавление в корзину
 window.addEventListener('click', (e) => {
     if (e.target.hasAttribute("data-cart")) {
         const card = e.target.closest(".products__cart");
         const productInfo = {
             id: card.dataset.id,
             imgSrc: card.querySelector(".product-img").getAttribute("src"),
             title: card.querySelector(".cart-title").innerText,
             price: card.querySelector(".price").innerText,
             element: card,
         }
         data.push(productInfo)
         checkItemsInCart()
         const itemInCart = shoppingCartContainer.querySelector(`[data-id="${productInfo.id}"]`);

         if (itemInCart) {
             const counterElement = itemInCart.querySelector("[data-counter]");
             counterElement.innerText = parseInt(counterElement.innerText) + 1
             calcPrice()
         } else {
             render(data)
         }
         calcPrice()
         checkEmptyCart()

     }
 })
 // удаление из корзины
 shoppingCart.addEventListener('click', (e) => {
     if (e.target.dataset.action === 'remove') {
         const parent = e.target.closest('.shopping-cart__item')
         const id = parent.dataset.id
         const index = data.indexOf(product => product.id === id)
         data.splice(index, 1)
         parent.remove()
         render(data)
         checkItemsInCart()
         calcPrice()
         checkEmptyCart()
     }
 })

 // Поиск
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
         totalElem.textContent = `Итого: 0 р`
     }

     cartItems.forEach(item => {
         const amountEl = item.querySelector('[data-counter]').innerText
         const priceEl = item.querySelector('.shopping-cart__price').innerText
         const currentPrice = parseInt(amountEl) * parseInt(priceEl)
         totalPrice += currentPrice
         totalElem.textContent = `Итого: ${totalPrice} р`
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


 // мадалка с деталями товара (картинка)
 const detailsModal = document.querySelector('.modal-details')


window.addEventListener('click', e => {
    if (e.target.dataset.action === 'preview') {
        detailsModal.classList.toggle('hidden')
        const parentNode = e.target.closest('.products__cart')
        const image = parentNode.querySelector('.product-img').getAttribute("src")
        detailsModal.innerHTML = `
        <div class="modal-details__content">
             <img class="modal-details__image" src="${image}" alt="image">
        </div>
        
        `
    }
})
 detailsModal.addEventListener('click', () => {
     detailsModal.classList.add('hidden')
 })

