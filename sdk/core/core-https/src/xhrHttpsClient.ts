// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

import { AbortError } from "@azure/abort-controller";
import {
  HttpsClient,
  PipelineRequest,
  PipelineResponse,
  TransferProgressEvent,
  HttpHeaders
} from "./interfaces";
import { RestError } from "./restError";
import { createHttpHeaders } from "./httpHeaders";

function isReadableStream(body: any): body is NodeJS.ReadableStream {
  return body && typeof body.pipe === "function";
}

/**
 * A HttpsClient implementation that uses XMLHttpRequest to send HTTPS requests.
 */
export class XhrHttpsClient implements HttpsClient {
  /**
   * Makes a request over an underlying transport layer and returns the response.
   * @param request The request to be made.
   */
  public async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
    const xhr = new XMLHttpRequest();

    if (request.proxySettings) {
      throw new Error("HTTP proxy is not supported in browser environment");
    }

    const abortSignal = request.abortSignal;
    if (abortSignal) {
      if (abortSignal.aborted) {
        throw new AbortError("The operation was aborted.");
      }

      const listener = (): void => {
        xhr.abort();
      };
      abortSignal.addEventListener("abort", listener);
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          abortSignal.removeEventListener("abort", listener);
        }
      });
    }

    addProgressListener(xhr.upload, request.onUploadProgress);
    addProgressListener(xhr, request.onDownloadProgress);

    xhr.open(request.method, request.url);
    xhr.timeout = request.timeout;
    xhr.withCredentials = request.withCredentials;
    for (const [name, value] of request.headers) {
      xhr.setRequestHeader(name, value);
    }
    xhr.responseType = request.streamResponseBody ? "blob" : "text";

    if (isReadableStream(request.body)) {
      throw new Error("Node streams are not supported in browser environment.");
    }

    xhr.send(request.body === undefined ? null : request.body);

    if (request.streamResponseBody) {
      return new Promise((resolve, reject) => {
        xhr.addEventListener("readystatechange", () => {
          // Resolve as soon as headers are loaded
          if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
            const blobBody = new Promise<Blob>((resolve, reject) => {
              xhr.addEventListener("load", () => {
                resolve(xhr.response);
              });
              rejectOnTerminalEvent(request, xhr, reject);
            });
            resolve({
              request,
              status: xhr.status,
              headers: parseHeaders(xhr),
              blobBody
            });
          }
        });
        rejectOnTerminalEvent(request, xhr, reject);
      });
    } else {
      return new Promise(function(resolve, reject) {
        xhr.addEventListener("load", () =>
          resolve({
            request,
            status: xhr.status,
            headers: parseHeaders(xhr),
            bodyAsText: xhr.responseText
          })
        );
        rejectOnTerminalEvent(request, xhr, reject);
      });
    }
  }
}

function addProgressListener(
  xhr: XMLHttpRequestEventTarget,
  listener?: (progress: TransferProgressEvent) => void
): void {
  if (listener) {
    xhr.addEventListener("progress", (rawEvent) =>
      listener({
        loadedBytes: rawEvent.loaded
      })
    );
  }
}

function parseHeaders(xhr: XMLHttpRequest): HttpHeaders {
  const responseHeaders = createHttpHeaders();
  const headerLines = xhr
    .getAllResponseHeaders()
    .trim()
    .split(/[\r\n]+/);
  for (const line of headerLines) {
    const index = line.indexOf(":");
    const headerName = line.slice(0, index);
    const headerValue = line.slice(index + 2);
    responseHeaders.set(headerName, headerValue);
  }
  return responseHeaders;
}

function rejectOnTerminalEvent(
  request: PipelineRequest,
  xhr: XMLHttpRequest,
  reject: (err: any) => void
): void {
  xhr.addEventListener("error", () =>
    reject(
      new RestError(`Failed to send request to ${request.url}`, {
        code: RestError.REQUEST_SEND_ERROR,
        request
      })
    )
  );
  const abortError = new AbortError("The operation was aborted.");
  xhr.addEventListener("abort", () => reject(abortError));
  xhr.addEventListener("timeout", () => reject(abortError));
}
