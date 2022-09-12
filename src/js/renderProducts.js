const userCardContainer = document.querySelector('.products-wrapper')

getProducts()

async function getProducts() {
    const responce = await fetch('https://fakestoreapi.com/products')
    const productsArray = await responce.json();
    renderProducts(productsArray)
}

function renderProducts(productsArray) {
    productsArray.forEach(({ id, title, price, image}) => {
        const productHTML = `
              <div class="products__cart" data-id="${id}">
                    <div class="products__cart-img">
                        <img class="product-img" src="${image}" alt="product">
                        <div class="products__cart-review">
                            <button data-action="preview" class="btn-preview">Быстрый просмотр</button>
                            <div class="products__cart-add">
                                <button data-cart class="btn-add">+</button>
                            </div>
                        </div>
                    </div>

                    <div class="products__cart-info">
                        <div class="price-wrapper">
                            <p class="price">${price} р</p>
                        </div>
                        <div class="cart-title">${title}</div>
                    </div>
                </div>  
        `

        userCardContainer.insertAdjacentHTML('beforeend', productHTML)
    })
}