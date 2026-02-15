export default {
  async fetch(request) {
    return new Response("Nexus Observatory ARG Online", {
      headers: { "content-type": "text/plain" }
    });
  }
}
