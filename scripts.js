
document.getElementById('map').style.display = "none";
document.getElementById('sidebar').style.width = "100vw";

country = country.sort(() => Math.random() - 0.5)

function sclect() {
    var selcc = document.getElementById('clselect');
    var selval = selcc.value;
    document.getElementById('vision').innerHTML = selval;
    var x = selval;
    globalThis.wah = "tile " + x
}

function show() {
    var takeit = event.target || event.srcElement
    var name = takeit.id.slice(5,)
    var showclass = takeit.classList[1]
    var cntr = country.filter(s => s.includes(showclass))
    globalThis.value = Number(takeit.innerHTML)
    var cntry = cntr.toString().split(" ")[0]
    var infofield = document.getElementById('info');

    infofield.innerHTML = "Field id: " + name + " <br> Belongs to: " + cntry + " <br> Strenght: " + value;

    var north = Number(name) - 41
    var south = Number(name) + 41
    var east = Number(name) + 1
    var west = Number(name) - 1   
    var northid = document.getElementById("field" + north);
    var southid = document.getElementById("field" + south);
    var eastid = document.getElementById("field" + east);
    var westid = document.getElementById("field" + west);
    
}


function act() {
    var takeit = event.target
    var class_to_add = "tile " + myteam
    
    if ((class_to_add == takeit.className) && (whatclass == myteam)) {
        var howmuch = Number(takeit.innerHTML) + 1
        if (howmuch < 6){taketurn()}
        if (howmuch > 5){howmuch = 5}
        if (howmuch > 4){
            takeit.style.borderColor = "white"
            }
        takeit.innerHTML = howmuch;
    } else {
        if ( takeit.classList[2] == "neigh" ) {
            var fieldval = Number(takeit.innerHTML)
            var finalvalue = fieldval - 1
            if (finalvalue < 1) {
                takeit.className = class_to_add
                takeit.innerHTML = 1
            } else {
                takeit.innerHTML = finalvalue
            }
        getneigh(myteam)
        flashfield()
        taketurn()
        }
    }

}

function getneigh(neigh) {
    var teamsel = neigh
    var clasanama = "tile " + teamsel
    var ara = []

    var neigh = document.getElementsByClassName(teamsel);
    for (var i = 0; i < neigh.length; i++) {
        var id = neigh[i].id.slice(5,);
        var northid = Number(id) - 41
        if (northid < 1){northid = 1}
        var northfield = document.getElementById('field' + northid);
	   var southid = Number(id) + 41
        var southfield = document.getElementById('field' + southid);
	   var westid = Number(id) - 1
        var westfield = document.getElementById('field' + westid);
	   var eastid = Number(id) + 1
        var eastfield = document.getElementById('field' + eastid);
    if (northfield.className !== clasanama && northfield.className !== "tile sea") {
    ara.push(northfield);}
    if (southfield.className !== clasanama && southfield.className !== "tile sea") {
    ara.push(southfield);}
    if (westfield.className !== clasanama && westfield.className !== "tile sea") {
    ara.push(westfield);}
    if (eastfield.className !== clasanama && eastfield.className !== "tile sea") {
    ara.push(eastfield);}
    window.ara = ara;
    }
}

function flashfield() {
        for (var i = 0;i < ara.length;i++){
        ara[i].classList.add("neigh");
        var neighlist = document.getElementsByClassName('neigh');
        window.neighlist = neighlist
    }
}

function removeflash() {
        for (var i = 0;i < ara.length;i++){
        ara[i].classList.remove("neigh");
    }
}

function distributecapitals() {
    for (var i = 0;i < country.length;i++) {
        var isor = country[i].split(" ")[1]
        var asor = document.getElementsByClassName(isor);
        var rand = Math.floor(Math.random() * asor.length);
        asor[rand].innerHTML = 5;
        asor[rand].style.borderColor = "white";
    }
}

function countcapitals(given) {
    capcount = 0
    var lol = document.getElementsByClassName(given)
    for (var i = 0;i < lol.length;i++) {
        if (lol[i].style.borderColor == "white") {
        capcount++  
        }
    } 
    window.capcount = capcount
}

function getinside(whatclass) {
    var insiders = document.getElementsByClassName(whatclass)
    var koko = []
    for (var i = 0;i < insiders.length;i++) {
        if (insiders[i].innerText !== "5") {
            koko.push(insiders[i])
        }
    }
    window.inside = koko.length
}

