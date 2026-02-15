function requireChapter(level){

let current = parseInt(localStorage.getItem("chapter"));

if(current < level){
    window.location.href = "access-control.html";
}

}
