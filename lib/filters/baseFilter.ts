// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { WebResource } from "../webResource";
import { HttpOperationResponse } from "../httpOperationResponse";

export class BaseFilter {

  constructor() { }

  before(request: WebResource): Promise<WebResource> {
    return Promise.resolve(request);
  }

  after(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    return Promise.resolve(response);
  }
}