function turn(counturn) {
countcapitals(counturn)
for (var i = 0;i < capcount;i++) {
    getneigh(counturn)
    getinside(counturn)
    /*var inside = document.getElementsByClassName(counturn).length*/
    var outside = ara.length
    var total = inside + outside
    var randturn = Math.floor(Math.random() * total) + 1
    if (randturn <= inside) {
        var terirors = document.getElementsByClassName(counturn)
        var randteri = Math.floor(Math.random() * terirors.length)
        var terivalue = Number(terirors[randteri].innerHTML)
        var finalvalue = terivalue + 1
        if (finalvalue > 5){finalvalue = 5}        
        if (finalvalue > 4){terirors[randteri].style.borderColor = "white"}
        terirors[randteri].innerHTML = finalvalue; 
    } else {
        var tiletoattack = ara[Math.floor(Math.random() * ara.length)]
        var tilevalue = Number(tiletoattack.innerHTML)
        var finalvalue = tilevalue - 1
        if (finalvalue < 1) {
            var tileclassname = "tile " + counturn 
            tiletoattack.className = tileclassname            
            tiletoattack.innerHTML = 1
        } else {
            tiletoattack.innerHTML = finalvalue
        }
    }
}    
}

var runturnbut = document.getElementById('runturn')
var runroundbut = document.getElementById('runround')

function runround() {
window.turnum = 0
var thisbutton = event.target
thisbutton.style.display = "none"
runturnbut.style.display = "block"
window.whatteam = country[turnum].split(' ')[0]
window.whatclass = country[turnum].split(' ')[1]
runturnbut.innerHTML = "Run turn: " + whatteam
distributecapitals()
    if (whatclass == myteam) {
        myturn(myteam)
    }
}

function runturn() {
turn(whatclass)
turnthings()
}


document.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        if (runturnbut.style.display == "block") {
            runturn()   
        }

    }
});

function turnthings() {
    window.turnum++
if (turnum == country.length) {
    window.turnum = 0
    window.whatteam = country[turnum].split(' ')[0]
    window.whatclass = country[turnum].split(' ')[1]
    runturnbut.innerHTML = "Run turn: " + whatteam

} else {
    window.whatteam = country[turnum].split(' ')[0]
    window.whatclass = country[turnum].split(' ')[1]
    runturnbut.innerHTML = "Run turn: " + whatteam
    if (whatclass == myteam) {
        myturn(myteam)
    }
}
}
 
function myturn(country) {
    document.getElementsByClassName('turnpanel')[0].style.display = "block"
    getneigh(country)
    flashfield()
    runturnbut.style.display = "none";
    countcapitals(country)
    window.turrets = capcount
    document.getElementById('showturns').innerHTML = "Turns left: " + turrets   
}

function taketurn() {
    window.turrets -= 1
    document.getElementById('showturns').innerHTML = "Turns left: " + turrets   
    if (turrets == 0) {
        removeflash()
        runturnbut.style.display = "block";
        document.getElementsByClassName('turnpanel')[0].style.display = "none"
        turnthings()
    }
}

function startgame() {
    document.getElementById('sidebar').classList.add('sidebaranim')
    document.getElementById('map').style.display = "block"
    document.getElementById("map").classList.add('showmapx')
    document.getElementById('start').style.display = "none";
    document.getElementById('teamsel').style.display = "none";
    window.myteam = document.getElementById('teamsel').value
    window.turnum = 0
    runturnbut.style.display = "block"
    window.whatteam = country[turnum].split(' ')[0]
    window.whatclass = country[turnum].split(' ')[1]
    runturnbut.innerHTML = "Run turn: " + whatteam
    distributecapitals()
    powerdistrubution()
        if (whatclass == myteam) {
            myturn(myteam)
        }
}

var countrysel = document.getElementById('teamsel')

for (var i = 0;i < country.length;i++) {
    var option = document.createElement("option")
    option.text = country[i].split(" ")[0]
    option.value = country[i].split(" ")[1]
    countrysel.add(option)
}
var spectateoption = document.createElement('option')
spectateoption.text = "Spectate"
spectateoption.value = "null"
countrysel.add(spectateoption)


function howmanyteritories() {
    for (var i = 0;i < country.length;i++) {
        var cnt = country[i].split(" ")[0]
        var cls = country[i].split(" ")[1]
        var cla = document.getElementsByClassName(cls).length
        console.log(cnt + " : " + cla)
    }
}

function distributepower(ctry) {
var lolpower = document.getElementsByClassName(ctry).length * 0.5
var lol = document.getElementsByClassName(ctry)
for (var i = 0;i < lolpower;i++){
    var rand = Math.floor(Math.random() * lol.length)
    var initvalue = Number(lol[rand].innerHTML)
    var finalvalue = initvalue + 1
    if (finalvalue > 4){finalvalue = 5;
    lol[rand].style.borderColor = "white"}
    lol[rand].innerHTML = finalvalue
}
}

function powerdistrubution() {
    for (var i = 0;i < country.length;i++) {
        var countclass = country[i].split(" ")[1]
        distributepower(countclass)
    }

} 

/*document.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
         keyturn.click()
    }
});
/*var x = myteam
var wah = "tile " + x
*/


