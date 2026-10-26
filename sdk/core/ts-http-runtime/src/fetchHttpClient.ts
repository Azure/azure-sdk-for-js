// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortError } from "./abort-controller/AbortError.js";
import type {
  HttpClient,
  HttpHeaders as PipelineHeaders,
  PipelineRequest,
  PipelineResponse,
  TransferProgressEvent,
} from "./interfaces.js";
import { RestError } from "./restError.js";
import { createHttpHeaders } from "./httpHeaders.js";
import { isNodeReadableStream, isWebReadableStream } from "./util/typeGuards.js";
import { arrayBufferViewToArrayBuffer } from "./util/arrayBuffer.js";
import { isObject } from "./util/object.js";
import { setResponseBodyCompletion } from "./util/responseBodyCompletion.js";

// The Fetch spec requires `duplex: "half"` when body is a ReadableStream,
// but TypeScript's lib.dom.d.ts hasn't added it to RequestInit yet.
declare global {
  interface RequestInit {
    duplex?: "half";
  }
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
      requestInit.duplex = "half";
    }
    /**
     * Developers of the future:
     * Do not set redirect: "manual" as part
     * of request options.
     * It will not work as you expect.
     */
    const response = await fetch(request.url, {
      ...requestInit,
      ...request.requestOverrides,
    });
    // If we're uploading a blob, we need to fire the progress event manually
    if (isBlob(request.body) && request.onUploadProgress) {
      request.onUploadProgress({ loadedBytes: request.body.size });
    }
    return await buildPipelineResponse(response, request, abortControllerCleanup);
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
  abortControllerCleanup?: () => void,
): Promise<PipelineResponse> {
  const headers = buildPipelineHeaders(httpResponse);
  const response: PipelineResponse = {
    request,
    headers,
    status: httpResponse.status,
  };

  const streamResponse =
    // Value of POSITIVE_INFINITY in streamResponseStatusCodes is considered as any status code
    request.streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY) ||
    request.streamResponseStatusCodes?.has(response.status);

  if (streamResponse && request.enableBrowserStreams) {
    if (isWebReadableStream(httpResponse.body)) {
      let resolveBodyCompletion!: () => void;
      const bodyCompletion = new Promise<void>((resolve) => {
        resolveBodyCompletion = resolve;
      });
      let bodyComplete = false;
      const onBodyComplete = (): void => {
        if (bodyComplete) return;
        bodyComplete = true;
        abortControllerCleanup?.();
        resolveBodyCompletion();
      };
      response.browserStreamBody = buildBodyStream(httpResponse.body, {
        onProgress: request.onDownloadProgress,
        onEnd: onBodyComplete,
      });
      setResponseBodyCompletion(response, bodyCompletion);
    } else {
      response.browserStreamBody = httpResponse.body ?? undefined;
      abortControllerCleanup?.();
    }
  } else {
    const bodyStream = isWebReadableStream(httpResponse.body)
      ? buildBodyStream(httpResponse.body, {
          onProgress: request.onDownloadProgress,
        })
      : httpResponse.body;

    if (streamResponse) {
      const responseStream = new Response(bodyStream);
      response.blobBody = responseStream.blob();
      abortControllerCleanup?.();
    } else {
      const responseStream = new Response(bodyStream);

      response.bodyAsText = await responseStream.text();
      abortControllerCleanup?.();
    }
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
  const requestAbortSignal = request.abortSignal;
  if (requestAbortSignal) {
    if (requestAbortSignal.aborted) {
      throw new AbortError("The operation was aborted. Request has already been canceled.");
    }

    abortListener = (event: Event) => {
      if (event.type === "abort") {
        abortController.abort();
      }
    };
    requestAbortSignal.addEventListener("abort", abortListener);
    abortControllerCleanup = () => {
      if (abortListener) {
        requestAbortSignal.removeEventListener("abort", abortListener);
        abortListener = undefined;
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
// eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
function getError(e: RestError, request: PipelineRequest): RestError {
  if (e && e?.name === "AbortError") {
    return e;
  } else {
    return new RestError(`Error sending request: ${e.message}`, {
      code: e?.code ?? getCauseCode(e) ?? RestError.REQUEST_SEND_ERROR,
      request,
    });
  }
}

/**
 * Native fetch implementations such as undici in Node.js report network failures as a TypeError
 * whose system error code (for example ECONNRESET, ETIMEDOUT or ENOTFOUND) is carried by the
 * error's `cause` rather than by the error itself. Surfacing that code on the RestError lets
 * retry policies classify the failure as a transient system error.
 */
function getCauseCode(e: Error): string | undefined {
  const cause: unknown = e?.cause;
  return isObject(cause) && typeof cause.code === "string" ? cause.code : undefined;
}

/**
 * Converts PipelineRequest headers to Fetch headers
 */
function buildFetchHeaders(pipelineHeaders: PipelineHeaders): Headers {
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

interface BuildRequestBodyResponse {
  body?: BodyInit | null;
  streaming: boolean;
}

function buildRequestBody(request: PipelineRequest): BuildRequestBodyResponse {
  const body = typeof request.body === "function" ? request.body() : request.body;
  if (isNodeReadableStream(body)) {
    throw new Error("Node streams are not supported in browser environment.");
  }

  if (isWebReadableStream(body)) {
    return {
      streaming: true,
      body: buildBodyStream(body, { onProgress: request.onUploadProgress }),
    };
  } else if (typeof body === "object" && body && "buffer" in body) {
    // ArrayBufferView
    return { streaming: false, body: arrayBufferViewToArrayBuffer(body) };
  } else if (body === undefined) {
    return { streaming: false };
  } else {
    return { streaming: false, body };
  }
}

/**
 * Reads the request/response original stream and stream it through a new
 * ReadableStream, this is done to be able to report progress in a way that
 * all modern browsers support. TransformStreams would be an alternative,
 * however they are not yet supported by all browsers i.e Firefox
 */
function buildBodyStream(
  readableStream: ReadableStream<Uint8Array>,
  options: { onProgress?: (progress: TransferProgressEvent) => void; onEnd?: () => void } = {},
): ReadableStream<Uint8Array> {
  let loadedBytes = 0;
  let ended = false;
  const { onProgress, onEnd } = options;
  const end = (): void => {
    if (ended) return;
    ended = true;
    onEnd?.();
  };

  let progressStream = readableStream;
  if (isTransformStreamSupported(readableStream)) {
    progressStream = readableStream.pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          if (chunk === null) {
            controller.terminate();
            return;
          }
          controller.enqueue(chunk);
          loadedBytes += chunk.length;
          onProgress?.({ loadedBytes });
        },
      }),
    );
  }

  const reader = progressStream.getReader();
  void reader.closed.then(end, end);
  return new ReadableStream(
    {
      async pull(controller) {
        try {
          const { done, value } = await reader.read();
          if (done || !value) {
            end();
            controller.close();
            reader.releaseLock();
            return;
          }

          if (progressStream === readableStream) {
            loadedBytes += value.length;
            onProgress?.({ loadedBytes });
          }
          controller.enqueue(value);
        } catch (error) {
          end();
          controller.error(error);
          reader.releaseLock();
        }
      },
      async cancel(reason?: unknown) {
        try {
          await reader.cancel(reason);
        } finally {
          end();
          reader.releaseLock();
        }
      },
    },
    // The transform already applies backpressure; do not add another read-ahead queue.
    { highWaterMark: progressStream === readableStream ? 1 : 0 },
  );
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
