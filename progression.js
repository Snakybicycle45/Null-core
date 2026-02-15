
// V8 INFINITE ARG SYSTEM

if(!localStorage.getItem("chapter")){
    localStorage.setItem("chapter","0");
}

if(!localStorage.getItem("authKey")){
    localStorage.setItem("authKey", Math.random().toString(36).substring(2));
}

if(!localStorage.getItem("visits")){
    localStorage.setItem("visits","0");
}

if(!localStorage.getItem("errors")){
    localStorage.setItem("errors","0");
}

localStorage.setItem("visits", parseInt(localStorage.getItem("visits")) + 1);

function getChapter(){
    return parseInt(localStorage.getItem("chapter"));
}

function unlockChapter(level){
    if(level > getChapter()){
        localStorage.setItem("chapter", level);
    }
}

function addError(){
    localStorage.setItem("errors", parseInt(localStorage.getItem("errors")) + 1);
}

function getErrors(){
    return parseInt(localStorage.getItem("errors"));
}

function getVisits(){
    return parseInt(localStorage.getItem("visits"));
}
