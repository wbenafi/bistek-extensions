actual_url = window.location.href

chrome.storage.local.get("urls", ({ urls }) => {
    console.log(urls)
    for (const url of urls){
        if(actual_url.indexOf(url)!=-1){
            document.write('<img style="display: block"src="https://thumbs.dreamstime.com/b/sello-de-goma-contento-bloqueado-81736923.jpg">')
            window.stop()
            break
        }
    }
})