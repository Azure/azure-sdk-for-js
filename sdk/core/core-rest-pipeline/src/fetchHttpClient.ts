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

    try {
      const httpResponse = await fetch(request.url, {
        body: request.body,
        method: request.method,
        headers: headers,
        signal: abortController.signal,
        credentials: request.withCredentials ? "include" : "same-origin",
        redirect: "manual",
        cache: "no-store",
        
      });

      // TODO: handle upload and download progress...

      const responseHeaders = createHttpHeaders();
      httpResponse.headers.forEach((value, key) => {
        responseHeaders.set(key, value);
      });

      const response: PipelineResponse = {
        request,
        headers: responseHeaders,
        status: httpResponse.status,
      };

      // TODO: Handle decompress

      // Download progress
      // const onDownloadProgress = request.onDownloadProgress;
      // if (onDownloadProgress) {
      //   const t = new TransformStream({})
      //   const downloadReportStream = new TransformStream(onDownloadProgress);
      //   downloadReportStream.on("error", (e) => {
      //     logger.error("Error in download progress", e);
      //   });
      //   responseStream.pipe(downloadReportStream);
      //   responseStream = downloadReportStream;
      // }

      if (httpResponse.body && request.streamResponseStatusCodes?.has(httpResponse.status)) {
        // TODO: figure out if we should return a blob by default for compat
        response.blobBody = httpResponse.blob();
      } else {
        response.bodyAsText = await readBodyContent(httpResponse, request)
      }

      return response;
    } catch (e) {
      if (e && e?.name === "AbortError") {
        throw e;
      } else {
        throw new RestError(`Error sending request: ${e.message}`, {
          code: e?.code ?? RestError.REQUEST_SEND_ERROR,
          request,
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

async function readBodyContent(
  response: Response,
  request: PipelineRequest
): Promise<string> {
  let chunks = [];
  const reader = response.body?.getReader();

  if (!reader) {
    return "";
  }

  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    const loadedBytes = value?.length ?? 0;
    if (request.onDownloadProgress) {
      request.onDownloadProgress({ loadedBytes });
    }

    received += loadedBytes;

    if (done) {
      break;
    }

    chunks.push(value);
  }

  let body = new Uint8Array(received);
  let position = 0;

  for (let chunk of chunks) {
    if (!chunk) {
      throw new Error("Invalid chunk");
    }
    body.set(chunk, position);
    position += chunk.length;
  }

  return new TextDecoder("utf-8").decode(body);
}
