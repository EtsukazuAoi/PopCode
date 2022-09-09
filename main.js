/// CONFIGURATION

var maxerrors = 3; // nombre d'erreur accepter avant defaite
var texttolerance = 80; // valeur en pourcentage pour que le mot soit accepter compter comme erreur

/// DO NOT EDIT THIS
var page = document.getElementById('mainpage');
page.innerHTML += '<div class="autherdevice">Ce Site web n\'a pas eté concusses pour c\'ettes apparailes</div>';
var gamesave = JSON.parse(localStorage.getItem("gamesave") || "{}");
var erreur = 0;
var gamestate = 0;
var listfound = [];
var languages = {};
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
        text.innerHTML = parseInt(value/100*Object.keys(languages).length);
    }
    }, 10);
}

function gamescorevisual(){
    // "error_false"
    var error = document.getElementById("error").children;
    document.getElementById("score").innerHTML = listfound.length+" / "+Object.keys(languages).length;
    for(var i=0; i<error.length; i++){
        if(i<erreur){
            error[i].className = "error_true";
        }else{
            error[i].className = "error_false";
        }
    }
}

function hide(event){
    event.target.parentNode.style.display = "none";
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

function closebtn() {
    var closebtn = newElement("span", {"className": "close btn","innerHTML": "&times;"});
    closebtn.addEventListener("click", hide);
    return closebtn;
}

function startgame(type){
    var game = document.getElementById("gamepage");
    game.style.zIndex = "2";
    game.style.display = "";
    gamestate = 1;
    gamescorevisual();
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

        if(tpourcentage > pourcentage){
            pourcentage = tpourcentage;
            keyselected = key;
        }
    }
    console.log(pourcentage);
    if(texttolerance <= pourcentage){
        return keyselected;
    }

    return -1;
}

function showlistfound(){
    document.getElementById("modalgame_Title").innerHTML = "Liste des languages trouvées";
    var content = newElement("div",{"className": "listfound"});
    content.appendChild(newElement("h1",{"innerHTML": listfound.length+"/"+Object.keys(languages).length}));
    for(var i=0; i<listfound.length; i++){
        content.appendChild(newElement("span",{"innerHTML": listfound[i]}));
    }
    document.getElementById("modalgame_Content").innerHTML = "";
    document.getElementById("modalgame_Content").appendChild(content);
    document.getElementById("modalgame_Img").src = "";
    document.getElementById("modalgame").style.display = "";
}

function loadmodal(selectLang){
    document.getElementById("modalgame_Title").innerHTML = languages[selectLang].title;
    document.getElementById("modalgame_Img").src = languages[selectLang].picture;
    document.getElementById("modalgame_Content").innerHTML = languages[selectLang].description;
    document.getElementById("modalgame").style.display = "";
}

function typing(value){
    //value = value.replace(regex, '');
    console.log("test: "+listfound.find(element => element == value));
    if(languages[value] !== undefined && listfound.find(element => element == value) == undefined){
        console.log(" ✓ "+value);
        loadmodal(value);
        listfound.push(value);
    }else if(value.length >= 3){
        var langselected = checkpourcentage(value);
        if(langselected != -1 && listfound.find(element => element == langselected) == undefined){
            console.log(" ✓ "+langselected);
            loadmodal(langselected);
            listfound.push(langselected);
        }else{
            console.log(" ✕ "+value);
            erreur ++;
        }
    }else{
        console.log(" ✕ "+value);
        erreur ++;
    }
    if(erreur >= maxerrors) {
        document.getElementById("gamepage").style.display = "none";
        document.getElementById("start").style.display = "none";
        document.getElementById("losepage").style.display = "";
        document.getElementById("looseresult").innerHTML = listfound.length+"/"+Object.keys(languages).length;
    }
    gamescorevisual();
}

