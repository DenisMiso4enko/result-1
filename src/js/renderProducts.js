const userCardContainer = document.querySelector(".products-wrapper");

getProducts();

async function getProducts() {
  const responce = await fetch("https://fakestoreapi.com/products");
  const productsArray = await responce.json();
  renderProducts(productsArray);
}

function renderProducts(productsArray) {
  productsArray.forEach(({ id, title, price, image }) => {
    const productHTML = `
              <div class="products__card" data-id="${id}">
                    <div class="products__card-img">
                        <img class="product-img" src="${image}" alt="product">
                        <div class="products__card-review">
                            <button data-action="preview" class="btn-preview">Быстрый просмотр</button>
                            <div class="products__card-add">
                                <button data-cart class="btn-add">+</button>
                            </div>
                        </div>
                    </div>

                    <div class="products__card-info">
                        <p class="price">${price.toLocaleString("byn", {
                          style: "currency",
                          currency: "byn",
                        })}</p>
                        <div class="card-title">${title}</div>
                    </div>
                </div>  
        `;
    userCardContainer.insertAdjacentHTML("beforeend", productHTML);
  });
}


