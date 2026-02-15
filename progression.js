
// MASSIVE ARG PROGRESSION SYSTEM

if(!localStorage.getItem("chapter")){
    localStorage.setItem("chapter","0");
}

if(!localStorage.getItem("authKey")){
    localStorage.setItem("authKey", Math.random().toString(36).substring(2));
}

if(!localStorage.getItem("visits")){
    localStorage.setItem("visits","0");
}

localStorage.setItem("visits", parseInt(localStorage.getItem("visits")) + 1);

function getChapter(){
    return parseInt(localStorage.getItem("chapter"));
}

function unlockChapter(level){
    if(level > getChapter()){
        localStorage.setItem("chapter", level);
        localStorage.setItem("unlockTime_"+level, Date.now());
    }
}

function getVisits(){
    return parseInt(localStorage.getItem("visits"));
}
