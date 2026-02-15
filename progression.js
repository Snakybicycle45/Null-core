// Initialisation progression
if(!localStorage.getItem("chapter")){
    localStorage.setItem("chapter","0");
}

// Lire progression
function getChapter(){
    return parseInt(localStorage.getItem("chapter"));
}

// Débloquer chapitre
function unlockChapter(level){
    localStorage.setItem("chapter", level);
}
