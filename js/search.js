var item;
var outputList = document.getElementById("result-output");
var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
var apiKey = "key=AIzaSyDtku5s3RtmzBcw0MHNqTMrD1KUmsF7mEA";
var maxResult = "&printType=books&projection=full&langRestrict=en&filter=ebooks&maxResults=15&";
var placeHldr = "https://via.placeholder.com/150";
var searchData;

function hideSearch() {
    document.querySelector("#search-result").innerHTML = `<div class="container" style="display: none;">
                    <button type="button" id="closeBtn" class="btn-close float-end mt-4" onclick="hideSearch()"></button>
                    <h2 id="result-title" class="display-6 text-center text-dark">Search Results</h2>
                    <div id="result-output" class="row">
                </div>
            </div>`;
    console.log("clicked");
}

$("#search-form").submit(function (e) {
    e.preventDefault();

    outputList.innerHTML = "";
    searchData = $("#search-box").val();
    if (searchData === "" || searchData === null) {
        displayError();
    } else {
        $.ajax({
            url: bookUrl + searchData + maxResult + apiKey,
            dataType: "json",
            success: function (response) {
                //console.log(response);
                if (response.totalItems === 0) {
                    alert("no result!.. try again");
                } else {
                    $("#result-title").animate({ "padding-top": "50px" }, 2000); //search box animation
                    $("#search-result > .container").css("display", "block");
                    displayResults(response);
                }
            },
            error: function () {
                alert("Something went wrong.." + "Try again!");
            },
        });
    }
    $("#search-box").val("");
});

function displayResults(response) {
    for (var i = 0; i < response.items.length; i++) {
        item = response.items[i];

        outputList.innerHTML += formatOutput();
    }
}

function formatOutput() {
    var htmlCard = `<div class="col-12 col-md-6 col-lg-4">
            <div class="card bg-light text-dark shadow mt-4" style="">
                <a target="_blank" href="${item.volumeInfo.previewLink}" class="text-center"><img src="${item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : placeHldr}" class="card-img my-4" alt="Book Cover" /></a>
                <div class="card-body p-4">
                    <h5 class="card-title mb-2">${item.volumeInfo.title}</h5>
                    <p class="card-text mb-2"><span class="fw-bold">Author:</span> ${item.volumeInfo.authors}</p>
                    <p class="card-text mb-2"><span class="fw-bold">Publisher:</span> ${item.volumeInfo.publisher}</p>
                    <p class="card-text mb-2 synopsis"><span class="fw-bold">Synopsis:</span> ${item.volumeInfo.description}</p>
                    <p class="card-text mb-3"><span class="fw-bold">Page Count:</span> ${item.volumeInfo.pageCount}</p>
                </div>
            </div>
        </div>`;
    outputList = document.getElementById("result-output");
    return htmlCard;
}

function displayError() {
    alert("search term can not be empty!");
}