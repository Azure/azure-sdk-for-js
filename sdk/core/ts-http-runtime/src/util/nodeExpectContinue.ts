// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http, { type IncomingMessage } from "node:http";
import https from "node:https";
import { Transform } from "node:stream";
import { AbortError } from "../abort-controller/AbortError.js";
import type { PipelineRequest, RequestBodyType, TransferProgressEvent } from "../interfaces.js";
import { logger } from "../log.js";
import { isRestError, RestError } from "../restError.js";
import { arrayBufferToBuffer, isArrayBuffer } from "./nodeArrayBuffer.js";
import { toError } from "./error.js";
import {
  disposeBodyStream,
  monitorBodyStreamErrors,
  observeBodyStreamErrors,
  observePendingBodyErrors,
  startBodyStream,
} from "./nodeBody.js";
import { headerPairs, headerValues } from "./expectContinueHeaders.js";

const EXPECT_CONTINUE_TIMEOUT_IN_MS = 1000;

/** Determines whether a request body is a Node readable stream. */
export function isReadableStream(body: unknown): body is NodeJS.ReadableStream {
  return (
    typeof body === "object" && body !== null && "pipe" in body && typeof body.pipe === "function"
  );
}

/** Reports transferred bytes while passing chunks through unchanged. */
export class ReportTransform extends Transform {
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

/** The response and outgoing completion state for a Node request attempt. */
export interface NodeRequestResult {
  response: IncomingMessage;
  requestComplete: Promise<void>;
  isRequestComplete: () => boolean;
}

interface NodeRequestAttemptConfig {
  request: PipelineRequest;
  abortSignal: AbortSignal;
  hasExpectHeader: boolean;
  body: RequestBodyType | undefined;
  bodyLength: number | null;
  expectHeader: http.OutgoingHttpHeaders[string];
  isInsecure: boolean;
  options: http.RequestOptions;
}

function toRequestError(error: Error & { code?: string }, request: PipelineRequest): Error {
  if (error.name === "AbortError" || isRestError(error)) return error;
  return new RestError(error.message, {
    code: error.code ?? RestError.REQUEST_SEND_ERROR,
    request,
  });
}

/**
 * Adds the framing header Node would otherwise defer until the body is sent, converts raw
 * array headers to an object, and removes `Expect` from `options.headers` so that it can be
 * set once the socket is available. Removing it is intentional: **passing `Expect` to `http.request()`
 * causes Node to serialize and queue the headers during construction**, rather than waiting for our explicit `flushHeaders()`.
 *
 * Node’s constructor calls `_storeHeader()` when `Expect` is present, and `_storeHeader()` immediately calls `_send("")`.
 * That happens **before `agent.addRequest()`**, so a proxy agent that needs to rewrite the path or add headers can encounter
 * already-committed headers (`ERR_HTTP_HEADERS_SENT`).
 *
 * The remove-and-restore sequence avoids that:
 *
 * 1. `prepareExpectContinueHeaders` saves and removes `Expect` before constructing the request.
 * 2. `start` restores it with `setHeader()`, which **does not flush headers**.
 * 3. `flushHeaders` explicitly sends them once the socket is assigned, allowing the agent’s setup to happen first.
 *
 * So the header still goes over the wire; we’re changing **when Node commits it**, not whether it’s sent.
 *
 * @returns the removed `Expect` header value, if any.
 */
export function prepareExpectContinueHeaders(
  options: http.RequestOptions,
  bodyLength: number | null,
): http.OutgoingHttpHeaders[string] {
  if (
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

  let headers: http.OutgoingHttpHeaders;
  if (Array.isArray(options.headers)) {
    headers = Object.create(null);
    for (const [name, value] of headerPairs(options.headers) as [string, string][]) {
      http.validateHeaderName(name);
      http.validateHeaderValue(name, value);
      const key = name.toLowerCase();
      const previous = headers[key];
      headers[key] =
        previous === undefined
          ? value
          : [...(Array.isArray(previous) ? previous : [String(previous)]), value];
    }
    if (headerValues(headers, "host").length > 0) {
      options.setHost = false;
    }
  } else {
    headers = (options.headers ?? {}) as http.OutgoingHttpHeaders;
  }

  let expectHeader: http.OutgoingHttpHeaders[string];
  const deferredHeaders = { ...headers };
  for (const [name, value] of Object.entries(deferredHeaders)) {
    if (name.toLowerCase() === "expect" && value !== undefined) {
      http.validateHeaderValue(name, String(value));
      expectHeader = value;
      delete deferredHeaders[name];
    }
  }
  options.headers = deferredHeaders;
  return expectHeader;
}

/**
 * Creates and starts expect continue request attempt. The attempt coordinates
 * optional `Expect: 100-continue` negotiation, exactly-once body dispatch, upload ownership and
 * cleanup, early final responses, cancellation, and outgoing request completion.
 *
 * The attempt transitions from `waiting` for upload permission, to `sending` while the body may
 * flow, and finally to `terminal`, where no new body work can start. The incoming response and
 * outgoing request can complete independently, so `requestComplete` remains separate from the
 * promise that resolves when response headers arrive.
 *
 * @param config - Configuration for the request attempt.
 * @returns The final response and outgoing request completion state.
 */
export function createExpectContinueRequest(
  config: NodeRequestAttemptConfig,
): Promise<NodeRequestResult> {
  return new Promise((resolve, reject) => runNodeRequestAttempt(config, resolve, reject));
}

function runNodeRequestAttempt(
  config: NodeRequestAttemptConfig,
  resolve: (result: NodeRequestResult) => void,
  reject: (error: unknown) => void,
): void {
  const { request, abortSignal, hasExpectHeader, bodyLength, expectHeader, isInsecure, options } =
    config;
  let body = config.body;
  let state: "waiting" | "sending" | "terminal" = "waiting";
  let fallback: ReturnType<typeof setTimeout> | undefined;
  let pendingSourceCleanup: (() => void) | undefined;
  let pendingPartsCleanup: (() => void) | undefined;
  let source: NodeJS.ReadableStream | undefined;
  let report: ReportTransform | undefined;
  let sourceOwned = false;
  let sourceEnded = false;
  let response: IncomingMessage | undefined;
  let constructed = false;
  let requestCompleteResolved = false;

  let resolveRequestComplete: () => void;
  const requestComplete = new Promise<void>((_resolve) => {
    resolveRequestComplete = _resolve;
  });

  const req = (isInsecure ? http : https).request(options, receiveResponse);
  pendingSourceCleanup = observeBodyStreamErrors(body, fail);
  pendingPartsCleanup = observePendingBodyErrors(request.body, fail);
  constructed = true;

  req.once("finish", completeRequest);
  req.on("error", onRequestError);
  abortSignal.addEventListener("abort", onAbort);
  req.once("close", onRequestClose);

  if (hasExpectHeader && expectHeader !== undefined) {
    try {
      // Avoid constructor-time writes before an agent has finished rewriting the headers.
      req.setHeader("Expect", expectHeader);
    } catch (error) {
      fail(toError(error));
      return;
    }
  }
  if (abortSignal.aborted) {
    onAbort();
  } else if (hasExpectHeader) {
    if (bodyLength !== 0) req.on("continue", sendBody);
    if (req.socket) flushHeaders();
    else req.once("socket", flushHeaders);
  } else {
    sendBody();
  }

  function completeRequest(): void {
    if (requestCompleteResolved) return;
    requestCompleteResolved = true;
    resolveRequestComplete();
    if (response) state = "terminal";
  }

  function cleanupWait(): void {
    if (fallback !== undefined) clearTimeout(fallback);
    fallback = undefined;
    if (hasExpectHeader) {
      req.removeListener("continue", sendBody);
      req.removeListener("socket", flushHeaders);
    }
  }

  function stopUpload(): void {
    const uploadSource = source;
    const uploadReport = report;
    const uploadSourceOwned = sourceOwned;
    pendingSourceCleanup?.();
    pendingSourceCleanup = undefined;
    pendingPartsCleanup?.();
    pendingPartsCleanup = undefined;
    source = undefined;
    report = undefined;
    if (uploadSource) {
      uploadSource.unpipe(uploadReport ?? req);
      uploadSource.pause();
      uploadSource.removeListener("end", onSourceEnd);
      uploadSource.removeListener("error", fail);
      uploadSource.removeListener("close", onSourceClose);
      if (uploadSourceOwned) disposeBodyStream(uploadSource);
      else monitorBodyStreamErrors(uploadSource);
    }
    uploadReport?.unpipe(req);
    uploadReport?.destroy();
  }

  function fail(error: Error & { code?: string }): void {
    if (state === "terminal") return;
    state = "terminal";
    cleanupWait();
    stopUpload();
    const restError = toRequestError(error, request);
    completeRequest();
    if (response) {
      queueMicrotask(() => {
        if (!response?.complete) {
          response?.destroy(restError);
          req.destroy();
        } else {
          logger.warning("Request upload failed after response completed", restError);
          req.shouldKeepAlive = false;
          retireRequestAfterResponse(response);
        }
      });
    } else {
      req.destroy(restError);
    }
    reject(restError);
  }

  function onSourceEnd(): void {
    sourceEnded = true;
  }

  function onSourceClose(): void {
    source?.removeListener("error", fail);
    if (!sourceEnded && state === "sending") {
      fail(new Error("Request body stream closed before ending"));
    }
  }

  function receiveResponse(res: IncomingMessage): void {
    if (!constructed) {
      queueMicrotask(() => receiveResponse(res));
      return;
    }
    response = res;
    const status = res.statusCode ?? 0;
    const continueUpload =
      !req.writableFinished && state === "sending" && status >= 200 && status < 300;
    state = continueUpload ? "sending" : "terminal";
    cleanupWait();
    if (!req.writableFinished && !continueUpload) {
      req.shouldKeepAlive = false;
      stopUpload();
      retireRequestAfterResponse(res);
    }
    resolve({
      response: res,
      requestComplete,
      isRequestComplete: () => requestCompleteResolved,
    });
  }

  function onRequestError(error: Error & { code?: string }): void {
    if (!response) {
      fail(error);
      return;
    }
    stopUpload();
    if (response.complete) {
      completeRequest();
      return;
    }
    const restError = toRequestError(error, request);
    completeRequest();
    queueMicrotask(() => {
      if (!response?.complete) response?.destroy(restError);
      req.destroy();
    });
  }

  function onAbort(): void {
    state = "terminal";
    cleanupWait();
    stopUpload();
    const abortError = new AbortError(
      "The operation was aborted. Rejecting from abort signal callback while making request.",
    );
    completeRequest();
    if (response) {
      queueMicrotask(() => {
        if (!response?.destroyed) response?.destroy(abortError);
        req.destroy();
      });
    } else {
      req.destroy(abortError);
    }
    reject(abortError);
  }

  function retireRequestAfterResponse(incomingResponse: IncomingMessage): void {
    const retireRequest = (): void => {
      incomingResponse.removeListener("end", retireRequest);
      incomingResponse.removeListener("close", retireRequest);
      req.destroy();
    };
    if (incomingResponse.readableEnded || incomingResponse.destroyed) retireRequest();
    else {
      incomingResponse.once("end", retireRequest);
      incomingResponse.once("close", retireRequest);
    }
  }

  function onRequestClose(): void {
    cleanupWait();
    stopUpload();
    abortSignal.removeEventListener("abort", onAbort);
    if (!response) fail(new Error("Request closed before a response"));
    else completeRequest();
    state = "terminal";
  }

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
      if (body && isArrayBuffer(body)) {
        body = arrayBufferToBuffer(body);
      }
      if (isReadableStream(body)) {
        source = body;
        pendingSourceCleanup?.();
        pendingSourceCleanup = undefined;
        source.on("error", fail);
        source.once("end", onSourceEnd);
        source.once("close", onSourceClose);
        startBodyStream(source);
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
      fail(toError(error));
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
      fail(toError(error));
    }
  }
}
