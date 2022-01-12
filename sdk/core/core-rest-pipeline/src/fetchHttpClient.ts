// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

import { AbortError } from "@azure/abort-controller";
import {
  HttpClient,
  HttpHeaders as PipelineHeaders,
  PipelineRequest,
  PipelineResponse,
  TransferProgressEvent,
} from "./interfaces";
import { RestError } from "./restError";
import { createHttpHeaders } from "./httpHeaders";

/**
 * Checks if the body is a NodeReadable stream which is not supported in Browsers
 */
function isNodeReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

/**
 * Checks if the body is a ReadableStream supported by browsers
 */
function isReadableStream(body: unknown): body is ReadableStream {
  return Boolean(
    body &&
      typeof (body as ReadableStream).getReader === "function" &&
      typeof (body as ReadableStream).tee === "function"
  );
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

    if (request.proxySettings) {
      throw new Error("HTTP proxy is not supported in browser environment");
    }

    try {
      return await makeRequest(request);
    } catch (e) {
      throw getError(e, request);
    }
  }
}

/**
 * Sends a request
 */
async function makeRequest(request: PipelineRequest): Promise<PipelineResponse> {
  const abortController = handleAbortSignal(request);
  const headers = buildFetchHeaders(request.headers);

  const requestBody = buildRequestBody(request);

  const response = await fetch(request.url, {
    body: requestBody,
    method: request.method,
    headers: headers,
    signal: abortController.signal,
    credentials: request.withCredentials ? "include" : "same-origin",
    redirect: "manual",
    cache: "no-store",
  });

  return buildPipelineResponse(response, request);
}

/**
 * Creates a pipeline response from a Fetch response;
 */
async function buildPipelineResponse(httpResponse: Response, request: PipelineRequest) {
  const headers = buildPipelineHeaders(httpResponse);
  const response: PipelineResponse = {
    request,
    headers,
    status: httpResponse.status,
  };

  const bodyStream = isReadableStream(httpResponse.body)
    ? buildBodyStream(httpResponse.body, request.onDownloadProgress)
    : httpResponse.body;

  const responseStream = new Response(bodyStream);

  if (
    // Value of POSITIVE_INFINITY in streamResponseStatusCodes is considered as any status code
    request.streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY) ||
    request.streamResponseStatusCodes?.has(response.status)
  ) {
    response.blobBody = responseStream.blob();
  } else {
    response.bodyAsText = await responseStream.text();
  }

  return response;
}

function handleAbortSignal(request: PipelineRequest): AbortController {
  const abortController = new AbortController();
  /**
   * Attach an abort listener to the request
   */
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

  // If a timeout was passed, call the abort signal once the time elapses
  if (request.timeout > 0) {
    setTimeout(() => {
      abortController.abort();
    }, request.timeout);
  }

  return abortController;
}

/**
 * Gets the specific error
 */
function getError(e: RestError, request: PipelineRequest): RestError {
  if (e && e?.name === "AbortError") {
    return e;
  } else {
    return new RestError(`Error sending request: ${e.message}`, {
      code: e?.code ?? RestError.REQUEST_SEND_ERROR,
      request,
    });
  }
}

/**
 * Converts PipelineRequest headers to Fetch headers
 */
function buildFetchHeaders(pipelineHeaders: PipelineHeaders) {
  const headers = new Headers();
  for (const [name, value] of pipelineHeaders) {
    headers.append(name, value);
  }

  return headers;
}

function buildPipelineHeaders(httpResponse: Response): PipelineHeaders {
  const responseHeaders = createHttpHeaders();
  httpResponse.headers.forEach((value, key) => {
    responseHeaders.set(key, value);
  });

  return responseHeaders;
}

function buildRequestBody(request: PipelineRequest) {
  if (isNodeReadableStream(request.body)) {
    throw new Error("Node streams are not supported in browser environment.");
  }

  return isReadableStream(request.body)
    ? buildBodyStream(request.body, request.onUploadProgress)
    : request.body;
}

/**
 * Reads the request/response original stream and stream it through a new
 * ReadableStream, this is done to be able to report progress in a way that
 * all modern browsers support. TransformStreams would be an alternative,
 * however they are not yet supported by all browsers i.e Firefox
 */
function buildBodyStream(
  readableStream: ReadableStream<Uint8Array>,
  onProgress?: (progress: TransferProgressEvent) => void
): ReadableStream<Uint8Array> {
  const reader = readableStream.getReader();

  return new ReadableStream({
    async start(controller) {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();

        // When no more data needs to be consumed, break the reading
        if (done) {
          break;
        }

        if (onProgress) {
          onProgress({ loadedBytes: value?.length ?? 0 });
        }

        if (!value) {
          continue;
        }

        // Enqueue the next data chunk into our target stream
        controller.enqueue(value);
      }
      // Close the stream
      controller.close();
      reader.releaseLock();
    },
  });
}

/**
 * Create a new HttpClient instance for the browser environment.
 * @internal
 */
export function createFetchHttpClient(): HttpClient {
  return new FetchHttpClient();
}
