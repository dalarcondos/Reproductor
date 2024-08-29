const mainVideo = document.querySelector('#main-Video');
const playlist = document.getElementById('playlist');
const AllLessons = document.querySelector('.AllLessons');
const videoTitle = document.querySelector('.title');

const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');

// Configuración inicial
let musicIndex = 1;
window.addEventListener('load', () => {
    loadMusic(musicIndex);
    playingNow();
});

// Carga y reproduce el video actual
function playMusic() {
    mainVideo.play();
    playlist.classList.add('active');
}

// Carga un video en base al índice
function loadMusic(indexNumb) {
    mainVideo.src = `media/${allVideos[indexNumb - 1].src}.mp4`;
    videoTitle.innerHTML = `${indexNumb}. ${allVideos[indexNumb - 1].name}`;
}

// Añade la lista de videos a la playlist
for (let i = 0; i < allVideos.length; i++) {
    let liTag = `
        <li li-index="${i + 1}">
            <div class="row">
                <span>${i + 1}. ${allVideos[i].name}</span>
            </div>
            <video class="${allVideos[i].id}" src="media/${allVideos[i].src}.mp4" style="display: none;" title="${allVideos[i].name}"></video>
            <span id="${allVideos[i].id}" class="duration"></span>
        </li>`;
    playlist.insertAdjacentHTML('beforeend', liTag);

    let liVideoDuration = playlist.querySelector(`#${allVideos[i].id}`);
    let liVideoTag = playlist.querySelector(`.${allVideos[i].id}`);

    liVideoTag.addEventListener("loadeddata", () => {
        let videoDuration = liVideoTag.duration;
        let totalMin = Math.floor(videoDuration / 60);
        let totalSec = Math.floor(videoDuration % 60);
        totalSec < 10 ? totalSec = "0" + totalSec : totalSec;
        liVideoDuration.innerText = `${totalMin}:${totalSec}`;
        liVideoDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    });
}

// Reproduce el video seleccionado en la lista
const allLiTags = playlist.querySelectorAll('li');
function playingNow() {
    for (let j = 0; j < allVideos.length; j++) {
        if (allLiTags[j].classList.contains('playing')) {
            allLiTags[j].classList.remove("playing");
        }
        if (allLiTags[j].getAttribute('li-index') == musicIndex) {
            allLiTags[j].classList.add('playing');
        }
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getIndex = element.getAttribute("li-index");
    musicIndex = getIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

//  //  // Funcionalidad de los botones de control

    const playIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>'
    const pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"/></svg>'
  
    playPauseBtn.addEventListener('click', () => {
        if (mainVideo.paused) {
            mainVideo.play();
            playPauseBtn.innerHTML = pauseIcon; // Usa el SVG de pausa
        } else {
            mainVideo.pause();
            playPauseBtn.innerHTML = playIcon; // Usa el SVG de reproducción
        }
    });
    
//     playPauseBtn.addEventListener('click', () => {
//       if (mainVideo.paused) {
//           mainVideo.play();
//           playPauseBtn.textContent = 'Pausa';
//       } else {
//           mainVideo.pause();
//           playPauseBtn.textContent = 'Reproducir';
//       }
//   });

prevBtn.addEventListener('click', () => {
    musicIndex = musicIndex > 1 ? musicIndex - 1 : allVideos.length;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
});

nextBtn.addEventListener('click', () => {
    musicIndex = musicIndex < allVideos.length ? musicIndex + 1 : 1;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
});

shuffleBtn.addEventListener('click', () => {
    musicIndex = Math.floor(Math.random() * allVideos.length) + 1;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
});

// Búsqueda en la lista de videos
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();
    for (const li of playlist.children) {
        const span = li.querySelector("span");
        const spanText = span.textContent;
        const spanTextLower = spanText.toLowerCase();
        const startIndex = spanTextLower.indexOf(searchValue);
        if (startIndex === -1) {
            li.style.display = "none";
        } else {
            li.style.display = "";
            span.innerHTML =
                spanText.slice(0, startIndex) +
                "<mark>" +
                spanText.slice(startIndex, startIndex + searchValue.length) +
                "</mark>" +
                spanText.slice(startIndex + searchValue.length);
        }
    }
});
