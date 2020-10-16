var getUsersURL = "api/users.js";
var postUsersURL = "api/post-users.js";

//Resets login session upon entering home page.
document.cookie = "CrewCentreSession" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

/* Logs a user in if the login form is valid. */
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

            var sessionTimeout = 1; //Number of ours before session timeout
            var loginDuration = new Date();
            loginDuration.setTime(loginDuration.getTime()+(sessionTimeout*60*60*1000));
            
            document.cookie = "CrewCentreSession=Valid; "+loginDuration.toGMTString()+"; path=/";
            window.location.href = "/Volunteer";
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

//Initiates sign-in process
document.getElementById("sign-in").addEventListener("click", login);

//Returns user to home page
document.getElementById("website-name").addEventListener("click", function(){
    window.location.href = "/";
});

/* Signs a User Up and Redirects to Volunteer Page. */
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
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then((obj) => {
        var sessionTimeout = 1; //hours
        var loginDuration = new Date();
document.cookie = "CrewCentreSession=Valid; "+loginDuration.toGMTString()+"; path=/";
window.location.href = "/Volunteer";
    })
    .catch((error) => {
        //invalid credentials entered
    });
    
   
}

document.getElementById("sign-up-button").addEventListener("click", signup);
