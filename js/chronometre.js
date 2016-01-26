var startTime = 0;
var go = 0;
var end = 0;
var diff = 0;
var timerID = 0;

function chrono(){
    end = new Date();
    diff = end - go;
    diff = new Date(diff);
    var msec = diff.getMilliseconds();
    var sec = diff.getSeconds();
    var min = diff.getMinutes();
    if (min < 10){
        min = "0" + min;
    }
    if (sec < 10){
        sec = "0" + sec;
    }
    if(msec < 10){
        msec = "00 " +msec;
    }
    else if(msec < 100){
        msec = "0" +msec;
    }
    document.getElementById("chronotime").innerHTML = min + ":" + sec + ":" + msec;
    timerID = setTimeout("chrono()", 10);
}
var chronoStart = function(){
    go = new Date();
    chrono();
};

function chronoReset(){
    document.getElementById("chronotime").innerHTML = "00:00:000";
    go = new Date();
    end = 0;
    diff = 0;
    timerID = 0;
}

function chronoStop(){
    clearTimeout(timerID);
}
