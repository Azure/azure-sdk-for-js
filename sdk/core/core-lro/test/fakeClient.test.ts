// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { delay, SimpleTokenCredential, WebResource, HttpHeaders } from "@azure/core-http";
import { FakeClient } from "./utils/fakeClient"

const fakeHttpHeaders: HttpHeaders = new HttpHeaders();
const fakeHttpRequest: WebResource = new WebResource();
const basicResponseStructure = {
  headers: fakeHttpHeaders,
  parsedBody: {
  },
  request: fakeHttpRequest
}

describe("Long Running Operations - custom client", function () {
  it("can query the current operation state (synchronously)", async function () {
    const client = new FakeClient(new SimpleTokenCredential("my-fake-token"));
    client.setResponses([{
      ...basicResponseStructure,
      status: 202,
    }]);
    const poller = await client.startLRO();
    assert.equal(poller.state, "InProgress");
    poller.forget();
  });

  it("can query the current operation state (asynchronously)", async function () {
    const client = new FakeClient(new SimpleTokenCredential("my-fake-token"));
    client.setResponses([{
      ...basicResponseStructure,
      status: 202,
    }, {
      ...basicResponseStructure,
      status: 204,
    }]);
    const poller = await client.startLRO({ manual: true });
    await poller.retry(); // Manual polling
    assert.equal(poller.state, "Succeeded");
    poller.forget();
  });

  it.skip("shows how to handle a failing initialRequest", async function () {
  });

  it("can wait until the operation has completed", async function () {
    const client = new FakeClient(new SimpleTokenCredential("my-fake-token"));
    client.setResponses([{
      ...basicResponseStructure,
      status: 202,
    }, {
      ...basicResponseStructure,
      status: 204,
    }]);
    const poller = await client.startLRO();
    await poller.done();
    await delay(15);
    assert.equal(poller.state, "Succeeded");
  });

  // it("can cancel the operation (when cancellation is supported)", async function () {
  //   // set up a cancel-friendly operation
  //   const poller = client.beginCancellablePolling();
  //   await poller.cancel();
  // });

  // it("fails to cancel the operation (when cancellation is not supported)", async function () {
  //   // set up a cancel-unfriendly operation
  //   const poller = client.beginUncancellablePolling();
  //   let error: any;
  //   try {
  //     await poller.cancel();
  //   } catch(e) {
  //     error = e;
  //   }
  //   assert.equal(e.message, "Cancellation not supported");
  // });

  it("allows polling to stop (forget to continue polling)", async function () {
    const client = new FakeClient(new SimpleTokenCredential("my-fake-token"));
    const responses = Array(20).fill({
      ...basicResponseStructure,
      status: 202,
    });
    client.setResponses(responses);
    const poller = await client.startLRO();
    assert.equal(poller.totalSentRequests, 1);
    await delay(100);
    assert.equal(poller.totalSentRequests, 10);
    poller.forget();
    await delay(100);
    assert.equal(poller.totalSentRequests, 11);
  });

  it("prevents manual polling if automatic", async function () {
    const client = new FakeClient(new SimpleTokenCredential("my-fake-token"));
    client.setResponses([{
      ...basicResponseStructure,
      status: 202,
    }, {
      ...basicResponseStructure,
      status: 204,
    }]);
    const poller = await client.startLRO();
    let error: any;
    try {
      await poller.retry();
    } catch(e) {
      error = e;
    }
    assert.equal(error.message, "Manual retries are disabled on this poller");
  });

  // it("documents progress", async function () {
  //   const poller = await client.startLRO();
  //   await delay(100);
  //   assert.equal(poller.progress, 0.5); // 0.5 of 1. 50%
  // });

  it("can reuse one poller state to instantiate another poller", async function () {
    // Let's start with the forgetful test
    const client = new FakeClient(new SimpleTokenCredential("my-fake-token"));
    const responses = [
      ...Array(19).fill({
        ...basicResponseStructure,
        status: 202,
      }),
      {
        ...basicResponseStructure,
        status: 204,
      }
    ];
    client.setResponses(responses);
    const poller = await client.startLRO();
    assert.equal(poller.totalSentRequests, 1);
    await delay(100);
    assert.equal(poller.totalSentRequests, 10);
    poller.forget();
    await delay(100);
    assert.equal(poller.totalSentRequests, 11);
    // Let's try to resume this with a new poller.
    const serialized = poller.toJSON();
    const client2 = new FakeClient(new SimpleTokenCredential("my-fake-token"));
    client2.setResponses(responses);
    const poller2 = await client2.startLRO({
      ...serialized,
      manual: false,
    });
    assert.equal(poller2.totalSentRequests, 1);
    await delay(100);
    assert.equal(poller2.totalSentRequests, 9);
    poller2.forget();
    assert.equal(poller2.state, "Succeeded");
  });
});
