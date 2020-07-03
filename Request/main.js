/* Redirect if the session is not valid. */
if (document.cookie.indexOf("CrewCentreSession=Valid") == -1) {
  location.href = "../index.html";
}

/* Redirect to Request page if button pressed. */
document.getElementById("request-button").addEventListener("click", function() {
    window.location.href = "../Request/index.html";
});


/* Redirect to Volunteer page if button pressed. */
document.getElementById("volunteer-button").addEventListener("click", function() {
    window.location.href = "../Volunteer/index.html";
});


/* Redirect to landing page if title pressed. */
document.getElementById("website-name").addEventListener("click", function(){
    window.location.href = "../index.html";
});


/* Log a user out. */
document.getElementById("log-out-button").addEventListener("click", function() {
    localStorage["username"] = "None";
    localStorage["name"] = "None";
    localStorage["location"] = "None";
    
    document.cookie = "CrewCentreSession" + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = "../index.html";
});

/* Set the name in the profile div */
document.getElementById("name").innerHTML = localStorage["name"];



const postTasksURL = "/api/post-tasks.js";
const getUsersURL = "/api/users.js";

/* Adds a card requesting assistance to the database. 
 * @jsonCard An object representation of the task.
*/
function postCard(jsonCard) {
    fetch(postTasksURL, {
        method: 'post',
        body:JSON.stringify(jsonCard),
        headers: {"Content-Type" : "application/json"}
    })
    .then(response => response.json())
}

/* Creates a json version of the request for assistance and adds to database. */
async function requestHelp() {
    var taskStr = document.getElementById("task").value;
    var dateStr = document.getElementById("date").value;
    var timeStr = document.getElementById("time").value;
    
    var username = localStorage["username"];
  
    
    
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
    await postCard(JSONVersion);

    var requestedNode = document.createElement("h3");
    requestedNode.innerHTML = "Requested. Return to the volunteer page to verify."
    document.getElementById("request-div").appendChild(requestedNode);
        
}

/* Add request for assistance to database upon button press */
document.getElementById("request-task-button").addEventListener("click", requestHelp);