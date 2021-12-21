// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

import { AbortError } from "@azure/abort-controller";
import { HttpClient, PipelineRequest, PipelineResponse } from "./interfaces";
import { RestError } from "./restError";
import { createHttpHeaders } from "./httpHeaders";

function isNodeReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

/**
 * A HttpClient implementation that uses window.fetch to send HTTP requests.
 * @internal
 */
class FetchHttpClient implements HttpClient {
  /**
   * Makes a request over an underlying transport layer and returns the response.
   * @param request - The request to be made.
   */
  public async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    const url = new URL(request.url);
    const isInsecure = url.protocol !== "https:";

    if (isInsecure && !request.allowInsecureConnection) {
      throw new Error(`Cannot connect to ${request.url} while allowInsecureConnection is false.`);
    }

    if (isNodeReadableStream(request.body)) {
      throw new Error("Node streams are not supported in browser environment.");
    }

    if (request.proxySettings) {
      throw new Error("HTTP proxy is not supported in browser environment");
    }

    const abortController = new AbortController();
    let abortListener: ((event: any) => void) | undefined;
    if (request.abortSignal) {
      if (request.abortSignal.aborted) {
        throw new AbortError("The operation was aborted.");
      }

      abortListener = (event: Event) => {
        if (event.type === "abort") {
          abortController.abort();
        }
      };
      request.abortSignal.addEventListener("abort", abortListener);
    }

    if (request.timeout > 0) {
      setTimeout(() => {
        abortController.abort();
      }, request.timeout);
    }

    const headers = new Headers();
    for (const [name, value] of request.headers) {
      headers.append(name, value);
    }

    const httpRequest = new Request(request.url, {
      body: request.body,
      method: request.method,
      headers: headers,
      signal: abortController.signal,
      credentials: request.withCredentials ? "include" : "same-origin",
      redirect: "manual",
      cache: "no-store"
    });

    try {
      const httpResponse = await fetch(httpRequest);

      // TODO: handle upload and download progress...

      const responseHeaders = createHttpHeaders();
      httpResponse.headers.forEach((value, key) => {
        responseHeaders.set(key, value);
      });

      const response: PipelineResponse = {
        request,
        headers: responseHeaders,
        status: httpResponse.status
      };

      if (request.streamResponseStatusCodes?.has(httpResponse.status)) {
        // TODO: figure out if we should return a blob by default for compat
        response.blobBody = httpResponse.blob();
      } else {
        response.bodyAsText = await httpResponse.text();
      }

      return response;
    } catch (e) {
      if (e && e?.name === "AbortError") {
        throw e;
      } else {
        throw new RestError(`Error sending request: ${e.message}`, {
          code: e?.code ?? RestError.REQUEST_SEND_ERROR,
          request
        });
      }
    }
  }
}

/**
 * Create a new HttpClient instance for the browser environment.
 * @internal
 */
export function createFetchHttpClient(): HttpClient {
  return new FetchHttpClient();
}
