// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type http from "node:http";
import type { PipelineRequest } from "../interfaces.js";
import { getHeaderPairs } from "./requestBodyHeaders.js";

const EXPECT_CONTINUE_TIMEOUT_IN_MS = 1000;

interface ExpectContinueRequestOptions {
  abortSignal: AbortSignal;
  bodyStream?: NodeJS.ReadableStream;
  createRequest: (onResponse: (response: http.IncomingMessage) => void) => http.ClientRequest;
  onAbort: (request: http.ClientRequest) => void;
  onError: (error: Error & { code?: string }) => void;
  onBodyError: (error: unknown) => void;
  onResponse: (response: http.IncomingMessage) => void;
  sendBody: (request: http.ClientRequest) => void;
}

function getHeaderValues(headers: unknown, name: string): unknown[] {
  if (Array.isArray(headers)) {
    return getHeaderPairs(headers)
      .filter(([key]) => typeof key === "string" && key.toLowerCase() === name)
      .flatMap(([, value]) => (Array.isArray(value) ? value : [value]));
  }

  if (headers && typeof headers === "object") {
    if ("get" in headers && typeof headers.get === "function") {
      const value = headers.get(name);
      return value === undefined || value === null ? [] : [value];
    }

    let value: unknown;
    for (const [key, entry] of Object.entries(headers)) {
      if (key.toLowerCase() === name) {
        value = entry;
      }
    }
    return value === undefined ? [] : Array.isArray(value) ? value : [value];
  }

  return [];
}

export function getEffectiveHeaderValues(request: PipelineRequest, name: string): unknown[] {
  const headers =
    request.requestOverrides && "headers" in request.requestOverrides
      ? request.requestOverrides.headers
      : request.headers;
  return getHeaderValues(headers, name.toLowerCase());
}

export function hasExpectContinue(request: PipelineRequest): boolean {
  return getEffectiveHeaderValues(request, "expect").some(
    (value) =>
      typeof value === "string" &&
      value.split(",").some((token) => token.trim().toLowerCase() === "100-continue"),
  );
}

function addHeader(
  headers: http.RequestOptions["headers"],
  name: string,
  value: string,
): http.RequestOptions["headers"] {
  if (!Array.isArray(headers)) {
    return { ...headers, [name]: value };
  }

  return Array.isArray(headers[0]) ? [...headers, [name, value]] : [...headers, name, value];
}

function hasHeader(headers: http.RequestOptions["headers"], name: string): boolean {
  if (Array.isArray(headers)) {
    return getHeaderPairs(headers).some(
      ([key]) => typeof key === "string" && key.toLowerCase() === name,
    );
  }

  return Object.keys(headers ?? {}).some((key) => key.toLowerCase() === name);
}

export function addExpectContinueFraming(
  options: http.RequestOptions,
  bodyLength: number | null,
): void {
  if (
    hasHeader(options.headers, "content-length") ||
    hasHeader(options.headers, "transfer-encoding")
  ) {
    return;
  }

  options.headers = addHeader(
    options.headers,
    bodyLength === null ? "Transfer-Encoding" : "Content-Length",
    bodyLength === null ? "chunked" : String(bodyLength),
  );
}

export function createExpectContinueRequest(options: ExpectContinueRequestOptions): void {
  let fallback: ReturnType<typeof setTimeout> | undefined;
  let waiting = true;
  let bodyStarted = false;
  let errorReported = false;
  let request: http.ClientRequest;
  let bodyError: Error | undefined;
  const bodyStream = options.bodyStream;
  // Error observation must not consume a caller-owned source before upload permission.
  bodyStream?.once("error", onBodyError);
  if (bodyStream && "errored" in bodyStream && bodyStream.errored instanceof Error) {
    // destroy(error) may still have its error event queued on the next tick.
    process.nextTick(onBodyError, bodyStream.errored);
    return;
  }
  try {
    request = options.createRequest(onResponse);
  } catch (error: unknown) {
    onError(error);
    return;
  }

  function stopWaiting(keepBodyObserved = false): void {
    waiting = false;
    if (fallback !== undefined) {
      clearTimeout(fallback);
      fallback = undefined;
    }
    request?.removeListener("continue", sendBody);
    request?.removeListener("socket", onSocket);
    if (!keepBodyObserved) {
      bodyStream?.removeListener("error", onBodyError);
    }
  }

  function onError(error: unknown): Error {
    const requestError = error instanceof Error ? error : new Error(String(error));
    // destroy() may emit no error on a closed request, or emit this error again on a live one.
    if (!errorReported) {
      errorReported = true;
      stopWaiting();
      options.onError(requestError);
    }
    return requestError;
  }

  function onBodyError(error: unknown): void {
    if (errorReported || (!waiting && !bodyStarted)) {
      return;
    }
    errorReported = true;
    bodyError = error instanceof Error ? error : new Error(String(error));
    stopWaiting();
    options.onBodyError(error);
    request?.destroy(bodyError);
  }

  function sendBody(): void {
    if (!waiting) {
      return;
    }
    bodyStarted = true;
    stopWaiting(true);
    try {
      options.sendBody(request);
    } catch (error: unknown) {
      onBodyError(error);
    } finally {
      // The upload path now observes the source, including synchronous failures while piping.
      bodyStream?.removeListener("error", onBodyError);
    }
  }

  function onAbort(): void {
    stopWaiting();
    options.onAbort(request);
  }

  function onSocket(): void {
    if (!waiting) {
      return;
    }
    try {
      request.flushHeaders();
      if (!waiting) {
        return;
      }
      // This ordered write excludes connection setup and preceding header writes from the timeout.
      request.write("", (error) => {
        if (error) {
          request.destroy(onError(error));
        } else if (waiting) {
          fallback = setTimeout(sendBody, EXPECT_CONTINUE_TIMEOUT_IN_MS);
        }
      });
    } catch (error: unknown) {
      request.destroy(onError(error));
    }
  }

  function onResponse(response: http.IncomingMessage): void {
    stopWaiting();
    if (!bodyStarted) {
      request.shouldKeepAlive = false;
      const destroyRequest = (): void => {
        response.removeListener("end", destroyRequest);
        response.removeListener("close", destroyRequest);
        request.destroy();
      };
      response.once("end", destroyRequest);
      response.once("close", destroyRequest);
      if (response.readableEnded || response.destroyed) {
        destroyRequest();
      }
    }
    options.onResponse(response);
  }

  request.once("error", onError);

  if (bodyError) {
    request.destroy(bodyError);
    return;
  }

  if (options.abortSignal.aborted) {
    onAbort();
    return;
  }

  options.abortSignal.addEventListener("abort", onAbort, { once: true });
  // Request close can precede consumption of buffered response data.
  // Keep private abort forwarding until sendRequest's outer lifecycle disconnects the caller.
  request.once("close", () => stopWaiting());

  if (request.destroyed || request.closed) {
    stopWaiting();
  }

  if (!waiting) {
    return;
  }

  request.once("continue", sendBody);
  if (request.socket) {
    onSocket();
  } else {
    request.once("socket", onSocket);
  }
}
