// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import { finished, Transform } from "node:stream";
import { types } from "node:util";
import { AbortError } from "./abort-controller/AbortError.js";
import type {
  HttpClient,
  HttpHeaders,
  PipelineRequest,
  PipelineResponse,
  RequestBodyType,
  TlsSettings,
  TransferProgressEvent,
} from "./interfaces.js";
import { createHttpHeaders } from "./httpHeaders.js";
import { isRestError, RestError } from "./restError.js";
import type { IncomingMessage } from "node:http";
import { logger } from "./log.js";
import { Sanitizer } from "./util/sanitizer.js";
import { hasExpectContinue } from "./util/expectContinueHeaders.js";
import {
  addExpectContinueFraming,
  createExpectContinueRequest,
} from "./util/nodeExpectContinue.js";
import {
  disposeNodeStream,
  setRequestCompletion,
  setResponseBodyDisposer,
  setResponseBodySource,
} from "./util/responseBody.js";

const DEFAULT_TLS_SETTINGS = {};

function isReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

function isStreamComplete(stream: NodeJS.ReadableStream): Promise<void> {
  if (stream.readable === false) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const handler = (): void => {
      resolve();
      stream.removeListener("close", handler);
      stream.removeListener("end", handler);
      stream.removeListener("error", handler);
    };

    stream.on("close", handler);
    stream.on("end", handler);
    stream.on("error", handler);
  });
}

function isArrayBuffer(body: unknown): body is ArrayBuffer | ArrayBufferView {
  return types.isArrayBuffer(body) || ArrayBuffer.isView(body);
}

function arrayBufferToBuffer(body: ArrayBuffer | ArrayBufferView): Buffer {
  if (Buffer.isBuffer(body)) {
    return body;
  }

  return ArrayBuffer.isView(body)
    ? Buffer.from(body.buffer, body.byteOffset, body.byteLength)
    : Buffer.from(body);
}

class ReportTransform extends Transform {
  private loadedBytes = 0;
  private progressCallback: (progress: TransferProgressEvent) => void;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  _transform(chunk: string | Buffer, _encoding: string, callback: Function): void {
    this.push(chunk);
    this.loadedBytes += chunk.length;
    try {
      this.progressCallback({ loadedBytes: this.loadedBytes });
      callback();
    } catch (e: any) {
      callback(e);
    }
  }

  constructor(progressCallback: (progress: TransferProgressEvent) => void) {
    super();
    this.progressCallback = progressCallback;
  }
}

interface NodeRequestResult {
  response: IncomingMessage;
  requestComplete: Promise<void>;
  isRequestComplete: () => boolean;
  disposeRequest: () => void;
}

function createRequestCompletion(): Omit<NodeRequestResult, "response"> & {
  track(request: http.ClientRequest): void;
} {
  let request: http.ClientRequest;
  let requestDone = false;
  let resolveRequestComplete!: () => void;
  const requestComplete = new Promise<void>((resolve) => {
    resolveRequestComplete = resolve;
  });
  const onComplete = (): void => {
    requestDone = true;
    request.removeListener("finish", onComplete);
    request.removeListener("close", onComplete);
    resolveRequestComplete();
  };
  return {
    requestComplete,
    isRequestComplete: () => requestDone,
    disposeRequest: () => {
      if (!requestDone) {
        request.destroy();
      }
    },
    track: (clientRequest) => {
      request = clientRequest;
      request.once("finish", onComplete);
      request.once("close", onComplete);
    },
  };
}

function toRequestSendError(error: Error & { code?: string }, request: PipelineRequest): RestError {
  if (isRestError(error)) {
    return error;
  }
  const prematureClose = error.code === "ERR_STREAM_PREMATURE_CLOSE";
  return new RestError(
    prematureClose ? "Request body stream closed before ending" : error.message,
    {
      code: prematureClose
        ? RestError.REQUEST_SEND_ERROR
        : (error.code ?? RestError.REQUEST_SEND_ERROR),
      request,
    },
  );
}

