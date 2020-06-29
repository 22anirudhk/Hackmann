var URL = 'http://34.74.78.120:4567/'; 


document.getElementById("side-request-button").addEventListener("click", function() {
    window.location.href = "../Request/index.html";
});

document.getElementById("volunteer-button").addEventListener("click", function() {
    window.location.href = "../Volunteer/index.html";
});

document.getElementById("website-name").addEventListener("click", function(){
    window.location.href = "../index.html";
});



function postCard(jsonCard) {
    fetch(URL, {
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
    
    
    var cardsArr = fetch(URL + username);
    .then(response => response.json())
    .then(json => {
    
    
    
    
    if(taskStr == null || dateStr == null || timeStr == null) {
        return;
    }
    
    JSONVersion = {
        task: taskStr,
        date: dateStr,
        time: timeStr,
        location: json[0].location,
        name: json[0].name
    }
    console.log(JSONVersion);
    postCard(JSONVersion);

    var requestedNode = document.createElement("h3");
    requestedNode.innerHTML = "Requested. Return to the volunteer page to verify."
    document.getElementById("request-div").appendChild(requestedNode);
        
    })
}

document.getElementById("request-button").addEventListener("click", requestHelp);