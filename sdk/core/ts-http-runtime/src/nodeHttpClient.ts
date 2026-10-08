// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import { Transform } from "node:stream";
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
import { RestError } from "./restError.js";
import type { IncomingMessage } from "node:http";
import { logger } from "./log.js";
import { Sanitizer } from "./util/sanitizer.js";
import { effectiveHeaders, hasExpectContinue, headerValues } from "./util/expectContinue.js";
import {
  destroyBodyStream,
  disposeBodyStream,
  monitorBodyStreamErrors,
  startBodyStream,
} from "./util/nodeBody.js";

const DEFAULT_TLS_SETTINGS = {};
const EXPECT_CONTINUE_TIMEOUT_IN_MS = 1000;

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

function isArrayBuffer(body: any): body is ArrayBuffer | ArrayBufferView {
  return body && typeof body.byteLength === "number";
}

function isHeaderObject(
  headers: http.RequestOptions["headers"],
): headers is http.OutgoingHttpHeaders {
  return headers !== undefined && !Array.isArray(headers);
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

    const negotiate = hasExpectContinue(request);
    const acceptEncoding = negotiate
      ? headerValues(effectiveHeaders(request), "accept-encoding").join(",")
      : request.headers.get("Accept-Encoding");
    const shouldDecompress =
      acceptEncoding?.includes("gzip") || acceptEncoding?.includes("deflate");

    let responseStream: NodeJS.ReadableStream | undefined;
    let responseAbortListener: (() => void) | undefined;
    try {
      const res = await this.makeRequest(request, abortController);

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
        negotiate && typeof request.requestOverrides?.method === "string"
          ? request.requestOverrides.method.toUpperCase()
          : request.method;
      if (method === "HEAD") {
        // call resume() and not destroy() to avoid closing the socket
        // and losing keep alive
        res.resume();
        return response;
      }

      responseStream = shouldDecompress ? getDecodedResponseStream(res, headers) : res;
      responseAbortListener = () => {
        if (responseStream) {
          destroyBodyStream(responseStream, new AbortError("The operation was aborted."));
        }
      };
      abortController.signal.addEventListener("abort", responseAbortListener);

      const onDownloadProgress = request.onDownloadProgress;
      if (onDownloadProgress) {
        const downloadReportStream = new ReportTransform(onDownloadProgress);
        downloadReportStream.on("error", (e) => {
          logger.error("Error in download progress", e);
        });
        pipeResponse(responseStream, downloadReportStream);
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

      const cleanup = (): void => {
        if (abortListener) request.abortSignal?.removeEventListener("abort", abortListener);
        if (responseAbortListener) {
          abortController.signal.removeEventListener("abort", responseAbortListener);
        }
      };
      if (responseStream) {
        isStreamComplete(responseStream)
          .then(cleanup)
          .catch((e) => {
            logger.warning("Error when cleaning up abortListener on httpRequest", e);
          });
      } else {
        cleanup();
      }
    }
  }

  private makeRequest(
    request: PipelineRequest,
    abortController: AbortController,
  ): Promise<http.IncomingMessage> {
    const url = new URL(request.url);

    const isInsecure = url.protocol !== "https:";

    if (isInsecure && !request.allowInsecureConnection) {
      throw new Error(`Cannot connect to ${request.url} while allowInsecureConnection is false.`);
    }

    const agent = (request.agent as http.Agent) ?? this.getOrCreateAgent(request, isInsecure);
    const negotiate = hasExpectContinue(request);
    let body = negotiate
      ? request.body
      : typeof request.body === "function"
        ? request.body()
        : request.body;
    const bodyLength = typeof body === "function" ? null : getBodyLength(body ?? null);
    const headers = effectiveHeaders(request);
    if (
      bodyLength !== null &&
      (bodyLength > 0 || negotiate) &&
      headerValues(headers, "content-length").length === 0 &&
      headerValues(headers, "transfer-encoding").length === 0 &&
      !(request.requestOverrides && "headers" in request.requestOverrides)
    ) {
      request.headers.set("Content-Length", bodyLength);
    }
    const options: http.RequestOptions = {
      agent,
      hostname: url.hostname,
      path: `${url.pathname}${url.search}`,
      port: url.port,
      method: request.method,
      headers: request.headers.toJSON({ preserveCase: true }),
      ...request.requestOverrides,
    };
    if (
      negotiate &&
      headerValues(options.headers, "content-length").length === 0 &&
      headerValues(options.headers, "transfer-encoding").length === 0
    ) {
      const name = bodyLength === null ? "Transfer-Encoding" : "Content-Length";
      const value = bodyLength === null ? "chunked" : String(bodyLength);
      if (Array.isArray(options.headers)) {
        options.headers = Array.isArray(options.headers[0])
          ? [...options.headers, [name, value]]
          : [...options.headers, name, value];
      } else {
        options.headers = { ...options.headers, [name]: value };
      }
    }
    let expectHeader: http.OutgoingHttpHeaders[string];
    if (negotiate) {
      if (Array.isArray(options.headers)) {
        const raw = options.headers;
        const pairs = Array.isArray(raw[0])
          ? raw
          : Array.from({ length: Math.ceil(raw.length / 2) }, (_, i) => [
              raw[i * 2],
              raw[i * 2 + 1],
            ]);
        const normalized: http.OutgoingHttpHeaders = Object.create(null);
        for (const [name, value] of pairs) {
          http.validateHeaderName(name);
          http.validateHeaderValue(name, value);
          const key = name.toLowerCase();
          const previous = normalized[key];
          normalized[key] =
            previous === undefined
              ? value
              : [...(Array.isArray(previous) ? previous : [String(previous)]), value];
        }
        options.headers = normalized;
        options.setHost = false;
      }
      const deferredHeaders = { ...(isHeaderObject(options.headers) ? options.headers : {}) };
      for (const [name, value] of Object.entries(deferredHeaders)) {
        if (name.toLowerCase() === "expect" && value !== undefined) {
          http.validateHeaderValue(name, String(value));
          expectHeader = value;
          delete deferredHeaders[name];
        }
      }
      options.headers = deferredHeaders;
    }

    return new Promise<http.IncomingMessage>((resolve, reject) => {
      let state: "waiting" | "sending" | "terminal" = "waiting";
      let fallback: ReturnType<typeof setTimeout> | undefined;
      let source: NodeJS.ReadableStream | undefined;
      let report: ReportTransform | undefined;
      let sourceOwned = false;
      let sourceEnded = false;
      let response: IncomingMessage | undefined;
      let constructed = false;
      const req = (isInsecure ? http : https).request(options, receiveResponse);
      constructed = true;
      const cleanupWait = (): void => {
        if (fallback !== undefined) clearTimeout(fallback);
        fallback = undefined;
        if (negotiate) {
          req.removeListener("continue", sendBody);
          req.removeListener("socket", flushHeaders);
        }
      };
      const stopUpload = (): void => {
        if (source) {
          source.unpipe(report ?? req);
          source.pause();
          source.removeListener("end", onSourceEnd);
          source.removeListener("error", fail);
          source.removeListener("close", onSourceClose);
          if (sourceOwned) disposeBodyStream(source);
          else monitorBodyStreamErrors(source);
        }
        report?.unpipe(req);
        report?.destroy();
      };
      function fail(error: Error & { code?: string }): void {
        if (state === "terminal") return;
        state = "terminal";
        cleanupWait();
        stopUpload();
        const restError =
          error.name === "AbortError"
            ? error
            : new RestError(error.message, {
                code: error.code ?? RestError.REQUEST_SEND_ERROR,
                request,
              });
        req.destroy();
        reject(restError);
      }
      function onSourceEnd(): void {
        sourceEnded = true;
      }
      function onSourceClose(): void {
        source?.removeListener("error", fail);
        if (negotiate && !sourceEnded && state === "sending") {
          fail(new Error("Request body stream closed before ending"));
        }
      }
      function receiveResponse(res: IncomingMessage): void {
        if (!constructed) {
          queueMicrotask(() => receiveResponse(res));
          return;
        }
        response = res;
        state = "terminal";
        cleanupWait();
        if (negotiate && !req.writableFinished) {
          // Leave incoming data readable; Node retires the socket when the response ends.
          req.shouldKeepAlive = false;
          stopUpload();
        }
        resolve(res);
      }
      req.on("error", (error: Error & { code?: string }) => {
        if (response) response.destroy(error);
        else fail(error);
      });
      const onAbort = (): void => {
        state = "terminal";
        cleanupWait();
        stopUpload();
        const abortError = new AbortError(
          "The operation was aborted. Rejecting from abort signal callback while making request.",
        );
        req.destroy(abortError);
        reject(abortError);
      };
      abortController.signal.addEventListener("abort", onAbort);
      req.once("close", () => {
        cleanupWait();
        stopUpload();
        abortController.signal.removeEventListener("abort", onAbort);
        if (!response) fail(new Error("Request closed before a response"));
        state = "terminal";
      });
      function sendBody(): void {
        if (state !== "waiting") return;
        state = "sending";
        cleanupWait();
        try {
          sourceOwned = typeof request.body === "function";
          if (typeof body === "function") body = body();
          if (state !== "sending") {
            if (sourceOwned && isReadableStream(body)) disposeBodyStream(body);
            return;
          }
          if (body && isArrayBuffer(body) && !Buffer.isBuffer(body)) {
            body = ArrayBuffer.isView(body)
              ? Buffer.from(body.buffer, body.byteOffset, body.byteLength)
              : Buffer.from(body);
          }
          if (isReadableStream(body)) {
            source = body;
            source.on("error", fail);
            source.once("end", onSourceEnd);
            source.once("close", onSourceClose);
            startBodyStream(source, negotiate);
          }
          if (body && request.onUploadProgress) {
            report = new ReportTransform(request.onUploadProgress);
            report.on("error", fail);
            if (source) source.pipe(report);
            else report.end(body);
          }
          if (state !== "sending") {
            stopUpload();
            return;
          }
          if (report) report.pipe(req);
          else if (source) source.pipe(req);
          else if (!body) req.end();
          else if (typeof body === "string" || Buffer.isBuffer(body)) req.end(body);
          else throw new RestError("Unrecognized body type", { request });
        } catch (error) {
          fail(error instanceof Error ? error : new Error(String(error)));
          return;
        }
      }
      function flushHeaders(): void {
        if (state !== "waiting") return;
        req.removeListener("socket", flushHeaders);
        if (bodyLength === 0) {
          sendBody();
          return;
        }
        try {
          req.flushHeaders();
          if (state !== "waiting") return;
          // An ordered empty write waits for DNS/TCP/TLS and preceding header writes.
          req.write("", (error) => {
            if (error) fail(error);
            else if (state === "waiting") {
              fallback = setTimeout(sendBody, EXPECT_CONTINUE_TIMEOUT_IN_MS);
            }
          });
        } catch (error) {
          fail(error instanceof Error ? error : new Error(String(error)));
          return;
        }
      }
      if (negotiate && expectHeader !== undefined) {
        try {
          // Avoid constructor-time writes before an agent has finished rewriting the headers.
          req.setHeader("Expect", expectHeader);
        } catch (error) {
          fail(error instanceof Error ? error : new Error(String(error)));
          return;
        }
      }
      if (abortController.signal.aborted) {
        onAbort();
      } else if (negotiate) {
        if (bodyLength !== 0) req.on("continue", sendBody);
        if (req.socket) flushHeaders();
        else req.once("socket", flushHeaders);
      } else {
        sendBody();
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
    pipeResponse(stream, unzip);
    return unzip;
  } else if (contentEncoding === "deflate") {
    const inflate = zlib.createInflate();
    pipeResponse(stream, inflate);
    return inflate;
  }

  return stream;
}

function pipeResponse(source: NodeJS.ReadableStream, destination: Transform): void {
  const onError = (error: Error): void => {
    destination.destroy(error);
  };
  source.on("error", onError);
  destination.once("close", () => {
    source.unpipe(destination);
    source.removeListener("error", onError);
    if (source.readable) destroyBodyStream(source);
  });
  source.pipe(destination);
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
