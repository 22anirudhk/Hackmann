document.getElementById("sign-in").addEventListener("click", login);

function login() {
    var username = document.getElementById("sign-in-username").value;
    var password = document.getElementById("sign-in-password").value;
    
    if(username == "test" && password == "hack") {
        window.location.href = "Volunteer/index.html";
    }
}

document.getElementById("website-name").addEventListener("click", function(){
    window.location.href = "../index.html";
});
