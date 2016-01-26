<?php
//On déclare une session
session_start();
?>



<!DOCTYPE html>
<html>
    <head>
        <title>Memory</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <script src="AlertifyJS/build/alertify.min.js"></script>

        <!-- include the style -->
        <link rel="stylesheet" href="AlertifyJS/build/css/alertify.css" />
        <!-- include a theme -->
        <link rel="stylesheet" href="AlertifyJS/build/css/themes/default.css" />

        <?php

            //La variable $style prend comme valeur le nom de la session

            $style =(isset($_SESSION['design'])) ? $_SESSION['design'] : 'alliance';

            echo '<link rel="stylesheet" type="text/css" href="css/'.$style.'.css" />';

        ?>
        <script type="text/javascript" src="js/jeu.js"></script>



    </head>

    <body onload="request()">


        <div class="faction"></div>
        <div id="titre"></div>
        <div class="theme" id="theme">
            <span  onclick="changeTheme('alliance');orgrimmar.stop();hurlevent.stop();hurlevent.play()"><img class="theme" src="images/Alliance.png"></span>
            <span  onclick="changeTheme('horde');hurlevent.stop();orgrimmar.play()"><img  class="theme" src="images/Horde.png"></span>

        </div>
        <div id="content" >


            <div class="navigation" id="nav">
                <div class="item score">
                    <a href="#" class="icon"></a>
                    <h2><a class="menu" href="#" onclick="score_jeu()">Score</a></h2>
                </div>
                <div class="item regle">
                    <a href="#" class="icon"></a>
                    <h2><a class="menu" href="#" onclick="regle()">Règles</a></h2>
                </div>
                <div class="item easy">
                    <img src="images/bg_easyMode.png" alt="" width="199" height="199" class="circle"/>
                    <a href="#" class="icon"></a>
                    <h2>Facile</h2>
                    <ul>
                        <li class="start"><a href="#" onclick="start(9);soundManager.stopAll();partie.play()">Start !</a></li>
                    </ul>
                </div>
                <div class="item medium">
                    <img src="images/bg_mediumMode.png" alt="" width="199" height="199" class="circle"/>
                    <a href="#" class="icon"></a>
                    <h2>Moyen</h2>
                    <ul>
                        <li class="start"><a href="#" onclick="start(16);soundManager.stopAll();partie.play()">Start !</a></li>
                    </ul>
                </div>
                <div class="item hard">
                    <img src="images/bg_hardMode.png" alt="" class="circle"/>
                    <a href="#" class="icon"></a>
                    <h2>Difficile</h2>
                    <ul>
                        <li class="start"><a href="#" onclick="start(25);soundManager.stopAll();partie.play()">Start !</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="son">
            <img id="on" src="images/icon_son_on.png" onclick="on_son()" height="30px" width="30px">
            <img id="off" src="images/icon_mute.png" onclick="off_son()" height="30px" width="30px">
        </div>

        <div id="jeu">

            <div id="memory_board"></div>
            <div id="disabled"></div>
            <div id="info_jeu">
                <button title="Retour au menu" "><img src="images/pdf_info.png" id="pdf"></button>
                <div id="rotate" onclick="retourMenu(); partie.stop(); menuSon()"></div>
                <p id="niveau"></p>
                <p id="nom"></p>
                <p id="coup"> </p>
                <img src="images/chrono.png" id="chrono" height="60px">
                <div id="chronotime">00:00:000</div>

                <button id="rejouer" onclick="rejouer()">Rejouer</button>
                <button id="score_jeu" onclick="score_jeu()">Scores</button>
            </div>

            <div id="win"></div>

        </div>

        <!-- The JavaScript -->
        <script type="text/javascript" src="Sound/script/soundmanager2.js"></script>
        <script type="text/javascript">
            soundManager.url = 'Sound/swf/';

            var hurlevent; // On le déclare avant, histoire qu'il soit une variable globale.
            var orgrimmar;
            soundManager.onload = function() {
                hurlevent = soundManager.createSound(
                    {
                        id : "hurlevent",
                        url : "musique/hv.mp3" // Attention pas de virgule ici !
                    });
                orgrimmar = soundManager.createSound(
                    {
                        id : "orgrimmar",
                        url : "musique/orgri.mp3"
                    });
                partie =soundManager.createSound(
                    {
                        id : "partie",
                        url : "musique/partie.mp3"
                    }
                );
                hurlevent.play();
           };

            function menuSon(){
                if(style=="alliance"){
                    soundManager.stopAll();
                    hurlevent.play();
                }
                else if(style=="horde"){
                    soundManager.stopAll();
                    orgrimmar.play();
                }

            }
        </script>

        <script type="text/javascript" src="js/score.js"></script>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="jquery.easing.1.3.js"></script>
        <script type="text/javascript" src="js/changeTheme.js"></script>
        <script type="text/javascript" src="js/alertCustom.js"></script>
        <script type="text/javascript" src="js/chronometre.js"></script>
        <script type="text/javascript">
            $(function() {
                $('#nav > div').hover(
                function () {
                    var $this = $(this);
                    $this.find('img').stop().animate({
                        'width'     :'300px',
                        'height'    :'250px',
                        'top'       :'-45px',
                        'left'      :'-20px',
                        'opacity'   :'1.0'
                    },500,'easeOutBack',function(){
                        $(this).parent().find('ul').fadeIn(700);
                    });

                    $this.find('a:first,h2').addClass('active');
                },
                function () {
                    var $this = $(this);
                    $this.find('ul').fadeOut(500);
                    $this.find('img').stop().animate({
                        'width'     :'52px',
                        'height'    :'52px',
                        'top'       :'0px',
                        'left'      :'0px',
                        'opacity'   :'0.1'
                    },5000,'easeOutBack');

                    $this.find('a:first,h2').removeClass('active');
                }
            );
            });

        </script>

    </body>
</html>