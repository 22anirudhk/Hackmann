var getURL = 'https://34.74.78.120:4567/'; 


class Card {
    constructor(task, date, time) {
        this.task = task;
        this.date = date;
        this.time = time;
    }
}

document.getElementById("website-name").addEventListener("click", function(){
    window.location.href = "../index.html";
});


document.getElementById("request-button").addEventListener("click", function() {
    window.location.href = "../Request/index.html";
});

document.getElementById("volunteer-button").addEventListener("click", function() {
    window.location.href = "../Volunteer/index.html";
});


var card = new Card("Gardening", "6/25", "5:00pm");


function addCard(myCard) {
    
    var items = ["Task", "Date", "Time"];
    var attr = [myCard.task, myCard.date, myCard.time, myCard.length];
    
    
    var cardEl = document.createElement("div")
    cardEl.classList.add("card");
    
    var table = document.createElement("table");
    cardEl.appendChild(table);
    
    
    for(var i = 0; i < items.length; i++) {

        var row1 = document.createElement("tr");
        table.appendChild(row1);
    
        var col1 = document.createElement("td");
        
        var val1 = document.createElement("h4");
        val1.innerHTML = items[i];
        val1.style.color = "black";
        col1.appendChild(val1);
        row1.appendChild(col1);
    
        var col2 = document.createElement("td");
        var val2 = document.createElement("h4");
        val2.innerHTML = attr[i];
        col2.appendChild(val2);
        row1.appendChild(col2);
    
    }
    
    var acceptButton = document.createElement("input");
    acceptButton.setAttribute("type", "submit");
    acceptButton.setAttribute("value", "Accept");
    acceptButton.setAttribute("class", "submit-button");
    cardEl.appendChild(acceptButton);
    
    document.getElementById("content-div").appendChild(cardEl);
}


function getCards() {
    document.getElementById("content-div").innerHTML = "";
    console.log(getURL + "Tasks");
    var cardsArr = fetch(getURL + "Tasks")
    .then(response => response.json())
    .then(json => {
        
        for(var i = 0; i < json.length; i++) {
            //Element in Json array of tasks
            var el = json[i];
            var cardVersion = new Card(el.task, el.date, el.time);
            addCard(cardVersion);
            console.log(el.task);
        }
    })
}

getCards();
