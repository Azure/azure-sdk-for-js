// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { BaseRequestPolicy, RequestPolicy } from "./filters/requestPolicy";
import { HttpOperationResponse } from "./httpOperationResponse";
import * as utils from "./util/utils";
import { WebResource } from "./webResource";

export function createRequestPipeline(requestPolicies?: BaseRequestPolicy[]): RequestPolicy {
  let requestPolicy: RequestPolicy = {
    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      if (!request.headers) request.headers = {};
      return utils.dispatchRequest(request);
    }
  };

  if (requestPolicies && requestPolicies.length > 0) {
    for (let i = requestPolicies.length - 1; i >= 0; --i) {
      const currentRequestPolicy: BaseRequestPolicy = requestPolicies[i];
      currentRequestPolicy._nextPolicy = requestPolicy;
      requestPolicy = currentRequestPolicy;
    }
  }

  return requestPolicy;
}