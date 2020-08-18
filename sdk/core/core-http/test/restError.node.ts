// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { RestError } from "../src/restError";
import { WebResource } from "../src/webResource";
import { HttpOperationResponse } from "../src/httpOperationResponse";
import { inspect } from "util";
import { HttpHeaders } from "../src/coreHttp";

describe("RestError", function() {
  it("serializes properly in node", function() {
    const request: WebResource = new WebResource("bing.com", "GET", undefined, undefined, {
      "X-Api-Auth": "SUPER SECRET"
    });
    const response: HttpOperationResponse = {
      headers: new HttpHeaders({ "X-Magic-Token": "SUPER DUPER SECRET" }),
      request,
      status: 42
    };
    const error = new RestError("Error!", "LIFE", response.status, request, response);
    const result = inspect(error, false, 8);
    assert.notInclude(result, "SUPER SECRET");
    assert.notInclude(result, "SUPER DUPER SECRET");
    assert.include(result, "REDACTED");
  });
});
