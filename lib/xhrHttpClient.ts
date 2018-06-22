// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpClient } from "./httpClient";
import { HttpHeaders } from "./httpHeaders";
import { WebResource } from './webResource';
import { HttpOperationResponse } from './httpOperationResponse';

/**
 * A HttpClient implementation that uses XMLHttpRequest to send HTTP requests.
 */
export class XhrHttpClient implements HttpClient {
  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    const xhr = new XMLHttpRequest();
    xhr.responseType = request.rawResponse ? "blob" : "text";
    for (const header of request.headers.headersArray()) {
      xhr.setRequestHeader(header.name, header.value);
    }

    if (request.rawResponse) {
      return new Promise((resolve, reject) => {
        xhr.addEventListener("readystatechange", () => {
          // Resolves when body is finished loading
          const bodyPromise = new Promise<Blob>((resolve, reject) => {
            xhr.addEventListener("load", () => {
              resolve(xhr.response);
            });
            xhr.addEventListener("error", reject);
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
        xhr.addEventListener("error", reject);
      });
    }

    return new Promise(function(resolve, reject) {
      xhr.addEventListener("load", () => resolve({
        request,
        status: xhr.status,
        headers: parseHeaders(xhr),
        bodyAsText: xhr.responseText
      }))
      xhr.addEventListener("error", reject);
    });
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
