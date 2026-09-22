// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import { buildCreatePoller } from "../../src/poller/poller.js";
import { getOperationStatus, getOperationLocation } from "../../src/http/operation.js";
import type { OperationResponse, OperationState } from "../../src/index.js";
import { makeRawResponse, makeState } from "../utils/utils.js";

describe("getProvisioningState via Body mode", () => {
  it("reads provisioningState from top-level body property", () => {
    const response: OperationResponse = {
      rawResponse: makeRawResponse({
        body: { provisioningState: "Succeeded" },
      }),
      flatResponse: {},
    };
    const state = makeState("Body");
    const status = getOperationStatus(response, state);
    assert.equal(status, "succeeded");
  });
});

describe("getOperationLocation for ResourceLocation mode", () => {
  it("returns location header for ResourceLocation mode", () => {
    const response: OperationResponse = {
      rawResponse: makeRawResponse({
        headers: { location: "https://example.com/location" },
      }),
      flatResponse: {},
    };
    const state = makeState("ResourceLocation");
    const loc = getOperationLocation(response, state);
    assert.equal(loc, "https://example.com/location");
  });
});

describe("getOperationStatus for ResourceLocation mode", () => {
  it("uses status code for ResourceLocation mode", () => {
    const response: OperationResponse = {
      rawResponse: makeRawResponse({ statusCode: 202 }),
      flatResponse: {},
    };
    const state = makeState("ResourceLocation");
    assert.equal(getOperationStatus(response, state), "running");
  });

  it("returns succeeded for status 200 in ResourceLocation mode", () => {
    const response: OperationResponse = {
      rawResponse: makeRawResponse({ statusCode: 200 }),
      flatResponse: {},
    };
    const state = makeState("ResourceLocation");
    assert.equal(getOperationStatus(response, state), "succeeded");
  });

  it("returns failed for status >= 300 in ResourceLocation mode", () => {
    const response: OperationResponse = {
      rawResponse: makeRawResponse({ statusCode: 500 }),
      flatResponse: {},
    };
    const state = makeState("ResourceLocation");
    assert.equal(getOperationStatus(response, state), "failed");
  });
});

describe("buildCreatePoller", () => {
  it("completes polling when getPollingInterval is provided", async () => {
    let pollCount = 0;
    const getPollingInterval = vi.fn().mockReturnValue(42);
    const createPoller = buildCreatePoller<any, any, OperationState<any>>({
      getStatusFromInitialResponse: () => "running",
      getStatusFromPollResponse: () => {
        pollCount++;
        return pollCount >= 2 ? "succeeded" : "running";
      },
      isOperationError: () => false,
      getResourceLocation: () => undefined,
      getPollingInterval,
      resolveOnUnsuccessful: false,
    });

    const poller = createPoller(
      {
        init: async () => ({
          response: { data: "init" },
          operationLocation: "/poll",
        }),
        poll: async () => ({ data: "polled" }),
      },
      { intervalInMs: 0 },
    );

    await poller.submitted();
    const state = await poller.poll();
    assert.equal(state.status, "running");
    const finalState = await poller.poll();
    assert.equal(finalState.status, "succeeded");
    assert.isAbove(
      getPollingInterval.mock.calls.length,
      0,
      "getPollingInterval should have been called",
    );
  });

  it("returns a state object when polling", async () => {
    const createPoller = buildCreatePoller<any, any, OperationState<any>>({
      getStatusFromInitialResponse: () => "running",
      getStatusFromPollResponse: () => "running",
      isOperationError: () => false,
      getResourceLocation: () => undefined,
      resolveOnUnsuccessful: false,
    });

    const poller = createPoller(
      {
        init: async () => {
          return {
            response: { data: "init" },
            operationLocation: "/poll",
          };
        },
        poll: async () => ({ data: "polled" }),
      },
      { intervalInMs: 0 },
    );

    await poller.submitted();
    const state = await poller.poll();
    assert.property(state, "status");
  });
});
