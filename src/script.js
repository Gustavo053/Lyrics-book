function searchLyrics(artist, title) {
    return fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
}

const form = document.querySelector('#form');
form.addEventListener('submit', event => {
    event.preventDefault();
    doSubmit();
});

async function doSubmit() {
    const artist = document.querySelector('#artist');
    const song = document.querySelector('#song');
    let result = document.querySelector('#result');
    result.innerHTML = '<div class="spinner-grow text-primary" role="status"> <span class="sr-only">Loading...</span> </div>';

    try {
        const response = await searchLyrics(artist.value, song.value);
        const data = await response.json();

        if (data.lyrics) {
            result.innerHTML = '<div class="line"></div>' + data.lyrics + '<div class="line"></div>';
        } else {
            result.innerHTML = data.error;
        }

    } catch(err) {
        console.log(err);
    }
}