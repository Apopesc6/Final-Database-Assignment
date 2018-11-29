function loginCheck() {
    var enteredPassword = document.getElementById("inputID").value;
    var email = document.getElementById("inputEmail");
    var foundPassword;
    const URL = "http://localhost:3000/findUser" + "/" + email.value;
    fetch(URL)
        .then(data => { return data.json() })
        .then(res => {
            foundPassword = res[0].userID;

            if (enteredPassword == foundPassword) {
                var url = "file:///D:/Assignments/SE%203309%20Assignments/Assignment4/fake-spotify/index.html?" + enteredPassword;
                window.location.href = url;
            } else {
                alert("Invalid Credentials");
            };

        })
}