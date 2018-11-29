
function searchArtist() {

    var searchNum = 0;

    var item = document.getElementById("artistSearchbar");

    var artistSection = document.getElementById("searchArtists");
    artistSection.innerHTML = '';

   
        const URL = "http://localhost:3000/searchArtist" + "/" + item.value;
        fetch(URL)
            .then(data => { return data.json() })
            .then(res => {
                console.log(res);

                var artist = res;

                searchedItem = item;

                var artistSection = document.getElementById("searchArtists");
                var artistholder = document.createElement('div');
                artistholder.id = "artistHolder";
                var artistName = document.createElement('h3');
                artistName.id = "artistName";
                var artistFollow = document.createElement('h3');
                artistFollow.id = "artistFollow";

                var buttonAdd = document.createElement('button');
                buttonAdd.id = "artistAddButton";
                buttonAdd.innerHTML = "+";

                buttonAdd.onclick = function () {
                    var artistName = res[0].name;
                    var artistID = res[0].artistID;
                    addToArtists(artistName,artistID);
                }


                artistName.innerHTML = res[0].name;
                artistFollow.innerHTML = " --- Follow Count: " + res[0].followCount;

                artistholder.appendChild(artistName);
                artistholder.appendChild(artistFollow);
                artistholder.appendChild(buttonAdd);

                artistSection.appendChild(artistholder);
            })
}



function addToArtists(artistName, artistID) {
    var url = window.location.href;
    var userID = url.substring((url.indexOf('?') + 1), url.length);
    var userIDNum = Number(userID);
    

    const URL = "http://localhost:3000/insertArtist" + "/" + artistID + "/" + userID;
    fetch(URL)
        .then(data => { return data.json() })
        .then(res => {

            console.log(res);
        })
    setTimeout(function () {
        window.location.reload();
    }, 1000);
}


function loadArtists() {
    var url = window.location.href;
    var userID = url.substring((url.indexOf('?') + 1), url.length);
    var userIDNum = Number(userID);

    var artistID = [];

    const URL = "http://localhost:3000/findArtistFollow" + "/" + userIDNum;
    fetch(URL)
        .then(data => { return data.json() })
        .then(res => {
            console.log(res);

            for (var i = 0; i < res.length; i++) {
                artistID[i] = res[i].artistID;
            }
            

            
            getArtistNames(artistID);

        })
}


function getArtistNames(artistID) {

    var artistName =[];

    for (var i = 0; i < artistID.length; i++) {
        const URL = "http://localhost:3000/findArtistName" + "/" + artistID[i];
        fetch(URL)
            .then(data => { return data.json() })
            .then(res => {

                artistName.push(res[0].name);

            })
    }

    setTimeout(function () {

        var followedArtistsHolder = document.getElementById("myArtists");

        for (var x = 0; x < artistName.length; x++) {

            var eachArtistHolder = document.createElement('div');
            eachArtistHolder.id = "eachArtistHolder";

            var artistFollowed = document.createElement('h3');
            artistFollowed.id = "artistFollowed";

            artistFollowed.innerHTML = artistName[x];

            eachArtistHolder.appendChild(artistFollowed);

            followedArtistsHolder.appendChild(eachArtistHolder);

        }

        
    }, 1000);
}