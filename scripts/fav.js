fetch("https://serverjavacourse.onrender.com/secured/liked-music", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})
  .then((response) => response.json())
  .then((json) => {
    let musics = json;

    musics.forEach((music) => {
      let name = music.songName;
      let artist = music.artistName;
      let id = music.id;

      fetch(`https://serverjavacourse.onrender.com/music/song/${name}`)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          var blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
          var audioUrl = URL.createObjectURL(blob);

          var trackContainer = document.createElement("div");
          trackContainer.classList.add("track-container");

          var trackInfo = document.createElement("div");
          trackInfo.textContent = `Трек: ${name}, Автор: ${artist}`;
          trackContainer.appendChild(trackInfo);

          var audio = new Audio(audioUrl);
          audio.controls = true;
          trackContainer.appendChild(audio);

          fetch(`https://serverjavacourse.onrender.com/music/image/${name}`)
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => {
              var blob = new Blob([arrayBuffer], { type: "image/jpg" });
              var imageUrl = URL.createObjectURL(blob);

              var image = new Image();
              image.src = imageUrl;
              image.width = "50";
              trackContainer.appendChild(image);
            });
          console.log(id);
          let likeButton = document.createElement("button");
          likeButton.textContent = "Удалить";
          likeButton.addEventListener("click", function () {
            fetch(
              `https://serverjavacourse.onrender.com/secured/music/${id}/like`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            ).then(() => {
              location.reload();
            });
          });

          trackContainer.appendChild(likeButton);

          document.body.appendChild(trackContainer);
        });
    });
  });
