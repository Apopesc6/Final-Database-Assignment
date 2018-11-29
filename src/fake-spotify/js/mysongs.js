var searchedSong;

function searchSong() {
    var songIDArr = [];
    var item = document.getElementById("songSearchbar");

    if (searchedSong != item.value) {

        searchedSong = item.value;

        const URL = "http://localhost:3000/searchSong" + "/" + item.value;
        fetch(URL)
            .then(data => { return data.json() })
            .then(res => {
                console.log(res);
                for (var i = 0; i < res.length; i++) {
                    songIDArr[i] = res[i].songID;
                }
            })

        var artistIDArr = [];

        setTimeout(function () {


            for (var i = 0; i < songIDArr.length; i++) {

                const URL2 = "http://localhost:3000/findArtistID" + "/" + songIDArr[i];
                fetch(URL2)
                    .then(data => { return data.json() })
                    .then(res => {

                        artistIDArr.push(res[0].artistID);

                    })
            }

            setTimeout(function () {
                getArtistName(artistIDArr, item.value, songIDArr);
            }, 500);

        }, 500);

    }

}


function getArtistName(artistIDArr,songName, songIDArr) {
    console.log("Artist Array: ");
    console.log(artistIDArr);

        console.log(artistIDArr.length);
        var artistNameArr = [];

        for (var i = 0; i < artistIDArr.length; i++) {

            const URL3 = "http://localhost:3000/findArtistName" + "/" + artistIDArr[i];
            fetch(URL3)
                .then(data => { return data.json() })
                .then(res => {

                    artistNameArr.push(res[0].name);

                    
                })

        }

        setTimeout(function () {
            var songSection = document.getElementById("searchSongs");
            songSection.innerHTML = '';
            for (var x = 0; x < artistIDArr.length; x = x + 1) {

                var songSection = document.getElementById("searchSongs");
                
                var songSearchHolder = document.createElement('div');
                songSearchHolder.classList = "songSearchHolder";
                var songArtistName = document.createElement('h3');
                songArtistName.classList = "songArtistName";
                var songID = document.createElement('h3');
                songID.classList = "songID";
                var songSongName = document.createElement('h3');
                songSongName.classList = "songSongName";

                var buttonAdd = document.createElement('button');
                buttonAdd.classList = "songAddButton";
                buttonAdd.innerHTML = "+";

                buttonAdd.id = "buttonID" + (x.toString());

                songSearchHolder.id = "songSearchHolderID" + (x.toString());

                buttonAdd.onclick = function () {

                    var x = this.id;
                    var p = document.getElementById(this.id).parentElement.id;
                    var mainParent = document.getElementById(p);

                    var mainElementString = mainParent.innerHTML;

                    var stringArray = mainElementString.split("<");

                    var newString2 = stringArray[1];
                    var newString = stringArray[5];
                    var final2 = newString2.split(">");
                    var final = newString.split(">");
                    var songName = final2[1];
                    var songID = final[1];  

                    addToPlaylist(songName, songID);
                };

                songID.innerHTML = songIDArr[x];
                songArtistName.innerHTML = artistNameArr[x];
                songSongName.innerHTML = songName;


                songSearchHolder.appendChild(songSongName);
                songSearchHolder.appendChild(songArtistName);
                songSearchHolder.appendChild(songID);
                songSearchHolder.appendChild(buttonAdd);

                songSection.appendChild(songSearchHolder);

            };
        }, 500)

}

function loadPlaylist(){
    var url = window.location.href;
    var userID = url.substring((url.indexOf('?') + 1), url.length);
    var userIDNum = Number(userID);

    var dateArr = [];
    var songIDArr = [];

    const URL = "http://localhost:3000/findSongID" + "/" + userIDNum;
    fetch(URL)
        .then(data => { return data.json() })
        .then(res => {

            for (var i = 0; i < res.length; i++) {
                songIDArr[i] = res[i].songID;
                var date = res[i].dateAdded.toString();
                dateArr[i] = date.substring(0,10);
            }
            getSongNames(songIDArr,dateArr);

        })
}


function getSongNames(songIDArr,dateArr) {

    
    var songNameArr = [];

    for (var i = 0; i < songIDArr.length; i++) {
        
        const URL = "http://localhost:3000/findSongName" + "/" + songIDArr[i];
        fetch(URL)
            .then(data => { return data.json() })
            .then(res => {

                
                 songNameArr.push (res[0].songName);
                
            })
    }

    setTimeout(function () {
        var playlistHolder = document.getElementById("mySongs");

        for (var x = 0; x < songNameArr.length; x++) {

            var playlistSongHolder = document.createElement('div');
            playlistSongHolder.id = "playlistSongHolder";

            var playlistSong = document.createElement('h3');
            playlistSong.id = "playlistSong";

            var dateAdded = document.createElement('h3');
            dateAdded.id = "dateAdded";

            dateAdded.innerHTML = dateArr[x];

            playlistSong.innerHTML = songNameArr[x];



            playlistSongHolder.appendChild(playlistSong);

            playlistSongHolder.appendChild(dateAdded);

            playlistHolder.appendChild(playlistSongHolder);

        }

    }, 1000);
}

function addToPlaylist(songName, songID) {

    var url = window.location.href;
    var userID = url.substring((url.indexOf('?') + 1), url.length);
    var userIDNum = Number(userID);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + '-' + dd;

    const URL = "http://localhost:3000/insertSongPlaylist" + "/" +userID + "/"+songID+"/"+today;
    fetch(URL)
        .then(data => { return data.json() })
        .then(res => {

            console.log(res);
        })
    setTimeout(function () {
        window.location.reload();
    }, 1000);
}