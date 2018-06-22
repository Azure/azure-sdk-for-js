// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpClient } from "./httpClient";
import { HttpHeaders } from "./httpHeaders";
import { WebResource, TransferProgressEvent } from './webResource';
import { HttpOperationResponse } from './httpOperationResponse';

/**
 * A HttpClient implementation that uses XMLHttpRequest to send HTTP requests.
 */
export class XhrHttpClient implements HttpClient {
  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    const xhr = new XMLHttpRequest();

    const { abortSignal, onUploadProgress, onDownloadProgress } = request;
    if (abortSignal) {
      const listener = () => {
        xhr.abort();
      };
      abortSignal.addEventListener("abort", listener);
      // TODO: is this sufficient to prevent leaks?
      xhr.addEventListener("abort", () => abortSignal.removeEventListener("abort", listener));
    }

    addProgressListener(xhr.upload, onUploadProgress);
    addProgressListener(xhr, onDownloadProgress);

    for (const header of request.headers.headersArray()) {
      xhr.setRequestHeader(header.name, header.value);
    }

    xhr.open(request.method, request.url);
    xhr.responseType = request.rawResponse ? "blob" : "text";
    xhr.send(request.body);

    if (request.rawResponse) {
      return new Promise((resolve, reject) => {
        xhr.addEventListener("readystatechange", () => {
          // Resolves when body is finished loading
          const bodyPromise = new Promise<Blob>((resolve, reject) => {
            xhr.addEventListener("load", () => {
              resolve(xhr.response);
            });
            rejectOnTerminalEvent(xhr, reject);
          });

          // Resolve as soon as headers are loaded
          if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
            resolve({
              request,
              status: xhr.status,
              headers: parseHeaders(xhr),
              blobBody: () => bodyPromise
            });
          }
        });
        rejectOnTerminalEvent(xhr, reject);
      });
    } else {
      return new Promise(function(resolve, reject) {
        xhr.addEventListener("load", () => resolve({
          request,
          status: xhr.status,
          headers: parseHeaders(xhr),
          bodyAsText: xhr.responseText
        }))
        rejectOnTerminalEvent(xhr, reject);
      });
    }
  }
}

function addProgressListener(xhr: XMLHttpRequestEventTarget, listener?: (progress: TransferProgressEvent) => void) {
  if (listener) {
    xhr.addEventListener("progress", rawEvent => listener({
      loadedBytes: rawEvent.loaded,
      totalBytes: rawEvent.lengthComputable ? rawEvent.total : undefined
    }));
  }
}

function parseHeaders(xhr: XMLHttpRequest) {
  const responseHeaders = new HttpHeaders();
  const headerLines = xhr.getAllResponseHeaders().trim().split(/[\r\n]+/);
  for (const line of headerLines) {
    const parts = line.split(': ');
    const headerName = parts.shift()!;
    const headerValue = parts.join(': ');
    responseHeaders.set(headerName, headerValue);
  }
  return responseHeaders;
}

function rejectOnTerminalEvent(xhr: XMLHttpRequest, reject: (err: any) => void) {
  xhr.addEventListener("error", reject);
  xhr.addEventListener("abort", reject);
}