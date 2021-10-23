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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function uploadAnimation(animation){
  document.body.classList.add(animation)
  await sleep(1000)
  document.body.classList.remove(animation)
}

function createTweet() {
  const tweetContent = document.getElementById("tweetContent")
  const message = tweetContent.value;
  
  var noEmptyStringRegex = /^(?!\s*$).+/;
  var match = noEmptyStringRegex.test(message);

  if (match) {
    makeRequest(message).then((res) => {
      console.log(res)
      if(res.ok){
        uploadAnimation('succes-animate')
        tweetContent.value = '';
      }else{
        uploadAnimation('falied-animate')
      }
    }).catch((err) => {
      uploadAnimation('falied-animate')
      console.log("ERROR: ", err)
    })
  }else{
    uploadAnimation('falied-animate')
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("sendTweetBtn");

  btn.addEventListener("click", () => createTweet());
});
