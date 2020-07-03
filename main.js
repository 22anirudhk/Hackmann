var getUsersURL = "api/users.js";
var postUsersURL = "api/post-users.js";

//So that login cookie is reset upon entering this page.
document.cookie = "CrewCentreSession" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';


function login() {
    var username = document.getElementById("sign-in-username").value;
    var password = document.getElementById("sign-in-password").value;
    
    passCard = {
        username: username,
        password: password
    }
    
    fetch(getUsersURL, {
        method: 'post',
        body:JSON.stringify(passCard),
        headers: {"Content-Type" : "application/json"}
    })
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then((obj) => {
        console.log(obj)
        if(obj.status == 200) {
            localStorage["username"] = obj.body.username;
            localStorage["name"] = obj.body.name;
            localStorage["location"] = obj.body.location;
            
            // Put this in your login function, just before the redirect
            var sessionTimeout = 1; //hours
            var loginDuration = new Date();
            loginDuration.setTime(loginDuration.getTime()+(sessionTimeout*60*60*1000));
            
            document.cookie = "CrewCentreSession=Valid; "+loginDuration.toGMTString()+"; path=/";
            window.location.href = "Volunteer/index.html";
        }
    })
    .catch((error) => {
        var invalidLogin = document.getElementById("invalid-login");
            if(invalidLogin == null) {
                var newChild = document.createElement("h4");
                newChild.innerHTML = "Invalid Login";
                newChild.style.color = "red";
                document.getElementById("sign-in-div").appendChild(newChild);
            }
    });
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
    
    fetch(postUsersURL, {
        method: 'post',
        body:JSON.stringify(jsonCard),
        headers: {"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    
    var sessionTimeout = 1; //hours
            var loginDuration = new Date();
    document.cookie = "CrewCentreSession=Valid; "+loginDuration.toGMTString()+"; path=/";
    window.location.href = "Volunteer/index.html";
}

document.getElementById("sign-up-button").addEventListener("click", signup);
