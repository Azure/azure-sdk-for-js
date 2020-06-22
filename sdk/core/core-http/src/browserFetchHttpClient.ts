// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { FetchHttpClient, CommonRequestInfo } from "./fetchHttpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResourceLike } from "./webResource";

export class BrowserFetchHttpClient extends FetchHttpClient {
  prepareRequest(_httpRequest: WebResourceLike): Promise<Partial<RequestInit>> {
    return Promise.resolve({});
  }

  processRequest(_operationResponse: HttpOperationResponse): Promise<void> {
    return Promise.resolve();
  }

  fetch(input: CommonRequestInfo, init?: RequestInit): Promise<Response> {
    return fetch(input, init);
  }
}
