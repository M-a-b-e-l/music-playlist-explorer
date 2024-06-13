// Displaying Playlists
document.addEventListener("DOMContentLoaded", () =>{
    const data = playlistsData;
    
    //get the playlist from the data 

    const playlistContainer = document.getElementById('playlist-container');

    playlistContainer.innerHTML = '';
    
    data.playlists.forEach((playlist) => {
        const tile = createPlaylistTile(playlist)

        playlistContainer.appendChild(tile);
    });

    //function to create a playlist title element 
    function createPlaylistTile(playlist) {
        const tile = document.createElement("div")
        tile.className = "playlist-tile";
        tile.innerHTML = `
        <img src="${playlist.playlist_art}" alt = "cover">
        <h3>${playlist.playlist_name}</h3>
        <p>Creator: ${playlist.playlist_creator}</p>
        <span class = "heart-icon">&#x2665;</span>
        <span class = "like-count">${playlist.likeCount}</span>
        `;

        tile.addEventListener('click', (event) => {
            //Check if the click is not on the heart icon
            if(!event.target.classList.contains(".heart-icon")) {
                openModal(playlist);
            }

        });

        //add a click event listener to the heart icon
        const heartIcon = tile.querySelector(".heart-icon");
            heartIcon.addEventListener("click", (event) => {
                event.stopPropagation();
                const likeCountElement = heartIcon.nextElementSibling;
                let likeCount = parseInt(likeCountElement.textContent);
                
                if (likeCountElement.textContent == 1) { 
                    likeCount--;
                    likeCountElement.textContent = likeCount;
                    heartIcon.classList.remove("liked");
                    return;
                } 

                likeCount++
                heartIcon.classList.add("liked");
                likeCountElement.textContent = likeCount;

                
            });

        

        //Modalllllll
        function openModal(playlist) {
            //populate the modal with the playlist data
            const modal = document.getElementById("playlist-modal");

            document.getElementById('playlist-img').src = playlist.playlist_art;
            document.getElementById('playlist-name').textContent = playlist.playlist_name;
            document.getElementById('modal-creator').textContent = `Creator: ${playlist.playlist_creator}`;

            const songList = document.getElementById("modal-bottom");
            songList.innerHTML = '';
            
            //populate song list in the modal 
            playlist.songs.forEach((song) => {
                const songItem = document.createElement("div");
                
                songItem.innerHTML = `
                    <div id="modal-song-card" class="modalSongCard">
                        <div class="modal-img-div">
                            <img id="modalSongImg" src="${song.cover_art}" alt="Song Image">
                        </div>

                        <div class = "song-dets">
                            <h4 id="song-title">${song.title}</h4>
                            <p id="song-artist-name" style="color:#888">${song.artist}</p>
                            <p style="color:#888">${song.album}</p>
                        </div>

                        <div id ="song-duration" class="duration">
                            <p>${song.duration}</p>
                        </div>
                        
                </div>
                `
                songList.appendChild(songItem);
            });

            modal.style.display = "block";

            //Event listener to close the modal
            document.querySelector(".close").addEventListener("click", () => {
                document.getElementById("playlist-modal").style.display = "none"
                modal.style.animation = "fadeOut 0.3s ease-in-out";
            })
        }

        //Shuffle button 
        document.getElementById('shuffle-button').addEventListener('click', () => {
            //Shuffle songs randomly 
            const songList = document.getElementById("modal-bottom");

            //do random shuffle
            const songs = Array.from(songList.children);
            songs.sort(() => Math.random() -0.5 );
            songList.innerHTML = "";

            //appends shuffled songs 
            songs.forEach((song) => songList.appendChild(song));

        });

        // const search = document.getElementById("search");
        // search.addEventListener('input', (e) => {
        //     const value = e.target.value.toLoverCase();
        //     const filteredPlaylists = data.playlists.filter(playlist.playlist_name.toLoverCase().includes(value));

        //     playlistContainer.innerHTML = "";
        //     createPlaylistTile(data.playlists);
        // })


        return tile;
    }

    
})










