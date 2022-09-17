// мадалка с деталями товара (картинка)
const detailsModal = document.querySelector('.modal-details')

window.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'preview') {
        detailsModal.classList.toggle('hidden')
        const parentNode = e.target.closest('.products__card')
        const id = Number(parentNode.dataset.id)
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => getMoreInfo(data))
            .catch((err) => console.error(err))
    }
})
detailsModal.addEventListener('click', () => {
    detailsModal.classList.add('hidden')
    detailsModal.innerHTML = ''
})


function getMoreInfo({ id, title, category, description, image, price, rating: { rate, count }}) {
    const infoCardElem = `
     <div class="modal-details__content" id="${id}">
        <div class="modal-details__img">
            <img src="${image}" alt="${title}">
        </div>
        <div class="modal-details__info">
            <h3 class="modal-details__title">${title}</h3>
            <div class="modal-details__stock">
                <span>Рэйтинг: ${rate} из 5</span>
                <span>В наличии: ${count} штук</span>
            </div>
            <h3 class="modal-details__price">Цена: ${Math.round(price)} р</h3>
            <p class="modal-details__category">Категория: ${category}</p>
            <div class="modal-details__desc">
            <h3 class="modal-details__desc-title">Описание:</h3>
            <p class="modal-details__desc-text">${description}</p>
            </div>
        </div>
     </div>
     `
    detailsModal.innerHTML = infoCardElem
}

