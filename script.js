let step = 0;

const logo = document.getElementById("logo");
const footer = document.getElementById("footer");
const status = document.getElementById("status");

/* Changement de statut progressif */
setTimeout(() => {
  status.innerText = "Analyse en cours...";
}, 5000);

setTimeout(() => {
  status.innerText = "Anomalie détectée.";
  document.body.classList.add("glitch");
}, 9000);

setTimeout(() => {
  document.body.classList.remove("glitch");
}, 9500);

/* Séquence secrète */
logo.addEventListener("click", () => {
  if (step < 3) {
    step++;
  }
});

footer.addEventListener("click", () => {
  if (step === 3) {
    window.location.href = "null.html";
  } else {
    step = 0;
  }
});
