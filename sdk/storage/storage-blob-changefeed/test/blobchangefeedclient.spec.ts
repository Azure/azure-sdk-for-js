// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { record, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { recorderEnvSetup, getBlobChangeFeedClient } from "./utils";
import { BlobChangeFeedClient, BlobChangeFeedEvent, BlobChangeFeedEventPage } from "../src";
import { AbortController } from "@azure/abort-controller";
import { setTracer } from "@azure/test-utils";
import { Pipeline } from "@azure/storage-blob";
import { SDK_VERSION } from "../src/utils/constants";
import { setSpan, context } from "@azure/core-tracing";

import * as dotenv from "dotenv";
dotenv.config();

const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;

describe("BlobChangeFeedClient", async () => {
  let recorder: Recorder;
  let changeFeedClient: BlobChangeFeedClient;

  before(async function() {
    if (process.env.CHANGE_FEED_ENABLED !== "1" && !isPlaybackMode()) {
      this.skip();
    }
  });

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    changeFeedClient = getBlobChangeFeedClient();
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("next(): fetch all events", async () => {
    let i = 0;
    for await (const event of changeFeedClient.listChanges()) {
      if (i++ === 0) {
        assert.ok(event.eventType);
        assert.ok(event.data.blobType);
      }
    }
  }).timeout(timeoutForLargeFileUploadingTest);

  it("next(): with start and end time", async () => {
    let i = 0;
    let lastEvent: BlobChangeFeedEvent | undefined;
    const start = new Date(Date.UTC(2020, 1, 21, 22, 30, 0)); // will be rounded down to 22:00
    const startRounded = new Date(Date.UTC(2020, 1, 21, 22, 0, 0));
    const end = new Date(Date.UTC(2020, 4, 8, 21, 10, 0)); // will be rounded up to 22:00
    const endRounded = new Date(Date.UTC(2020, 4, 8, 22, 0, 0));
    for await (const event of changeFeedClient.listChanges({ start, end })) {
      if (i++ === 0) {
        assert.ok(event.eventType);
        assert.ok(event.data.blobType);
        assert.ok(event.eventTime >= startRounded);
      }
      lastEvent = event;
    }

    if (lastEvent) {
      assert.ok(lastEvent.eventTime < endRounded);
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
    assert.ok(event.eventType);
    assert.ok(event.data.blobType);

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
    assert.ok(event1.eventType);
    assert.ok(event1.data.blobType);
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
        assert.ok(firstEvent.eventType);
        assert.ok(firstEvent.data.blobType);
        assert.notEqual(firstEvent.id, event.id);
      }
      lastEventPage = eventPage;
    }

    if (lastEventPage) {
      const lastEvent = lastEventPage.events[lastEventPage.events.length - 1];
      assert.ok(lastEvent.eventTime < endRounded);
    }
  });

  it("could abort", async () => {
    const maxPageSize = 2;
    const iter = changeFeedClient
      .listChanges({ abortSignal: AbortController.timeout(1) })
      .byPage({ maxPageSize });
    try {
      await iter.next();
      assert.fail("Should have been aborted.");
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  });

  function fetchTelemetryString(pipeline: Pipeline): string {
    for (const factory of pipeline.factories) {
      if ((factory as any).telemetryString) {
        return (factory as any).telemetryString;
      }
    }
    return "";
  }

  it("user agent set correctly", async () => {
    const blobServiceClient = (changeFeedClient as any).blobServiceClient;
    const telemetryString = fetchTelemetryString(blobServiceClient.pipeline);
    assert.ok(telemetryString.startsWith(`changefeed-js/${SDK_VERSION}`));

    const userAgentPrefix = "test/1 a b";
    const changeFeedClient2 = new BlobChangeFeedClient(
      blobServiceClient.url,
      blobServiceClient.credential,
      {
        userAgentOptions: { userAgentPrefix }
      }
    );
    const blobServiceClient2 = (changeFeedClient2 as any).blobServiceClient;
    const telemetryString2 = fetchTelemetryString(blobServiceClient2.pipeline);
    assert.ok(telemetryString2.startsWith(`${userAgentPrefix} changefeed-js/${SDK_VERSION}`));
  });

  it("tracing", async () => {
    const tracer = setTracer();
    const rootSpan = tracer.startSpan("root");

    const pageIter = changeFeedClient.listChanges({
      tracingOptions: {
        tracingContext: setSpan(context.active(), rootSpan)
      }
    });
    await pageIter.next();

    rootSpan.end();
    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");
  });
});

describe("BlobChangeFeedClient: Change Feed not configured", async () => {
  let recorder: Recorder;
  let changeFeedClient: BlobChangeFeedClient;

  before(async function() {
    if (process.env.CHANGE_FEED_ENABLED === "1" && !isPlaybackMode()) {
      this.skip();
    }
  });

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    changeFeedClient = getBlobChangeFeedClient();
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("should throw when fetching changes", async () => {
    let exceptionCaught = false;
    try {
      await changeFeedClient.listChanges().next();
    } catch (err) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });
});
