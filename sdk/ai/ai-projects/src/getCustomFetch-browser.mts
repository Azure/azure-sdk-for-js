// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type OpenAI from "openai";
import type { Pipeline, HttpClient, HttpMethods } from "@azure/core-rest-pipeline";
import {
  createDefaultHttpClient,
  createPipelineRequest,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";

type FetchFn = NonNullable<NonNullable<ConstructorParameters<typeof OpenAI>[0]>["fetch"]>;
export function getCustomFetch(pipeline: Pipeline, customHttpClient?: HttpClient): FetchFn {
  return async function (resource, options): Promise<Response> {
    const fetchRequest = new Request(resource, options);
    const rawHeaders: Record<string, string> = {};
    for (const [key, value] of fetchRequest.headers) {
      rawHeaders[key] = value;
    }
    const httpClient = customHttpClient ?? createDefaultHttpClient();
    let rawBody: ArrayBuffer | undefined;
    if (fetchRequest.body) {
      rawBody = await fetchRequest.arrayBuffer();
    }
    const request = createPipelineRequest({
      url: fetchRequest.url,
      body: rawBody,
      headers: createHttpHeaders(rawHeaders),
      method: fetchRequest.method as HttpMethods,
      abortSignal: fetchRequest.signal,
      streamResponseStatusCodes: new Set([Number.POSITIVE_INFINITY]),
      enableBrowserStreams: true,
    });
    const response = await pipeline.sendRequest(httpClient, request);
    const fetchResponse = new Response(response.browserStreamBody, {
      status: response.status,
      headers: response.headers.toJSON({ preserveCase: true }),
    });
    return fetchResponse;
  };
}
