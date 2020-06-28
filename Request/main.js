var URL = 'http://34.74.78.120:4567'; 

function postCard(jsonCard) {
    fetch(URL, {
        method: 'post',
        body:JSON.stringify(jsonCard)
    })
    .then(response => response.json())
}

function requestHelp() {
    var taskStr = document.getElementById("task").value;
    var dateStr = document.getElementById("date").value;
    var timeStr = document.getElementById("time").value;
    
    if(taskStr == null || dateStr == null || timeStr == null) {
        return;
    }
    
    JSONVersion = {
        task: taskStr,
        date: dateStr,
        time: timeStr
    }
    console.log(JSONVersion);
    postCard(JSONVersion);
}

document.getElementById("request-button").addEventListener("click", requestHelp);