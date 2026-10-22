// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type http from "node:http";

const EXPECT_CONTINUE_TIMEOUT_IN_MS = 1000;

interface ExpectContinueRequest {
  start(): void;
}

interface ExpectContinueRequestOptions {
  abortSignal: AbortSignal;
  bodyLength: number | null;
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

export function createExpectContinueRequest(
  options: ExpectContinueRequestOptions,
): ExpectContinueRequest {
  return {
    start(): void {
      let fallback: ReturnType<typeof setTimeout> | undefined;
      let bodyStarted = false;
      const request = options.createRequest(onResponse);

      function stopWaiting(): void {
        if (fallback !== undefined) {
          clearTimeout(fallback);
          fallback = undefined;
        }
        request.removeListener("continue", sendBody);
      }

      function sendBody(): void {
        if (bodyStarted) {
          return;
        }
        bodyStarted = true;
        stopWaiting();
        try {
          options.sendBody(request);
        } catch (error: unknown) {
          request.destroy(error instanceof Error ? error : new Error(String(error)));
        }
      }

      function onAbort(): void {
        stopWaiting();
        options.onAbort(request);
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
        }
        options.onResponse(response);
      }

      request.once("error", options.onError);
      options.abortSignal.addEventListener("abort", onAbort, { once: true });
      request.once("close", () => {
        stopWaiting();
        options.abortSignal.removeEventListener("abort", onAbort);
      });

      if (options.abortSignal.aborted) {
        onAbort();
        return;
      }

      if (options.bodyLength === 0) {
        sendBody();
        return;
      }

      request.once("continue", sendBody);
      try {
        request.flushHeaders();
        fallback = setTimeout(sendBody, EXPECT_CONTINUE_TIMEOUT_IN_MS);
      } catch (error: unknown) {
        request.destroy(error instanceof Error ? error : new Error(String(error)));
      }
    },
  };
}
