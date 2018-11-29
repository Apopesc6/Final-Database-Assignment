function loadDashboard() {
    var totalSongs = document.getElementById("totalSongCount");
    var totalArtists = document.getElementById("totalArtistCount");
    var totalUsers = document.getElementById("totalUserCount");

    const URL = "http://localhost:3000/totalArtists";
    fetch(URL)
        .then(data => { return data.json() })
        .then(res => {
            var resString = JSON.stringify(res[0]);
            resString = resString.substring((resString.indexOf(':')+1), (resString.indexOf('}')));


            totalArtists.innerHTML = resString;
        })

    const URL2 = "http://localhost:3000/totalUsers";
    fetch(URL2)
        .then(data => { return data.json() })
        .then(res => {
            var resString = JSON.stringify(res[0]);
            resString = resString.substring((resString.indexOf(':') + 1), (resString.indexOf('}')));


            totalUsers.innerHTML = Number(resString)+1;
        })

    const URL3 = "http://localhost:3000/totalSongs";
    fetch(URL3)
        .then(data => { return data.json() })
        .then(res => {
            var resString = JSON.stringify(res[0]);
            resString = resString.substring((resString.indexOf(':') + 1), (resString.indexOf('}')));

            totalSongs.innerHTML = resString;
        })

    var genreIDNum = Math.random() * (8 - 1) + 1;
    const URL4 = "http://localhost:3000/genreWeek/" + genreIDNum.toString();
    fetch(URL4)
        .then(data => { return data.json() })
        .then(res => {
            var genreHolder = document.getElementById("genreWeek");
            var littleHolder = document.getElementById("subGenre");
            for (var x = 0; x < res.length; x++) {
                var nameHold = document.createElement("h3");
                nameHold.classList = "withinGenre";
                var countryHold = document.createElement("h3");
                nameHold.classList = "withinGenre";
                var separate = document.createElement("br");
                var separate2 = document.createElement("hr");


                nameHold.innerHTML = res[x].songName;
                countryHold.innerHTML = res[x].country;

                littleHolder.appendChild(nameHold);
                littleHolder.appendChild(countryHold);
                littleHolder.appendChild(separate);
                littleHolder.appendChild(separate2);
                littleHolder.appendChild(separate);

                genreHolder.appendChild(littleHolder);
            }
        })

    var url = window.location.href;
    var userID = url.substring((url.indexOf('?') + 1), url.length);

    const URL5 = "http://localhost:3000/findUserCountry/" + userID;
    fetch(URL5)
        .then(data => { return data.json() })
        .then(res => {
            getCountryArtists(res[0].country);
        })
}


function getCountryArtists(country) {
    const URL5 = "http://localhost:3000/artistsCountry/" + country;
    fetch(URL5)
        .then(data => { return data.json() })
        .then(res => {
            var upcomingHolder = document.getElementById("upcomingArtistHolder");

            for (var i = 0; i < res.length; i++) {
                var newArtist = document.createElement("h1");
                newArtist.id = "upcomingArtistName";

                newArtist.innerHTML = res[i].name;

                upcomingHolder.appendChild(newArtist);
            }
        })
}


function toMySongs() {
    var url = window.location.href;
    var userID = url.substring((url.indexOf('?') + 1), url.length);
    console.log(userID);
    var url = "file:///D:/Assignments/SE%203309%20Assignments/Assignment4/fake-spotify/templates/mysongs.html?" + userID;
    window.location.href = url; 
}

function toMyArtists() {
    var url = window.location.href;
    var userID = url.substring((url.indexOf('?') + 1), url.length);
    console.log(userID);
    var url = "file:///D:/Assignments/SE%203309%20Assignments/Assignment4/fake-spotify/templates/myartists.html?" + userID;
    window.location.href = url;
}

function toMyDashboard() {
    var url = window.location.href;
    var userID = url.substring((url.indexOf('?') + 1), url.length);
    console.log(userID);
    var url = "file:///D:/Assignments/SE%203309%20Assignments/Assignment4/fake-spotify/index.html?" + userID;
    window.location.href = url;
}

function updateAccount() {
    var url = window.location.href;
    var userID = url.substring((url.indexOf('?') + 1), url.length);

    var email = document.getElementById("inputEmail");
    var city = document.getElementById("city");
    var country = document.getElementById("country");
    var first = document.getElementById("firstName").value;
    var last = document.getElementById("lastName").value;
    var name = first + " " + last;


    const URL2 = "http://localhost:3000/updateUser" + "/" + userID + "/" + email.value + "/" + city.value + "/" + country.value + "/" + name;
    fetch(URL2)
        .then(data => { return data.json() })
        .then(res => {

            window.location.reload();

        })
}

function deleteAccount() {
    var url = window.location.href;
    var userID = url.substring((url.indexOf('?') + 1), url.length);

    const URL2 = "http://localhost:3000/deleteUser" + "/" + userID;
    fetch(URL2)
        .then(data => { return data.json() })
        .then(res => {

            var url = "file:///D:/Assignments/SE%203309%20Assignments/Assignment4/fake-spotify/templates/login.html";
            window.location.href = url;

        })
}
