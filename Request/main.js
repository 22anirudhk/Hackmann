var URL = "https://kommunity.vercel.app/api/vercel.js/";

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
    fetch(URL + "Requests", {
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
    
    console.log("Fetching from " + URL + username);
    
    var cardsArr = fetch(URL + username)
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