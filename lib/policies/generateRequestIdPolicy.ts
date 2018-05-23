// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import * as utils from "../util/utils";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyCreator, RequestPolicyOptions } from "./requestPolicy";

export function generateRequestIdPolicy(requestIdHeaderName = "x-ms-client-request-id"): RequestPolicyCreator {
  return (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
    return new GenerateRequestIdPolicy(nextPolicy, options, requestIdHeaderName);
  };
}

export class GenerateRequestIdPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, private _requestIdHeaderName: string) {
    super(nextPolicy, options);
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    request.headers.set(this._requestIdHeaderName, utils.generateUuid());
    return this._nextPolicy.sendRequest(request);
  }
}
