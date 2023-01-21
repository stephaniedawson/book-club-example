const pastBooks = document.getElementById("past-output");
var items;
var month;
const months = ["December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November"];

fetch("https://www.googleapis.com/books/v1/users/110563385573990342210/bookshelves/1002/volumes?&maxResults=12&key=AIzaSyDtku5s3RtmzBcw0MHNqTMrD1KUmsF7mEA")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        //console.log(data);
        displayPastBooks(data);
        $(".past-books").slick({
            dots: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 5,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
            ],
        });
    });

function displayPastBooks(data) {
    for (var i = 0; i < data.items.length; i++) {
        books = data.items[i];
        month = months[i];
        pastBooks.innerHTML += formatPastBooks();
    }
    //console.log(books);
}

function formatPastBooks() {  

    pastCard = `<div class="col p-2 mb-3 text-center">
                        <div class="p-3 bg-white border border-1 rounded-3 shadow mx-3">
                        <p class="mb-1 trending-count">${month}</p>
                        <hr id="title-line">
                        <a href="${books.volumeInfo.previewLink}" target="_blank" class="stretched-link"><img src="${books.volumeInfo.imageLinks.thumbnail}" alt="${books.volumeInfo.title}" class="mb-3 mx-auto"></a>
                        <h3 class="trending-title fs-5 mb-1">${books.volumeInfo.title}</h3>
                        <p class="trending-text mb-1">By: ${books.volumeInfo.authors}</p>
                        <p class="trending-text mb-1">Average Rating: ${books.volumeInfo.averageRating}</p>
                        </div>
                    </div>`;
    return pastCard;
}
