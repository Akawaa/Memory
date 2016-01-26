var name="";
function start(niveau){
    var difficulte;

    if(niveau==9){
        difficulte="facile";
    }
    else if(niveau==16){
        difficulte="moyen";
    }
    else if(niveau==25){
        difficulte="difficile";
    }


    alertify.prompt("Nouvelle partie - "+difficulte,"Entrez votre nom", "",
        function(evt, value){
            if(value==""){
                alertify.error('Vous devez entrer votre nom !');

                alertify.cancel("");
            }
            name=value;
            element = document.getElementById("content");
            element.style.visibility="hidden";
            element = document.getElementById("titre");
            element.style.visibility="hidden";
            element = document.getElementById("theme");
            element.style.visibility="hidden";
            element = document.getElementById("jeu");
            element.style.visibility="visible";

            if(niveau==9){
                element = document.getElementById("niveau");
                element.innerHTML="Facile";
            }
            else if(niveau==16){
                element = document.getElementById("niveau");
                element.innerHTML="Moyen";
            }
            else{
                element = document.getElementById("niveau");
                element.innerHTML="Difficile";
            }
            element = document.getElementById("nom");
            element.innerHTML=name;

            initTable(niveau);

            if(niveau==9){
                element = document.getElementById("memory_board");
                element.style.width="500px";
                element.style.top="180px";
            }
            else if(niveau==25){
                element = document.getElementById("memory_board");
                element.style.width="700px";
                for(i=0;i<niveau;i++){
                    element = document.getElementById("carte_"+i);
                    element.style.width="60px";
                    element.style.height="60px";
                }
            }



        },null).set({transition:'fade'}).set('labels',{ok:'Jouer',cancel:'Annuler'}).show();


}
function regle(){
    alertify.alert('Règles du jeu','Le but du jeu est de retourner les cartes afin de réunir les paires. Il y une carte piège en Facile et Difficile.');
}

