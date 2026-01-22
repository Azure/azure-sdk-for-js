// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { createBlobChangeFeedClient } from "../../utils/node/clients.js";
import type {
  BlobChangeFeedClient,
  BlobChangeFeedEvent,
  BlobChangeFeedEventPage,
} from "@azure/storage-blob-changefeed";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;

describe("BlobChangeFeedClient", async () => {
  let recorder: Recorder;
  let changeFeedClient: BlobChangeFeedClient;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);
    changeFeedClient = await createBlobChangeFeedClient("TokenCredential", { recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("next(): fetch all events", { timeout: timeoutForLargeFileUploadingTest }, async () => {
    let i = 0;
    for await (const event of changeFeedClient.listChanges()) {
      if (i++ === 0) {
        assert.isDefined(event.eventType);
        assert.isDefined(event.data.blobType);
      }
    }
  });

  it("next(): with start and end time", async () => {
    let i = 0;
    let lastEvent: BlobChangeFeedEvent | undefined;
    const start = new Date(Date.UTC(2020, 1, 21, 22, 30, 0)); // will be rounded down to 22:00
    const startRounded = new Date(Date.UTC(2020, 1, 21, 22, 0, 0));
    const end = new Date(Date.UTC(2020, 4, 8, 21, 10, 0)); // will be rounded up to 22:00
    const endRounded = new Date(Date.UTC(2020, 4, 8, 22, 0, 0));
    for await (const event of changeFeedClient.listChanges({ start, end })) {
      if (i++ === 0) {
        assert.isDefined(event.eventType);
        assert.isDefined(event.data.blobType);
        assert.isTrue(event.eventTime >= startRounded);
      }
      lastEvent = event;
    }

    if (lastEvent) {
      assert.isTrue(lastEvent.eventTime < endRounded);
    }
  });

  it("byPage()", async () => {
    const maxPageSize = 2;
    const iter = changeFeedClient.listChanges().byPage({ maxPageSize });
    const nextPage = await iter.next();
    if (nextPage.done) {
      return;
    }
    assert.equal(nextPage.value.events.length, maxPageSize);
    const event = nextPage.value.events[0];
    assert.isDefined(event.eventType);
    assert.isDefined(event.data.blobType);

    // continuationToken
    const iter1 = changeFeedClient
      .listChanges()
      .byPage({ continuationToken: nextPage.value.continuationToken, maxPageSize });
    const nextPage1 = await iter1.next();
    if (nextPage1.done) {
      return;
    }
    assert.equal(nextPage1.value.events.length, maxPageSize);
    const event1 = nextPage1.value.events[0];
    assert.isDefined(event1.eventType);
    assert.isDefined(event1.data.blobType);
    assert.notEqual(event1.id, event.id);

    // fetch between time range
    const start = new Date(Date.UTC(2020, 1, 21, 22, 30, 0)); // will be ignored
    const end = new Date(Date.UTC(2020, 4, 8, 21, 10, 0)); // will be rounded to 22:00
    const endRounded = new Date(Date.UTC(2020, 4, 8, 22, 0, 0));
    const iter2 = changeFeedClient
      .listChanges({ start, end })
      .byPage({ continuationToken: nextPage1.value.continuationToken });
    let i = 0;
    let lastEventPage: BlobChangeFeedEventPage | undefined;
    for await (const eventPage of iter2) {
      if (i++ === 0) {
        const firstEvent = eventPage.events[0];
        assert.isDefined(firstEvent.eventType);
        assert.isDefined(firstEvent.data.blobType);
        assert.notEqual(firstEvent.id, event.id);
      }
      lastEventPage = eventPage;
    }

    if (lastEventPage) {
      const lastEvent = lastEventPage.events[lastEventPage.events.length - 1];
      assert.isTrue(lastEvent.eventTime < endRounded);
    }
  });

  it("could abort", async () => {
    const maxPageSize = 2;
    const iter = changeFeedClient
      .listChanges({ abortSignal: AbortSignal.timeout(1) })
      .byPage({ maxPageSize });
    try {
      await iter.next();
      assert.fail("Should have been aborted.");
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });
});

describe("BlobChangeFeedClient: Change Feed not configured", async () => {
  // Uses the DFS (datalake) account which does not have change feed enabled
  let recorder: Recorder;
  let changeFeedClient: BlobChangeFeedClient;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);
    changeFeedClient = await createBlobChangeFeedClient("TokenCredential", {
      recorder,
      account: "dfs",
    });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should throw when fetching changes", async () => {
    let exceptionCaught = false;
    try {
      await changeFeedClient.listChanges().next();
    } catch (err: any) {
      exceptionCaught = true;
    }
    assert.isTrue(exceptionCaught);
  });
});
