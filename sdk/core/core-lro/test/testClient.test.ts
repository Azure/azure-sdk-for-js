// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { SimpleTokenCredential, WebResource, HttpHeaders } from "@azure/core-http";
import { TestClient } from "./utils/testClient"

// IMPORTANT:
// Some tests express expected behaviors through a property called
// .totalSentRequests, which belongs to an implementation of core-lro's poller,
// not to the underlying Poller class. Please look at test/utils/testPoller.ts

const testHttpHeaders: HttpHeaders = new HttpHeaders();
const testHttpRequest: WebResource = new WebResource();
const basicResponseStructure = {
  headers: testHttpHeaders,
  parsedBody: {
  },
  request: testHttpRequest
}

describe("Long Running Operations - custom client", function () {
  it("can query the current operation state (synchronously)", async function () {
    const client = new TestClient(new SimpleTokenCredential("my-test-token"));
    client.setResponses([{
      ...basicResponseStructure,
      status: 202,
    }]);
    const poller = await client.startLRO();
    assert.equal(poller.toJSON().properties.initialResponse!.status, 202);
    poller.stop();
  });

  // it("can query the current operation state (asynchronously)", async function () {
  //   const client = new TestClient(new SimpleTokenCredential("my-test-token"));
  //   client.setResponses([{
  //     ...basicResponseStructure,
  //     status: 202,
  //   }, {
  //     ...basicResponseStructure,
  //     status: 204,
  //   }]);
  //   const poller = await client.startLRO({ manual: true });
  //   await poller.poll(); // Manual polling
  //   assert.equal(poller.state, "Succeeded");
  //   poller.stop();
  // });

  // it("can wait until the operation has completed", async function () {
  //   const client = new TestClient(new SimpleTokenCredential("my-test-token"));
  //   client.setResponses([{
  //     ...basicResponseStructure,
  //     status: 202,
  //   }, {
  //     ...basicResponseStructure,
  //     status: 204,
  //   }]);
  //   const poller = await client.startLRO();
  //   await poller.done();
  //   await delay(15);
  //   assert.equal(poller.state, "Succeeded");
  // });

  // it("can cancel the operation (when cancellation is supported)", async function () {
  //   const client = new TestClient(new SimpleTokenCredential("my-test-token"));
  //   const responses = Array(20).fill({
  //     ...basicResponseStructure,
  //     status: 202,
  //   });
  //   client.setResponses(responses);
  //   const poller = await client.startLRO();
  //   assert.equal(client.totalSentRequests, 1);
  //   await delay(100);
  //   assert.equal(client.totalSentRequests, 10);
  //   await poller.cancel();
  //   assert.equal(poller.state, "Cancelled");
  //   poller.stop(); 
  // });

  // it("fails to cancel the operation (when cancellation is not supported)", async function () {
  //   const client = new TestClient(new SimpleTokenCredential("my-test-token"));
  //   const responses = Array(20).fill({
  //     ...basicResponseStructure,
  //     status: 202,
  //   });
  //   client.setResponses(responses);
  //   const poller = await client.startNonCancellableLRO();
  //   let error: any;
  //   try {
  //     await poller.cancel();
  //   } catch(e) {
  //     error = e;
  //   }
  //   assert.equal(error.message, "Cancellation not supported");
  //   poller.stop(); 
  // });

  // it("allows polling to stop (stop polling)", async function () {
  //   const client = new TestClient(new SimpleTokenCredential("my-test-token"));
  //   const responses = Array(20).fill({
  //     ...basicResponseStructure,
  //     status: 202,
  //   });
  //   client.setResponses(responses);
  //   const poller = await client.startLRO();
  //   assert.equal(client.totalSentRequests, 1);
  //   await delay(100);
  //   assert.equal(client.totalSentRequests, 10);
  //   poller.stop();
  //   await delay(100);
  //   assert.equal(client.totalSentRequests, 11);
  // });

  // it("prevents manual polling if automatic", async function () {
  //   const client = new TestClient(new SimpleTokenCredential("my-test-token"));
  //   client.setResponses([{
  //     ...basicResponseStructure,
  //     status: 202,
  //   }, {
  //     ...basicResponseStructure,
  //     status: 204,
  //   }]);
  //   const poller = await client.startLRO();
  //   let error: any;
  //   try {
  //     await poller.poll();
  //   } catch(e) {
  //     error = e;
  //   }
  //   assert.equal(error.message, "Manual retries are disabled on this poller");
  // });

  // // Should be developed by the client
  // // it("documents progress", async function () {
  // //   const poller = await client.startLRO();
  // //   await delay(100);
  // //   assert.equal(poller.progress, 0.5); // 0.5 of 1. 50%
  // // });

  // it("can reuse one poller state to instantiate another poller", async function () {
  //   // Let's start with the stopped test
  //   const client = new TestClient(new SimpleTokenCredential("my-test-token"));
  //   const responses = [
  //     ...Array(19).fill({
  //       ...basicResponseStructure,
  //       status: 202,
  //     }),
  //     {
  //       ...basicResponseStructure,
  //       status: 204,
  //     }
  //   ];
  //   client.setResponses(responses);
  //   const poller = await client.startLRO();
  //   assert.equal(client.totalSentRequests, 1);
  //   await delay(100);
  //   assert.equal(client.totalSentRequests, 10);
  //   poller.stop();
  //   await delay(100);
  //   assert.equal(client.totalSentRequests, 11);
  //   // Let's try to resume this with a new poller.
  //   const serialized = poller.toJSON();
  //   const client2 = new TestClient(new SimpleTokenCredential("my-test-token"));
  //   client2.setResponses(responses);
  //   const poller2 = await client2.startLRO({
  //     ...serialized,
  //     manual: false,
  //   });
  //   assert.equal(client2.totalSentRequests, 1);
  //   await delay(100);
  //   assert.equal(client2.totalSentRequests, 9);
  //   poller2.stop();
  //   assert.equal(poller2.state, "Succeeded");
  // });

  // it("waits for the next response", async function () {
  //   const client = new TestClient(new SimpleTokenCredential("my-test-token"));
  //   client.setResponses([{
  //     ...basicResponseStructure,
  //     status: 202,
  //   }, {
  //     ...basicResponseStructure,
  //     status: 202,
  //   }, {
  //     ...basicResponseStructure,
  //     status: 204,
  //   }]);
  //   const poller = await client.startLRO();
  //   assert.equal(poller.state, "InProgress");
  //   assert.equal(client.totalSentRequests, 1);
  //   const response = await poller.nextResponse();
  //   assert.equal(response.status, 202);
  //   assert.equal(client.totalSentRequests, 2);
  //   poller.stop();
  // });
});
