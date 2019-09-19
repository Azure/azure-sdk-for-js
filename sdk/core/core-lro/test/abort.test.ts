// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { delay, SimpleTokenCredential, WebResource, HttpHeaders } from "@azure/core-http";
import { FakeClient } from "./utils/fakeClient"
import { AbortController } from "@azure/abort-controller";

// IMPORTANT:
// Some tests express expected behaviors through a property called
// .totalSentRequests, which belongs to an implementation of core-lro's poller,
// not to the underlying Poller class. Please look at test/utils/fakePoller.ts

const fakeHttpHeaders: HttpHeaders = new HttpHeaders();
const fakeHttpRequest: WebResource = new WebResource();
const basicResponseStructure = {
  headers: fakeHttpHeaders,
  parsedBody: {
  },
  request: fakeHttpRequest
}

describe("Long Running Operations - abort signals", function () {
  it("should support an abort signal sent to the constructor", async function () {
    const client = new FakeClient(new SimpleTokenCredential("my-fake-token"));
    client.setResponses(Array(20).fill({
      ...basicResponseStructure,
      status: 202,
    }));
    const abortController = new AbortController();
    const poller = await client.startLRO({
      requestOptions: {
        abortSignal: abortController.signal
      }
    });
    // Testing subscriptions to the poll errors
    let pollError: Error | undefined;
    poller.onPollError(e => {
      pollError = e;
    })
    // Testing catching errors using done()
    let doneError: Error | undefined;
    poller.done().catch(e => {
      doneError = e;
    })
    assert.equal(poller.state, "InProgress");
    await delay(100);
    assert.equal(poller.totalSentRequests, 10);
    abortController.abort();
    await delay(50);
    assert.equal(pollError!.message, "The request was aborted");
    assert.equal(doneError!.message, "The request was aborted");
    assert.equal(poller.totalSentRequests, 11);
    poller.stop();
  }); 
});
