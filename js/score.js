/* Instanciation XMLHttpRequest */
function newXMLHttpRequest() {
    var xhr = null;
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest();
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    return xhr;
}


function request() {
    var xhr = newXMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            readData(xhr.responseXML);
        }
    };
    xhr.open("POST", "score.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}

var tabEasy = [];
var tabMedium = [];
var tabHard = [];
var score = "";

function readData(oData) {
    var nodesEasy = oData.getElementsByTagName("itemsg");
    var nodesMedium = oData.getElementsByTagName("itemmg");
    var nodesHard = oData.getElementsByTagName("itemhg");

        score ="";
        score += "<center>";
        score += "<h3> Mode facile </h3>";
        score += "<ul>";
        for (var i=0 ; i<3 ; i++){
            score +="<li>"+nodesEasy[i].getAttribute("rang")+". "+nodesEasy[i].getAttribute("nom")+", en "+nodesEasy[i].getAttribute("coup")+" coups et "+nodesEasy[i].getAttribute("temps")+" </li>";
            tabEasy[i]=nodesEasy[i].getAttribute("coup")+"-"+nodesEasy[i].getAttribute("temps");
        }
        score += "</ul>";
        score += "</center>";
        score += "<br>";
        score += "<center>";
        score += "<h3> Mode moyen </h3>";
        score += "<ul>";
        for (var j=0 ; j<3 ; j++){
            score +="<li>"+nodesMedium[j].getAttribute("rang")+". "+nodesMedium[j].getAttribute("nom")+", en "+nodesMedium[j].getAttribute("coup")+" coups et "+nodesMedium[j].getAttribute("temps")+"</li>";
            tabMedium[j]=nodesMedium[j].getAttribute("coup")+"-"+nodesMedium[j].getAttribute("temps");
        }
        score += "</ul>";
        score += "</center>";
        score += "<br>";
        score += "<center>";
        score += "<h3> Mode difficile </h3>";
        score += "<ul>";
        for (var k=0 ; k<3 ; k++){
            score +="<li>"+nodesHard[k].getAttribute("rang")+". "+nodesHard[k].getAttribute("nom")+", en "+nodesHard[k].getAttribute("coup")+" coups et "+nodesHard[k].getAttribute("temps")+"</li>";
            tabHard[k]=nodesHard[k].getAttribute("coup")+"-"+nodesHard[k].getAttribute("temps");
        }
        score += "</ul>";
        score += "</center>";

}

function score_jeu(){
    request();
    alertify.alert('Scores',score).set('label','Ok').set({transition:'zoom'}).show();
}