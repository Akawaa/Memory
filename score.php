<?php
$cnct = mysqli_connect("localhost","bcaly" ,"0503", "Memory");

header("Content-Type: text/xml");
echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>";


echo "<list>";

$query = "SELECT * FROM Score WHERE niveau='9' ORDER BY rang";
$req = mysqli_query($cnct,$query);
while ($element = mysqli_fetch_assoc($req)) {
    echo '<itemsg id="'.$element["id"].'" rang="'.$element["rang"].'" nom="'.$element["nom"].'" coup="'.$element["coup"].'" temps="'.$element["temps"].'"/>';
}

$query = "SELECT * FROM Score WHERE niveau='16' ORDER BY rang";
$req = mysqli_query($cnct,$query);
while ($element = mysqli_fetch_assoc($req)) {
    echo '<itemmg id="'.$element["id"].'" rang="'.$element["rang"].'" nom="'.$element["nom"].'" coup="'.$element["coup"].'" temps="'.$element["temps"].'"/>';
}

$query = "SELECT * FROM Score WHERE niveau='25' ORDER BY rang";
$req = mysqli_query($cnct,$query);
while ($element = mysqli_fetch_assoc($req)) {
    echo '<itemhg id="'.$element["id"].'" rang="'.$element["rang"].'" nom="'.$element["nom"].'" coup="'.$element["coup"].'" temps="'.$element["temps"].'"/>';
}



echo "</list>";


?>





