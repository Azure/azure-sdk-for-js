// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import { type PipelineResponse, type SendRequest, type Agent } from "../src/index.js";
import { createHttpHeaders, createPipelineRequest, agentPolicy } from "../src/index.js";

describe("agentPolicy", function () {
  it("should set custom agent", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const customAgent: Agent = {
      destroy: () => {},
      maxFreeSockets: 1,
      maxSockets: 1,
      requests: 1,
      sockets: {},
    };
    const policy = agentPolicy(customAgent);
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(successResponse);
    assert.isUndefined(request.agent);

    await policy.sendRequest(request, next);

    assert.equal(request.agent, customAgent);
  });

  it("should not set agent when it is not passed in", async () => {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    const policy = agentPolicy();
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(successResponse);
    assert.isUndefined(request.agent);

    await policy.sendRequest(request, next);

    assert.isUndefined(request.agent);
  });

  it("should prefer request.agent", async () => {
    const customAgent1: Agent = {
      destroy: () => {},
      maxFreeSockets: 1,
      maxSockets: 1,
      requests: 1,
      sockets: {},
    };
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    request.agent = customAgent1;
    const customAgent2: Agent = {
      destroy: () => {},
      maxFreeSockets: 2,
      maxSockets: 2,
      requests: 2,
      sockets: {},
    };
    const policy = agentPolicy(customAgent2);
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValueOnce(successResponse);
    assert.equal(request.agent, customAgent1);

    await policy.sendRequest(request, next);

    assert.equal(request.agent, customAgent1);
  });
});
