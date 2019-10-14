// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { FetchHttpClient } from "./fetchHttpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResource } from "./webResource";

const NodeNotSupportedError = new Error(
  "BrowserFetchHttpClient is not supported in Node.js, use DefaultHttpClient instead."
);

export class BrowserFetchHttpClient extends FetchHttpClient {
  constructor() {
    super();
    throw NodeNotSupportedError;
  }

  prepareRequest(_httpRequest: WebResource): Promise<Partial<RequestInit>> {
    return Promise.resolve({});
  }

  processRequest(_operationResponse: HttpOperationResponse): Promise<void> {
    throw NodeNotSupportedError;
  }

  fetch(_input: RequestInfo, _init?: RequestInit): Promise<Response> {
    throw NodeNotSupportedError;
  }
}
