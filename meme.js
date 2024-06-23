document.addEventListener("DOMContentLoaded", function () {
  const memeForm = document.getElementById("memeForm");
  const memeContainer = document.getElementById("memeContainer");

  memeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const topText = document.getElementById("topText").value.trim();
    const bottomText = document.getElementById("bottomText").value.trim();
    const imageUrl = document.getElementById("imageUrl").value.trim();

    if (!topText || !bottomText || !imageUrl) {
      alert("Please fill in all fields.");
      return;
    }

    const memeDiv = document.createElement("div");
    memeDiv.classList.add("meme");

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const memeImg = new Image();

    memeImg.onload = function () {
      // Set canvas size to match image size
      canvas.width = memeImg.width;
      canvas.height = memeImg.height;

      ctx.drawImage(memeImg, 0, 0, canvas.width, canvas.height);

      // Add text on top
      ctx.fillStyle = "white";
      ctx.font = "bold 30px Arial";
      ctx.textAlign = "center";
      ctx.fillText(topText, canvas.width / 2, 40);
      ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);

      memeDiv.appendChild(canvas);
      memeContainer.appendChild(memeDiv);

      // delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "❌";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", function () {
        memeDiv.remove();
      });
      memeDiv.appendChild(deleteBtn);

      memeForm.reset();
    };

    memeImg.onerror = function () {
      alert("Error loading image. Please check the URL and try again.");
    };

    memeImg.src = imageUrl;
  });
});
