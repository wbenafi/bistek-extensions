let title = document.getElementById("title")
let help = document.getElementById("help")
let inputFile = document.getElementById("file")
let customFileUpload = document.getElementById("custom-file-upload")

let urls_list = []

inputFile.addEventListener("click", resetButton)
inputFile.addEventListener("change",readFile)
help.addEventListener("mouseenter", showHelp)
help.addEventListener("mouseleave", showTitle)

function resetButton() {
    inputFile.value = null
}

function showHelp() {
    customFileUpload.style.visibility = "hidden";
    title.innerText = "When uploading the file you must separate the domains with a line break."
}

function showTitle() {
    customFileUpload.style.visibility = "visible";
    title.innerText = `Click on "Choose File" to upload a .txt file with domains to be blocked:`
}

function readFile(){
    const file = inputFile.files[0]
    let fileName = file.name.split('.');
    if(fileName[fileName.length -1]=="txt"){
        console.log(file);
        let reader = new FileReader()
        reader.onload = function () {
            urls_list = this.result.split(/\r?\n/)
            chrome.storage.local.set({ urls: urls_list })
        }
        reader.readAsText(file)
        uploadAnimation('succes-animate')
    }else{
        uploadAnimation('falied-animate')
    }
}

async function uploadAnimation(animation){
    document.body.classList.add(animation);
    await sleep(1000)
    document.body.classList.remove(animation);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}