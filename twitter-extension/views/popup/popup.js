const makeRequest = (message) => {
  const body = fetch("https://bistek-extensions.herokuapp.com/twitter/", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      message,
    }),
  });

  return body;
};

function createTweet() {
  const tweetContent = document.getElementById("tweetContent")
  const message = tweetContent.value;
  
  const container = document.getElementById("container");
  container.style.minHeight = "200px";

  const infoMessage = document.getElementById("infoMessage");
  infoMessage.innerText = '';
  
  var noEmptyStringRegex = /^(?!\s*$).+/;
  var match = noEmptyStringRegex.test(message);

  if (match) {
    makeRequest(message).then((res) => {
      console.log(res)
      if(res.ok){
        uploadAnimation('succes-animate')
        infoMessage.innerText = 'The Tweet was created successfully';
        infoMessage.style.display = 'block';
        tweetContent.innerText = '';
      }else{
        uploadAnimation('falied-animate')
        infoMessage.innerText = 'An error occurred while trying to create the Tweet';
        infoMessage.style.display = 'block';
      }
    }).catch((err) => {
      uploadAnimation('falied-animate')
      infoMessage.innerText = 'An error occurred while trying to create the Tweet';
      infoMessage.style.display = 'block';
      console.log("ERROR: ", err)
    })
  }else{
    uploadAnimation('falied-animate')
    infoMessage.innerText = 'Enter a valid message';
    infoMessage.style.display = 'block';
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("sendTweetBtn");

  btn.addEventListener("click", () => createTweet());
});
