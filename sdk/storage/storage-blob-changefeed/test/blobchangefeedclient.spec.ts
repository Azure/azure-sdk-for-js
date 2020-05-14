import * as assert from "assert";
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { BlobChangeFeedClient, BlobChangeFeedEvent, BlobChangeFeedEventPage } from "../src";

import * as dotenv from "dotenv";
dotenv.config();

// import { setLogLevel } from "@azure/logger";
// setLogLevel("info");

describe("BlobChangeFeedClient", async () => {
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );
  const changeFeedClient = new BlobChangeFeedClient(blobServiceClient);

  before(async function () {
    if (process.env.CHANGE_FEED_ENABLED !== "1") {
      this.skip();
    }
  });

  it("next(): fetch all events", async () => {
    let i = 0;
    for await (const event of changeFeedClient.getChanges()) {
      if (i++ === 0) {
        assert.ok(event.eventType);
        assert.ok(event.data.blobType);
      }
    }
  });

  it("next(): with start and end time", async () => {
    let i = 0;
    let lastEvent: BlobChangeFeedEvent | undefined;
    const start = new Date(Date.UTC(2020, 1, 21, 22, 30, 0)); // will be rounded to 22:00
    const startRounded = new Date(Date.UTC(2020, 1, 21, 22, 0, 0));
    const end = new Date(Date.UTC(2020, 4, 8, 21, 10, 0)); // will be rounded to 22:00
    const endRounded = new Date(Date.UTC(2020, 4, 8, 22, 0, 0));
    for await (const event of changeFeedClient.getChanges({ start, end })) {
      if (i++ === 0) {
        assert.ok(event.eventType);
        assert.ok(event.data.blobType);
        assert.ok(new Date(event.eventTime) >= startRounded);
      }
      lastEvent = event;
    }

    if (lastEvent) {
      assert.ok(new Date(lastEvent.eventTime) < endRounded);
    }
  });

  it("byPage()", async () => {
    const maxPageSize = 2
    const iter = changeFeedClient.getChanges().byPage({ maxPageSize });
    const nextPage = await iter.next();
    if (nextPage.done) {
      return;
    }
    assert.equal(nextPage.value.events.length, maxPageSize);
    const event = nextPage.value.events[0];
    assert.ok(event.eventType);
    assert.ok(event.data.blobType);

    // continuationToken
    const iter1 = changeFeedClient.getChanges().byPage({ continuationToken: nextPage.value.continuationToken, maxPageSize });
    const nextPage1 = await iter1.next();
    if (nextPage1.done) {
      return;
    }
    assert.equal(nextPage1.value.events.length, maxPageSize);
    const event1 = nextPage1.value.events[0];
    assert.ok(event1.eventType);
    assert.ok(event1.data.blobType);
    assert.notEqual(event1.id, event.id);

    // fetch between time range
    const start = new Date(Date.UTC(2020, 1, 21, 22, 30, 0)); // will be ignored
    const end = new Date(Date.UTC(2020, 4, 8, 21, 10, 0)); // will be rounded to 22:00
    const endRounded = new Date(Date.UTC(2020, 4, 8, 22, 0, 0));
    const iter2 = changeFeedClient.getChanges({ start, end }).byPage({ continuationToken: nextPage1.value.continuationToken });
    let i = 0;
    let lastEventPage: BlobChangeFeedEventPage | undefined;
    for await (const eventPage of iter2) {
      if (i++ === 0) {
        const firstEvent = eventPage.events[0];
        assert.ok(firstEvent.eventType);
        assert.ok(firstEvent.data.blobType);
        assert.notEqual(firstEvent.id, event.id);
      }
      lastEventPage = eventPage;
    }

    if (lastEventPage) {
      const lastEvent = lastEventPage.events[lastEventPage.events.length - 1];
      assert.ok(new Date(lastEvent.eventTime) < endRounded);
    }
  });
});


describe("BlobChangeFeedClient: Change Feed not configured", async () => {
  const account = process.env.ACCOUNT_NAME || "";
  const accountKey = process.env.ACCOUNT_KEY || "";
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );
  const changeFeedClient = new BlobChangeFeedClient(blobServiceClient);

  before(async function () {
    if (process.env.CHANGE_FEED_ENABLED === "1") {
      this.skip();
    }
  });

  it("should throw when fetching changes", async () => {
    let exceptionCaught = false;
    try {
      await changeFeedClient.getChanges().next();
    } catch (err) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });
});
