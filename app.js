// Fetch and Display Content
fetch('data/content.json')
  .then(response => response.json())
  .then(data => {
    displayContent(data.movies, 'movie-list');
    displayContent(data.webSeries, 'web-series-list');
  });

// Display Content
function displayContent(items, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = items.map(item => `
    <div onclick="playVideo('${item.video}')">
      <img src="${item.thumbnail}" alt="${item.title}">
      <p>${item.title}</p>
    </div>
  `).join('');
}

// Play Video
function playVideo(videoUrl) {
  const videoModal = document.createElement("div");
  videoModal.style.position = "fixed";
  videoModal.style.top = "0";
  videoModal.style.left = "0";
  videoModal.style.width = "100%";
  videoModal.style.height = "100%";
  videoModal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  videoModal.style.display = "flex";
  videoModal.style.justifyContent = "center";
  videoModal.style.alignItems = "center";
  videoModal.style.zIndex = "1000";

  const iframe = document.createElement("iframe");
  iframe.src = videoUrl;
  iframe.style.width = "80%";
  iframe.style.height = "80%";
  iframe.style.border = "none";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.backgroundColor = "red";
  closeButton.style.color = "white";
  closeButton.style.border = "none";
  closeButton.style.padding = "10px";
  closeButton.style.cursor = "pointer";
  closeButton.style.borderRadius = "5px";

  closeButton.addEventListener("click", () => {
    document.body.removeChild(videoModal);
  });

  videoModal.appendChild(iframe);
  videoModal.appendChild(closeButton);
  document.body.appendChild(videoModal);
}


// Close the video modal
function closeVideo() {
  const videoModal = document.getElementById("videoModal");
  const videoPlayer = document.getElementById("videoPlayer");

  // Stop the video
  videoPlayer.src = "";
  videoModal.style.display = "none";
}

// Search Functionality
document.getElementById('search-button').addEventListener('click', () => {
  const searchBar = document.getElementById('search');
  searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('search').addEventListener('input', function (e) {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll('.content-container div').forEach(div => {
    div.style.display = div.innerText.toLowerCase().includes(query) ? '' : 'none';
  });
});