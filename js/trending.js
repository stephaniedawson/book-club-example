var trendingBook = document.getElementById("trending-output");
var items;
var count = 0;

fetch("https://www.googleapis.com/books/v1/users/110563385573990342210/bookshelves/1001/volumes?&maxResults=15&key=AIzaSyDtku5s3RtmzBcw0MHNqTMrD1KUmsF7mEA")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        //console.log(data);
        displayTrending(data);
        $(".trending-books").slick({
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

function displayTrending(data) {
    for (var i = 0; i < data.items.length; i++) {
        books = data.items[i];
        count++;

        trendingBook.innerHTML += formatTrending();
    }
    //console.log(books);
}

function formatTrending() {
    trendingCard = `<div class="col-lg p-0 mb-3 text-center">
                        <div class="p-3 bg-white border border-1 rounded-3 shadow mx-3">
                            <p class="mb-1 trending-count">#${count}</p>
                            <hr id="title-line">
                            <a href="${books.volumeInfo.previewLink}" target="_blank" class="stretched-link"><img src="${books.volumeInfo.imageLinks.thumbnail}" alt="${books.volumeInfo.title}" class="mb-3 mx-auto"></a>
                            <h3 class="trending-title fs-5 mb-1">${books.volumeInfo.title}</h3>
                            <p class="trending-text mb-1">By: ${books.volumeInfo.authors}</p>
                            <p class="trending-text mb-1">Average Rating: ${books.volumeInfo.averageRating}</p>
                        </div>
                    </div>`;
    //$('.trending-books').slick(slickSettings);
    return trendingCard;
}
