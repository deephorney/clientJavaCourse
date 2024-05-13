document.addEventListener("DOMContentLoaded", function () {
  let token = localStorage.getItem("token");

  if (!token) {
    let hiddenElementLogout = document.querySelector(".logout");
    let hiddenElementName = document.querySelector(".name");
    let hiddenElementMusic = document.querySelector(".music");
    let hiddenElementFavorite = document.querySelector(".favorite");
    if (hiddenElementLogout) hiddenElementLogout.style.display = "none";
    if (hiddenElementName) hiddenElementName.style.display = "none";
    if (hiddenElementMusic) hiddenElementMusic.style.display = "none";
    if (hiddenElementFavorite) hiddenElementFavorite.style.display = "none";
  } else {
    let hiddenElementLogin = document.querySelector(".login");
    let hiddenElementReg = document.querySelector(".reg");
    if (hiddenElementLogin) hiddenElementLogin.style.display = "none";
    if (hiddenElementReg) hiddenElementReg.style.display = "none";
    let token = localStorage.getItem("token");
    if (token) {
      let headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      fetch("http://localhost:8083/secured/user/name", {
        method: "GET",
        headers: headers,
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          document.querySelector(".name").innerHTML = data;
        });
    }
  }
  document.querySelector(".logout").addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../index.html";
  });
});
