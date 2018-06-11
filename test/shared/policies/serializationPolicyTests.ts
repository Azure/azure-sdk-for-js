// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as assert from "assert";
import { HttpHeaders } from "../../../lib/httpHeaders";
import { HttpOperationResponse } from "../../../lib/httpOperationResponse";
import { RequestPolicy, RequestPolicyOptions } from "../../../lib/policies/requestPolicy";
import { SerializationPolicy } from "../../../lib/policies/serializationPolicy";
import { WebResource } from "../../../lib/webResource";

describe("serializationPolicy", () => {
  const mockPolicy: RequestPolicy = {
    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      return Promise.resolve({
        request: request,
        status: 200,
        headers: new HttpHeaders()
      });
    }
  };

  it(`should not modify a request that has no request body mapper`, async () => {
    const serializationPolicy = new SerializationPolicy(mockPolicy, new RequestPolicyOptions());

    const request = new WebResource();
    request.body = "hello there!";

    await serializationPolicy.sendRequest(request);
    assert.strictEqual(request.body, "hello there!");
  });
});