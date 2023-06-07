// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { PipelineResponse, RestError, createHttpHeaders, createPipelineRequest } from "../../src";
import { inspect } from "util";

describe("RestError", function () {
  it("serializes properly in node", function () {
    const request = createPipelineRequest({
      url: "https://bing.com",
      headers: createHttpHeaders({ "X-Api-Auth": "SUPER SECRET" }),
    });
    const response: PipelineResponse = {
      headers: createHttpHeaders({ "X-Magic-Token": "SUPER DUPER SECRET" }),
      request,
      status: 42,
    };

    const error = new RestError("Error!", {
      code: "TEST",
      request,
      response,
      statusCode: response.status,
    });
    const result = inspect(error, false, 8);
    assert.notInclude(result, "SUPER SECRET");
    assert.notInclude(result, "SUPER DUPER SECRET");
    assert.include(result, "REDACTED");
  });
});
