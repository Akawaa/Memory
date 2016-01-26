<?php
//On déclare une session
session_start();
//La variable $couleur prend comme valeur la variable $_POST['couleur'] si elle existe sinon c'est "defaut"
$theme =(isset($_POST['theme'])) ? $_POST['theme'] : 'alliance';
//On créer la session
$_SESSION['design'] = $theme;
//On affiche la couleur qui est récupéré dans "objet1.responseText" de la fonction "ajax()"
echo $theme;
session_destroy();
?>