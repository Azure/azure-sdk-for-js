// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FetchHttpClient,
  CommonRequestInfo,
  CommonResponse,
  CommonRequestInit
} from "./fetchHttpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResourceLike } from "./webResource";

export class BrowserFetchHttpClient extends FetchHttpClient {
  prepareRequest(_httpRequest: WebResourceLike): Promise<Partial<RequestInit>> {
    return Promise.resolve({});
  }

  processRequest(_operationResponse: HttpOperationResponse): Promise<void> {
    return Promise.resolve();
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-apisurface-standardized-verbs
  fetch(input: CommonRequestInfo, init?: CommonRequestInit): Promise<CommonResponse> {
    return fetch(input, init);
  }
}
