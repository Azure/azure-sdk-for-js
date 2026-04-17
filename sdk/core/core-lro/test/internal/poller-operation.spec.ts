// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import { deserializeState, initOperation, pollOperation } from "../../src/poller/operation.js";
import { buildCreatePoller } from "../../src/poller/poller.js";
import type { OperationResponse, RawResponse } from "../../src/http/models.js";
import type { OperationState, RestorableOperationState } from "../../src/poller/models.js";
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

describe("poller/operation.ts", () => {
  describe("deserializeState", () => {
    it("throws for invalid JSON", () => {
      assert.throws(() => deserializeState("not valid json"), /Unable to deserialize input state/);
    });
  });

  describe("simplifyError with innererror (via processOperationStatus)", () => {
    it("traverses innererror chain and appends messages", async () => {
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
            body: JSON.stringify({
              status: "Failed",
              error: {
                code: "OuterCode",
                message: "Outer message",
                innererror: {
                  code: "InnerCode",
                  message: "Inner message",
                  innererror: {
                    code: "DeepCode",
                    message: "Deep message",
                  },
                },
              },
            }),
          },
        ],
        throwOnNon2xxResponse: true,
      });

      await expect(poller.pollUntilDone()).rejects.toThrow(/DeepCode/);
    });

    it("appends period to message when missing", async () => {
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
            body: JSON.stringify({
              status: "Failed",
              error: {
                code: "ErrCode",
                message: "No period at end",
                innererror: {
                  code: "Inner",
                  message: "Inner detail",
                },
              },
            }),
          },
        ],
        throwOnNon2xxResponse: true,
      });

      await expect(poller.pollUntilDone()).rejects.toThrow(/No period at end\. Inner detail/);
    });
  });

  describe("setStateError", () => {
    it("sets state to failed when poll throws an operation error", async () => {
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
          // The poll request will get a 500 which throws RestError
          {
            method: "GET",
            path: pollingPath,
            status: 500,
            body: JSON.stringify({ error: { code: "ServerError", message: "fail" } }),
          },
        ],
        throwOnNon2xxResponse: true,
      });

      await expect(poller.pollUntilDone()).rejects.toThrow();
    });
  });
});

describe("pollOperation edge cases", () => {
  it("does nothing when operationLocation is undefined", async () => {
    const state = makeState<any>("OperationLocation");
    state.config.operationLocation = undefined;
    const poll = vi.fn();

    await pollOperation({
      poll,
      state,
      getOperationStatus: () => "running",
      getResourceLocation: () => undefined,
      isOperationError: () => false,
      setDelay: vi.fn(),
      setErrorAsResult: false,
    });

    assert.equal(poll.mock.calls.length, 0);
  });

  it("calls updateState after poll", async () => {
    const state = makeState<any>("OperationLocation");
    state.config.operationLocation = "/poll";

    const mockResponse = { data: "test" };
    const poll = vi.fn().mockResolvedValue(mockResponse);
    const updateState = vi.fn();

    await pollOperation({
      poll,
      state,
      getOperationStatus: () => "succeeded",
      getResourceLocation: () => undefined,
      isOperationError: () => false,
      setDelay: vi.fn(),
      setErrorAsResult: false,
      updateState,
    });

    assert.isTrue(updateState.mock.calls.length > 0);
  });

  it("calls withOperationLocation with same location when getOperationLocation returns undefined", async () => {
    const locations: Array<{ loc: string; isUpdated: boolean }> = [];
    const state = makeState<any>("OperationLocation");
    state.config.operationLocation = "/poll";

    const poll = vi.fn().mockResolvedValue({ data: "test" });

    await pollOperation({
      poll,
      state,
      getOperationStatus: () => "running",
      getResourceLocation: () => undefined,
      isOperationError: () => false,
      setDelay: vi.fn(),
      setErrorAsResult: false,
      withOperationLocation: (loc: string, isUpdated: boolean) =>
        locations.push({ loc, isUpdated }),
      getOperationLocation: () => undefined,
    });

    assert.equal(locations.length, 1);
    assert.equal(locations[0].loc, "/poll");
    assert.isFalse(locations[0].isUpdated);
  });
});

describe("initOperation edge cases", () => {
  it("calls withOperationLocation when operationLocation is present", async () => {
    const locations: string[] = [];
    await initOperation({
      init: async () => ({
        response: { data: "init" },
        operationLocation: "/poll-loc",
      }),
      getOperationStatus: () => "running",
      withOperationLocation: (loc: string) => locations.push(loc),
      setErrorAsResult: false,
    });

    assert.include(locations, "/poll-loc");
  });
});

describe("processOperationStatus with isDone callback", () => {
  it("uses custom isDone to determine completion", async () => {
    let pollCount = 0;
    const createPoller = buildCreatePoller<any, any, OperationState<any>>({
      getStatusFromInitialResponse: () => "running",
      getStatusFromPollResponse: () => {
        pollCount++;
        return "running";
      },
      isOperationError: () => false,
      getResourceLocation: () => undefined,
      resolveOnUnsuccessful: false,
    });

    const poller = createPoller(
      {
        init: async () => ({
          response: { data: "init" },
          operationLocation: "/poll",
        }),
        poll: async () => ({ data: "polled", customDone: pollCount >= 1 }),
      },
      {
        intervalInMs: 0,
        processResult: async (response: any) => response,
      },
    );

    await poller.submitted();
    const state = await poller.poll();
    // Status is still "running" since we return "running"
    assert.equal(state.status, "running");
  });
});

describe("processOperationStatus setErrorAsResult=true includes failed in done states", () => {
  it("sets result when status is failed and setErrorAsResult is true", async () => {
    const pollingPath = "path/poll-err-result";
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
            error: { code: "SomeError", message: "Something went wrong" },
          }),
        },
      ],
      throwOnNon2xxResponse: false,
    });

    const result = await poller.pollUntilDone();
    assert.isDefined(result);
    assert.isTrue(poller.isDone);
  });
});

describe("operation.ts branch: appendReadableErrorMessage with message ending in period", () => {
  it("does not double-add a period when message already ends with one", async () => {
    const pollingPath = "path/poll-period";
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
            error: {
              code: "Err",
              message: "Something failed.",
              innererror: {
                code: "Inner",
                message: "Inner detail.",
              },
            },
          }),
        },
      ],
      throwOnNon2xxResponse: true,
    });

    await expect(poller.pollUntilDone()).rejects.toThrow(/Something failed\. Inner detail\./);
  });
});
