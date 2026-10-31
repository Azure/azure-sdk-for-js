// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type http from "node:http";

const EXPECT_CONTINUE_TIMEOUT_IN_MS = 1000;

interface ExpectContinueRequestOptions {
  abortSignal: AbortSignal;
  knownBodyLength: number | null;
  createRequest: (onResponse: (response: http.IncomingMessage) => void) => http.ClientRequest;
  onAbort: (request: http.ClientRequest) => void;
  onError: (error: Error & { code?: string }) => void;
  onResponse: (response: http.IncomingMessage) => void;
  sendBody: (request: http.ClientRequest) => void;
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
    const pairs = Array.isArray(headers[0])
      ? headers
      : Array.from({ length: Math.ceil(headers.length / 2) }, (_, index) => [
          headers[index * 2],
          headers[index * 2 + 1],
        ]);
    return pairs.some(([key]) => typeof key === "string" && key.toLowerCase() === name);
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
      options.onError(requestError);
    }
    return requestError;
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
    }
  }

  function onAbort(): void {
    stopWaiting();
    if (!abortHandled) {
      abortHandled = true;
      options.onAbort(request);
    }
  }

  function onClose(): void {
    stopWaiting();
    options.abortSignal.removeEventListener("abort", onAbort);
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
