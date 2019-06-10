// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "./requestPolicy";

export function logPolicy(logger: any = console.log): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new LogPolicy(nextPolicy, options, logger);
    }
  };
}

export class LogPolicy extends BaseRequestPolicy {
  logger?: any;

  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, logger: any = console.log) {
    super(nextPolicy, options);
    this.logger = logger;
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(request).then(response => logResponse(this, response));
  }
}

function logResponse(policy: LogPolicy, response: HttpOperationResponse): Promise<HttpOperationResponse> {
  policy.logger(`>> Request: ${JSON.stringify(response.request, undefined, 2)}`);
  policy.logger(`>> Response status code: ${response.status}`);
  const responseBody = response.bodyAsText;
  policy.logger(`>> Body: ${responseBody}`);
  return Promise.resolve(response);
}