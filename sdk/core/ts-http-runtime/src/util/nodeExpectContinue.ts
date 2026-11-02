// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type http from "node:http";
import { finished } from "node:stream";
import type { PipelineRequest } from "../interfaces.js";
import { logger } from "../log.js";

const EXPECT_CONTINUE_TIMEOUT_IN_MS = 1000;
const unusedSourceObservers = new WeakMap<NodeJS.ReadableStream, () => void>();

function observeUnusedSource(stream: NodeJS.ReadableStream): void {
  if (unusedSourceObservers.has(stream)) {
    return;
  }
  // Pending opens and destroy(error) calls can settle after the request has stopped.
  // This callback retains only the source, not the retired request or its callbacks.
  const cleanup = finished(stream, { writable: false }, (error) => {
    stopObserving();
    if (error) {
      logger.warning("Error in unused upload source", error);
    }
  });
  function stopObserving(): void {
    cleanup();
    unusedSourceObservers.delete(stream);
  }
  unusedSourceObservers.set(stream, stopObserving);
}

interface ExpectContinueRequestOptions {
  abortSignal: AbortSignal;
  knownBodyLength: number | null;
  bodyStreams?: readonly NodeJS.ReadableStream[];
  createRequest: (onResponse: (response: http.IncomingMessage) => void) => http.ClientRequest;
  onAbort: (request: http.ClientRequest) => void;
  onError: (error: Error & { code?: string }) => void;
  onBodyError: (error: Error) => void;
  onResponse: (response: http.IncomingMessage) => void;
  sendBody: (request: http.ClientRequest) => void;
}

/**
 * Converts a flat `[name, value, ...]` raw header array to `[name, value]` pairs,
 * or returns an existing pair array unchanged, preserving order and duplicates.
 *
 * @param headers - Header names and values in either array format.
 * @returns The header pairs in their original order.
 * @see https://nodejs.org/api/http.html#messagerawheaders
 */
function getHeaderPairs(headers: unknown[]): unknown[][] {
  return Array.isArray(headers[0])
    ? (headers as unknown[][])
    : Array.from({ length: Math.ceil(headers.length / 2) }, (_, index) => [
        headers[index * 2],
        headers[index * 2 + 1],
      ]);
}

function getHeaderValuesFromArray(headers: unknown[], name: string): unknown[] {
  return getHeaderPairs(headers)
    .filter(([key]) => typeof key === "string" && key.toLowerCase() === name)
    .map(([, value]) => value);
}

function getHeaderValues(headers: unknown, name: string): unknown[] {
  if (Array.isArray(headers)) {
    return getHeaderValuesFromArray(headers, name);
  }

  if (headers && typeof headers === "object") {
    const get = Reflect.get(headers, "get");
    if (typeof get === "function") {
      const value = Reflect.apply(get, headers, [name]);
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
  let abortHandled = false;
  let responseBeforeRequest: http.IncomingMessage | undefined;
  let request: http.ClientRequest;
  let bodyError: Error | undefined;
  const bodyStreams = new Set(options.bodyStreams);
  // Error observation must not consume a caller-owned source before upload permission.
  for (const stream of bodyStreams) {
    stream.on("error", onBodyError);
    unusedSourceObservers.get(stream)?.();
  }
  for (const stream of bodyStreams) {
    if ("errored" in stream && stream.errored instanceof Error) {
      // destroy(error) may still have its error event queued on the next tick.
      process.nextTick(onBodyError, stream.errored);
      return;
    }
  }
  try {
    request = options.createRequest(onResponse);
  } catch (error: unknown) {
    onError(error);
    return;
  }

  function stopWaiting(): void {
    waiting = false;
    if (fallback !== undefined) {
      clearTimeout(fallback);
      fallback = undefined;
    }
    request?.removeListener("continue", sendBody);
    request?.removeListener("socket", onSocket);
  }

  function onError(error: unknown): Error {
    const requestError = error instanceof Error ? error : new Error(String(error));
    // destroy() may emit no error on a closed request, or emit this error again on a live one.
    if (!errorReported) {
      errorReported = true;
      stopWaiting();
      stopObservingBody();
      options.onError(requestError);
    }
    return requestError;
  }

  function stopObservingBody(handedOff = false): void {
    for (const stream of bodyStreams) {
      if (!handedOff) {
        observeUnusedSource(stream);
      }
      stream.removeListener("error", onBodyError);
    }
    bodyStreams.clear();
  }

  function onBodyError(error: Error): void {
    if (errorReported || (!waiting && !bodyStarted)) {
      return;
    }
    errorReported = true;
    bodyError = error;
    stopWaiting();
    stopObservingBody();
    options.onBodyError(error);
    request?.destroy(error);
  }

  function sendBody(): void {
    if (!waiting) {
      return;
    }
    bodyStarted = true;
    stopWaiting();
    try {
      options.sendBody(request);
    } catch (error: unknown) {
      request.destroy(onError(error));
    } finally {
      // The upload path now observes the source, including synchronous failures while piping.
      stopObservingBody(true);
    }
  }

  function onAbort(): void {
    stopWaiting();
    stopObservingBody();
    if (!abortHandled) {
      abortHandled = true;
      options.onAbort(request);
    }
  }

  function onClose(): void {
    stopWaiting();
    stopObservingBody();
    // Request close can precede consumption of buffered response data.
    // Keep private abort forwarding until sendRequest's outer lifecycle disconnects the caller.
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
    stopObservingBody();
    if (!request) {
      // A custom request factory may deliver a response before returning its request.
      responseBeforeRequest = response;
      return;
    }
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
  options.abortSignal.addEventListener("abort", onAbort, { once: true });
  request.once("close", onClose);

  if (bodyError) {
    request.destroy(bodyError);
    return;
  }

  if (responseBeforeRequest) {
    onResponse(responseBeforeRequest);
  }

  if (options.abortSignal.aborted) {
    onAbort();
    return;
  }

  if (request.destroyed || request.closed) {
    onClose();
  }

  if (!waiting) {
    return;
  }

  if (options.knownBodyLength === 0) {
    sendBody();
    return;
  }

  request.once("continue", sendBody);
  if (!waiting) {
    return;
  }
  if (request.socket) {
    onSocket();
  } else {
    request.once("socket", onSocket);
  }
}
