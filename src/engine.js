export function generatePuzzle(seed, chapter) {
  const type = chapter % 5;

  switch (type) {
    case 0:
      return hexPuzzle(seed, chapter);
    case 1:
      return base64Puzzle(seed, chapter);
    case 2:
      return caesarPuzzle(seed, chapter);
    case 3:
      return reversePuzzle(seed, chapter);
    case 4:
      return binaryPuzzle(seed, chapter);
  }
}

export function validateAnswer(seed, chapter, answer) {
  const puzzle = generatePuzzle(seed, chapter);
  return answer.toLowerCase().trim() === puzzle.solution;
}

/* TYPES DE PUZZLES */

function hexPuzzle(seed, chapter) {
  const text = `signal-${seed}-${chapter}`;
  const hex = [...text].map(c =>
    c.charCodeAt(0).toString(16)
  ).join("");
  return {
    prompt: `Transmission fragment: ${hex}`,
    solution: text.toLowerCase()
  };
}

function base64Puzzle(seed, chapter) {
  const text = `nexus-${seed + chapter}`;
  return {
    prompt: `Decode this: ${btoa(text)}`,
    solution: text.toLowerCase()
  };
}

function caesarPuzzle(seed, chapter) {
  const shift = chapter % 26;
  const text = "observer";
  const encoded = text.split("").map(c =>
    String.fromCharCode(
      ((c.charCodeAt(0) - 97 + shift) % 26) + 97
    )
  ).join("");

  return {
    prompt: `Encrypted (shift ${shift}): ${encoded}`,
    solution: text
  };
}

function reversePuzzle(seed, chapter) {
  const text = `chapter${chapter}`;
  return {
    prompt: `Reverse this: ${text.split("").reverse().join("")}`,
    solution: text.toLowerCase()
  };
}

function binaryPuzzle(seed, chapter) {
  const text = "core";
  const binary = text.split("").map(c =>
    c.charCodeAt(0).toString(2)
  ).join(" ");

  return {
    prompt: `Binary decode: ${binary}`,
    solution: text
  };
}
