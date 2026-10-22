// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import { Transform } from "node:stream";
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
import { hasExpectContinue } from "./util/expectContinue.js";
import {
  addExpectContinueFraming,
  createExpectContinueRequest,
} from "./util/nodeExpectContinue.js";

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

function wrapRequestError(error: Error & { code?: string }, request: PipelineRequest): Error {
  if (error.name === "AbortError" || isRestError(error)) {
    return error;
  }
  return new RestError(error.message, {
    code: error.code ?? RestError.REQUEST_SEND_ERROR,
    request,
  });
}

function sendRequestBody(
  request: http.ClientRequest,
  requestBody: RequestBodyType | undefined,
  pipelineRequest: PipelineRequest,
): void {
  if (requestBody && isReadableStream(requestBody)) {
    requestBody.pipe(request);
  } else if (requestBody) {
    if (typeof requestBody === "string" || Buffer.isBuffer(requestBody)) {
      request.end(requestBody);
    } else {
      logger.error("Unrecognized body type", requestBody);
      throw new RestError("Unrecognized body type", { request: pipelineRequest });
    }
  } else {
    request.end();
  }
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
    if (request.abortSignal) {
      if (request.abortSignal.aborted) {
        throw new AbortError("The operation was aborted. Request has already been canceled.");
      }

      abortListener = (event: Event) => {
        if (event.type === "abort") {
          abortController.abort();
        }
      };
      request.abortSignal.addEventListener("abort", abortListener);
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
    const bodyFactory = typeof request.body === "function" ? request.body : undefined;
    let body = bodyFactory ? undefined : request.body;
    let bodyInitialized = !bodyFactory;

    const initializeBody = (): RequestBodyType | undefined => {
      if (!bodyInitialized) {
        body = bodyFactory?.();
        bodyInitialized = true;
      }
      if (body && isArrayBuffer(body)) {
        body = arrayBufferToBuffer(body);
      }
      return body;
    };

    if (!useExpectContinue) {
      initializeBody();
    }

    if (bodyInitialized && body && !request.headers.has("Content-Length")) {
      const bodyLength = getBodyLength(body);
      if (bodyLength !== null) {
        request.headers.set("Content-Length", bodyLength);
      }
    }

    let responseStream: NodeJS.ReadableStream | undefined;
    try {
      const prepareBody = (): RequestBodyType | undefined => {
        initializeBody();
        if (!body || !request.onUploadProgress || body instanceof ReportTransform) {
          return body;
        }

        const onUploadProgress = request.onUploadProgress;
        const uploadReportStream = new ReportTransform(onUploadProgress);
        uploadReportStream.on("error", (e) => {
          logger.error("Error in upload progress", e);
        });
        if (isReadableStream(body)) {
          body.pipe(uploadReportStream);
        } else {
          uploadReportStream.end(body);
        }

        body = uploadReportStream;
        return body;
      };

      if (!useExpectContinue) {
        prepareBody();
      }

      const res = await this.makeRequest(
        request,
        abortController,
        useExpectContinue,
        prepareBody,
        bodyInitialized ? getBodyLength(body ?? null) : null,
      );

      const headers = getResponseHeaders(res);

      const status = res.statusCode ?? 0;
      const response: PipelineResponse = {
        status,
        headers,
        request,
      };

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

      responseStream = shouldDecompress ? getDecodedResponseStream(res, headers) : res;

      const onDownloadProgress = request.onDownloadProgress;
      if (onDownloadProgress) {
        const downloadReportStream = new ReportTransform(onDownloadProgress);
        downloadReportStream.on("error", (e) => {
          logger.error("Error in download progress", e);
        });
        responseStream.pipe(downloadReportStream);
        responseStream = downloadReportStream;
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
    } finally {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      // clean up event listener
      if (request.abortSignal && abortListener) {
        let uploadStreamDone = Promise.resolve();
        if (isReadableStream(body)) {
          uploadStreamDone = isStreamComplete(body);
        }
        let downloadStreamDone = Promise.resolve();
        if (isReadableStream(responseStream)) {
          downloadStreamDone = isStreamComplete(responseStream);
        }
        Promise.all([uploadStreamDone, downloadStreamDone])
          .then(() => {
            // eslint-disable-next-line promise/always-return
            if (abortListener) {
              request.abortSignal?.removeEventListener("abort", abortListener);
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
    useExpectContinue: boolean,
    prepareBody: () => RequestBodyType | undefined,
    bodyLength: number | null,
  ): Promise<http.IncomingMessage> {
    const url = new URL(request.url);

    const isInsecure = url.protocol !== "https:";

    if (isInsecure && !request.allowInsecureConnection) {
      throw new Error(`Cannot connect to ${request.url} while allowInsecureConnection is false.`);
    }

    const agent = (request.agent as http.Agent) ?? this.getOrCreateAgent(request, isInsecure);
    const options: http.RequestOptions = {
      agent,
      hostname: url.hostname,
      path: `${url.pathname}${url.search}`,
      port: url.port,
      method: request.method,
      headers: request.headers.toJSON({ preserveCase: true }),
      ...request.requestOverrides,
    };

    if (useExpectContinue) {
      addExpectContinueFraming(options, bodyLength);
    }

    return new Promise<http.IncomingMessage>((resolve, reject) => {
      const createRequest = (
        onResponse: (response: http.IncomingMessage) => void,
      ): http.ClientRequest =>
        isInsecure ? http.request(options, onResponse) : https.request(options, onResponse);
      const rejectRequest = (error: Error & { code?: string }): void => {
        reject(wrapRequestError(error, request));
      };

      if (useExpectContinue) {
        const pendingRequest = createExpectContinueRequest({
          abortSignal: abortController.signal,
          bodyLength,
          createRequest,
          onAbort: (clientRequest) => {
            const abortError = new AbortError(
              "The operation was aborted. Rejecting from abort signal callback while making request.",
            );
            clientRequest.destroy(abortError);
            reject(abortError);
          },
          onError: rejectRequest,
          onResponse: resolve,
          sendBody: (clientRequest) => {
            sendRequestBody(clientRequest, prepareBody(), request);
          },
        });
        pendingRequest.start();
        return;
      }

      const req = createRequest(resolve);
      req.once("error", rejectRequest);

      abortController.signal.addEventListener("abort", () => {
        const abortError = new AbortError(
          "The operation was aborted. Rejecting from abort signal callback while making request.",
        );
        req.destroy(abortError);
        reject(abortError);
      });
      try {
        sendRequestBody(req, prepareBody(), request);
      } catch (error: unknown) {
        rejectRequest(error instanceof Error ? error : new Error(String(error)));
      }
    });
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
): NodeJS.ReadableStream {
  const contentEncoding = headers.get("Content-Encoding");
  if (contentEncoding === "gzip") {
    const unzip = zlib.createGunzip();
    stream.pipe(unzip);
    return unzip;
  } else if (contentEncoding === "deflate") {
    const inflate = zlib.createInflate();
    stream.pipe(inflate);
    return inflate;
  }

  return stream;
}

function streamToText(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const buffer: Buffer[] = [];

    stream.on("data", (chunk) => {
      if (Buffer.isBuffer(chunk)) {
        buffer.push(chunk);
      } else {
        buffer.push(Buffer.from(chunk));
      }
    });
    stream.on("end", () => {
      resolve(Buffer.concat(buffer).toString("utf8"));
    });
    stream.on("error", (e) => {
      if (e && e?.name === "AbortError") {
        reject(e);
      } else {
        reject(
          new RestError(`Error reading response as text: ${e.message}`, {
            code: RestError.PARSE_ERROR,
          }),
        );
      }
    });
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
