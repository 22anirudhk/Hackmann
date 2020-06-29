var URL = 'http://34.74.78.120:4567/'; 

function login() {
    var username = document.getElementById("sign-in-username").value;
    var password = document.getElementById("sign-in-password").value;
    
    if(username == "test" && password == "hack") {
        localStorage["username"] = username;
        window.location.href = "Volunteer/index.html";
    }
}
document.getElementById("sign-in").addEventListener("click", login);


document.getElementById("website-name").addEventListener("click", function(){
    window.location.href = "../index.html";
});

function signup() {
    var username = document.getElementById("username").value;
    localStorage["username"] = username;
    
    var name = document.getElementById("name").value;
    var city = document.getElementById("city").value;
    var password = document.getElementById("password").value;
    
    jsonCard = {
        username: username,
        password: password,
        city:city,
        name:name
    }
    
    fetch(URL + "Users", {
        method: 'post',
        body:JSON.stringify(jsonCard),
        headers: {"Content-Type" : "application/json"}
    })
    .then(response => response.json())
//    window.location.href = "Volunteer/index.html";
}

document.getElementById("sign-up-button").addEventListener("click", signup);
