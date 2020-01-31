// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { RestError } from "../lib/restError";
import { WebResource } from "../lib/webResource";
import { HttpOperationResponse } from "../lib/httpOperationResponse";
import { inspect } from "util";
import { HttpHeaders } from "../lib/coreHttp";

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
    console.log(`result from new test is ${result}`);
    assert.notInclude(result, "SUPER SECRET");
    assert.notInclude(result, "SUPER DUPER SECRET");
    assert.include(result, "REDACTED");
  });
});
