export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/test-kv") {
      await env.ARG_KV.put("hello", "world");
      const value = await env.ARG_KV.get("hello");
      return new Response("KV says: " + value);
    }

    return new Response("Nexus Observatory ARG Online");
  }
}
