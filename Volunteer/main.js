var getTasksURL = "/https://kommunity.vercel.app/api/tasks.js";


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

document.getElementById("name").innerHTML = localStorage["name"];

var card = new Card("Gardening", "6/25", "5:00pm");


function addCard(myCard) {
    
    var cardEl = document.createElement("div")
    cardEl.classList.add("card");
    
    var table = document.createElement("table");
    cardEl.appendChild(table);
    
    
    var rows = [];
    var columns = [];
    
    var column1 = [];
    var column2 = [];
    var column3 = [];
    
    columns.push(column1);
    columns.push(column2);
    columns.push(column3);
    console.log(columns);
    
    for(var i = 0; i < 4; i++) {

        var row = document.createElement("tr");
        table.appendChild(row);
        rows.push(row);
        
       for(var  j = 0; j < 3; j++) {
           var col = document.createElement("td");
           row.appendChild(col);
           var column = columns[j];
           column.push(col);
       }
    }
    
    
    //First column items
    var task = document.createElement("h4");
    task.innerHTML = myCard.task;
    task.style.color = "black";
    task.style.fontSize = "30px";
    column1[0].appendChild(task);
    
    var location = document.createElement("h4");
    location.innerHTML = myCard.location;
    column1[1].appendChild(location);
    
    var time = document.createElement("h4");
    time.innerHTML = myCard.time;
    column1[3].appendChild(time);
    
    //Second column item
    var acceptButton = document.createElement("input");
    acceptButton.setAttribute("type", "submit");
    acceptButton.setAttribute("value", "Accept");
    acceptButton.setAttribute("class", "submit-button");
    column2[2].appendChild(acceptButton);
    
    
    //Third column items
    var name = document.createElement("h4");
    name.innerHTML = myCard.name;
    column3[0].appendChild(name);
    
    var date = document.createElement("h4");
    date.innerHTML = myCard.date;
    column3[3].appendChild(date);
    
    
    
//    var col1 = document.createElement("td");      
//        var val1 = document.createElement("h4");
//        val1.innerHTML = attr[i];
//        val1.style.color = "black";
//        col1.appendChild(val1);
//        row.appendChild(col1);
    
    
        
    
    

    
    document.getElementById("content-div").appendChild(cardEl);
}


function getCards() {
    document.getElementById("content-div").innerHTML = "";
    console.log(getTasksURL);
    var cardsArr = fetch(getTasksURL)
    .then(response => response.json())
    .then(json => {
        
        for(var i = 0; i < json.length; i++) {
            //Element in Json array of tasks
            var el = json[i];
            addCard(el);
            console.log(el.task);
        }
    })
}

getCards();
