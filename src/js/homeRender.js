import {fetchTopBooks, fetchSelectedCategory, fetchBookDetails} from "./fetchAPI";
import iziToast from "izitoast";
export
const categoriesList = document.querySelector(".home-categories-list");
let booksList;
export function loadHomeBooks() {window.addEventListener("load", () =>{
    fetchTopBooks()
    .then((categories) =>{
        if(Object.keys(categories.data.lenght !== 0 )){
            categoriesList.innerHTML = "";
            renderHomeCategories(categories.data);

        }
        else {
            categoriesList.innerHTML = "";
            return iziToast.error({
                message: "Sorry, there are no books to render",
                position: `topRight`,
            });
        }
    })
    .catch((error) =>{
        console.log(error)
        return iziToast.error({
            message: error.message,
            position: `topRight`,
        });
    })
});}
function renderHomeCategories(categories){
    console.log(categories);
    const markupCategories = categories
    .map((category) =>{
        return `
        <li class="home-categories-item">
        <h3 class="home-category-title">${category.list_name}</h3>
        <ul class="home-books-list">${renderHomeBooks(category.books)}</ul>
        <button class="button see-more" data-js="${category.list_name}">See more</button>
        </li>`
    })
    .join("");
    categoriesList.insertAdjacentHTML("beforeend", markupCategories);

}
function renderHomeBooks(books){
    console.log(books)
    return books.map((book) => {
        return `
        <li class="home-books-item" id="${book._id}">
            <div class="home-book-wrapper">
                <img class="book-image" src="${book.book_image}" alt="${book.title}">
            </div>
            <div class="image-overlay"><p class="image-overlay-text">QUICK VIEW</p></div>
            <div class="book-info">
                <p class="book-info-title">${book.title}</p>
                <p class="book-info-author">${book.author}</p>
            </div>
        </li>`
    })
    .join("");
}




