// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { PipelineResponse, Agent } from "../../src/index.js";
import { RestError, createHttpHeaders, createPipelineRequest } from "../../src/index.js";
import { inspect } from "node:util";

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

  it("extracts only relevant agent properties for logging", function () {
    const mockAgent: Agent = {
      destroy: () => {},
      maxFreeSockets: 256,
      maxSockets: 50,
      requests: { someHost: ["large", "binary", "data"] },
      sockets: { anotherHost: [{ fd: 123, readable: true, writable: true }] },
    };

    const request = createPipelineRequest({
      url: "https://example.com",
      headers: createHttpHeaders(),
    });

    // Manually assign the agent property since it's not part of PipelineRequestOptions
    request.agent = mockAgent;

    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const error = new RestError("Test error with agent", {
      request,
      response,
    });

    const result = inspect(error, false, 8);

    // Should include only the relevant agent properties
    assert.include(result, "maxFreeSockets");
    assert.include(result, "maxSockets");
    assert.include(result, "256");
    assert.include(result, "50");

    // Should not include the large/binary data from requests and sockets
    assert.notInclude(result, "large");
    assert.notInclude(result, "binary");
    assert.notInclude(result, "data");
    assert.notInclude(result, "readable");
    assert.notInclude(result, "writable");
  });

  it("handles request without agent gracefully", function () {
    const request = createPipelineRequest({
      url: "https://example.com",
      headers: createHttpHeaders(),
      // No agent property
    });

    const response: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };

    const error = new RestError("Test error without agent", {
      request,
      response,
    });

    const result = inspect(error, false, 8);

    // Should not crash and should not include agent-related properties
    assert.notInclude(result, "maxFreeSockets");
    assert.notInclude(result, "maxSockets");
    assert.include(result, "Test error without agent");
  });
});
