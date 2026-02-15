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

/* ===================== */
/*     STATE HANDLER     */
/* ===================== */

async function getState(request, env) {
  const userId = "player"; // version simple pour test

  let progress = await env.ARG_KV.get(userId);

  if (!progress) {
    progress = JSON.stringify({ chapter: 1 });
    await env.ARG_KV.put(userId, progress);
  }

  const data = JSON.parse(progress);

  const question = `Chapter ${data.chapter} → ${data.chapter} x 2 ?`;

  return json({
    chapter: data.chapter,
    question: question
  });
}

/* ===================== */
/*    ANSWER HANDLER     */
/* ===================== */

async function handleAnswer(request, env) {
  const userId = "player";
  const body = await request.json();

  let progress = await env.ARG_KV.get(userId);
  const data = JSON.parse(progress);

  const correctAnswer = data.chapter * 2;

  if (parseInt(body.answer) === correctAnswer) {
    data.chapter++;
    await env.ARG_KV.put(userId, JSON.stringify(data));
    return json({ success: true });
  }

  return json({ success: false });
}

/* ===================== */

function json(data) {
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" }
  });
}
