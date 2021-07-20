const smallVideos = document.querySelectorAll('.picture');
const mainVideo = document.querySelector('.video');

function selectVideo(e) {
  let link = e.target.previousElementSibling.src;
  e.target.previousElementSibling.src = mainVideo.firstElementChild.src;
  mainVideo.firstElementChild.src = link;
}

smallVideos.forEach(video => video.addEventListener('click', selectVideo));