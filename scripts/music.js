fetch("http://localhost:8083/music/read")
  .then((response) => response.json())
  .then((json) => {
    let musics = json;

    musics.forEach((music) => {
      let name = music.songName;
      let artist = music.artistName;
      let id = music.id;

      fetch(`http://localhost:8083/music/song/${name}`)
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

          fetch(`http://localhost:8083/music/image/${name}`)
            .then((response) => response.arrayBuffer())
            .then((arrayBuffer) => {
              var blob = new Blob([arrayBuffer], { type: "image/jpg" });
              var imageUrl = URL.createObjectURL(blob);

              var image = new Image();
              image.src = imageUrl;
              image.width = "50";
              trackContainer.appendChild(image);
            });

          let likeButton = document.createElement("button");
          likeButton.textContent = "Лайк";
          likeButton.addEventListener("click", function () {
            fetch(`http://localhost:8083/secured/music/${id}/like`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            });
          });

          trackContainer.appendChild(likeButton);

          document.body.appendChild(trackContainer);
        });
    });
  });
