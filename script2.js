// Displaying Playlists
document.addEventListener("DOMContentLoaded", () =>{
    const data = playlistsData;

    //random playlist select
    function randomPlaylist() {
        const randIndex = Math.floor(Math.random() * data.playlists.length);

        return data.playlists[randIndex];
    }
    
    //get the playlist from the data 
    const playlistContainer = document.getElementById('feature-modal-bottom');


    function loadPlaylist(playlist) {

        document.getElementById('feautured-playlist-img').src = playlist.playlist_art;
        document.getElementById('featured-playlist-name').textContent = playlist.playlist_name;
        document.getElementById('featured-creator').textContent = `Creator: ${playlist.playlist_creator}`;
        // document.getElementById()

        playlistContainer.innerHTML = '';

        playlist.songs.forEach(song => {
            const songItem = document.createElement("div");
                
            songItem.innerHTML = '';

                songItem.innerHTML = `
                    <div id="feature-modal-song-card" class="featureModalSongCard">
                            <div class="modal-img-div">
                                <img id="modalSongImg" src="${song.cover_art}" alt="Song Image">
                            </div>

                            <div class="song-dets">
                                <h4 id="song-title" style="color: #fff;">${song.title}</h4>
                                <p id="song-artist-name" style="color: #fff;">${song.artist}</p>
                                <p style="color: #fff;">${song.album}</p>
                            </div>

                            <div id ="song-duration" class="duration" style="color: #fff;">
                                <p>${song.duration}</p>
                            </div>
                            
                    </div>
                `;

            playlistContainer.appendChild(songItem);

        });
    }

    const randPlaylist = randomPlaylist();
    console.log(randPlaylist);
    loadPlaylist(randPlaylist);
});

