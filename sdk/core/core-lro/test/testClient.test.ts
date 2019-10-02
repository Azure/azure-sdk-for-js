// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { delay, SimpleTokenCredential, WebResource, HttpHeaders } from "@azure/core-http";
import { TestClient } from "./utils/testClient";
import { TestOperation } from "./utils/testOperation";
import { PollerStoppedError } from "../src";

const testHttpHeaders: HttpHeaders = new HttpHeaders();
const testHttpRequest: WebResource = new WebResource();
const basicResponseStructure = {
  headers: testHttpHeaders,
  parsedBody: {},
  request: testHttpRequest,
  status: 200
};
const initialResponse = {
  ...basicResponseStructure,
  parsedBody: {
    started: true
  }
};
const doFinalResponse = {
  ...basicResponseStructure,
  parsedBody: {
    doFinalResponse: true
  }
};
const finalResponse = {
  ...basicResponseStructure,
  parsedBody: {
    finished: true
  }
};

describe("Long Running Operations - custom client", function() {
  it("can automatically poll a long running operation with one promise", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([initialResponse, doFinalResponse, finalResponse]);

    const poller = await client.startLRO();

    // synchronously checking the operation state
    assert.ok(poller.operation.state.started);

    // Checking the serialized version of the operation
    let serializedOperation = JSON.parse(poller.toJSON());
    assert.ok(serializedOperation.state.started);

    // Waiting until the operation completes
    const result = await poller.done();
    const { properties, state } = poller.operation;

    assert.ok(properties.initialResponse!.parsedBody.started);
    assert.ok(properties.previousResponse!.parsedBody.finished);
    assert.ok(state.completed);
    assert.equal(result, "Done");
  });

  it("can automatically poll a long running operation with more than one promise", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([initialResponse, doFinalResponse, finalResponse]);

    const poller = await client.startLRO();
    assert.ok(poller.operation.state.started);

    // To update the operation state, the following asyncrhonous method is provided:
    await poller.poll();

    let operation = poller.operation;
    assert.ok(operation.properties.initialResponse!.parsedBody.started);
    assert.ok(operation.properties.previousResponse!.parsedBody.started);

    await poller.poll();
    operation = poller.operation;
    assert.ok(operation.properties.previousResponse!.parsedBody.doFinalResponse);

    let result = await poller.getResult();
    assert.equal(result, "Not done");

    await poller.poll();
    operation = poller.operation;
    assert.ok(operation.properties.previousResponse!.parsedBody.finished);
    assert.ok(operation.state.completed);

    result = await poller.getResult();
    assert.equal(result, "Done");

    poller.stop();
  });

  it("can manually poll a long running operation", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([initialResponse, doFinalResponse, finalResponse]);

    const poller = await client.startLRO({ manual: true });
    assert.ok(poller.isStopped());

    let operation = poller.operation;
    assert.ok(operation.state.started);

    await poller.poll();
    operation = poller.operation;
    assert.ok(operation.properties.initialResponse!.parsedBody.started);
    assert.ok(operation.properties.previousResponse!.parsedBody.started);

    await poller.poll();
    operation = poller.operation;
    assert.ok(operation.properties.previousResponse!.parsedBody.doFinalResponse);

    let result = await poller.getResult();
    assert.equal(result, "Not done");

    await poller.poll();
    operation = poller.operation;
    assert.ok(operation.properties.previousResponse!.parsedBody.finished);
    assert.ok(operation.state.completed);

    result = await poller.getResult();
    assert.equal(result, "Done");

    poller.stop();
  });

  it("can cancel the operation (when cancellation is supported)", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([initialResponse, ...Array(20).fill(basicResponseStructure)]);

    const poller = await client.startLRO();

    let operation = poller.operation;
    assert.ok(operation.state.started);
    assert.equal(client.totalSentRequests, 1);

    await delay(100); // The poller loops every 10 milliseconds
    assert.equal(client.totalSentRequests, 10);

    await poller.cancel();
    operation = poller.operation;
    assert.ok(operation.state.cancelled);
  });

  it("fails to cancel the operation (when cancellation is not supported)", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([initialResponse, ...Array(20).fill(basicResponseStructure)]);

    const poller = await client.startNonCancellableLRO();
    poller.done().catch((e) => {
      assert.equal(e.message, "Poller stopped");
    });

    let operation = poller.operation;
    assert.ok(operation.state.started);
    assert.equal(client.totalSentRequests, 1);

    await delay(100); // The poller loops every 10 milliseconds
    assert.equal(client.totalSentRequests, 10);

    let error: any;
    try {
      await poller.cancel();
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, "Cancellation not supported");
    poller.stop();
  });

  it("can stop polling the operation", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([initialResponse, ...Array(20).fill(basicResponseStructure)]);

    const poller = await client.startLRO();
    poller.done().catch((e: PollerStoppedError) => {
      assert.equal(e.message, "Poller stopped");
      // TODO: This doesn't work
      // assert.ok(e instanceof PollerStoppedError);
    });

    let operation = poller.operation;
    assert.ok(operation.state.started);
    assert.equal(client.totalSentRequests, 1);

    await delay(100); // The poller loops every 10 milliseconds
    assert.equal(client.totalSentRequests, 10);

    poller.stop();

    await delay(100);
    assert.equal(client.totalSentRequests, 10);
  });

  it("can document progress", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([
      initialResponse,
      ...Array(10).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse
    ]);

    const poller = await client.startLRO();

    let totalOperationUpdates = 0;
    let lastOperationUpdate: TestOperation = poller.operation;
    poller.onProgress(
      () => true,
      (operation) => {
        totalOperationUpdates++;
        lastOperationUpdate = operation!;
      }
    );

    let almostAllOperationUpdates = 0;
    const conditional = () => !poller.isDone(); // Not updating the progress call if the poller is done.
    poller.onProgress(conditional, () => {
      almostAllOperationUpdates++;
    });

    const result = await poller.done();
    assert.equal(result, "Done");
    assert.equal(poller.operation.state.result, "Done");

    assert.equal(totalOperationUpdates, 13);
    assert.equal(almostAllOperationUpdates, 12);

    const { properties, state } = lastOperationUpdate;
    assert.ok(properties.initialResponse!.parsedBody.started);
    assert.ok(properties.previousResponse!.parsedBody.finished);
    assert.ok(state.completed);
  });

  it("can reuse one poller state to instantiate another poller", async function() {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));

    // A total of 13 expected responses.
    const responses = [
      initialResponse,
      ...Array(10).fill(basicResponseStructure),
      doFinalResponse,
      finalResponse
    ];
    client.setResponses(responses);

    const poller = await client.startLRO();
    poller.done().catch((e) => {
      assert.equal(e.message, "Poller stopped");
    });

    await delay(100); // The poller loops every 10 milliseconds

    // The first client does the first request, then goes through 9 more (10).
    assert.equal(client.totalSentRequests, 10);

    poller.stop();

    await delay(100);
    assert.equal(client.totalSentRequests, 10);

    // Let's try to resume this with a new poller.
    const serialized = poller.toJSON();
    const client2 = new TestClient(new SimpleTokenCredential("my-test-token"));
    client2.setResponses(responses);
    const poller2 = await client2.startLRO({
      operation: JSON.parse(serialized)
    });

    assert.equal(client2.totalSentRequests, 1);

    const result = await poller2.done();
    assert.equal(result, "Done");

    // The second client doesn't do the first request and goes all the way to the end.
    assert.equal(client2.totalSentRequests, 12);
  });
});
