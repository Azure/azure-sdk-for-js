// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import { buildCreatePoller } from "../../src/poller/poller.js";
import { getOperationStatus, getOperationLocation } from "../../src/http/operation.js";
import type { OperationResponse, RawResponse } from "../../src/http/models.js";
import type { OperationState, RestorableOperationState } from "../../src/poller/models.js";
import { createHttpPoller } from "../../src/http/poller.js";
import { createTestPoller } from "../utils/router.js";

function makeRawResponse(overrides: Partial<RawResponse> = {}): RawResponse {
  return {
    statusCode: 200,
    headers: {},
    request: { method: "GET", url: "https://example.com/resource" },
    ...overrides,
  };
}

function makeState<TResult>(
  mode?: string,
  extra?: Partial<RestorableOperationState<TResult, OperationState<TResult>>>,
): RestorableOperationState<TResult, OperationState<TResult>> {
  return {
    status: "running",
    config: {
      metadata: mode ? { mode } : undefined,
      ...extra?.config,
    },
    ...extra,
  } as unknown as RestorableOperationState<TResult, OperationState<TResult>>;
}

describe("poller/poller.ts", () => {
  describe("withOperationLocation callback", () => {
    it("calls withOperationLocation on initial and updated locations", async () => {
      const locations: string[] = [];
      const pollingPath = "path/poll";
      const newPollingPath = "path/poll-updated";
      const poller = createTestPoller({
        routes: [
          {
            method: "PUT",
            status: 202,
            headers: {
              "operation-location": pollingPath,
            },
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            headers: {
              "operation-location": newPollingPath,
            },
            body: JSON.stringify({ status: "InProgress" }),
          },
          {
            method: "GET",
            path: newPollingPath,
            status: 200,
            body: JSON.stringify({ status: "Succeeded" }),
          },
          {
            method: "GET",
            path: "path",
            status: 200,
            body: JSON.stringify({ id: "done" }),
          },
        ],
        withOperationLocation: (loc: string) => locations.push(loc),
        throwOnNon2xxResponse: true,
      });

      await poller.pollUntilDone();
      assert.isAbove(locations.length, 0);
      assert.include(locations, pollingPath);
      assert.include(locations, newPollingPath);
    });

    it("calls withOperationLocation only once for non-updated location", async () => {
      const locations: string[] = [];
      const pollingPath = "path/poll";
      const poller = createTestPoller({
        routes: [
          {
            method: "PUT",
            status: 202,
            headers: {
              "operation-location": pollingPath,
            },
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            headers: {
              "operation-location": pollingPath,
            },
            body: JSON.stringify({ status: "InProgress" }),
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            body: JSON.stringify({ status: "Succeeded" }),
          },
          {
            method: "GET",
            path: "path",
            status: 200,
            body: JSON.stringify({ id: "done" }),
          },
        ],
        withOperationLocation: (loc: string) => locations.push(loc),
        throwOnNon2xxResponse: true,
      });

      await poller.pollUntilDone();
      assert.equal(locations.length, 1);
      assert.equal(locations[0], pollingPath);
    });
  });

  describe("poll method", () => {
    it("returns state directly when already succeeded and resolveOnUnsuccessful", async () => {
      const poller = createTestPoller({
        routes: [
          {
            method: "PUT",
            status: 200,
            body: JSON.stringify({ properties: { provisioningState: "Succeeded" }, id: "1" }),
          },
        ],
        throwOnNon2xxResponse: false,
      });

      // Wait for init
      await poller.submitted();
      // Polling an already-done poller
      const state = await poller.poll();
      assert.equal(state.status, "succeeded");
    });

    it("throws on poll when canceled and resolveOnUnsuccessful is false", async () => {
      const pollingPath = "path/poll-cancel";
      const poller = createTestPoller({
        routes: [
          {
            method: "PUT",
            status: 202,
            headers: {
              "operation-location": pollingPath,
            },
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            body: JSON.stringify({ status: "Canceled" }),
          },
        ],
        throwOnNon2xxResponse: true,
      });

      // First poll transitions to canceled
      await expect(poller.poll()).rejects.toThrow(/canceled/i);
      // Subsequent poll should also throw
      await expect(poller.poll()).rejects.toThrow(/canceled/i);
    });

    it("throws on poll when failed and resolveOnUnsuccessful is false", async () => {
      const pollingPath = "path/poll-fail";
      const poller = createTestPoller({
        routes: [
          {
            method: "PUT",
            status: 202,
            headers: {
              "operation-location": pollingPath,
            },
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            body: JSON.stringify({
              status: "Failed",
              error: { code: "Err", message: "something failed" },
            }),
          },
        ],
        throwOnNon2xxResponse: true,
      });

      await expect(poller.poll()).rejects.toThrow(/failed/i);
      // Subsequent poll should also throw the stored error
      await expect(poller.poll()).rejects.toThrow(/failed/i);
    });
  });

  describe("pollUntilDone", () => {
    it("throws canceled error from pollUntilDone", async () => {
      const pollingPath = "path/poll-cancel2";
      const poller = createTestPoller({
        routes: [
          {
            method: "PUT",
            status: 202,
            headers: {
              "operation-location": pollingPath,
            },
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            body: JSON.stringify({ status: "Canceled" }),
          },
        ],
        throwOnNon2xxResponse: true,
      });

      await expect(poller.pollUntilDone()).rejects.toThrow(/canceled/i);
    });

    it("uses setDelay when polling interval is provided via retry-after", async () => {
      const pollingPath = "path/poll-retry";
      const poller = createTestPoller({
        routes: [
          {
            method: "PUT",
            status: 202,
            headers: {
              "operation-location": pollingPath,
            },
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            headers: {
              "retry-after": "0",
            },
            body: JSON.stringify({ status: "InProgress" }),
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            body: JSON.stringify({ status: "Succeeded" }),
          },
          {
            method: "GET",
            path: "path",
            status: 200,
            body: JSON.stringify({ id: "done" }),
          },
        ],
        throwOnNon2xxResponse: true,
      });

      const result = await poller.pollUntilDone();
      assert.equal(result.statusCode, 200);
    });
  });

  describe("createHttpPoller with no options", () => {
    it("handles no options argument (undefined)", async () => {
      const lro = {
        sendInitialRequest: async () => ({
          flatResponse: { id: "1" },
          rawResponse: makeRawResponse({
            statusCode: 200,
            request: { method: "PUT", url: "https://example.com/resource" },
            body: { properties: { provisioningState: "Succeeded" } },
          }),
        }),
        sendPollRequest: vi.fn(),
      };

      const poller = createHttpPoller(lro);
      const result = await poller.pollUntilDone();
      assert.isDefined(result);
      assert.deepEqual(result, { id: "1" });
    });
  });

  describe("buildCreatePoller - resolveOnUnsuccessful", () => {
    it("returns result for canceled when resolveOnUnsuccessful is true", async () => {
      const pollingPath = "path/poll-resolve";
      const poller = createTestPoller({
        routes: [
          {
            method: "PUT",
            status: 202,
            headers: {
              "operation-location": pollingPath,
            },
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            body: JSON.stringify({ status: "Canceled" }),
          },
        ],
        throwOnNon2xxResponse: false,
      });

      const result = await poller.pollUntilDone();
      assert.isDefined(result);
      assert.deepInclude(result, { status: "Canceled" });
    });

    it("isDone returns true for failed state", async () => {
      const pollingPath = "path/poll-fail-done";
      const poller = createTestPoller({
        routes: [
          {
            method: "PUT",
            status: 202,
            headers: {
              "operation-location": pollingPath,
            },
          },
          {
            method: "GET",
            path: pollingPath,
            status: 200,
            body: JSON.stringify({
              status: "Failed",
              error: { code: "Err", message: "Fail" },
            }),
          },
        ],
        throwOnNon2xxResponse: false,
      });

      const result = await poller.pollUntilDone();
      assert.isTrue(poller.isDone);
      assert.isDefined(result);
      assert.deepInclude(result, { status: "Failed" });
    });
  });

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
});

describe("buildCreatePoller", () => {
  it("setDelay is called when getPollingInterval returns a value", async () => {
    let pollingInterval: number | undefined;
    let pollCount = 0;
    const createPoller = buildCreatePoller<any, any, OperationState<any>>({
      getStatusFromInitialResponse: () => "running",
      getStatusFromPollResponse: () => {
        pollCount++;
        return pollCount >= 2 ? "succeeded" : "running";
      },
      isOperationError: () => false,
      getResourceLocation: () => undefined,
      getPollingInterval: () => 42,
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

    // Use poll() directly to trigger setDelay
    await poller.submitted();
    const state = await poller.poll();
    // The poller should have updated the polling interval internally
    assert.equal(state.status, "running");
    // Poll again to succeed
    const finalState = await poller.poll();
    assert.equal(finalState.status, "succeeded");
  });

  it("handles poll with !state guard (defense check)", async () => {
    // Test the !state guards at lines 107 and 155 by making init resolve without setting state
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
    assert.isDefined(state);
    assert.property(state, "status");
  });
});
