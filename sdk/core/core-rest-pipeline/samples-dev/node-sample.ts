// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary This samples shows how to make a GET request using default http client.
 */
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";

async function main() {
  const client = createDefaultHttpClient();
  const stamp = Date.now();
  const request = createPipelineRequest({
    url: `http://example.com/?_=${stamp}`,
    method: "GET",
    headers: createHttpHeaders({
      cookie: "",
    }),
  });
  request.allowInsecureConnection = true;
  const response = await client.sendRequest(request);
  console.dir(response);
}

main()
  .then(() => console.log("succeeded"))
  .catch((e) => console.log(e));
