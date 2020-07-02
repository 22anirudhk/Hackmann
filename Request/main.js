var postTasksURL = "/api/post-tasks.js";
var getUsersURL = "/api/users.js";


document.getElementById("request-page-button").addEventListener("click", function() {
    window.location.href = "../Request/index.html";
});

document.getElementById("volunteer-button").addEventListener("click", function() {
    window.location.href = "../Volunteer/index.html";
});

document.getElementById("website-name").addEventListener("click", function(){
    window.location.href = "../index.html";
});

document.getElementById("name").innerHTML = localStorage["name"];



function postCard(jsonCard) {
    fetch(postTasksURL, {
        method: 'post',
        body:JSON.stringify(jsonCard),
        headers: {"Content-Type" : "application/json"}
    })
    .then(response => response.json())
}


function requestHelp() {
    var taskStr = document.getElementById("task").value;
    var dateStr = document.getElementById("date").value;
    var timeStr = document.getElementById("time").value;
    
    var username = localStorage["username"];
    
    console.log("Fetching from " + getUsersURL + username);
    
    fetch(getUsersURL, {
        method: 'get',
        body:JSON.stringify(username)
    })
    .then(response => response.json())
    .then(json => {
    
    
    
    console.log(json);
    if(taskStr == null || dateStr == null || timeStr == null) {
        return;
    }
    
    JSONVersion = {
        task: taskStr,
        date: dateStr,
        time: timeStr,
        location: localStorage["location"],
        name: localStorage["name"]
    }
    console.log(JSONVersion);
    postCard(JSONVersion);

    var requestedNode = document.createElement("h3");
    requestedNode.innerHTML = "Requested. Return to the volunteer page to verify."
    document.getElementById("request-div").appendChild(requestedNode);
        
    })
}

document.getElementById("request-button").addEventListener("click", requestHelp);