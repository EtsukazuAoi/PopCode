var page = document.getElementById('mainpage');
page.innerHTML += '<div class="autherdevice">Ce Site web n\'a pas eté concusses pour c\'ettes apparailes</div>';
var gamesave = JSON.parse(localStorage.getItem("gamesave") || "{}");
var error = 0;
var listfound = [];
var languages = {};
var mentions = {};
var regex = /\r\n|\n|\r/gm;

function startanimation(){
    const progressBar = document.querySelector(".bar");
    const progressBarValue = document.querySelector('.bar__value');
    const text = document.querySelector('.langcount');
    let value = 0;
    const max = 100;

    let anim = setInterval(() => {
    if (value == max) {
        clearInterval(anim);
        document.querySelector(".neon-bar").style.display = 'none';
        document.querySelector(".start0").style.display = '';
        if(!isEmpty(gamesave)){
            document.querySelector(".start1").style.display = '';
        }
        document.getElementById("start").style.backgroundColor = "";
    } else {
        value += 1;
        progressBar.value = value;
        progressBarValue.innerText = value + '%';
        text.innerHTML = parseInt(value/100*30);
    }
    }, 80);
}
function hide(event){
    event.target.parentNode.style.display = "none";
    event.target.parentNode.style.zIndex = "0";
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function newElement(type, object){
    var element = document.createElement(type);    
    for(var i in object){
        element[i] = object[i];
    }
    return element;
}

function closebtn(name) {
    var closebtn = newElement("span", {"className": "close btn","innerHTML": "&times;"});
    closebtn.addEventListener("click", hide);
    return closebtn;
}

function startgame(type){
    var game = document.getElementById("gamepage");
    game.style.zIndex = "2";
    game.style.display = "";
    var typingzone = document.getElementById("typingzone");
    typingzone.style.display = "";
    typingzone.zIndex = "5";
}

function checkpourcentage(value){
    // var valuearray = value.split("");
    // for(var key in languages) {
    //     var keyarray = key.split("");
    //     var keypercent = 100;
    //     if(keyarray.length-valuearray.length < keypercent) {
    //         keypercent = keyarray.length-valuearray.length;
            
    //     }
    //     console.log(pourcentage);

    // }
}

function typing(value){
    value = value.replace(regex, '');
    if(languages[value] !== undefined){
        console.log(" ✓ "+value);
    }else{
        checkpourcentage(value);
    }    
}

async function init(){
    // START
    var start = newElement("div",{"id": "start","style": "background-color: rgba(0, 0, 0, 0.75)"/*"zIndex:0;display:none"*/});
    var logo = newElement("img",{"src":"ressource/Logo2.svg","className":"CenteredImage centerelement"});
    var text0 = newElement("p",{"className":"centerelement langcount","style": "font-size:150px;color:#0AEFF7;background: -webkit-linear-gradient(#057C80, #0AEFF7);background-clip: border-box; -webkit-background-clip: text; -webkit-text-fill-color: transparent","innerHTML": "0"});
    var text1 = newElement("p",{"className":"centerelement","style": "font-size:15px;font-family:GothanLight","innerHTML": "Références de<br>langages de programmation<br>à retrouver"});
    var text = newElement("p",{"innerHTML": "Cliquer ici pour commencée","className":"centerelement btn start0","style": "color:#FFAAFF;margin-top:5vh;display:none"});
    var text2 = newElement("p",{"innerHTML": "Cliquer ici pour continué","className":"centerelement btn start1","style": "color:#FFAAFF;margin-top:5vh;display:none"});
    var charging = newElement("div",{"style": "margin-top:5vh","className":"neon-bar","innerHTML": "<progress class='bar' value='0' max='100'></progress><span class='bar__value'>0%</span>"});
    var typingzone = newElement("div",{"id":"typingzone",'style': 'display:none'});

    text.addEventListener("click", function(){startgame(0)});
    text2.addEventListener("click", function(){startgame(1)});

    start.appendChild(logo);
    start.appendChild(text0);
    start.appendChild(text1);

    start.appendChild(text);    
    start.appendChild(text2);
    start.appendChild(charging);

    page.appendChild(start);

    // TYPINGZONE

    var textzone = newElement('textarea',{'id': 'textarea', 'value':'','placeholder':'Tapé le nom de votre languages'});
    var textlabel = newElement('label',{'id': 'textlabel'});
    textzone.addEventListener('keydown', (event) => {if(event.keyCode === 13){typing(event.target.value);event.target.value = event.target.value.replace(regex,'')}else{event.target.value = event.target.value.replace(regex,'')}});
    textlabel.appendChild(textzone);
    typingzone.appendChild(textlabel);
    // 

    
    // CONDITIONS
    var jsonfile = await fetch('./ressource/languages.json')
    .then((response) => response.json())
    .then((json) => {
        return json;
    });
        var jsonsize = jsonfile.length;
        for (var i = 0; i < jsonsize-1; i++) {
            languages[jsonfile[i].name] = {"description": jsonfile[i].description, "picture": jsonfile[i].picture}
        }
        var conditions = newElement("div",{"id":"conditions","style":"display:none","innerHTML":"<h1>"+jsonfile[jsonsize-1].title+"</h1>"+jsonfile[jsonsize-1].content});
        conditions.appendChild(closebtn("conditions"));
        page.appendChild(conditions);
        var conditonbtn = newElement("span",{"className": "conditonbtn btn","innerHTML": "Conditions General","style": "zIndex:5"});
        conditonbtn.addEventListener("click", function(e) { document.getElementById("conditions").style.display = "";document.getElementById("conditions").style.zIndex = "10"});
        page.appendChild(conditonbtn);
    /*});*/
    // startanimation();
    // GAME
    var gamepage = newElement("div",{"id":"gamepage","style":"display:none;zIndex:0"});
    var zoom = newElement("div",{"className": "zoom"});
    var chambre = newElement("img",{"src": "ressource/chambre.jpg", "alt": "Image" });
    zoom.appendChild(chambre);
    gamepage.appendChild(zoom);
    gamepage.appendChild(typingzone);
    page.appendChild(gamepage);
}

document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
        if(document.getElementById("conditions").style.display != "none"){
		    document.getElementById("conditions").style.display = "none";
            document.getElementById("conditions").style.zIndex = "0";
        }
	}
});

init();
startanimation();
var startzoom = newElement("script",{"innerHTML":"zoom();"});
//var zoommodule = newElement("script",{"src":"ressource/zoom-by-ironex.min.js"});

//document.body.appendChild(zoommodule);
document.body.appendChild(startzoom);