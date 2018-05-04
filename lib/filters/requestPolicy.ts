// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";

export type RequestPolicyCreator = (nextPolicy: RequestPolicy) => RequestPolicy;

export interface RequestPolicy {
  sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse>;
}

export abstract class BaseRequestPolicy implements RequestPolicy {
  protected constructor(public _nextPolicy?: RequestPolicy) {
  }

  public abstract sendRequest(webResource: WebResource): Promise<HttpOperationResponse>;
}