function sendRequestBody(
  clientRequest: http.ClientRequest,
  body: RequestBodyType | undefined,
  request: PipelineRequest,
  onError: (error: RestError) => void,
): void {
  if (body && isReadableStream(body)) {
    pipeUploadStream(body, clientRequest, request, onError);
  } else if (body) {
    if (typeof body === "string" || Buffer.isBuffer(body)) {
      clientRequest.end(body);
    } else {
      logger.error("Unrecognized body type", body);
      throw new RestError("Unrecognized body type", { request });
    }
  } else {
    clientRequest.end();
  }
}

function initializeBody(body: RequestBodyType | undefined): RequestBodyType | undefined {
  if (typeof body === "function") {
    return body();
  } else if (body && isArrayBuffer(body)) {
    return arrayBufferToBuffer(body);
  } else {
    return body;
  }
}

/**
 * A HttpClient implementation that uses Node's "https" module to send HTTPS requests.
 * @internal
 */
class NodeHttpClient implements HttpClient {
  private cachedHttpAgent?: http.Agent;
  private cachedHttpsAgents: WeakMap<TlsSettings, https.Agent> = new WeakMap();

  /**
   * Makes a request over an underlying transport layer and returns the response.
   * @param request - The request to be made.
   */
  public async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    const abortController = new AbortController();
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
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (request.timeout > 0) {
      timeoutId = setTimeout(() => {
        const sanitizer = new Sanitizer();
        logger.info(`request to '${sanitizer.sanitizeUrl(request.url)}' timed out. canceling...`);
        abortController.abort();
      }, request.timeout);
    }

    const acceptEncoding = request.headers.get("Accept-Encoding");
    const shouldDecompress =
      acceptEncoding?.includes("gzip") || acceptEncoding?.includes("deflate");

    const useExpectContinue = hasExpectContinue(request);
    const requestBody = request.body;
    // Keep input separate from the prepared upload. Even a direct stream must leave body
    // undefined until preparation starts, so early rejection does not transfer its ownership.
    let body: RequestBodyType | undefined;

    let responseStream: NodeJS.ReadableStream | undefined;
    let requestComplete = Promise.resolve();
    try {
      const knownBodyLength =
        typeof requestBody === "function" ? null : getBodyLength(requestBody ?? null);

      const prepareBody = (): RequestBodyType | undefined => {
        body = initializeBody(requestBody);
        if (!useExpectContinue && body && !request.headers.has("Content-Length")) {
          const bodyLength = getBodyLength(body);
          if (bodyLength !== null) {
            request.headers.set("Content-Length", bodyLength);
          }
        }
        if (!body || !request.onUploadProgress || body instanceof ReportTransform) {
          return body;
        }

        const onUploadProgress = request.onUploadProgress;
        const uploadReportStream = new ReportTransform(onUploadProgress);
        uploadReportStream.on("error", (e) => {
          logger.error("Error in upload progress", e);
        });
        if (isReadableStream(body)) {
          pipeUploadStream(body, uploadReportStream, request);
        } else {
          uploadReportStream.end(body);
        }

        body = uploadReportStream;
        return body;
      };

      if (!useExpectContinue) {
        prepareBody();
      }

      const result = useExpectContinue
        ? await this.makeRequestWithExpectContinue(
            request,
            abortController,
            prepareBody,
            knownBodyLength,
          )
        : await this.makeRequest(request, abortController, body);

      requestComplete = result.requestComplete;
      const res = result.response;

      const headers = getResponseHeaders(res);

      const status = res.statusCode ?? 0;
      const response: PipelineResponse = {
        status,
        headers,
        request,
      };
      if (!result.isRequestComplete()) {
        setRequestCompletion(response, result.requestComplete);
        const clearDisposer = setResponseBodyDisposer(response, result.disposeRequest);
        result.requestComplete.then(clearDisposer).catch((error) => {
          logger.warning("Error disposing request", error);
        });
      }

      // Responses to HEAD must not have a body.
      // If they do return a body, that body must be ignored.
      const method =
        typeof request.requestOverrides?.method === "string"
          ? request.requestOverrides.method.toUpperCase()
          : request.method;
      if (method === "HEAD") {
        // call resume() and not destroy() to avoid closing the socket
        // and losing keep alive
        res.resume();
        return response;
      }

      responseStream = shouldDecompress
        ? getDecodedResponseStream(res, headers, abortController.signal)
        : res;

      const onDownloadProgress = request.onDownloadProgress;
      if (onDownloadProgress) {
        const downloadReportStream = new ReportTransform(onDownloadProgress);
        downloadReportStream.on("error", (e) => {
          logger.error("Error in download progress", e);
        });
        responseStream = pipeResponseStream(
          responseStream,
          downloadReportStream,
          abortController.signal,
        );
      }

      if (
        // Value of POSITIVE_INFINITY in streamResponseStatusCodes is considered as any status code
        request.streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY) ||
        request.streamResponseStatusCodes?.has(response.status)
      ) {
        response.readableStreamBody = responseStream;
      } else {
        response.bodyAsText = await streamToText(responseStream);
      }

