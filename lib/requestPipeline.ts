// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { RequestPolicy, RequestPolicyCreator } from "./policies/requestPolicy";
import { HttpOperationResponse } from "./httpOperationResponse";
import * as utils from "./util/utils";
import { WebResource } from "./webResource";

export function createRequestPipeline(requestPoliciesCreators?: RequestPolicyCreator[]): RequestPolicy {
  let requestPolicy: RequestPolicy = {
    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      if (!request.headers) request.headers = {};
      return utils.dispatchRequest(request);
    }
  };

  if (requestPoliciesCreators && requestPoliciesCreators.length > 0) {
    for (let i = requestPoliciesCreators.length - 1; i >= 0; --i) {
      requestPolicy = requestPoliciesCreators[i](requestPolicy);
    }
  }

  return requestPolicy;
}