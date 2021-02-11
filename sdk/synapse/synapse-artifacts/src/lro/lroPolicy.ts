// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  RequestPolicy,
  RequestPolicyOptions,
  BaseRequestPolicy,
  HttpOperationResponse,
  WebResource
} from "@azure/core-http";
import { LROOperationResponse, LROSYM } from "./models";
import { getLROData } from "./requestUtils";

export function lroPolicy() {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new LROPolicy(nextPolicy, options);
    }
  };
}

class LROPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  public async sendRequest(webResource: WebResource): Promise<HttpOperationResponse> {
    const result: LROOperationResponse = await this._nextPolicy.sendRequest(webResource);
    const _lroData = getLROData(result);

    result[LROSYM] = _lroData;

    return result;
  }
}
