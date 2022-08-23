var page = document.getElementById('mainpage');
page.innerHTML += '<div class="autherdevice">Ce Site web n\'a pas eté concusses pour c\'ettes apparailes</div>';
var gamesave = JSON.parse(localStorage.getItem("gamesave") || "{}");
var error = 0;
var listfound = [];
var languages = {};
var mentions = {};
fetch('./ressource/languages.json')
    .then((response) => response.json())
    .then((json) => {
        jsonsize = json.length;
        for (var i = 0; i < jsonsize-1; i++) {
            languages[json[i].name] = {"description": json[i].description, "picture": json[i].picture}
        }
        var conditions = document.createElement("div");
        conditions.id = "conditions";
        conditions.style.zIndex = 1000;
        conditions.innerHTML = json[jsonsize-1].content;
        page.appendChild(conditions);
    });

/*for(var i ; i<jsonfiles.length-1 ; i++){
    console.log(jsonfiles[i]);
}*/
var loader = document.createElement('div');
loader.id = 'loader';
loader.style.zIndex = '0';
page.appendChild(loader);
