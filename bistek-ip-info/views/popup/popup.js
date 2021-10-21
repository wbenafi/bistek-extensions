document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("add-btn");

  btn.addEventListener("click", function () {
    var ipRegex =
      /^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(?<!172\.(16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31))(?<!127)(?<!^10)(?<!^0)\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(?<!192\.168)(?<!172\.(16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31))\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

    var domainRegex =
      /^((?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z])$/;

    var ip = document.getElementById("ip-address").value;

    var match1 = ipRegex.test(ip);
    var match2 = domainRegex.test(ip);

    var msg = document.getElementById("error-msg");
    if (match1) {
      msg.style.display = "none";
    } else if (match2) {
      msg.style.display = "none";
    } else {
      msg.style.display = "block";
    }
  });
});
