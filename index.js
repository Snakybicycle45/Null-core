export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/test") {
      return new Response("API OK");
    }

    return new Response("Nexus Observatory ARG Online");
  }
}
