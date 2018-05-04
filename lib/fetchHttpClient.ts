// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpClient } from "./httpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import * as utils from "./util/utils";
import { WebResource } from "./webResource";

/**
 * A HttpClient implementation that uses fetch to send HTTP requests.
 */
export class FetchHttpClient implements HttpClient {
  public sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse> {
    if (!httpRequest.headers) {
      httpRequest.headers = {};
    }
    return utils.dispatchRequest(httpRequest);
  }
}