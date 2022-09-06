/// CONFIGURATION

var maxerrors = 3; // nombre d'erreur accepter avant defaite
var texttolerance = 80; // valeur en pourcentage pour que le mot soit accepter compter comme erreur

/// DO NOT EDIT THIS
var page = document.getElementById('mainpage');
page.innerHTML += '<div class="autherdevice">Ce Site web n\'a pas eté concusses pour c\'ettes apparailes</div>';
var gamesave = JSON.parse(localStorage.getItem("gamesave") || "{}");
var error = 0;
var gamestate = 0;
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
    gamestate = 1;
}

function checkpourcentage(value){
    v = value.split("");
    var pourcentage = 0;
    var keyselected = null;
    for(var key in languages){
        k = key.split("");
        point = 0;
        tpourcentage = 0;
        if(k.length>v.length){
            point = k.length;
            for(var i = 0; i < k.length; i++){
                if(v[i] != undefined){
                    if(k[i].toLowerCase() != v[i].toLowerCase()){
                        point = point-1;
                    }
                }else{
                    point = point-1;
                }
                
            }
            tpourcentage = point*100/k.length;
        }else if(k.length<v.length){
            point = v.length;
            for(var i = 0; i < v.length; i++){
                if(k[i] != undefined){
                    if(k[i].toLowerCase() != v[i].toLowerCase()){
                        point = point-1;
                    }
                }else{
                    point = point-1;
                }
                
            }
            tpourcentage = point*100/v.length;
        }else if(k.length==v.length){
            point = k.length;
            for(var i = 0; i < v.length; i++){
                if(k[i].toLowerCase() != v[i].toLowerCase()){
                    point = point-1;
                }                
            }
            tpourcentage = point*100/v.length;
        }
        console.log("key: " + key);
        console.log("pourcentage: " + tpourcentage);
        console.log("point: " + point);

        if(tpourcentage > pourcentage){
            pourcentage = tpourcentage;
            keyselected = key;
        }
    }
    console.log("key selected: " + keyselected);
    console.log("pourcentage max: " + pourcentage);
    if(texttolerance <= pourcentage){
        return keyselected;
    }

    return -1;
}

function typing(value){
    //value = value.replace(regex, '');
    if(languages[value] !== undefined){
        console.log(" ✓ "+value);
    }else if(value.length >= 3){
        var langselected = checkpourcentage(value);
        if(langselected != -1){
            console.log(" ✓ "+langselected);
        }else{
            console.log(" ✕ "+value);
        }
    }else{
        console.log(" ✕ "+value);
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

    var textzone = newElement('p',{'id': 'textarea'});
    var textlabel = newElement('label',{'id': 'textlabel','innerHTML':'Tapé le nom de votre languages'});
    textlabel.appendChild(textzone);
    textlabel.innerHTML += " puis valider en appuyant sur la touche enter"
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
        var conditonbtn = newElement("span",{"className": "conditonbtn btn","innerHTML": "Conditions General"});
        conditonbtn.addEventListener("click", function(e) { document.getElementById("conditions").style.display = ""});
        page.appendChild(conditonbtn);
    /*});*/
    // startanimation();
    // GAME
    var gamepage = newElement("div",{"id":"gamepage","style":"display:none;zIndex:0"});
    var zoom = newElement("div",{"className": "zoom"});
    var chambre = newElement("img",{"src": "ressource/chambre.jpg", "alt": "Image" });
    zoom.appendChild(chambre);
    
    gamepage.appendChild(newElement("img",{"className":"logoImg","src": "ressource/Logo.svg", "alt": "Logo"}));
    gamepage.appendChild(zoom);
    gamepage.appendChild(typingzone);
    page.appendChild(gamepage);

    var startzoom = newElement("script",{"innerHTML":"zoom();"});
    document.body.appendChild(startzoom);
}

init();
startanimation();
//var zoommodule = newElement("script",{"src":"ressource/zoom-by-ironex.min.js"});
//document.body.appendChild(zoommodule);

document.addEventListener("keydown", (event) => {
    console.log(event.key);
    var keylenght = event.key.split("").length;
    var typingzone = document.getElementById("typingzone");
    if(gamestate == 1){
        if(event.key.match(/^[a-z\_\-\:,.0-9]{1}/i) && keylenght == 1){
            if(typingzone.style.display != ""){
                document.getElementById("textarea").innerHTML = event.key;
                typingzone.style.display = "";
            }else{
                document.getElementById("textarea").innerHTML += event.key;
            }
        }else if(event.code == "Space" && typingzone.style.display == ""){
            
            document.getElementById("textarea").innerHTML += "-";
                
        }else if(event.key.match("Backspace") && typingzone.style.display == ""){
            var value = document.getElementById("textarea").innerHTML;
            document.getElementById("textarea").innerHTML = value.replace(/.$/, '');
        }else if(event.key.match("Enter") && typingzone.style.display == ""){
            var value = document.getElementById("textarea").innerHTML;
            typing(value);
            typingzone.style.display = "none";
        }else if(event.key.match("Escape")){
            if(document.getElementById("conditions").style.display != "none"){
                document.getElementById("conditions").style.display = "none";
                document.getElementById("conditions").style.zIndex = "0";
            }else if(typingzone.style.display != "none"){
                typingzone.style.display = "none";
            }
        }
    }
});