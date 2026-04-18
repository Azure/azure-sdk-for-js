// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import { deserializeState, initOperation, pollOperation } from "../../src/poller/operation.js";
import { buildCreatePoller } from "../../src/poller/poller.js";
import type { OperationState } from "../../src/index.js";
import { makeState } from "../utils/utils.js";

describe("poller/operation.ts", () => {
  describe("deserializeState", () => {
    it("throws for invalid JSON", () => {
      assert.throws(() => deserializeState("not valid json"), /Unable to deserialize input state/);
    });
  });
});

describe("pollOperation", () => {
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

    assert.isAbove(updateState.mock.calls.length, 0);
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

describe("initOperation", () => {
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

describe("buildCreatePoller with custom getStatusFromPollResponse", () => {
  it("keeps status as running when getStatusFromPollResponse returns running", async () => {
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
    assert.equal(state.status, "running");
    assert.isAbove(pollCount, 0, "getStatusFromPollResponse should have been called");
  });
});
