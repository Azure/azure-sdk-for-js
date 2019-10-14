// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { FetchHttpClient } from "./fetchHttpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResource } from "./webResource";

export class BrowserFetchHttpClient extends FetchHttpClient {
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
