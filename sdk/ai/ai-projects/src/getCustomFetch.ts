// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type OpenAI from "openai";
import type { Pipeline, HttpClient, HttpMethods } from "@azure/core-rest-pipeline";
import {
  createDefaultHttpClient,
  createPipelineRequest,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import { Readable } from "node:stream";
import type { ReadableStream as WebReadableStream } from "node:stream/web";

type FetchFn = NonNullable<NonNullable<ConstructorParameters<typeof OpenAI>[0]>["fetch"]>;

/**
 * A custom `fetch` implementation that forwards requests to an Azure Core Pipeline.
 * This allows us to send traffic to the test proxy for recording and playback.
 * @param pipeline - The pipeline to use
 * @param customHttpClient - The http client to make requests with
 * @returns A fetch-compatible function.
 */
export function getCustomFetch(pipeline: Pipeline, customHttpClient?: HttpClient): FetchFn {
  return async function (resource, options): Promise<Response> {
    const fetchRequest = new Request(resource, options);
    const rawHeaders: Record<string, string> = {};
    for (const [key, value] of fetchRequest.headers) {
      rawHeaders[key] = value;
    }
    const httpClient = customHttpClient ?? createDefaultHttpClient();
    const requestBody = fetchRequest.body
      ? Readable.fromWeb(fetchRequest.body as WebReadableStream<Uint8Array>)
      : undefined;
    const request = createPipelineRequest({
      url: fetchRequest.url,
      body: requestBody,
      headers: createHttpHeaders(rawHeaders),
      method: fetchRequest.method as HttpMethods,
      abortSignal: fetchRequest.signal,
      streamResponseStatusCodes: new Set([Number.POSITIVE_INFINITY]),
    });
    const response = await pipeline.sendRequest(httpClient, request);
    const body = response.readableStreamBody
      ? (Readable.toWeb(Readable.from(response.readableStreamBody)) as ReadableStream<Uint8Array>)
      : null;
    const fetchResponse = new Response(body, {
      status: response.status,
      headers: response.headers.toJSON({ preserveCase: true }),
    });
    return fetchResponse;
  };
}
