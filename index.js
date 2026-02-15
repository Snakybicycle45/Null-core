export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/state") {
      return getState(request, env);
    }

    if (url.pathname === "/api/answer" && request.method === "POST") {
      return handleAnswer(request, env);
    }

    return new Response("Nexus Observatory ARG Online");
  }
};

/* ========================= */
/*       USER SYSTEM         */
/* ========================= */

async function getUserId(request) {
  const cookie = request.headers.get("Cookie");

  if (cookie && cookie.includes("nexus_id=")) {
    return cookie.split("nexus_id=")[1];
  }

  return crypto.randomUUID();
}

/* ========================= */
/*       GET STATE           */
/* ========================= */

async function getState(request, env) {
  const userId = await getUserId(request);

  let progress = await env.ARG_KV.get(userId);

  if (!progress) {
    progress = JSON.stringify({
      chapter: 1,
      errors: 0,
      infinite: 0
    });
    await env.ARG_KV.put(userId, progress);
  }

  const data = JSON.parse(progress);
  const puzzle = generatePuzzle(data);

  return json({
    chapter: data.chapter,
    infinite: data.infinite,
    question: puzzle.question
  }, userId);
}

/* ========================= */
/*      HANDLE ANSWER        */
/* ========================= */

async function handleAnswer(request, env) {
  const userId = await getUserId(request);
  const body = await request.json();

  let progress = await env.ARG_KV.get(userId);
  const data = JSON.parse(progress);

  const puzzle = generatePuzzle(data);

  if (parseInt(body.answer) === puzzle.answer) {

    if (data.chapter < 20) {
      data.chapter++;
    } else {
      data.infinite++;
    }

    data.errors = 0;

    await env.ARG_KV.put(userId, JSON.stringify(data));
    return json({ success: true }, userId);
  }

  data.errors++;
  await env.ARG_KV.put(userId, JSON.stringify(data));

  return json({ success: false }, userId);
}

/* ========================= */
/*     ADAPTIVE PUZZLES      */
/* ========================= */

function generatePuzzle(data) {

  // Mode massif après chapitre 20
  if (data.chapter >= 20) {
    const base = (data.infinite + 1) * 7 + data.errors;
    return {
      question: `Infinite Layer ${data.infinite + 1} → ${base} + ${data.chapter}`,
      answer: base + data.chapter
    };
  }

  // IA adaptative
  let base = data.chapter * 3;

  if (data.errors >= 2) {
    base = Math.max(2, base - 2); // plus facile si erreurs
  }

  return {
    question: `Chapter ${data.chapter} → ${base} x ${data.chapter}`,
    answer: base * data.chapter
  };
}

/* ========================= */

function json(data, userId) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
      "Set-Cookie": `nexus_id=${userId}; Path=/; HttpOnly`
    }
  });
}
