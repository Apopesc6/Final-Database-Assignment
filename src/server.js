// JavaScript source code
const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourPassword',
    database: 'assignment3',
    insecureAuth: true
});

module.exports = db;

db.connect(function(err){
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});


app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});



app.get('/searchSong/:song_name', (req, res) => {
    var songName = req.params.song_name;
    console.log(songName);
    let sql = 'SELECT * FROM song WHERE songName = "' + songName + '"' ;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/totalSongs', (req, res) => {
    let sql = 'SELECT COUNT("songID") FROM song';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/totalUsers', (req, res) => {
    let sql = 'SELECT COUNT("userID") FROM user';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/totalArtists', (req, res) => {
    let sql = 'SELECT COUNT("ArtistID") FROM artist';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});


app.get('/searchArtist/:artist_name', (req, res) => {
    var artistName = req.params.artist_name;
    console.log(artistName);
    let sql = 'SELECT * FROM artist WHERE name = "' + artistName + '"';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/findUser/:user_name', (req, res) => {
    var userName = req.params.user_name;
    let sql = 'SELECT * FROM user WHERE email = "' + userName + '"';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/findArtistID/:song_id', (req, res) => {
    var songID = req.params.song_id;
    console.log(songID);
    let sql = 'SELECT * FROM artistsong WHERE songID = "' + songID + '"';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/findArtistName/:artist_id', (req, res) => {
    var artistID = req.params.artist_id;
    console.log(artistID);
    let sql = 'SELECT * FROM artist WHERE artistID = "' + artistID + '"';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});


app.get('/insertAcc/:city/:country/:email/:name', (req, res) => {
    var userCity = req.params.city;
    var userCountry = req.params.country;
    var userEmail = req.params.email;
    var userName = req.params.name;

    let post = { city: userCity, country: userCountry, email: userEmail, name: userName };
    let sql = 'INSERT INTO user SET ?';
    let query = db.query(sql, post, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});


app.get('/findSongID/:user_id', (req, res) => {
    var userID = req.params.user_id;
    console.log(userID);
    let sql = 'SELECT * FROM usersong WHERE userID = "' + userID + '"';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/findSongName/:song_id', (req, res) => {
    var songID = req.params.song_id;
    console.log(songID);
    let sql = 'SELECT songName FROM song WHERE songID = "' + songID + '"';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});


app.get('/insertSongPlaylist/:user_id/:song_id/:date_added', (req, res) => {
    var userID1 = req.params.user_id;
    var songID1 = req.params.song_id;
    var dateAdded1 = req.params.date_added;

    let post = { userID: userID1, songID: songID1, dateAdded: dateAdded1,listenCount:'1' };
    let sql = 'INSERT INTO usersong SET ?';
    let query = db.query(sql, post, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/findArtistFollow/:user_id', (req, res) => {
    var userID = req.params.user_id;
    console.log(userID);
    let sql = 'SELECT * FROM userfollow WHERE userID = "' + userID + '"';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/insertArtist/:artist_id/:user_id', (req, res) => {
    var artistID1 = req.params.artist_id;
    var userID1 = req.params.user_id;
 

    let post = { artistID: artistID1, userID: userID1};
    let sql = 'INSERT INTO userfollow SET ?';
    let query = db.query(sql, post, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/deleteUser/:user_id', (req, res) => {
    var userID = req.params.user_id;
    console.log(userID);
    let sql = 'DELETE FROM user WHERE userID = "' + userID + '"';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/updateUser/:user_id/:email/:city/:country/:name', (req, res) => {
    var userID = req.params.user_id;
    var email = req.params.email;
    var city = req.params.city;
    var country = req.params.country;
    var name = req.params.name;

    console.log(userID);
    let sql = 'UPDATE user SET email="' + email + '", city="' + city + '", country="' + country + '", name="'+name+'" WHERE userID="' + userID + '"' ;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/genreWeek/:genreIDNum', (req, res) => {
    var genreIDNum = req.params.genreIDNum;
    let sql = 'SELECT genre.genreName, song.songName, user.country FROM genre INNER JOIN genresong ON genre.genreID = genresong.genreID INNER JOIN song ON song.songID = genresong.songID INNER JOIN usersong ON usersong.songID = song.songID INNER JOIN user ON user.userID = usersong.userID WHERE genre.genreID=1';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/artistsCountry/:userCountry', (req, res) => {
    var userCountry = req.params.userCountry;
    let sql = 'SELECT user.country, user.name, artist.name FROM user INNER JOIN userFollow ON user.userID = userFollow.userID INNER JOIN artist ON artist.artistID = userFollow.artistID WHERE country="' + userCountry+ '"';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.get('/findUserCountry/:userID', (req, res) => {
    var userID = req.params.userID;
    let sql = 'SELECT country FROM user WHERE userID = "' + userID + '"';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/findallUsers', (req, res) => {
    var songID = req.params.song_id;
    console.log(songID);
    let sql = 'SELECT * FROM user';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});

