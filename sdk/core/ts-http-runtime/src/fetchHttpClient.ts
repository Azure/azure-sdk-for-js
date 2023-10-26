// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError } from "./abort-controller/AbortError";
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
 * Checks if the body is a Blob or Blob-like
 */
function isBlob(body: unknown): body is Blob {
  // File objects count as a type of Blob, so we want to use instanceof explicitly
  return (typeof Blob === "function" || typeof Blob === "object") && body instanceof Blob;
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
    } catch (e: any) {
      throw getError(e, request);
    }
  }
}

/**
 * Sends a request
 */
async function makeRequest(request: PipelineRequest): Promise<PipelineResponse> {
  const { abortController, abortControllerCleanup } = setupAbortSignal(request);
  try {
    const headers = buildFetchHeaders(request.headers);
    const { streaming, body: requestBody } = buildRequestBody(request);
    const requestInit: RequestInit = {
      body: requestBody,
      method: request.method,
      headers: headers,
      signal: abortController.signal,
      // Cloudflare doesn't implement the full Fetch API spec
      // because of some of it doesn't make sense in the edge.
      // See https://github.com/cloudflare/workerd/issues/902
      ...("credentials" in Request.prototype
        ? { credentials: request.withCredentials ? "include" : "same-origin" }
        : {}),
      ...("cache" in Request.prototype ? { cache: "no-store" } : {}),
    };

    // According to https://fetch.spec.whatwg.org/#fetch-method,
    // init.duplex must be set when body is a ReadableStream object.
    // currently "half" is the only valid value.
    if (streaming) {
      (requestInit as any).duplex = "half";
    }
    /**
     * Developers of the future:
     * Do not set redirect: "manual" as part
     * of request options.
     * It will not work as you expect.
     */
    const response = await fetch(request.url, requestInit);
    // If we're uploading a blob, we need to fire the progress event manually
    if (isBlob(request.body) && request.onUploadProgress) {
      request.onUploadProgress({ loadedBytes: request.body.size });
    }
    return buildPipelineResponse(response, request, abortControllerCleanup);
  } catch (e) {
    abortControllerCleanup?.();
    throw e;
  }
}

/**
 * Creates a pipeline response from a Fetch response;
 */
async function buildPipelineResponse(
  httpResponse: Response,
  request: PipelineRequest,
  abortControllerCleanup?: () => void
) {
  const headers = buildPipelineHeaders(httpResponse);
  const response: PipelineResponse = {
    request,
    headers,
    status: httpResponse.status,
  };

  const bodyStream = isReadableStream(httpResponse.body)
    ? buildBodyStream(httpResponse.body, {
        onProgress: request.onDownloadProgress,
        onEnd: abortControllerCleanup,
      })
    : httpResponse.body;

  if (
    // Value of POSITIVE_INFINITY in streamResponseStatusCodes is considered as any status code
    request.streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY) ||
    request.streamResponseStatusCodes?.has(response.status)
  ) {
    if (request.enableBrowserStreams) {
      response.browserStreamBody = bodyStream ?? undefined;
    } else {
      const responseStream = new Response(bodyStream);
      response.blobBody = responseStream.blob();
      abortControllerCleanup?.();
    }
  } else {
    const responseStream = new Response(bodyStream);

    response.bodyAsText = await responseStream.text();
    abortControllerCleanup?.();
  }

  return response;
}

function setupAbortSignal(request: PipelineRequest): {
  abortController: AbortController;
  abortControllerCleanup: (() => void) | undefined;
} {
  const abortController = new AbortController();

  // Cleanup function
  let abortControllerCleanup: (() => void) | undefined;

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
    abortControllerCleanup = () => {
      if (abortListener) {
        request.abortSignal?.removeEventListener("abort", abortListener);
      }
    };
  }

  // If a timeout was passed, call the abort signal once the time elapses
  if (request.timeout > 0) {
    setTimeout(() => {
      abortController.abort();
    }, request.timeout);
  }

  return { abortController, abortControllerCleanup };
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
  for (const [name, value] of httpResponse.headers) {
    responseHeaders.set(name, value);
  }

  return responseHeaders;
}

function buildRequestBody(request: PipelineRequest) {
  const body = typeof request.body === "function" ? request.body() : request.body;
  if (isNodeReadableStream(body)) {
    throw new Error("Node streams are not supported in browser environment.");
  }

  return isReadableStream(body)
    ? { streaming: true, body: buildBodyStream(body, { onProgress: request.onUploadProgress }) }
    : { streaming: false, body };
}

/**
 * Reads the request/response original stream and stream it through a new
 * ReadableStream, this is done to be able to report progress in a way that
 * all modern browsers support. TransformStreams would be an alternative,
 * however they are not yet supported by all browsers i.e Firefox
 */
function buildBodyStream(
  readableStream: ReadableStream<Uint8Array>,
  options: { onProgress?: (progress: TransferProgressEvent) => void; onEnd?: () => void } = {}
): ReadableStream<Uint8Array> {
  let loadedBytes = 0;
  const { onProgress, onEnd } = options;

  // If the current browser supports pipeThrough we use a TransformStream
  // to report progress
  if (isTransformStreamSupported(readableStream)) {
    return readableStream.pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          if (chunk === null) {
            controller.terminate();
            return;
          }

          controller.enqueue(chunk);
          loadedBytes += chunk.length;
          if (onProgress) {
            onProgress({ loadedBytes });
          }
        },
        flush() {
          onEnd?.();
        },
      })
    );
  } else {
    // If we can't use transform streams, wrap the original stream in a new readable stream
    // and use pull to enqueue each chunk and report progress.
    const reader = readableStream.getReader();
    return new ReadableStream({
      async pull(controller) {
        const { done, value } = await reader.read();
        // When no more data needs to be consumed, break the reading
        if (done || !value) {
          onEnd?.();
          // Close the stream
          controller.close();
          reader.releaseLock();
          return;
        }

        loadedBytes += value?.length ?? 0;

        // Enqueue the next data chunk into our target stream
        controller.enqueue(value);

        if (onProgress) {
          onProgress({ loadedBytes });
        }
      },
      cancel(reason?: string) {
        onEnd?.();
        return reader.cancel(reason);
      },
    });
  }
}

/**
 * Create a new HttpClient instance for the browser environment.
 * @internal
 */
export function createFetchHttpClient(): HttpClient {
  return new FetchHttpClient();
}

function isTransformStreamSupported(readableStream: ReadableStream): boolean {
  return readableStream.pipeThrough !== undefined && self.TransformStream !== undefined;
}