      return response;
    } catch (error) {
      // Dispose only the prepared upload. If preparation never ran, body is undefined
      // and the caller's untouched input stream is left alone.
      if (isReadableStream(body)) {
        disposeNodeStream(body);
      }
      if (responseStream) {
        disposeNodeStream(responseStream);
      }
      throw error;
    } finally {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      // Keep abort forwarding until the outgoing request and response have both completed.
      if (requestAbortSignal && abortListener) {
        let uploadStreamDone = Promise.resolve();
        // Wait only for a prepared upload. If preparation never ran, body is undefined,
        // so the caller's untouched input stream cannot block abort-listener cleanup.
        if (isReadableStream(body)) {
          uploadStreamDone = isStreamComplete(body);
        }
        let downloadStreamDone = Promise.resolve();
        if (isReadableStream(responseStream)) {
          downloadStreamDone = isStreamComplete(responseStream);
        }
        Promise.all([requestComplete, uploadStreamDone, downloadStreamDone])
          .then(() => {
            // eslint-disable-next-line promise/always-return
            if (abortListener) {
              requestAbortSignal.removeEventListener("abort", abortListener);
            }
          })
          .catch((e) => {
            logger.warning("Error when cleaning up abortListener on httpRequest", e);
          });
      }
    }
  }

  private makeRequest(
    request: PipelineRequest,
    abortController: AbortController,
    body?: RequestBodyType,
  ): Promise<NodeRequestResult> {
    const { options, isInsecure } = this.getRequestOptions(request);

    return new Promise<NodeRequestResult>((_resolve, reject) => {
      let response: IncomingMessage | undefined;
      const { track, ...completion } = createRequestCompletion();
      const req = isInsecure
        ? http.request(options, onResponse)
        : https.request(options, onResponse);
      track(req);
      function onResponse(incomingResponse: IncomingMessage): void {
        response = incomingResponse;
        _resolve({
          response: incomingResponse,
          ...completion,
        });
      }

      req.once("error", (err: Error & { code?: string }) => {
        reject(toRequestSendError(err, request));
      });

      abortController.signal.addEventListener("abort", () => {
        const abortError = new AbortError(
          "The operation was aborted. Rejecting from abort signal callback while making request.",
        );
        response?.destroy(abortError);
        req.destroy(abortError);
        reject(abortError);
      });
      if (body && isReadableStream(body)) {
        pipeUploadStream(body, req, request, reject);
      } else if (body) {
        if (typeof body === "string" || Buffer.isBuffer(body)) {
          req.end(body);
        } else {
          logger.error("Unrecognized body type", body);
          reject(new RestError("Unrecognized body type"));
        }
      } else {
        // streams don't like "undefined" being passed as data
        req.end();
      }
    });
  }

  private makeRequestWithExpectContinue(
    request: PipelineRequest,
    abortController: AbortController,
    prepareBody: () => RequestBodyType | undefined,
    knownBodyLength: number | null,
  ): Promise<NodeRequestResult> {
    const { options, isInsecure } = this.getRequestOptions(request);

    addExpectContinueFraming(options, knownBodyLength);

    return new Promise<NodeRequestResult>((_resolve, reject) => {
      let response: IncomingMessage | undefined;
      const { track, ...completion } = createRequestCompletion();
      const createRequest = (
        onResponseCallback: (incomingResponse: IncomingMessage) => void,
      ): http.ClientRequest => {
        const req = isInsecure
          ? http.request(options, onResponseCallback)
          : https.request(options, onResponseCallback);
        track(req);
        return req;
      };
      function onResponse(incomingResponse: IncomingMessage): void {
        response = incomingResponse;
        _resolve({
          response: incomingResponse,
          ...completion,
        });
      }

      const rejectRequest = (error: Error & { code?: string }): void => {
        reject(toRequestSendError(error, request));
      };

      const abortRequest = (clientRequest: http.ClientRequest): void => {
        const abortError = new AbortError(
          "The operation was aborted. Rejecting from abort signal callback while making request.",
        );
        response?.destroy(abortError);
        clientRequest.destroy(abortError);
        reject(abortError);
      };

      createExpectContinueRequest({
        abortSignal: abortController.signal,
        knownBodyLength,
        createRequest,
        onAbort: abortRequest,
        onError: rejectRequest,
        onResponse,
        sendBody: (clientRequest) => {
          sendRequestBody(clientRequest, prepareBody(), request, rejectRequest);
        },
      });
    });
  }

  private getRequestOptions(request: PipelineRequest): {
    options: http.RequestOptions;
    isInsecure: boolean;
  } {
    const url = new URL(request.url);
    const isInsecure = url.protocol !== "https:";

    if (isInsecure && !request.allowInsecureConnection) {
      throw new Error(`Cannot connect to ${request.url} while allowInsecureConnection is false.`);
    }

    const agent = (request.agent as http.Agent) ?? this.getOrCreateAgent(request, isInsecure);
    return {
      isInsecure,
      options: {
        agent,
        hostname: url.hostname,
        path: `${url.pathname}${url.search}`,
        port: url.port,
        method: request.method,
        headers: request.headers.toJSON({ preserveCase: true }),
        ...request.requestOverrides,
      },
    };
  }

  private getOrCreateAgent(request: PipelineRequest, isInsecure: boolean): http.Agent {
    const disableKeepAlive = request.disableKeepAlive;

    // Handle Insecure requests first
    if (isInsecure) {
      if (disableKeepAlive) {
        // keepAlive:false is the default so we don't need a custom Agent
        return http.globalAgent;
      }

      if (!this.cachedHttpAgent) {
        // If there is no cached agent create a new one and cache it.
        this.cachedHttpAgent = new http.Agent({ keepAlive: true });
      }
      return this.cachedHttpAgent;
    } else {
      if (disableKeepAlive && !request.tlsSettings) {
        // When there are no tlsSettings and keepAlive is false
        // we don't need a custom agent
        return https.globalAgent;
      }

      // We use the tlsSettings to index cached clients
      const tlsSettings = request.tlsSettings ?? DEFAULT_TLS_SETTINGS;

      // Get the cached agent or create a new one with the
      // provided values for keepAlive and tlsSettings
      let agent = this.cachedHttpsAgents.get(tlsSettings);

      if (agent && agent.options.keepAlive === !disableKeepAlive) {
        return agent;
      }

      logger.info("No cached TLS Agent exist, creating a new Agent");
      agent = new https.Agent({
        // keepAlive is true if disableKeepAlive is false.
        keepAlive: !disableKeepAlive,
        // Since we are spreading, if no tslSettings were provided, nothing is added to the agent options.
        ...tlsSettings,
      });

      this.cachedHttpsAgents.set(tlsSettings, agent);
      return agent;
    }
  }
}

