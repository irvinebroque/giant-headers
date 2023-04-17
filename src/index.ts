export default {
  async fetch(request: Request): Promise<Response> {
    const giantString = Array(40 * 1024).join("x");
    const size = new Blob([giantString]).size;
    const sizeInKb = size / 1000;
    console.log(`${sizeInKb}kb`);
    const response = await fetch("https://example.com", {
      method: "GET",
      headers: {
        "this-header-is-too-big": giantString,
      },
    });
	const newResponse = new Response(response.body, response);
    newResponse.headers.append("this-header-is-too-big", giantString);
    const cache = caches.default;
    const result = await cache.put(request, newResponse);
    console.log(result);
    return new Response(
      `Subrequest made successfully with a single header of ${sizeInKb}kb`
    );
  },
};
