document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var formData = new FormData(this);
  var jsonData = {};

  formData.forEach(function (value, key) {
    jsonData[key] = value;
  });

  fetch("https://serverjavacourse.onrender.com/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => response.text())
    .then((text) => {
      alert(text);
      window.location.href = "../clientJavaCourse/index.html";
    });
});