function getResponseHeaders(res: IncomingMessage): HttpHeaders {
  const headers = createHttpHeaders();
  for (const header of Object.keys(res.headers)) {
    const value = res.headers[header];
    if (Array.isArray(value)) {
      if (value.length > 0) {
        headers.set(header, value[0]);
      }
    } else if (value) {
      headers.set(header, value);
    }
  }
  return headers;
}

function getDecodedResponseStream(
  stream: IncomingMessage,
  headers: HttpHeaders,
  abortSignal: AbortSignal,
): NodeJS.ReadableStream {
  const contentEncoding = headers.get("Content-Encoding");
  if (contentEncoding === "gzip") {
    return pipeResponseStream(stream, zlib.createGunzip(), abortSignal);
  } else if (contentEncoding === "deflate") {
    return pipeResponseStream(stream, zlib.createInflate(), abortSignal);
  }

  return stream;
}

function pipeUploadStream(
  source: NodeJS.ReadableStream,
  destination: NodeJS.WritableStream & { destroy(error?: Error): void },
  request: PipelineRequest,
  onError?: (error: RestError) => void,
): void {
  let tearingDown = false;
  const cleanupFinished = finished(source, { writable: false }, onSourceComplete);

  function onSourceComplete(error?: Error | null): void {
    cleanupFinished();
    destination.removeListener("close", onDestinationClose);
    if (error && !tearingDown) {
      const requestError = toRequestSendError(error, request);
      destination.destroy(requestError);
      onError?.(requestError);
    }
  }
  function onDestinationClose(): void {
    // Keep observing the source, but do not forward failures caused by intentional teardown.
    tearingDown = true;
    source.unpipe(destination);
    disposeNodeStream(source);
  }

  destination.once("close", onDestinationClose);
  source.pipe(destination);
}

