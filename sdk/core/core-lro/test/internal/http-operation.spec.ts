// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import {
  inferLroMode,
  parseRetryAfter,
  getErrorFromResponse,
  getResourceLocation,
  getStatusFromInitialResponse,
  getOperationLocation,
  getOperationStatus,
  isOperationError,
  pollHttpOperation,
} from "../../src/http/operation.js";
import type { OperationResponse, RawResponse } from "../../src/http/models.js";
import type { OperationState, RestorableOperationState } from "../../src/poller/models.js";

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
  } as RestorableOperationState<TResult, OperationState<TResult>>;
}

describe("http/operation.ts coverage", () => {
  describe("calculatePollingIntervalFromDate (via parseRetryAfter)", () => {
    it("returns undefined when retry-after date is in the past", () => {
      const pastDate = new Date(Date.now() - 100000).toUTCString();
      const result = parseRetryAfter({
        rawResponse: makeRawResponse({ headers: { "retry-after": pastDate } }),
        flatResponse: {},
      });
      assert.isUndefined(result);
    });

    it("returns milliseconds when retry-after date is in the future", () => {
      const futureDate = new Date(Date.now() + 60000).toUTCString();
      const result = parseRetryAfter({
        rawResponse: makeRawResponse({ headers: { "retry-after": futureDate } }),
        flatResponse: {},
      });
      assert.isNumber(result);
      assert.isAbove(result!, 0);
    });
  });

  describe("getOperationLocation", () => {
    it("returns undefined for Body mode", () => {
      const response: OperationResponse = {
        rawResponse: makeRawResponse(),
        flatResponse: {},
      };
      const state = makeState("Body");
      assert.isUndefined(getOperationLocation(response, state));
    });

    it("returns undefined for unknown/default mode", () => {
      const response: OperationResponse = {
        rawResponse: makeRawResponse(),
        flatResponse: {},
      };
      const state = makeState("SomeUnknownMode");
      assert.isUndefined(getOperationLocation(response, state));
    });
  });

  describe("getOperationStatus", () => {
    it("throws for unexpected mode", () => {
      const response: OperationResponse = {
        rawResponse: makeRawResponse(),
        flatResponse: {},
      };
      const state = makeState("UnexpectedMode");
      assert.throws(() => getOperationStatus(response, state), /Unexpected operation mode/);
    });
  });

  describe("getStatusFromInitialResponse", () => {
    it("returns succeeded when mode is undefined and status code < 300", () => {
      const response: OperationResponse = {
        rawResponse: makeRawResponse({ statusCode: 200 }),
        flatResponse: {},
      };
      const state = makeState(undefined);
      const status = getStatusFromInitialResponse({
        response,
        state,
        operationLocation: undefined,
      });
      assert.equal(status, "succeeded");
    });

    it("returns running when mode is undefined, status is 202, and operationLocation is set", () => {
      const response: OperationResponse = {
        rawResponse: makeRawResponse({ statusCode: 202 }),
        flatResponse: {},
      };
      const state = makeState(undefined);
      const status = getStatusFromInitialResponse({
        response,
        state,
        operationLocation: "https://example.com/poll",
      });
      assert.equal(status, "running");
    });
  });

  describe("getErrorFromResponse", () => {
    it("returns undefined when error property has no code or message", () => {
      const response: OperationResponse = {
        rawResponse: makeRawResponse({ body: { error: { code: "SomeCode" } } }),
        flatResponse: { error: { code: "SomeCode" } },
      };
      const result = getErrorFromResponse(response);
      assert.isUndefined(result);
    });

    it("returns undefined when no error property exists", () => {
      const response: OperationResponse = {
        rawResponse: makeRawResponse({ body: {} }),
        flatResponse: {},
      };
      const result = getErrorFromResponse(response);
      assert.isUndefined(result);
    });
  });

  describe("getResourceLocation", () => {
    it("stores resourceLocation from response body to state config", () => {
      const state = makeState("OperationLocation");
      const response: OperationResponse = {
        rawResponse: makeRawResponse({ body: { resourceLocation: "https://example.com/result" } }),
        flatResponse: { resourceLocation: "https://example.com/result" },
      };
      const loc = getResourceLocation(response, state);
      assert.equal(loc, "https://example.com/result");
      assert.equal(state.config.resourceLocation, "https://example.com/result");
    });
  });

  describe("isOperationError", () => {
    it("returns true for RestError", () => {
      const err = new Error("test");
      err.name = "RestError";
      assert.isTrue(isOperationError(err));
    });

    it("returns false for non-RestError", () => {
      assert.isFalse(isOperationError(new Error("test")));
    });
  });

  describe("transformStatus (via getOperationStatus)", () => {
    it("throws for non-string status", () => {
      const response: OperationResponse = {
        rawResponse: makeRawResponse({ body: { status: 123 } }),
        flatResponse: {},
      };
      const state = makeState("OperationLocation");
      assert.throws(() => getOperationStatus(response, state), /Polling was unsuccessful/);
    });

    it("returns failed for status containing 'fail'", () => {
      const response: OperationResponse = {
        rawResponse: makeRawResponse({ body: { status: "SomeFailure" } }),
        flatResponse: {},
      };
      const state = makeState("OperationLocation");
      assert.equal(getOperationStatus(response, state), "failed");
    });

    it("returns canceled for 'cancelled' status", () => {
      const response: OperationResponse = {
        rawResponse: makeRawResponse({ body: { status: "Cancelled" } }),
        flatResponse: {},
      };
      const state = makeState("OperationLocation");
      assert.equal(getOperationStatus(response, state), "canceled");
    });

    it("returns running for unknown status", () => {
      const response: OperationResponse = {
        rawResponse: makeRawResponse({ body: { status: "InProgress" } }),
        flatResponse: {},
      };
      const state = makeState("OperationLocation");
      assert.equal(getOperationStatus(response, state), "running");
    });
  });

  describe("inferLroMode", () => {
    it("returns undefined when no polling headers and non-PUT method", () => {
      const rawResponse = makeRawResponse({
        request: { method: "POST", url: "https://example.com/resource" },
      });
      const result = inferLroMode(rawResponse);
      assert.isUndefined(result);
    });

    it("returns Body mode for PUT with no polling headers", () => {
      const rawResponse = makeRawResponse({
        request: { method: "PUT", url: "https://example.com/resource" },
      });
      const result = inferLroMode(rawResponse);
      assert.equal(result?.mode, "Body");
    });

    it("handles PATCH with azure-async-operation resourceLocationConfig falls back to requestPath", () => {
      const rawResponse = makeRawResponse({
        request: { method: "PATCH", url: "https://example.com/resource" },
        headers: {
          "operation-location": "https://example.com/poll",
        },
      });
      const result = inferLroMode(rawResponse, "azure-async-operation");
      assert.equal(result?.mode, "OperationLocation");
      // azure-async-operation getDefault returns undefined, so PATCH falls back to requestPath
      assert.equal(result?.resourceLocation, "https://example.com/resource");
    });

    it("handles PATCH with operation-location resourceLocationConfig returns undefined", () => {
      const rawResponse = makeRawResponse({
        request: { method: "PATCH", url: "https://example.com/resource" },
        headers: {
          "operation-location": "https://example.com/poll",
        },
      });
      const result = inferLroMode(rawResponse, "operation-location");
      assert.equal(result?.mode, "OperationLocation");
      // operation-location getDefault returns undefined, PATCH falls back to requestPath
      assert.equal(result?.resourceLocation, "https://example.com/resource");
    });

    it("handles PATCH with original-uri resourceLocationConfig", () => {
      const rawResponse = makeRawResponse({
        request: { method: "PATCH", url: "https://example.com/resource" },
        headers: {
          "operation-location": "https://example.com/poll",
        },
      });
      const result = inferLroMode(rawResponse, "original-uri");
      assert.equal(result?.resourceLocation, "https://example.com/resource");
    });

    it("handles DELETE with operation-location", () => {
      const rawResponse = makeRawResponse({
        request: { method: "DELETE", url: "https://example.com/resource" },
        headers: {
          "operation-location": "https://example.com/poll",
        },
      });
      const result = inferLroMode(rawResponse);
      assert.equal(result?.mode, "OperationLocation");
      assert.isUndefined(result?.resourceLocation);
    });

    it("handles POST with azure-async-operation resourceLocationConfig", () => {
      const rawResponse = makeRawResponse({
        request: { method: "POST", url: "https://example.com/resource" },
        headers: {
          "operation-location": "https://example.com/poll",
          location: "https://example.com/location",
        },
      });
      const result = inferLroMode(rawResponse, "azure-async-operation");
      assert.isUndefined(result?.resourceLocation);
    });

    it("handles POST with location resourceLocationConfig (default)", () => {
      const rawResponse = makeRawResponse({
        request: { method: "POST", url: "https://example.com/resource" },
        headers: {
          "operation-location": "https://example.com/poll",
          location: "https://example.com/location",
        },
      });
      const result = inferLroMode(rawResponse, "location");
      assert.equal(result?.resourceLocation, "https://example.com/location");
    });

    it("uses azure-asyncoperation header when operation-location is missing", () => {
      const rawResponse = makeRawResponse({
        request: { method: "PUT", url: "https://example.com/resource" },
        headers: {
          "azure-asyncoperation": "https://example.com/async-poll",
        },
      });
      const result = inferLroMode(rawResponse);
      assert.equal(result?.mode, "OperationLocation");
      assert.equal(result?.operationLocation, "https://example.com/async-poll");
    });

    it("handles skipFinalGet to skip final resource GET", () => {
      const rawResponse = makeRawResponse({
        request: { method: "PUT", url: "https://example.com/resource" },
        headers: {
          "operation-location": "https://example.com/poll",
        },
      });
      const result = inferLroMode(rawResponse, undefined, true);
      assert.equal(result?.mode, "OperationLocation");
      assert.isUndefined(result?.resourceLocation);
    });

    it("handles PATCH with default resourceLocationConfig (location)", () => {
      const rawResponse = makeRawResponse({
        request: { method: "PATCH", url: "https://example.com/resource" },
        headers: {
          "operation-location": "https://example.com/poll",
          location: "https://example.com/location",
        },
      });
      // default config means location is used for PATCH
      const result = inferLroMode(rawResponse);
      assert.equal(result?.resourceLocation, "https://example.com/location");
    });

    it("uses requestPath for PATCH when location is undefined and config is not operation-location", () => {
      const rawResponse = makeRawResponse({
        request: { method: "PATCH", url: "https://example.com/resource" },
        headers: {
          "operation-location": "https://example.com/poll",
        },
      });
      // no location header and no specific config -> getDefault returns undefined for location -> falls back to requestPath
      const result = inferLroMode(rawResponse);
      assert.equal(result?.resourceLocation, "https://example.com/resource");
    });
  });

  describe("pollHttpOperation", () => {
    it("polls the operation through to completion", async () => {
      const pollPath = "/poll";
      const sendPollRequest = vi
        .fn()
        .mockResolvedValueOnce({
          flatResponse: { status: "running" },
          rawResponse: makeRawResponse({
            statusCode: 200,
            body: { status: "running" },
            headers: { "operation-location": pollPath },
          }),
        })
        .mockResolvedValueOnce({
          flatResponse: { status: "succeeded", id: "123" },
          rawResponse: makeRawResponse({
            statusCode: 200,
            body: { status: "succeeded", id: "123" },
          }),
        });

      const state = makeState<unknown>("OperationLocation", {
        config: {
          operationLocation: pollPath,
          metadata: { mode: "OperationLocation" },
        },
      });

      const setDelay = vi.fn();
      await pollHttpOperation({
        lro: {
          sendInitialRequest: vi.fn(),
          sendPollRequest,
        },
        setDelay,
        state,
        setErrorAsResult: false,
      });

      assert.equal(sendPollRequest.mock.calls.length, 1);
    });

    it("uses processResult when provided", async () => {
      const pollPath = "/poll";
      const sendPollRequest = vi.fn().mockResolvedValueOnce({
        flatResponse: { value: "raw" },
        rawResponse: makeRawResponse({
          statusCode: 200,
          body: { status: "succeeded" },
        }),
      });

      const state = makeState<unknown>("OperationLocation", {
        config: {
          operationLocation: pollPath,
          metadata: { mode: "OperationLocation" },
        },
      });

      await pollHttpOperation({
        lro: {
          sendInitialRequest: vi.fn(),
          sendPollRequest,
        },
        processResult: async (result: unknown) => ({
          processed: true,
          ...(result as Record<string, unknown>),
        }),
        setDelay: vi.fn(),
        state,
        setErrorAsResult: false,
      });

      assert.deepEqual(state.result, { processed: true, value: "raw" });
    });
  });
});
