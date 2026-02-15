export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/state") {
      return handleState(request, env);
    }

    if (url.pathname === "/api/answer") {
      return handleAnswer(request, env);
    }

    return new Response("Not found", { status: 404 });
  }
};

async function getPlayer(request, env) {
  let cookie = request.headers.get("Cookie");
  let id = cookie?.match(/player=([^;]+)/)?.[1];

  if (!id) {
    id = crypto.randomUUID();
  }

  let data = await env.ARG_KV.get(`player:${id}`);
  let player = data ? JSON.parse(data) : {
    chapter: 1,
    seed: Math.floor(Math.random() * 1000000)
  };

  return { id, player };
}

async function handleState(request, env) {
  let { id, player } = await getPlayer(request, env);

  let puzzle = generatePuzzle(player.seed, player.chapter);

  return new Response(JSON.stringify({
    chapter: player.chapter,
    question: puzzle.prompt
  }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `player=${id}; Path=/; HttpOnly`
    }
  });
}

async function handleAnswer(request, env) {
  let { id, player } = await getPlayer(request, env);
  let body = await request.json();

  let correct = validateAnswer(player.seed, player.chapter, body.answer);

  if (correct) {
    player.chapter++;
    await env.ARG_KV.put(`player:${id}`, JSON.stringify(player));
  }

  return new Response(JSON.stringify({
    correct,
    chapter: player.chapter
  }), {
    headers: { "Content-Type": "application/json" }
  });
}

function generatePuzzle(seed, chapter) {
  let value = (seed + chapter) % 100;
  return {
    prompt: `Decode: ${btoa("NEXUS" + value)}`
  };
}

function validateAnswer(seed, chapter, answer) {
  let value = (seed + chapter) % 100;
  return answer.toLowerCase() === ("nexus" + value);
}