function pipeResponseStream(
  source: NodeJS.ReadableStream,
  destination: Transform,
  abortSignal: AbortSignal,
): Transform {
  setResponseBodySource(destination, source);
  let cleanupSource = (): void => {};
  let cleanupDestination = (): void => {};
  cleanupSource = finished(source, { writable: false }, (error) => {
    cleanupSource();
    if (error) {
      destination.destroy(abortSignal.aborted ? new AbortError() : error);
    }
  });
  cleanupDestination = finished(destination, { writable: false }, () => {
    cleanupDestination();
    // Keep the source observer until its own completion, including any queued error.
    source.unpipe(destination);
    if (source.readable) {
      disposeNodeStream(source);
    }
  });
  return source.pipe(destination);
}

function streamToText(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const buffer: Buffer[] = [];
    const cleanupFinished = finished(stream, { writable: false }, onComplete);

    function onData(chunk: Uint8Array | string): void {
      if (Buffer.isBuffer(chunk)) {
        buffer.push(chunk);
      } else {
        buffer.push(Buffer.from(chunk));
      }
    }
    function onComplete(error?: Error | null): void {
      cleanupFinished();
      stream.removeListener("data", onData);
      if (error?.name === "AbortError") {
        reject(error);
      } else if (error) {
        reject(
          new RestError(`Error reading response as text: ${error.message}`, {
            code: RestError.PARSE_ERROR,
          }),
        );
      } else {
        resolve(Buffer.concat(buffer).toString("utf8"));
      }
    }
    stream.on("data", onData);
  });
}

/** @internal */
export function getBodyLength(body: RequestBodyType): number | null {
  if (!body) {
    return 0;
  } else if (Buffer.isBuffer(body)) {
    return body.length;
  } else if (isReadableStream(body)) {
    return null;
  } else if (isArrayBuffer(body)) {
    return body.byteLength;
  } else if (typeof body === "string") {
    return Buffer.from(body).length;
  } else {
    return null;
  }
}

/**
 * Create a new HttpClient instance for the NodeJS environment.
 * @internal
 */
export function createNodeHttpClient(): HttpClient {
  return new NodeHttpClient();
}
