const elList = document.querySelector(".list")
const elSaved = document.querySelector(".saved")
const overlay = document.querySelector(".modal")
const modal = document.querySelector(".modal-info")


// const localTodos = JSON.parse(window.localStorage.getItem("list"));
// const saved = localTodos || [];

// renderSaved(saved, elList);

const saved = []

function renderSaved(arr, element) {
    element.innerHTML = ""

    arr.forEach(e => {
        const newItem = document.createElement("li")
        const newDeleteBtn = document.createElement("button")

        newItem.textContent = e.title;
        newDeleteBtn.textContent = "Delete"

        newDeleteBtn.setAttribute("class", "delete-bookmark-btn")
        newDeleteBtn.type = "button"
        newDeleteBtn.dataset.filmId = e.id

        newItem.appendChild(newDeleteBtn)

        element.appendChild(newItem)
    })
}

function renderMoreInfo(arrForModal) {
    arrForModal.innerHTML = ""

    const modalTitle = document.createElement("h1")
    const modalText = document.createElement("p")

    modalTitle.textContent = "nomi"

    modalText.textContent = "tarifi"

    arrForModal.appendChild(modalTitle)
    arrForModal.appendChild(modalText)

}

elSaved.addEventListener("click", evt => {
    const beClick = evt.target.matches(".delete-bookmark-btn")

    const deleteBtnId = evt.target.dataset.filmId

    const findBookmarkFilmId = saved.findIndex(e => e.id == deleteBtnId)

    if (beClick) {
        saved.splice(findBookmarkFilmId, 1)

        renderSaved(saved, elSaved)
        // window.localStorage.setItem("list", JSON.stringify(saved))
    }

})

for (const film of films) {
    const newItem = document.createElement("li")
    const newImg = document.createElement("img")
    const newHeading = document.createElement("h3")
    const footer = document.createElement("div")
    const newMoreBtn = document.createElement("button")
    const newBookmarkBtn = document.createElement("button")

    newItem.setAttribute("class", "list__item");

    newImg.setAttribute("src", film.poster);
    newImg.setAttribute("class", "list__img")

    newHeading.textContent = film.title

    footer.setAttribute("class", "footer")

    newMoreBtn.classList.add("more-btn")
    newMoreBtn.textContent = "More"
    newMoreBtn.dataset.filmId = film.id

    newBookmarkBtn.classList.add("bookmark-btn")
    newBookmarkBtn.textContent = "Bookmark"
    newBookmarkBtn.dataset.filmId = film.id

    footer.appendChild(newMoreBtn)
    footer.appendChild(newBookmarkBtn)

    newItem.appendChild(newImg)
    newItem.appendChild(newHeading)
    newItem.appendChild(footer)

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
            // window.localStorage.setItem("list", JSON.stringify(saved))
        }
    }

    if (moreBtn) {
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

