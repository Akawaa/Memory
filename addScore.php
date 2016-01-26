<?php
$cnct = mysqli_connect("localhost","bcaly" ,"0503", "Memory");
header("Content-Type: text/Plain");

    if($_POST){
        /* VALUES */
        $nom=$_POST['nom'];
        $coup=$_POST['coup'];
        $temps=$_POST['temps'];
        $level=$_POST['niveau'];
        $rank=$_POST['rang'];

        $tab=[];
        $compteur=0;

        $req="SELECT * FROM Score WHERE niveau=".$level.";";
        $query=mysqli_query($cnct,$req);
        while($element=mysqli_fetch_assoc($query)){
            $tab[$compteur]=$element['nom'].'-'.$element['coup'].'-'.$element['temps'].'-'.$element['rang'].'-'.$element['niveau'];
            $compteur++;
        }

        $joueur1=explode("-",$tab[0]);
        $joueur2=explode("-",$tab[1]);
        $joueur3=explode("-",$tab[2]);

        print_r($joueur1);
        print_r($joueur2);
        print_r($joueur3);

        if($rank==1){

            $req1="UPDATE Score SET nom='".$nom."', coup='".$coup."', temps='".$temps."' where niveau='".$level."' AND rang=1;";
            $query=mysqli_query($cnct,$req1);
            echo $req1;

            $req2="UPDATE Score SET nom='".$joueur1[0]."', coup='".$joueur1[1]."', temps='".$joueur1[2]."' where niveau='".$level."' AND rang=2;";
            $query=mysqli_query($cnct,$req2);
            echo $req2;

            $req3="UPDATE Score SET nom='".$joueur2[0]."', coup='".$joueur2[1]."', temps='".$joueur2[2]."' where niveau='".$level."' AND rang=3;";
            $query=mysqli_query($cnct,$req3);
            echo $req3;
        }
        elseif($rank==2){
            $req1="UPDATE Score SET nom='".$nom."', coup='".$coup."', temps='".$temps."' where niveau='".$level."' AND rang=2;";
            $query=mysqli_query($cnct,$req1);
            echo $req1;

            $req2="UPDATE Score SET nom='".$joueur2[0]."', coup='".$joueur2[1]."', temps='".$joueur2[2]."' where niveau='".$level."' AND rang=3;";
            $query=mysqli_query($cnct,$req2);
            echo $req2;
        }
        elseif($rank==3){
            $req1="UPDATE Score SET nom='".$nom."', coup='".$coup."', temps='".$temps."' where niveau='".$level."' AND rang=3;";
            $query=mysqli_query($cnct,$req1);
            echo $req1;
        }

    }
    else{
        header('HTTP/1.1 500 Looks like mysql error, could not insert record!');
        exit();
    }



?>