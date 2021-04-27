// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary This sample demonstrates how to implement a custom HttpClient.
 */

import { IncomingHttpHeaders } from "http";
import * as coreHttp from "@azure/core-http";
import got from "got";

/**
 * Translates got incoming headers into core-http headers
 * @param headers
 * @returns
 */
function toIncomingHeaders(headers: IncomingHttpHeaders): coreHttp.HttpHeadersLike {
  const result = new coreHttp.HttpHeaders();
  for (const [key, value] of Object.entries(headers)) {
    if (Array.isArray(value) && value?.length) {
      result.set(key, value![0]);
    } else if (value) {
      result.set(key, value as string);
    }
  }

  return result;
}

/**
 * A custom HttpClient that uses `got` to send request.
 * NOTE: this is for demostrantion purpose only and is not a complete implementation.
 *       It only works for responses that are returned in text.
 */
export class GotHttpClient implements coreHttp.HttpClient {
  async sendRequest(
    httpRequest: coreHttp.WebResourceLike
  ): Promise<coreHttp.HttpOperationResponse> {
    console.log(`sending request using 'got' package...`);
    const response = await got(httpRequest.url, {
      method: httpRequest.method,
      headers: httpRequest.headers.rawHeaders(),
      searchParams: httpRequest.query,
      retry: 0
    });

    return {
      request: httpRequest,
      status: response.statusCode,
      headers: toIncomingHeaders(response.headers),
      bodyAsText: response.body
    };
  }
}

const clientOptions: coreHttp.ServiceClientOptions = {
  httpClient: new GotHttpClient()
};

const client = new coreHttp.ServiceClient(undefined, clientOptions);
const req: coreHttp.RequestPrepareOptions = {
  url: `https://www.example.com`,
  method: "GET"
};

client.sendRequest(req).then(function(res: coreHttp.HttpOperationResponse) {
  console.log(res.bodyAsText);
});
