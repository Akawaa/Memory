/****** THEME ******/

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

 var style;
/* Envoi */
function changeTheme(theme)
{
    style = theme;
    var newTheme = newXMLHttpRequest();

    newTheme.onreadystatechange = function(){
        if(newTheme.readyState == 4 && newTheme.status == 200){
            creer_style(newTheme.responseText);
        }
        else{
            if(newTheme.status == 404){
                alert('Erreur ' +newTheme.status + '! Le fichier php semble être absent...');
            }
        }
    };
    newTheme.open("POST", "changeTheme.php" , true);
    newTheme.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    newTheme.send("theme=" + theme);
}

/* Création de balise link*/
function creer_style(theme){
    var lien = document.createElement("link");

    lien.setAttribute("rel", "stylesheet");
    lien.setAttribute("type", "text/css");
    lien.setAttribute("href", "css/"+theme +".css");

    if (typeof lien != "undefined");
    document.getElementsByTagName("head")[0].appendChild(lien);
}

/****** SON ******/

/*Fonction mute*/
function off_son() {
    soundManager.muteAll();
    document.getElementById("on").src = "images/icon_son.png";
    document.getElementById("off").src = "images/icon_mute_on.png";
}

/*Fonction demute*/
function on_son(){
        soundManager.unmuteAll();
        document.getElementById("on").src = "images/icon_son_on.png";
        document.getElementById("off").src = "images/icon_mute.png";
}

/* Retour menu */
function menuSon(){
    if(style=="alliance"){
        soundManager.stopAll();

    }

}

