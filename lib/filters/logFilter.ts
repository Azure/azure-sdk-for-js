// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { BaseFilter } from "./baseFilter";
import { HttpOperationResponse } from "../httpOperationResponse";

export class LogFilter extends BaseFilter {

  logger?: any;

  constructor(logger: any = console.log) {
    super();
    this.logger = logger;
  }

  after(operationResponse: HttpOperationResponse): Promise<HttpOperationResponse> {
    const self = this;
    self.logger(`>> Request: ${JSON.stringify(operationResponse.request, undefined, 2)}`);
    self.logger(`>> Response status code: ${operationResponse.response.status}`);
    const responseBody = operationResponse.bodyAsText;
    self.logger(`>> Body: ${responseBody}`);
    return Promise.resolve(operationResponse);
  }
}
