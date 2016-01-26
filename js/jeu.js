/******* JEU *******/

/* Variables */
var initMemory = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var valeurs_cartes_retournees = [];

var table_jeu = [];
var carte_id = [];
var nbCarte_trouvees = 0;
var nb_coups=0;
var nb_essai=0;
var level = "";

var tempsChrono ="";


/* Random*/
Array.prototype.carte_random = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};

/* Inialisation de la table*/
function initTable(niveau){
    level=niveau;

    var carte = '';

    //Initialise les cartes trouvées
    nbCarte_trouvees = 0;
    //Réinitialisation des variables
    carte_id = [];
    valeurs_cartes_retournees = [];

    table_jeu = [];
    nb_coups=0;
    nb_essai=0;


    //Initialise les nb coups
    nb_coups =0;

    if(niveau==9){
        nb_essai=10;
    }
    else if(niveau==16){
        nb_essai=15;
    }
    else if(niveau==25){
        nb_essai=20;
    }


    element = document.getElementById("coup");
    element.innerHTML="Nombre d'essais : "+nb_essai;

    //Réduit la liste à la taille du jeu
    for(i=0;i<niveau;i++){
        table_jeu[i]=initMemory[i];
    }

    //Inialisation des cartes
    table_jeu.carte_random();
    for(var i = 0; i < table_jeu.length; i++){
        carte += '<div id="carte_'+i+'" class="carte" onclick="flipCard('+i+');memoryFlipCarte(this,\''+table_jeu[i]+'\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = carte;
}

/* Rejouer */
function rejouer(){
    //Réinitialisation du chrono
    chronoStop();
    chronoReset();



    //Réinitialisation des variables
    carte_id = [];
    valeurs_cartes_retournees = [];

    table_jeu = [];
    nbCarte_trouvees = 0;
    nb_coups=0;
    nb_essai=0;
    rank =0;

    element = document.getElementById("disabled");
    element.style.visibility ="hidden";
    element = document.getElementById("win");
    element.classList.remove('winApparition');
    element.style.background = "url(images/win.png) no-repeat";
    element.style.visibility ="hidden";
    element.innerHTML ="";




    //Initialisation de la table
    initTable(level);

    //Adaptation de l'affichage suivant le niveau
    if(level==9){
        element = document.getElementById("memory_board");
        element.style.width="500px";
        element.style.top="180px";
    }
    else if(level==25){
        element = document.getElementById("memory_board");
        element.style.width="700px";
        for(i=0;i<level;i++){
            element = document.getElementById("carte_"+i);
            element.style.width="60px";
            element.style.height="60px";
        }
    }
}



function memoryFlipCarte(carte,valeur){
    if(carte.innerHTML == "" && valeurs_cartes_retournees.length < 2){
        //Initialisation des images par rapport à leur valeur

        carte.innerHTML=" ";

        for(var i=1;i<=13;i++){
            if(valeur==i){
                carte.style.background ='url(images/img_carte/'+i+'.png) no-repeat';
                carte.style.backgroundSize = '100% 100%';
            }
        }

        //Si aucune carte n'est retournée
        if(valeurs_cartes_retournees.length == 0){
            //Si première carte de la partie à être retournée
            if(diff==0){
                chronoStart();
            }

            //Ajoute la valeur et l'id de la carte dans les tableaux
            valeurs_cartes_retournees.push(valeur);
            carte_id.push(carte.id);

          //Si c'est la deuxième carte à être retournée
        } else if(valeurs_cartes_retournees.length == 1){

            //Ajoute la valeur et l'id de la carte dans les tableaux
            valeurs_cartes_retournees.push(valeur);
            carte_id.push(carte.id);

            //Compare la valeur des deux cartes
            if(valeurs_cartes_retournees[0] == valeurs_cartes_retournees[1]){
                //Si les cartes on les mêmes valeurs
                nbCarte_trouvees += 2;
                //Reinitialise les tableaux pour le prochain tour
                valeurs_cartes_retournees = [];
                carte_id = [];

                //Gestion de victoire
                if(table_jeu.length%2!=0){
                    if(nbCarte_trouvees == table_jeu.length-1){
                        chronoStop();
                        tempsChrono=document.getElementById('chronotime').innerHTML;

                        element = document.getElementById("disabled");
                        element.style.visibility="visible";

                        comparerScore(nb_coups,tempsChrono);
                        request();

                        element = document.getElementById("win");
                        if(rank==1){
                            element.style.background = "url(images/win1.png) no-repeat";
                            element.classList.add('winApparition');
                            element.style.visibility = "visible";
                            element.innerHTML="Vous êtes premier !";

                        }
                        else if(rank==2){
                            element.style.background = "url(images/win2.png) no-repeat";
                            element.classList.add('winApparition');
                            element.style.visibility = "visible";
                            element.innerHTML="Vous êtes deuxième!";

                        }
                        else if(rank ==3){
                            element.style.background = "url(images/win3.png) no-repeat";
                            element.classList.add('winApparition');
                            element.style.visibility = "visible";
                            element.innerHTML="Vous êtes troisième !";
                        }
                        else{
                            element.innerHTML="Vous n'êtes pas classé.";
                            element.classList.add('winApparition');
                            element.style.visibility = "visible";
                        }


                    }
                }
                else{
                    if(nbCarte_trouvees == table_jeu.length){
                        chronoStop();
                        tempsChrono=document.getElementById('chronotime').innerHTML;

                        element = document.getElementById("disabled");
                        element.style.visibility="visible";

                        comparerScore(nb_coups,tempsChrono);
                        request();


                        element = document.getElementById("win");
                        if(rank==1){
                            element.style.background = "url(images/win1.png) no-repeat";
                            element.classList.add('winApparition');
                            element.style.visibility = "visible";
                            element.innerHTML="Vous êtes premier !";

                        }
                        else if(rank==2){
                            element.style.background = "url(images/win2.png) no-repeat";
                            element.classList.add('winApparition');
                            element.style.visibility = "visible";
                            element.innerHTML="Vous êtes deuxième!";

                        }
                        else if(rank ==3){
                            element.style.background = "url(images/win3.png) no-repeat";
                            element.classList.add('winApparition');
                            element.style.visibility = "visible";
                            element.innerHTML="Vous êtes troisième !";
                        }
                        else{
                            element.classList.add('winApparition');
                            element.style.visibility = "visible";
                            element.innerHTML="Vous n'êtes pas classé.";

                        }



                    }
                }

            } else {
                function retourneCarte(){
                    var carte_1 = document.getElementById(carte_id[0]);
                    var carte_2 = document.getElementById(carte_id[1]);

                    carte_1.style.background = 'url(images/dos_carte.png) no-repeat';
                    carte_1.style.backgroundSize = '100% 100%';
                    carte_1.innerHTML = "";
                    carte_1.classList.remove('flipCard');

                    carte_2.style.background = 'url(images/dos_carte.png) no-repeat';
                    carte_2.style.backgroundSize = '100% 100%';
                    carte_2.innerHTML = "";
                    carte_2.classList.remove('flipCard');

                    nb_coups++;

                    //Décrémente le nombre d'essais
                    nb_essai--;
                    element = document.getElementById("coup");
                    element.innerHTML="Nombre d'essais : "+nb_essai;

                    console.log(nb_essai);

                    if(nb_essai<=0){
                        element = document.getElementById("disabled");
                        element.style.visibility="visible";
                        alertify.alert('Game Over..',"Vous avez utilisez tout les essais permis.").set('label','Ok').set({transition:'zoom'}).set('modal',false).show();
                        chronoStop();
                    }



                    valeurs_cartes_retournees = [];
                    carte_id = [];
                }
                setTimeout(retourneCarte, 500);

            }
        }
    }
}




/* Effet retournement carte */
function flipCard(carte){
    element = document.getElementById('carte_'+carte);
    element.classList.add('flipCard');

}

/* Retour au menu */
function retourMenu(){

    //Réinitialisation du chrono
    chronoStop();
    chronoReset();

    //Réinitialisation des valeurs
    table_jeu = [];
    nbCarte_trouvees = 0;
    nb_coups=0;
    nb_essai=0;
    level=0;

    //Retour au menu
    element = document.getElementById("memory_board");
    element.style.width="650px";
    element.style.top="130px";
    element.innerHTML="";
    element = document.getElementById("disabled");
    element.style.visibility="hidden";
    element = document.getElementById("win");
    element.style.background = "url(images/win.png) no-repeat";
    element.style.visibility ="hidden";
    element.innerHTML ="";
    element = document.getElementById("content");
    element.style.visibility="visible";
    element = document.getElementById("titre");
    element.style.visibility="visible";
    element = document.getElementById("theme");
    element.style.visibility="visible";
    element = document.getElementById("jeu");
    element.style.visibility="hidden";
}

/****** SCORE ******/

/* Variables */
var tabScore =[];
var rank;

function comparerScore(coup, temps){

    if(level==9){
        tabScore = tabEasy;
    }
    if(level==16){
        tabScore = tabMedium;
    }
    if(level==25){
        tabScore = tabHard;
    }

    /* Score joueur courant */
    var milliCourante=temps.split(":")[2];
    var secCourante=temps.split(":")[1];
    var minCourante=temps.split(":")[0];

    var tabTempsJoueur = minCourante.concat(secCourante,milliCourante);

    /* Score rang 1 */
    var coupScore1=tabScore[0].split("-")[0];

    var milliScore1=tabScore[0].split("-")[1].split(':')[2];
    var secScore1=tabScore[0].split("-")[1].split(':')[1];
    var minScore1=tabScore[0].split("-")[1].split(':')[0];

    var tabTempsScore1 = minScore1.concat(secScore1,milliScore1);

    /* Score rang 2 */
    var coupScore2=tabScore[1].split("-")[0];

    var milliScore2=tabScore[1].split("-")[1].split(':')[2];
    var secScore2=tabScore[1].split("-")[1].split(':')[1];
    var minScore2=tabScore[1].split("-")[1].split(':')[0];

    var tabTempsScore2 = minScore2.concat(secScore2,milliScore2);

    /* Score rang 3 */
    var coupScore3=tabScore[2].split("-")[0];

    var milliScore3=tabScore[2].split("-")[1].split(':')[2];
    var secScore3=tabScore[2].split("-")[1].split(':')[1];
    var minScore3=tabScore[2].split("-")[1].split(':')[0];

    var tabTempsScore3 = minScore3.concat(secScore3,milliScore3);


    console.log("courant :"+tabTempsJoueur);
    console.log("score1 :"+tabTempsScore1);
    console.log("score2 :"+tabTempsScore2);
    console.log("score3 :"+tabTempsScore3);

    console.log("courant coup : "+coup);
    console.log("courant coup 1: "+coupScore1);
    console.log("courant coup 2: "+coupScore2);
    console.log("courant coup 3: "+coupScore3);


    if(coup<=coupScore1){
        if(coup==coupScore1){
            if(tabTempsJoueur <= tabTempsScore1){
                rank=1;
            }else{
                rank=2;
            }
        }else{
            rank =1;
        }


    }else if(coup<=coupScore2){
        if(coup==coupScore2){
            if (tabTempsJoueur <= tabTempsScore2) {
                rank = 2;
            }else {
                rank = 3;
            }
        }else{
            rank=2;
        }

    }else if(coup<=coupScore3) {
        if(coup==coupScore3){
            if (tabTempsJoueur <= tabTempsScore3){
                rank = 3;
            }else {
                rank = 4;
            }
        }
        else{
            rank=4;
        }

    }

        addScore(rank);


}

function addScore(rankGame){
    var newScore = newXMLHttpRequest();
    newScore.onreadystatechange = function() {
        if (newScore.readyState == 4 && (newScore.status == 200 || newScore.status == 0)) {
            request();
        }
    };
    newScore.open("POST", "addScore.php", true);
    newScore.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    newScore.send("nom="+name+"&coup="+nb_coups+"&temps="+tempsChrono+"&rang="+rankGame+"&niveau="+level);
}

