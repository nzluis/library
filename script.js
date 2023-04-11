let myLibrary = []

if (get() !== null) myLibrary = get()

let titleBook = document.getElementById('title')
let authorBook = document.getElementById('author')
let pagesBook = document.getElementById('pages')
let readBook = document.getElementById('read')
const addBookBtn = document.querySelector('.add')
const cardsContainer = document.querySelector('.cards')
let card = document.querySelectorAll('.card')

function toggle() {
    let blur = document.getElementById('gridContainer')
    blur.classList.toggle('active')
    const popup = document.querySelector('.popup')
    popup.classList.toggle('active')
}

function save() {
    localStorage.setItem('my', JSON.stringify(myLibrary))
}

function get() {
    return JSON.parse(localStorage.getItem('my'))
}

function Book(title, author, pages, readCheck) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readCheck = readCheck
}

const theHobbit = new Book ('Book1', 'Tolkien', '350', false)
const daVinci = new Book ('Book 2', 'Dan Brown', '290', true)
const book4 = new Book ('Book3', 'Author 3', '100', true)


myLibrary.push(theHobbit)
myLibrary.push(daVinci)
myLibrary.push(book4)
if(get() === null) save()
showLibrary()





addBookBtn.addEventListener('click', (event) => {
    event.preventDefault()
    if (!(titleBook.value) || !(authorBook.value) || !(pagesBook.value)) {alert('Please fill empty fields'); return}
    
    card = document.querySelectorAll('.card')
    
    const book = new Book (titleBook.value, authorBook.value, pagesBook.value, readBook.checked)
    addBookToLibrary(book)
    clearInput()
    showLibrary()
})

function clearInput() {
    titleBook.value = ''
    authorBook.value = ''
    pagesBook.value = ''
    readBook.checked = false
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    save()
}

function showLibrary() {
    (function clearLibrary() {card.forEach((element) => {element.remove()})}())
    let output = ''
    if (myLibrary != get() && get() != null ) myLibrary = get()
    if (myLibrary.length !== 0){
        myLibrary.forEach((book, index) => {
        if (book.readCheck === true) {
            output = 'Read'
        } else {output = 'Not Read Yet'}
        let bookDiv = `
                <div class="card" =>
                    
                        <div>Title: ${book.title}</div>
                        <div>Author: ${book.author}</div>
                        <div>Nº of pages: ${book.pages}</div>
                        <div class='choices'>
                            <div class='readStatus'>${output}</div>
                            <div class='delete'>Delete</div>
                        </div>
                </div>
        `;
        cardsContainer.insertAdjacentHTML("afterbegin", bookDiv)
        card = document.querySelector('.card')
        card.dataset.index = index
        
        })
    }

    const readChange = document.querySelectorAll('.readStatus')

    readChange.forEach(book => {
        book.addEventListener('click', (e) => {
            let libraryIndex = e.target.parentElement.parentElement.dataset.index;
            myLibrary[libraryIndex].readCheck === true ? myLibrary[libraryIndex].readCheck = false : myLibrary[libraryIndex].readCheck = true;
            console.log(myLibrary[libraryIndex].readCheck)
            card = document.querySelectorAll('.card')
            save()
            showLibrary();
        })
    })
    
    const remove = document.querySelectorAll('.delete')

    remove.forEach((book) => {
        book.addEventListener('click', (e) => {
            let button = e.target;
            let libraryIndex = button.parentElement.parentElement.dataset.index;
            
            myLibrary.splice(libraryIndex, 1);
            card = document.querySelectorAll('.card')
            save()
            showLibrary();
            
        })
    })
}

// const testing = 
// [
//     {
//         title: "Book1",
//         author: "author1",
//         pages: "pages1",
//         readCheck: true
//     }, 
//     {
//         title: "Book2",
//         author: "author2",
//         pages: "pages2",
//         readCheck: true
//     }, {
//         title: "Book2",
//         author: "author2",
//         pages: "pages2",
//         readCheck: true
//     }
// ]

// localStorage.setItem('myList', JSON.stringify(testing))
// console.log(localStorage.getItem('myList'))
// const testing1 = localStorage.getItem('myList')
// console.log(JSON.parse(testing1)[0])