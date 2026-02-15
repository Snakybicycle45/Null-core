
function requireChapter(level){

let current = parseInt(localStorage.getItem("chapter"));

if(!localStorage.getItem("authKey")){
    window.location.href = "access-control.html";
}

if(current < level){
    window.location.href = "access-control.html";
}

}
