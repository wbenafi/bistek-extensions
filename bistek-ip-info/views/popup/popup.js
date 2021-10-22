function GetInfo(ip) {
  const body = fetch(`http://ipwhois.app/json/${ip}`).then((res) => res.json());
  return body;
}

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("add-btn");

  btn.addEventListener("click", async function () {
    var ipRegex =
      /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(?<!172\.(16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31))(?<!127)(?<!^10)(?<!^0)\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(?<!192\.168)(?<!172\.(16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31))\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

    var domainRegex =
      /^((?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z])$/;

    var ip = document.getElementById("ip-address").value;

    var match1 = ipRegex.test(ip);
    var match2 = domainRegex.test(ip);

    var msg = document.getElementById("error-msg");
    const hr = document.getElementById("divider");
    const infoContent = document.getElementById("ipInfoContainer");
    infoContent.innerHTML = "";

    if (match1 || match2) {
      msg.style.display = "none";
      hr.style.display = "block";
      infoContent.style.display = "block";

      GetInfo(ip).then((res) => {
        const ipInfo = res;

        Object.keys(ipInfo).forEach((key) => {
          if (key == "country_flag") {
            const info = document.createElement("div");
            info.className = "info";

            const image = document.createElement("img");
            image.src = ipInfo[key];
            image.style.width = "3em";
            image.style.height = "3em";
            image.style.objectFit = "contain";
            image.style.margin = "0 1em";

            info.innerHTML = `<p>${key.replaceAll("_", " ")}:</p>`;
            info.appendChild(image)
            infoContent.append(info);
          } else {
            const info = document.createElement("div");
            info.className = "info";
            info.innerHTML = `<p>${key.replaceAll("_", " ")}:</p>  
                              <p class="right-info">${ipInfo[key]}</p>`;

            infoContent.append(info);
          }
        });
      });
    } else {
      hr.style.display = "none";
      infoContent.style.display = "none";
      msg.style.display = "block";
    }
  });
});
