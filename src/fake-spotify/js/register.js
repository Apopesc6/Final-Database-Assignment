// JavaScript source code
function registerAcc() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("inputEmail").value;
    var city = document.getElementById("inputCity").value;
    var country = document.getElementById("inputCountry").value;

    var name = firstName + " " + lastName;

    const URL = "http://localhost:3000/insertAcc" +"/"+city+"/"+country+"/"+email+"/"+name ;
    fetch(URL)
        .then(data => { return data.json() })
        .then(res => {
            getPassword(email);
        })
};

function getPassword(email) {
    const URL = "http://localhost:3000/findUser/" + email;
    fetch(URL)
        .then(data => { return data.json() })
        .then(res => {
            alert("When logging in, please be sure to use " + res[0].userID + " as your userID.");
            var url = "file:///D:/Assignments/SE%203309%20Assignments/Assignment4/fake-spotify/index.html?" + res[0].userID;
            window.location.href = url;
        })
}