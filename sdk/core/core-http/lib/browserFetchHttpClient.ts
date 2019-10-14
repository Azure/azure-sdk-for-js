// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { FetchHttpClient } from "./fetchHttpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResource } from "./webResource";
import { HttpClientOptions } from "./httpClient";

export class BrowserFetchHttpClient extends FetchHttpClient {
  constructor(_httpClientOptions?: HttpClientOptions) {
    super();

    // HttpClientOptions is not (yet) supported in this implementation
    // so it will remain unused for now.
  }

  prepareRequest(_httpRequest: WebResource): Promise<Partial<RequestInit>> {
    return Promise.resolve({});
  }

  processRequest(_operationResponse: HttpOperationResponse): Promise<void> {
    return Promise.resolve();
  }

  fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    return fetch(input, init);
  }
}
