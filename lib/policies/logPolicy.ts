// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicyCreator, RequestPolicy, RequestPolicyOptions } from "./requestPolicy";

export function logPolicy(logger: any = console.log): RequestPolicyCreator {
  return (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
    return new LogPolicy(nextPolicy, options, logger);
  };
}

export class LogPolicy extends BaseRequestPolicy {

  logger?: any;

  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, logger: any = console.log) {
    super(nextPolicy, options);
    this.logger = logger;
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    const response: HttpOperationResponse = await this._nextPolicy.sendRequest(request);
    return this.logResponse(response);
  }

  public logResponse(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    this.logger(`>> Request: ${JSON.stringify(response.request, undefined, 2)}`);
    this.logger(`>> Response status code: ${response.response.status}`);
    const responseBody = response.bodyAsText;
    this.logger(`>> Body: ${responseBody}`);
    return Promise.resolve(response);
  }
}
