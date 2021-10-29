fetch("https://ghibliapi.herokuapp.com/films")
    .then(response => {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
      })
      .catch(function (err) {
        console.log(err);
    });
    
function appendData(data) {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
        var a = document.createElement("a");
        var img = document.createElement("img");
        a.className = "movie-card"
        a.innerHTML = data[i].title;
        img.src = data[i].image;
        a.target = "_blank"
        a.href = "https://www.google.com/search?q="+data[i].title.toLowerCase().replaceAll(" ", "+");
        a.appendChild(img);
        mainContainer.appendChild(a);
    }
}