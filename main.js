var getURL = "kommunity.vercel.app/api/users.js";
var postURL = "kommunity.vercel.app/api/post-users.js";

function login() {
    var username = document.getElementById("sign-in-username").value;
    var password = document.getElementById("sign-in-password").value;
    
    var cardsArr = fetch(getURL, {
        method: 'get',
        body:JSON.stringify(username)
    })
    .then(response => response.json())
    .then(json => {
        if(json.length != 0 && username == json[0].username && password == json[0].password) {
            localStorage["username"] = username;
            localStorage["name"] = json[0].name;
            localStorage["location"] = json[0].location;
            window.location.href = "Volunteer/index.html";
        }
    })
    
    
}
document.getElementById("sign-in").addEventListener("click", login);


document.getElementById("website-name").addEventListener("click", function(){
    window.location.href = "../index.html";
});

function signup() {
    var username = document.getElementById("username").value;
    
    
    localStorage["username"] = username;
    
    var name = document.getElementById("name").value;
    var location = document.getElementById("location").value;
    var password = document.getElementById("password").value;
    
    jsonCard = {
        username: username,
        password: password,
        location:location,
        name:name
    }
    
    localStorage["username"] = username;
    localStorage["name"] = name;
    localStorage["location"] = location;
    
    fetch(postURL, {
        method: 'post',
        body:JSON.stringify(jsonCard),
        headers: {"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    window.location.href = "Volunteer/index.html";
}

document.getElementById("sign-up-button").addEventListener("click", signup);
