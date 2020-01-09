var WINDOW_CONTENTS = window.location.href.split("/");
var SELECTED_LANGUAGE = "javascript";

function httpGetAsync(targetUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", targetUrl, true); // true for asynchronous
  xmlHttp.send(null);
}
function populateIndexList(selector, packageName) {
  url =
    "https://azuresdkdocs.blob.core.windows.net/$web?restype=container&comp=list&prefix=" +
    SELECTED_LANGUAGE +
    "/" +
    packageName +
    "/versions/";
  console.log(url);
  console.log(selector);
  httpGetAsync(url, function(responseText) {
    var publishedversions = document.createElement("ul");
    if (responseText) {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(responseText, "text/xml");
      nameElements = Array.from(xmlDoc.getElementsByTagName("Name"));
      options = [];
      for (var i in nameElements) {
        options.push(nameElements[i].textContent.split("/")[3]);
      }
      for (var i in options) {
        $(publishedversions).append(
          '<li><a href="' +
            getPackageUrl(SELECTED_LANGUAGE, packageName, options[i]) +
            '" target="_blank">' +
            options[i] +
            "</a></li>"
        );
      }
    } else {
      $(publishedversions).append(
        "<li>No discovered versions present in blob storage.</li>"
      );
    }
    $(selector).after(publishedversions);
  });
}
function getPackageUrl(language, package, version) {
  return (
    "https://azuresdkdocs.blob.core.windows.net/$web/" +
    language +
    "/" +
    package +
    "/" +
    version +
    "/index.html"
  );
}
// Populate Index
$(function() {
  $("h3").each(function() {
    var pkgName = $(this)
      .text()
      .replace("@azure/", "azure-");
    console.log(pkgName);
    populateIndexList($(this), pkgName);
  });
});