async function init(){
    // START
    var start = newElement("div",{"id": "start","style": "background-color: rgba(0, 0, 0, 0.75)"/*"zIndex:0;display:none"*/});
    var logo = newElement("img",{"src":"ressource/Logo2.svg","className":"CenteredImage centerelement"});
    var logolouse = newElement("img",{"src":"ressource/Logo2.svg","className":"CenteredImage centerelement"});
    var logowin = newElement("img",{"src":"ressource/Logo2.svg","className":"CenteredImage centerelement"});
    var text0 = newElement("p",{"className":"centerelement langcount","style": "font-size:150px;color:#0AEFF7;background: -webkit-linear-gradient(#057C80, #0AEFF7);background-clip: border-box; -webkit-background-clip: text; -webkit-text-fill-color: transparent","innerHTML": "0"});
    var text1 = newElement("p",{"className":"centerelement","style": "font-size:15px;font-family:GothanLight","innerHTML": "Références de<br>langages de programmation<br>à retrouver"});
    var text2 = newElement("p",{"innerHTML": "Cliquer ici pour commencée","className":"centerelement btn start0","style": "color:#FFAAFF;margin-top:5vh;display:none"});
    var text3 = newElement("p",{"innerHTML": "Cliquer ici pour continué","className":"centerelement btn start1","style": "color:#FFAAFF;margin-top:5vh;display:none"});
    var text4 = newElement("p",{"innerHTML": "Cliquer ici pour retourne a l'acceuil","className":"centerelement btn home", "style": "color:#FFAAFF;margin-top:5vh"});
    var text5 = newElement("p",{"id": "looseresult", "className":"centerelement home", "style": "font-size:150px;color:#0AEFF7;background: -webkit-linear-gradient(#057C80, #0AEFF7);background-clip: border-box; -webkit-background-clip: text; -webkit-text-fill-color: transparent"});
    var text6 = newElement("p",{"innerHTML": "Votre resultat","className":"centerelement home", "style": "color:#FFAAFF;margin-top:8vh"});
    var text7 = newElement("p",{"innerHTML": ""});
    var charging = newElement("div",{"style": "margin-top:5vh","className":"neon-bar","innerHTML": "<progress class='bar' value='0' max='100'></progress><span class='bar__value'>0%</span>"});
    var typingzone = newElement("div",{"id":"typingzone",'style': 'display:none'});
    var modalgame = newElement("div",{"id":"modalgame",'style': 'display:none'});
    var losepage = newElement("div",{"id":"losepage",'style': 'display:none',"className":"endpage"});
    var winpage = newElement("div",{"id":"winpage",'style':'display:none',"className":"endpage"})

    text2.addEventListener("click", function(){startgame(0)});
    text3.addEventListener("click", function(){startgame(1)});
    text4.addEventListener("click", function(){
        document.getElementById("losepage").style.display = 'none';
        document.getElementById("gamepage").style.display = 'none';
        document.getElementById("start").style.display = '';
        erreur=0;
        listfound=[];
        gamestate=0;
    });

    start.appendChild(logo);
    start.appendChild(text0);
    start.appendChild(text1);
    start.appendChild(text2);    
    start.appendChild(text3);
    start.appendChild(charging);

    losepage.appendChild(logolouse);
    losepage.appendChild(text6);
    losepage.appendChild(text5);
    losepage.appendChild(text4);

    page.appendChild(start);
    page.appendChild(losepage);

    // Modal Ingame

    modalgame.appendChild(closebtn());
    modalgame.appendChild(newElement("h1",{"id":"modalgame_Title"}));
    var div = newElement("div",{"className":"divgame"});
    div.appendChild(newElement("img",{"id":"modalgame_Img","src":""}));
    div.appendChild(newElement("p",{"id":"modalgame_Content"}));
    modalgame.appendChild(div);
    page.appendChild(modalgame);

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
        languages[jsonfile[i].name] = {"title": jsonfile[i].name,"description": jsonfile[i].description, "picture": jsonfile[i].picture};
    }
    var conditions = newElement("div",{"id":"conditions","style":"display:none","innerHTML":"<h1>"+jsonfile[jsonsize-1].title+"</h1>"+jsonfile[jsonsize-1].content});
    conditions.appendChild(closebtn());
    page.appendChild(conditions);
    var conditonbtn = newElement("span",{"className": "conditonbtn btn","innerHTML": "Conditions General"});
    conditonbtn.addEventListener("click", function(e) { document.getElementById("conditions").style.display = ""});
    page.appendChild(conditonbtn);


    // GAME
    var gamepage = newElement("div",{"id":"gamepage","style":"display:none;zIndex:0"});
    var zoom = newElement("div",{"className": "zoom"});
    var chambre = newElement("img",{"src": "ressource/chambre.jpg", "alt": "Image" });
    zoom.appendChild(chambre);

    var scores = newElement("div",{"id":"scores"});
    var stext = newElement("p");
    var score = newElement("div",{"id":"score","innerHTML":" 0 / 0"});
    var sx = newElement("div",{"id":"error"});
    for(var i=0;i< maxerrors;i++){
        var scoreX = newElement("span", {"innerHTML":" ✖ "});
        sx.appendChild(scoreX);
    }
    scores.appendChild(stext);
    scores.appendChild(score);
    scores.appendChild(sx);

    var foundbtn = newElement("span",{"className": "btn foundbtn","innerHTML":"<img src=\"ressource/search.svg\" alt=\"Search incon\"> LANGAGES TROUVÉS"});
    foundbtn.addEventListener("click", function(e) { showlistfound(); });

    gamepage.appendChild(zoom);
    gamepage.appendChild(newElement("img",{"className":"logoImg","src": "ressource/Logo.svg", "alt": "Logo"}));
    gamepage.appendChild(scores);
    gamepage.appendChild(foundbtn);
    gamepage.appendChild(typingzone);
    page.appendChild(gamepage);

    var startzoom = newElement("script",{"innerHTML":"zoom();"});
    document.body.appendChild(startzoom);
    gamescorevisual();

}

init();
startanimation();
//var zoommodule = newElement("script",{"src":"ressource/zoom-by-ironex.min.js"});
//document.body.appendChild(zoommodule);

document.addEventListener("keydown", (event) => {
    console.log("KEY: "+event.key);
    var keylenght = event.key.split("").length;
    var typingzone = document.getElementById("typingzone");
    if(gamestate == 1 && document.getElementById("modalgame").style.display == "none"){
        if(event.key.match(/^[a-z\_\-\:#+,.0-9]{1}/i) && keylenght == 1){
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
        }
    }
    if(event.key.match("Escape")){
        if(document.getElementById("conditions").style.display != "none"){
            document.getElementById("conditions").style.display = "none";
        }else if(typingzone.style.display != "none"){
            typingzone.style.display = "none";
        }else if(document.getElementById("modalgame").style.display != "none"){
            document.getElementById("modalgame").style.display = "none";
        }
    }
});