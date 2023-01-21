var currentBook = document.getElementById("current-output");
var slider = $(".trending-books");


fetch('https://www.googleapis.com/books/v1/volumes/iD1tDwAAQBAJ?key=AIzaSyDtku5s3RtmzBcw0MHNqTMrD1KUmsF7mEA')
	.then (res => {
		return res.json();
	})
	.then (data => {
		//console.log(data);
		currentBook.innerHTML += formatCurrent(data);

	})
    .catch (err => {
        alert('Error:', err.message)
    })

function formatCurrent(data) {
    currentCard = `<div class="row align-items-center py-5">
                        <div class="col-lg-4 text-center mb-2">
                            <a href="${data.volumeInfo.previewLink}" target="_blank"><img src="${data.volumeInfo.imageLinks.medium}" alt="Current Read Cover" class="img-fluid shadow shadow-lg"></a>
                        </div>
                        <div class="col-lg-8">
                            <h2 class="display-4 month-title">Book of the month</h2>
                            <hr id="title-line">
                            <h3>${data.volumeInfo.title}</h3>
                            <p class="fw-bold">By: ${data.volumeInfo.authors}</p>
                            <p>${data.volumeInfo.description}</p>
                            <p><span class="fw-bold">Average Rating:</span> ${data.volumeInfo.averageRating}</p>
                            <button type="button" href="${data.volumeInfo.previewLink}" class="btn btn-outline-dark">Get More Info</button>
                        </div>
                    </div>`;     
    return currentCard;
}