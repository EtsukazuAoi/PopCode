var page = document.getElementById('mainpage');
page.innerHTML += '<div class="autherdevice">Ce Site web n\'a pas eté concusses pour c\'ettes apparailes</div>';
var gamesave = JSON.parse(localStorage.getItem("gamesave") || "{}");
var error = 0;
var listfound = [];
var languages = {};
var mentions = {};


function hide(event){
    event.target.parentNode.style.display = "none";
}

function closebtn(name) {
    var closebtn = document.createElement("span");
    closebtn.className = "close";
    closebtn.innerHTML = "&times;";
    closebtn.addEventListener("click", hide);
    return closebtn;
}

function init(){
    // LOADER
    var loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.zIndex = '0';
    page.appendChild(loader);

    // CONDITIONS 
    fetch('./ressource/languages.json')
    .then((response) => response.json())
    .then((json) => {
        jsonsize = json.length;
        for (var i = 0; i < jsonsize-1; i++) {
            languages[json[i].name] = {"description": json[i].description, "picture": json[i].picture}
        }
        var conditions = document.createElement("div");
        conditions.id = "conditions";
        conditions.style.display = "none";
        conditions.innerHTML = "<h1>"+json[jsonsize-1].title+"</h1>"+json[jsonsize-1].content;
        conditions.appendChild(closebtn("conditions"));
        page.appendChild(conditions);
    });
    var conditonbtn = document.createElement("span");
    conditonbtn.className = "conditonbtn";
    conditonbtn.innerHTML = "Conditions General";
    conditonbtn.addEventListener("click", function(e) { document.getElementById("conditions").style.display = ""; });
    page.appendChild(conditonbtn);

}

init()