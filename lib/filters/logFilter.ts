// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicyCreator, RequestPolicy } from "./requestPolicy";

export function logFilter(logger: any = console.log): RequestPolicyCreator {
  return (nextPolicy: RequestPolicy) => {
    const result = new LogFilter(logger);
    result.nextPolicy = nextPolicy;
    return result;
  };
}

export class LogFilter extends BaseRequestPolicy {

  logger?: any;

  constructor(logger: any = console.log) {
    super();
    this.logger = logger;
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    const response: HttpOperationResponse = await this.nextPolicy!.sendRequest(request);
    return this.after(response);
  }

  after(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    this.logger(`>> Request: ${JSON.stringify(response.request, undefined, 2)}`);
    this.logger(`>> Response status code: ${response.response.status}`);
    const responseBody = response.bodyAsText;
    this.logger(`>> Body: ${responseBody}`);
    return Promise.resolve(response);
  }
}
