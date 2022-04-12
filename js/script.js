const elList = document.querySelector(".list")
const elSaved = document.querySelector(".saved")
const overlay = document.querySelector(".modal")
const modal = document.querySelector(".modal-info")

const saved = []

function renderSaved(arr, element) {

    element.innerHTML = ""

    arr.forEach(e => {

        const newItem = document.createElement("li")
        const newDeleteBtn = document.createElement("button")

        newItem.textContent = e.title;
        newDeleteBtn.textContent = "Delete"

        newDeleteBtn.classList.add("delete-bookmark-btn")
        newDeleteBtn.type = "button"
        newDeleteBtn.dataset.filmId = e.id

        newItem.appendChild(newDeleteBtn)

        element.appendChild(newItem)
    })
}

function renderMoreInfo(arrForModal) {
    arrForModal.innerHTML = ""


    // const modalImg = document.createElement("img")
    const modalTitle = document.createElement("h1")
    const modalText = document.createElement("p")

    // modalImg.setAttribute("src", film.poster)

    modalTitle.textContent = "nomi"

    modalText.textContent = "tarifi"

    arrForModal.appendChild(modalTitle)
    // arrForModal.appendChild(modalImg)
    arrForModal.appendChild(modalText)

}

elSaved.addEventListener("click", evt => {
    const deleteBtnId = evt.target.matches(".delete-bookmark-btn")

    const findBookmarkFilmId = saved.findIndex(e => e.id == deleteBtnId)

    saved.splice(findBookmarkFilmId, 1)

    renderSaved(saved, elSaved)
})

for (const film of films) {
    const newItem = document.createElement("li")
    const newImg = document.createElement("img")
    const newHeading = document.createElement("h3")
    const newBookmarkBtn = document.createElement("button")
    const newMoreBtn = document.createElement("button")

    newItem.setAttribute("class", "list__item");

    newImg.setAttribute("src", film.poster);
    newImg.setAttribute("class", "list__img")

    newHeading.textContent = film.title

    newMoreBtn.classList.add("more-btn")
    newMoreBtn.textContent = "More"
    newMoreBtn.dataset.filmId = film.id

    newBookmarkBtn.classList.add("bookmark-btn")
    newBookmarkBtn.textContent = "Bookmark"
    newBookmarkBtn.dataset.filmId = film.id

    newItem.appendChild(newImg)
    newItem.appendChild(newHeading)
    newItem.appendChild(newMoreBtn)
    newItem.appendChild(newBookmarkBtn)

    elList.appendChild(newItem)
}

elList.addEventListener("click", evt => {
    const bookmarkBtn = evt.target.matches(".bookmark-btn");
    const moreBtn = evt.target.matches(".more-btn")

    if (bookmarkBtn) {

        const filmId = evt.target.dataset.filmId;
        const findFilm = films.find(e => e.id == filmId)

        if (!saved.includes(findFilm)) {
            saved.push(findFilm)
            renderSaved(saved, elSaved)
        }
    }

    if (moreBtn) {

        // const filmId = evt.target.dataset.filmId;
        // const findFilm = films.find(e => e.id == filmId)

        overlay.classList.remove("hidden")
        modal.classList.remove("hidden")
        document.addEventListener("keydown", e => {
            if (e.key === 'Escape') {
                if (!overlay.classList.contains('hidden')) {
                    overlay.classList.add("hidden")
                    modal.classList.add("hidden")
                }
            }
        })

        renderMoreInfo(modal)
    }
})

overlay.addEventListener("click", () => {
    if (!overlay.classList.contains('hidden')) {
        overlay.classList.add("hidden")
        modal.classList.add("hidden")
    }
})

