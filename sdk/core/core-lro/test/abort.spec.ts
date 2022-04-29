// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpHeaders, WebResource, delay } from "@azure/core-http";
import { AbortController } from "@azure/abort-controller";
import { PollerStoppedError } from "../src";
import { TestClient } from "./utils/testClient";
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

describe("Long Running Operations - working with abort signals", function () {
  it("should support an abort signal sent through the constructor", async function () {
    const client = new TestClient(new TestTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(20).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse,
    ]);

    const abortController = new AbortController();
    const poller = await client.startLRO({
      requestOptions: {
        abortSignal: abortController.signal,
      },
    });

    // Testing subscriptions to the poll errors
    let pollError: Error | undefined;
    poller.pollUntilDone().catch((e) => {
      pollError = e;
    });

    // Waiting for 10 poller loops
    for (let i = 1; i <= 10; i++) {
      await poller.poll();
    }

    assert.equal(client.totalSentRequests, 11);
    abortController.abort();
    await delay(50);

    assert.equal(pollError!.message, "The operation was aborted.");
    assert.equal(client.totalSentRequests, 11);
  });

  it("should support an abort signal sent through the parameters of poll()", async function () {
    const client = new TestClient(new TestTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(20).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse,
    ]);

    const abortController = new AbortController();
    const poller = await client.startLRO();

    const donePromise = poller.pollUntilDone();

    await poller.poll();
    assert.equal(client.totalSentRequests, 2);

    abortController.abort();

    let pollError: Error | undefined;
    try {
      await poller.poll({
        abortSignal: abortController.signal,
      });
    } catch (e: any) {
      pollError = e;
    }
    assert.equal(pollError!.message, "The operation was aborted.");

    let doneError: Error | undefined;
    try {
      await donePromise;
    } catch (e: any) {
      doneError = e;
    }
    assert.equal(doneError!.message, "The operation was aborted.");

    assert.equal(client.totalSentRequests, 2);
    assert.ok(poller.isDone());
  });

  it("can abort the cancel method (when cancellation is supported) by with an abortSignal sent from the constructor", async function () {
    const client = new TestClient(new TestTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(20).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse,
    ]);

    const abortController = new AbortController();
    const poller = await client.startLRO({
      requestOptions: {
        abortSignal: abortController.signal,
      },
    });

    // Waiting for 10 poller loops
    for (let i = 1; i <= 10; i++) {
      await poller.poll();
    }

    assert.equal(client.totalSentRequests, 11);

    abortController.abort();
    let cancelError: Error | undefined;
    try {
      await poller.cancelOperation();
    } catch (e: any) {
      cancelError = e;
    }

    assert.ok(poller.isStopped());
    assert.equal(cancelError!.message, "The operation was aborted.");
  });

  it("can abort the cancel method (when cancellation is supported) by with an abortSignal sent as a parameter to cancelOperation()", async function () {
    const client = new TestClient(new TestTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(20).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse,
    ]);

    const poller = await client.startLRO();
    assert.equal(client.totalSentRequests, 1);

    // Testing subscriptions to the poll errors
    poller.pollUntilDone().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    // Waiting for 10 poller loops
    for (let i = 1; i <= 10; i++) {
      await poller.poll();
    }

    assert.equal(client.totalSentRequests, 11);

    const abortController = new AbortController();
    abortController.abort();

    let cancelError: Error | undefined;
    try {
      await poller.cancelOperation({
        abortSignal: abortController.signal,
      });
    } catch (e: any) {
      cancelError = e;
    }

    assert.equal(cancelError!.message, "The operation was aborted.");
    poller.stopPolling();
  });
});
