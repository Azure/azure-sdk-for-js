// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import { createHttpPoller } from "../../src/index.js";
import { createTestPoller } from "../utils/router.js";
import { makeRawResponse } from "../utils/utils.js";

describe("createHttpPoller", () => {
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

      await poller.submitted();
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

      await expect(poller.poll()).rejects.toThrow(/canceled/i);
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

  describe("with no options", () => {
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

  describe("resolveOnUnsuccessful", () => {
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

  describe("error handling", () => {
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
      assert.deepInclude(result, { status: "Failed" });
      assert.isTrue(poller.isDone);
    });
  });
});
