// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { mockedPoller, runMockedLro } from "./utils/router";
import { RawResponse } from "../src/lroEngine/models";
import { assert } from "chai";

describe("Lro Engine", function() {
  it("put201Succeeded", async function() {
    const result = await runMockedLro("PUT", "/put/201/succeeded");
    assert.equal(result.id, "100");
    assert.equal(result.name, "foo");
    assert.equal(result.properties?.provisioningState, "Succeeded");
  });

  describe("BodyPolling Strategy", () => {
    it("put200Succeeded", async function() {
      const result = await runMockedLro("PUT", "/put/200/succeeded");
      assert.equal(result.properties?.provisioningState, "Succeeded");
    });

    it("should handle initial response with terminal state without provisioning State", async () => {
      const result = await runMockedLro("PUT", "/put/200/succeeded/nostate");
      assert.deepEqual(result.id, "100");
      assert.deepEqual(result.name, "foo");
    });

    it("should handle initial response creating followed by success through an Azure Resource", async () => {
      const result = await runMockedLro("PUT", "/put/201/creating/succeeded/200");
      assert.deepEqual(result.properties?.provisioningState, "Succeeded");
      assert.deepEqual(result.id, "100");
      assert.deepEqual(result.name, "foo");
    });

    it("should handle put200Acceptedcanceled200", async () => {
      try {
        await runMockedLro("PUT", "/put/200/accepted/canceled/200");
        throw new Error("should have thrown instead");
      } catch (e) {
        assert.equal(
          e.message,
          "The long running operation has failed. The provisioning state: canceled."
        );
      }
    });

    it("should handle put200UpdatingSucceeded204", async () => {
      const result = await runMockedLro("PUT", "/put/200/updating/succeeded/200");
      assert.deepEqual(result.properties?.provisioningState, "Succeeded");
      assert.deepEqual(result.id, "100");
      assert.deepEqual(result.name, "foo");
    });

    it("should handle put201CreatingFailed200", async () => {
      try {
        await runMockedLro("PUT", "/put/201/created/failed/200");
        throw new Error("should have thrown instead");
      } catch (e) {
        assert.equal(
          e.message,
          "The long running operation has failed. The provisioning state: failed."
        );
      }
    });
  });

  describe("Location Strategy", () => {
    it("should handle post202Retry200", async () => {
      const response = await runMockedLro("POST", "/post/202/retry/200");
      assert.equal(response.statusCode, 200);
    });

    it("should handle post202NoRetry204", async () => {
      try {
        await runMockedLro("POST", "/post/202/noretry/204");
        throw new Error("should have thrown instead");
      } catch (e) {
        assert.equal(
          e.message,
          "Received unexpected HTTP status code 204 while polling. This may indicate a server issue."
        );
      }
    });

    it("should handle deleteNoHeaderInRetry", async () => {
      try {
        await runMockedLro("DELETE", "/delete/noheader");
        throw new Error("should have thrown instead");
      } catch (e) {
        assert.equal(
          e.message,
          "Received unexpected HTTP status code 204 while polling. This may indicate a server issue."
        );
      }
    });

    it("should handle put202Retry200", async () => {
      const response = await runMockedLro("PUT", "/put/202/retry/200");
      assert.equal(response.statusCode, 200);
    });

    it("should handle putNoHeaderInRetry", async () => {
      const result = await runMockedLro("PUT", "/put/noheader/202/200");
      assert.equal(result.id, "100");
      assert.equal(result.name, "foo");
      assert.equal(result.properties?.provisioningState, "Succeeded");
    });

    it("should handle putSubResource", async () => {
      const result = await runMockedLro("PUT", "/putsubresource/202/200");
      assert.equal(result.id, "100");
      assert.equal(result.properties?.provisioningState, "Succeeded");
    });

    it("should handle putNonResource", async () => {
      const result = await runMockedLro("PUT", "/putnonresource/202/200");
      assert.equal(result.id, "100");
      assert.equal(result.name, "sku");
    });

    it("should handle delete202Retry200", async () => {
      const response = await runMockedLro("DELETE", "/delete/202/retry/200");
      assert.equal(response.statusCode, 200);
    });

    it("should handle delete202NoRetry204", async () => {
      try {
        await runMockedLro("DELETE", "/delete/202/noretry/204");
        throw new Error("should have thrown instead");
      } catch (e) {
        assert.equal(
          e.message,
          "Received unexpected HTTP status code 204 while polling. This may indicate a server issue."
        );
      }
    });

    it("should handle deleteProvisioning202Accepted200Succeeded", async () => {
      const response = await runMockedLro(
        "DELETE",
        "/delete/provisioning/202/accepted/200/succeeded"
      );
      assert.equal(response.statusCode, 200);
    });

    it("should handle deleteProvisioning202DeletingFailed200", async () => {
      const result = await runMockedLro("DELETE", "/delete/provisioning/202/deleting/200/failed");
      assert.equal(result.properties?.provisioningState, "Failed");
    });

    it("should handle deleteProvisioning202Deletingcanceled200", async () => {
      const result = await runMockedLro("DELETE", "/delete/provisioning/202/deleting/200/canceled");
      assert.equal(result.properties?.provisioningState, "Canceled");
    });
  });

  describe("Passthrough strategy", () => {
    it("should handle delete204Succeeded", async () => {
      const response = await runMockedLro("DELETE", "/delete/204/succeeded");
      assert.equal(response.statusCode, 204);
    });
  });

  describe("Azure Async Operation Strategy", () => {
    it("should handle postDoubleHeadersFinalLocationGet", async () => {
      const result = await runMockedLro("POST", "/LROPostDoubleHeadersFinalLocationGet");
      assert.equal(result.id, "100");
      assert.equal(result.name, "foo");
    });

    it("should handle postDoubleHeadersFinalAzureHeaderGet", async () => {
      const result = await runMockedLro(
        "POST",
        "/LROPostDoubleHeadersFinalAzureHeaderGet",
        undefined,
        "azure-async-operation"
      );
      assert.equal(result.id, "100");
    });

    it("should handle post200WithPayload", async () => {
      const result = await runMockedLro("POST", "/post/payload/200");
      assert.equal(result.id, "1");
      assert.equal(result.name, "product");
    });

    it("should handle postDoubleHeadersFinalAzureHeaderGetDefault", async () => {
      const result = await runMockedLro("POST", "/LROPostDoubleHeadersFinalAzureHeaderGetDefault");
      assert.equal(result.id, "100");
      assert.equal(result.statusCode, 200);
    });

    it("should handle deleteAsyncRetrySucceeded", async () => {
      const response = await runMockedLro("DELETE", "/deleteasync/retry/succeeded");
      assert.equal(response.statusCode, 200);
    });

    it("should handle deleteAsyncNoRetrySucceeded", async () => {
      const response = await runMockedLro("DELETE", "/deleteasync/noretry/succeeded");
      assert.equal(response.statusCode, 200);
    });

    it("should handle deleteAsyncRetrycanceled", async () => {
      try {
        await runMockedLro("DELETE", "/deleteasync/retry/canceled");
        throw new Error("should have thrown instead");
      } catch (e) {
        assert.equal(
          e.message,
          "The long running operation has failed. The provisioning state: canceled."
        );
      }
    });

    it("should handle DeleteAsyncRetryFailed", async () => {
      try {
        await runMockedLro("DELETE", "/deleteasync/retry/failed");
        throw new Error("should have thrown instead");
      } catch (e) {
        assert.equal(
          e.message,
          "The long running operation has failed. The provisioning state: failed."
        );
      }
    });

    it("should handle putAsyncRetrySucceeded", async () => {
      const result = await runMockedLro("PUT", "/putasync/noretry/succeeded");
      assert.equal(result.id, "100");
      assert.equal(result.name, "foo");
      assert.equal(result.properties?.provisioningState, "Succeeded");
    });

    it("should handle put201Succeeded", async () => {
      const result = await runMockedLro("PUT", "/put/201/succeeded");
      assert.equal(result.id, "100");
      assert.equal(result.name, "foo");
      assert.equal(result.properties?.provisioningState, "Succeeded");
    });

    it("should handle post202List", async () => {
      const result = await runMockedLro("POST", "/list");
      assert.equal((result as any)[0].id, "100");
      assert.equal((result as any)[0].name, "foo");
    });

    it("should handle putAsyncRetryFailed", async () => {
      try {
        await runMockedLro("PUT", "/putasync/retry/failed");
        throw new Error("should have thrown instead");
      } catch (e) {
        assert.equal(
          e.message,
          "The long running operation has failed. The provisioning state: failed."
        );
      }
    });

    it("should handle putAsyncNonResource", async () => {
      const result = await runMockedLro("PUT", "/putnonresourceasync/202/200");
      assert.equal(result.name, "sku");
      assert.equal(result.id, "100");
    });

    it("should handle patchAsync", async () => {
      const result = await runMockedLro("PATCH", "/patchasync/202/200");
      assert.equal(result.name, "sku");
      assert.equal(result.id, "100");
    });

    it("should handle putAsyncNoHeaderInRetry", async () => {
      const result = await runMockedLro("PUT", "/putasync/noheader/201/200");
      assert.equal(result.name, "foo");
      assert.equal(result.id, "100");
      assert.deepEqual(result.properties?.provisioningState, "Succeeded");
    });

    it("should handle putAsyncNoRetrySucceeded", async () => {
      const result = await runMockedLro("PUT", "/putasync/noretry/succeeded");
      assert.equal(result.name, "foo");
      assert.equal(result.id, "100");
    });

    it("should handle putAsyncNoRetrycanceled", async () => {
      try {
        await runMockedLro("PUT", "/putasync/noretry/canceled");
        throw new Error("should have thrown instead");
      } catch (e) {
        assert.equal(
          e.message,
          "The long running operation has failed. The provisioning state: canceled."
        );
      }
    });

    it("should handle putAsyncSubResource", async () => {
      const result = await runMockedLro("PUT", "/putsubresourceasync/202/200");
      assert.equal(result.id, "100");
      assert.equal(result.properties?.provisioningState, "Succeeded");
    });

    it("should handle deleteAsyncNoHeaderInRetry", async () => {
      const response = await runMockedLro("DELETE", "/deleteasync/noheader/202/204");
      assert.equal(response.statusCode, 200);
    });

    it("should handle postAsyncNoRetrySucceeded", async () => {
      const result = await runMockedLro("POST", "/postasync/noretry/succeeded");
      assert.deepInclude(result, { id: "100", name: "foo" });
    });

    it("should handle postAsyncRetryFailed", async () => {
      try {
        await runMockedLro("POST", "/postasync/retry/failed");
        throw new Error("should have thrown instead");
      } catch (e) {
        assert.equal(
          e.message,
          "The long running operation has failed. The provisioning state: failed."
        );
      }
    });

    it("should handle postAsyncRetrySucceeded", async () => {
      const result = await runMockedLro("POST", "/postasync/retry/succeeded");

      assert.deepInclude(result, { id: "100", name: "foo" });
    });

    it("should handle postAsyncRetrycanceled", async () => {
      try {
        await runMockedLro("POST", "/postasync/retry/canceled");
        throw new Error("should have thrown instead");
      } catch (e) {
        assert.equal(
          e.message,
          "The long running operation has failed. The provisioning state: canceled."
        );
      }
    });
  });

  describe("LRO Sad scenarios", () => {
    it("should handle PutNonRetry400 ", async () => {
      try {
        await runMockedLro("PUT", "/nonretryerror/put/400");
      } catch (error) {
        assert.equal(error.statusCode, 400);
      }
    });

    it("should handle putNonRetry201Creating400 ", async () => {
      try {
        await runMockedLro("PUT", "/nonretryerror/put/201/creating/400");
      } catch (error) {
        assert.equal(error.statusCode, 400);
      }
    });

    it("should throw with putNonRetry201Creating400InvalidJson ", async () => {
      try {
        await runMockedLro("PUT", "/nonretryerror/put/201/creating/400/invalidjson");
      } catch (error) {
        assert.equal(error.statusCode, 400);
      }
    });

    it("should handle putAsyncRelativeRetry400 ", async () => {
      try {
        await runMockedLro("PUT", "/nonretryerror/putasync/retry/400");
      } catch (error) {
        assert.equal(error.statusCode, 400);
      }
    });

    it("should handle delete202NonRetry400 ", async () => {
      try {
        await runMockedLro("DELETE", "/nonretryerror/delete/202/retry/400");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.statusCode, 400);
      }
    });

    it("should handle deleteNonRetry400 ", async () => {
      try {
        await runMockedLro("DELETE", "/nonretryerror/delete/400");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.statusCode, 400);
      }
    });

    it("should handle deleteAsyncRelativeRetry400 ", async () => {
      try {
        await runMockedLro("DELETE", "/nonretryerror/deleteasync/retry/400");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.statusCode, 400);
      }
    });

    it("should handle postNonRetry400 ", async () => {
      try {
        await runMockedLro("POST", "/nonretryerror/post/400");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.statusCode, 400);
      }
    });

    it("should handle post202NonRetry400 ", async () => {
      try {
        await runMockedLro("POST", "/nonretryerror/post/202/retry/400");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.statusCode, 400);
      }
    });

    it("should handle postAsyncRelativeRetry400 ", async () => {
      try {
        await runMockedLro("POST", "/nonretryerror/postasync/retry/400");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.statusCode, 400);
      }
    });

    it("should handle PutError201NoProvisioningStatePayload ", async () => {
      const response = await runMockedLro("PUT", "/error/put/201/noprovisioningstatepayload");
      assert.equal(response.statusCode, 201); // weird!
    });

    it("should handle putAsyncRelativeRetryNoStatusPayload ", async () => {
      const response = await runMockedLro("PUT", "/error/putasync/retry/nostatuspayload");
      assert.equal(response.statusCode, 200);
    });

    it("should handle putAsyncRelativeRetryNoStatus ", async () => {
      const response = await runMockedLro("PUT", "/error/putasync/retry/nostatus");
      assert.equal(response.statusCode, 200);
    });

    it("should handle delete204Succeeded ", async () => {
      const response = await runMockedLro("DELETE", "/error/delete/204/nolocation");
      assert.equal(response.statusCode, 204);
    });

    it("should handle deleteAsyncRelativeRetryNoStatus ", async () => {
      const response = await runMockedLro("DELETE", "/error/deleteasync/retry/nostatus");
      assert.equal(response.statusCode, 200);
    });

    it("should handle post202NoLocation ", async () => {
      const response = await runMockedLro("POST", "/error/post/202/nolocation");
      assert.equal(response.statusCode, 202);
    });

    it("should handle postAsyncRelativeRetryNoPayload ", async () => {
      const response = await runMockedLro("POST", "/error/postasync/retry/nopayload");
      assert.equal(response.statusCode, 200);
    });

    it("should handle put200InvalidJson ", async () => {
      try {
        await runMockedLro("PUT", "/error/put/200/invalidjson");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.message, "Unexpected end of JSON input");
      }
    });

    it("should handle putAsyncRelativeRetryInvalidHeader ", async () => {
      try {
        await runMockedLro("PUT", "/error/putasync/retry/invalidheader");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.statusCode, 404);
        // assert.equal(error.statusCode, 404); // core-client would have validated the retry-after header
      }
    });

    it("should handle putAsyncRelativeRetryInvalidJsonPolling ", async () => {
      try {
        await runMockedLro("PUT", "/error/putasync/retry/invalidjsonpolling");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.message, "Unexpected end of JSON input");
      }
    });

    it("should handle delete202RetryInvalidHeader ", async () => {
      try {
        await runMockedLro("DELETE", "/error/delete/202/retry/invalidheader");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.statusCode, 404);
      }
    });

    it("should handle deleteAsyncRelativeRetryInvalidHeader ", async () => {
      try {
        await runMockedLro("DELETE", "/error/deleteasync/retry/invalidheader");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.statusCode, 404);
      }
    });

    it("should handle DeleteAsyncRelativeRetryInvalidJsonPolling ", async () => {
      try {
        await runMockedLro("DELETE", "/error/deleteasync/retry/invalidjsonpolling");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.message, "Unexpected end of JSON input");
      }
    });

    it("should handle post202RetryInvalidHeader ", async () => {
      try {
        await runMockedLro("POST", "/error/post/202/retry/invalidheader");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.statusCode, 404);
      }
    });

    it("should handle postAsyncRelativeRetryInvalidHeader ", async () => {
      try {
        await runMockedLro("POST", "/error/postasync/retry/invalidheader");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.statusCode, 404);
      }
    });

    it("should handle postAsyncRelativeRetryInvalidJsonPolling ", async () => {
      try {
        await runMockedLro("POST", "/error/postasync/retry/invalidjsonpolling");
        assert.fail("Scenario should throw");
      } catch (error) {
        assert.equal(error.message, "Unexpected end of JSON input");
      }
    });
  });

  describe("serialized state", () => {
    let state: any, serializedState: string;
    it("should handle serializing the state", async () => {
      const poller = mockedPoller("PUT", "/put/200/succeeded");
      poller.onProgress((currentState) => {
        if (state === undefined && serializedState === undefined) {
          state = currentState;
          serializedState = JSON.stringify({ state: currentState });
          assert.equal(serializedState, poller.toString());
        }
      });
      await poller.pollUntilDone();
      assert.ok(state.initialRawResponse);
    });
  });

  describe("mutate state", () => {
    it("The state can be mutated in onProgress", async () => {
      const poller = mockedPoller("POST", "/error/postasync/retry/nopayload");
      poller.onProgress((currentState) => {
        // Abruptly stop the LRO after the first poll request without getting a result
        currentState.isCompleted = true;
      });
      const result = await poller.pollUntilDone();
      // there is no result because the poller did not run to completion.
      assert.isUndefined(result);
    });

    it("The state can be mutated in processState", async () => {
      const poller = mockedPoller(
        "POST",
        "/error/postasync/retry/nopayload",
        undefined,
        undefined,
        (state: any, lastResponse: RawResponse) => {
          assert.ok(lastResponse);
          assert.ok(lastResponse?.statusCode);
          // Abruptly stop the LRO after the first poll request without getting a result
          state.isCompleted = true;
        }
      );
      const result = await poller.pollUntilDone();
      // there is no result because the poller did not run to completion.
      assert.isUndefined(result);
    });
  });

  describe("process result", () => {
    it("The final result can be processed using processResult", async () => {
      const poller = await mockedPoller(
        "POST",
        "/postasync/noretry/succeeded",
        undefined,
        (result: unknown, state: any) => {
          const serializedState = JSON.stringify({ state: state });
          assert.equal(serializedState, poller.toString());
          assert.ok(state.initialRawResponse);
          assert.ok(state.pollingURL);
          assert.equal((result as any).id, "100");
          return { ...(result as any), id: "200" };
        }
      );
      const result = await poller.pollUntilDone();
      assert.deepInclude(result, { id: "200", name: "foo" });
    });
  });
});
