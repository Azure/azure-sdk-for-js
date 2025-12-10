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

type FetchFn = NonNullable<NonNullable<ConstructorParameters<typeof OpenAI>[0]>["fetch"]>;
export function getCustomFetch(pipeline: Pipeline, customHttpClient?: HttpClient): FetchFn {
  return async function (resource, options): Promise<Response> {
    const fetchRequest = new Request(resource, options);
    const rawHeaders: Record<string, string> = {};
    for (const [key, value] of fetchRequest.headers) {
      rawHeaders[key] = value;
    }
    const httpClient = customHttpClient ?? createDefaultHttpClient();
    const requestBody = fetchRequest.body ? Readable.fromWeb(fetchRequest.body as any) : undefined;
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
      ? (Readable.toWeb(Readable.from(response.readableStreamBody)) as any)
      : null;
    const fetchResponse = new Response(body, {
      status: response.status,
      headers: response.headers.toJSON({ preserveCase: true }),
    });
    return fetchResponse;
  };
}
