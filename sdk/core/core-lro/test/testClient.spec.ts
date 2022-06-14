// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpHeaders, WebResource, delay, isNode } from "@azure/core-http";
import { PollerCancelledError, PollerStoppedError } from "../src";
import { TestClient } from "./utils/testClient";
import { TestOperationState } from "./utils/testOperation";
import { TestTokenCredential } from "./utils/testTokenCredential";
import { assert } from "chai";

const testHttpHeaders: HttpHeaders = new HttpHeaders();
const testHttpRequest: WebResource = new WebResource();
const basicResponseStructure = {
  headers: testHttpHeaders,
  parsedBody: {},
  request: testHttpRequest,
  status: 200,
};
const initialResponse = {
  ...basicResponseStructure,
  parsedBody: {
    started: true,
  },
};
const doFinalResponse = {
  ...basicResponseStructure,
  parsedBody: {
    doFinalResponse: true,
  },
};
const finalResponse = {
  ...basicResponseStructure,
  parsedBody: {
    finished: true,
  },
};

describe("Long Running Operations - custom client", function () {
  it("can automatically poll a long running operation with one promise", async function () {
    const client = new TestClient(new TestTokenCredential("my-test-token"));
    client.setResponses([initialResponse, doFinalResponse, finalResponse]);

    const poller = await client.startLRO();

    // In our tests, startLRO will do the first request for us
    assert.equal(client.totalSentRequests, 1);

    // Waiting until the operation completes
    const result = await poller.pollUntilDone();

    // Checking the serialized version of the operation
    const serializedOperation: { state: TestOperationState } = JSON.parse(poller.toString());
    assert.ok(serializedOperation.state.isStarted);

    assert.ok(poller.initialResponse!.parsedBody.started);
    assert.ok(poller.previousResponse!.parsedBody.finished);
    assert.ok(poller.getOperationState().isCompleted);
    assert.equal(result, "Done");
  });

  if (isNode) {
    it("won't throw UnhandledPromiseRejectionWarnings when poll called without pollUntilDone", async function () {
      // NOTE: Don't set any responses so that poller.poll throws an error
      const client = new TestClient(new TestTokenCredential("my-test-token"));
      let foundUnhandled = false;
      const checker = (): void => {
        foundUnhandled = true;
      };

      process.once("unhandledRejection", checker);
      try {
        await client.startLRO();
        throw new Error("Test failure");
      } catch (err: any) {
        assert.notEqual(err.message, "Test failure", "client.startLRO did not throw an error.");
        // delay(0) gives the event loop a chance emit the UnhandledPromiseRejectionWarning so we can catch it.
        await delay(0);
        assert.equal(foundUnhandled, false, "An UnhandledPromiseRejectionWarning was thrown.");
      }
    });
  }

  it("can poll a long running operation with more than one promise", async function () {
    const client = new TestClient(new TestTokenCredential("my-test-token"));
    client.setResponses([initialResponse, doFinalResponse, finalResponse]);

    const poller = await client.startLRO();

    await poller.poll();
    assert.ok(poller.previousResponse!.parsedBody.doFinalResponse);

    let result = await poller.getResult();
    assert.equal(result, undefined);

    await poller.pollUntilDone();
    assert.ok(poller.previousResponse!.parsedBody.finished);
    assert.ok(poller.getOperationState().isCompleted);

    result = await poller.getResult();
    assert.equal(result, "Done");
  });

  it("can cancel the operation (when cancellation is supported)", async function () {
    const client = new TestClient(new TestTokenCredential("my-test-token"));
    client.setResponses([initialResponse, ...Array(20).fill(basicResponseStructure)]);

    const poller = await client.startLRO();

    assert.equal(client.totalSentRequests, 1);

    // Testing the cancelled error
    poller.pollUntilDone().catch((e) => {
      assert.ok(e instanceof PollerCancelledError);
      assert.equal(e.name, "PollerCancelledError");
      assert.equal(e.message, "Poller cancelled");
    });
    // The poller will appear as unstopped, since we're waiting until finishes
    assert.ok(!poller.isStopped());

    // Waiting for 10 poller loops
    for (let i = 1; i <= 10; i++) {
      await poller.poll();
    }

    assert.equal(client.totalSentRequests, 11);

    await poller.cancelOperation();
    assert.ok(poller.getOperationState().isCancelled);
  });

  it("fails to cancel the operation (when cancellation is not supported)", async function () {
    const client = new TestClient(new TestTokenCredential("my-test-token"));
    client.setResponses([initialResponse, ...Array(20).fill(basicResponseStructure)]);

    const poller = await client.startNonCancellableLRO();
    assert.equal(client.totalSentRequests, 1);

    // Waiting for 10 poller loops
    for (let i = 1; i <= 10; i++) {
      await poller.poll();
    }

    assert.equal(client.totalSentRequests, 11);

    let error: any;
    try {
      await poller.cancelOperation();
    } catch (e: any) {
      error = e;
    }
    assert.equal(error.message, "Cancellation not supported");
  });

  it("can stop polling the operation", async function () {
    const client = new TestClient(new TestTokenCredential("my-test-token"));
    client.setResponses([initialResponse, ...Array(20).fill(basicResponseStructure)]);

    const poller = await client.startLRO();
    assert.equal(client.totalSentRequests, 1);

    poller.pollUntilDone().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    await poller.poll();
    assert.equal(client.totalSentRequests, 2);

    // Waiting for 10 poller loops
    for (let i = 1; i <= 10; i++) {
      await poller.poll();
    }

    assert.equal(client.totalSentRequests, 12);

    poller.stopPolling();

    await delay(100);

    assert.equal(client.totalSentRequests, 12);
  });

  it("can document progress", async function () {
    const client = new TestClient(new TestTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(10).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse,
    ]);

    let totalOperationUpdates = 0;
    const poller = await client.startLRO({
      onProgress: (_) => {
        totalOperationUpdates++;
      },
    });

    const result = await poller.pollUntilDone();
    assert.equal(result, "Done");
    assert.equal(poller.getResult(), "Done");

    // Progress only after the poller has started and before the poller is done
    assert.equal(totalOperationUpdates, 11);
  });

  it("can reuse one poller state to instantiate another poller", async function () {
    const client = new TestClient(new TestTokenCredential("my-test-token"));

    // A total of 13 expected responses.
    const responses = [
      initialResponse,
      ...Array(10).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse,
    ];
    client.setResponses(responses);

    const poller = await client.startLRO();

    // Waiting for 10 poller loops
    for (let i = 1; i <= 10; i++) {
      await poller.poll();
    }

    assert.equal(client.totalSentRequests, 11);

    // Let's try to resume this with a new poller.
    const serialized = poller.toString();
    const client2 = new TestClient(new TestTokenCredential("my-test-token"));
    client2.setResponses(responses);
    const poller2 = await client2.startLRO({
      baseOperation: serialized,
    });

    assert.equal(client2.totalSentRequests, 1);

    const result = await poller2.pollUntilDone();
    assert.equal(result, "Done");

    // The second client doesn't do the first request and goes all the way to the end.
    assert.equal(client2.totalSentRequests, 12);
  });
});
