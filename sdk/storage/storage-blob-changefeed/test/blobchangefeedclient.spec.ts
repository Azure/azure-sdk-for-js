// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { record, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { recorderEnvSetup, getBlobChangeFeedClient, streamToString } from "./utils";
import { BlobChangeFeedClient, BlobChangeFeedEvent, BlobChangeFeedEventPage } from "../src";
import { AbortController } from "@azure/abort-controller";
import { setTracer } from "@azure/test-utils";
import { BlobServiceClient, RequestPolicy } from "@azure/storage-blob";
import { SDK_VERSION } from "../src/utils/constants";
import { setSpan, context } from "@azure/core-tracing";
import * as fs from "fs";
import * as path from "path";

import { Context } from "mocha";
import { rawEventToBlobChangeFeedEvent } from "../src/utils/utils.common";
import { createHttpHeaders, RestError } from "@azure/core-rest-pipeline";
import { toHttpHeadersLike } from "@azure/core-http-compat";

const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;

describe("BlobChangeFeedClient", async () => {
  let recorder: Recorder;
  let changeFeedClient: BlobChangeFeedClient;

  before(async function (this: Context) {
    if (process.env.CHANGE_FEED_ENABLED !== "1" && !isPlaybackMode()) {
      this.skip();
    }
  });

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    changeFeedClient = getBlobChangeFeedClient();
  });

  afterEach(async function () {
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
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  async function fetchTelemetryString(client: BlobChangeFeedClient): Promise<string> {
    try {
      await client.listChanges().next();
      return "";
    } catch (e: any) {
      assert.equal(e.name, "RestError");
      return (e as RestError).request?.headers.get("User-Agent") ?? "";
    }
  }

  it("user agent set correctly", async () => {
    const MockHttpClient: RequestPolicy = {
      sendRequest(request) {
        return Promise.resolve({
          request,
          headers: toHttpHeadersLike(createHttpHeaders()),
          status: 418,
        });
      },
    };

    const client = getBlobChangeFeedClient("", "", {
      httpClient: MockHttpClient,
    });
    const telemetryString = await fetchTelemetryString(client);
    assert.ok(telemetryString.startsWith(`changefeed-js/${SDK_VERSION}`));
    const blobServiceClient: BlobServiceClient = (changeFeedClient as any).blobServiceClient;
    const userAgentPrefix = "test/1 a b";
    const client2 = new BlobChangeFeedClient(blobServiceClient.url, blobServiceClient.credential, {
      httpClient: MockHttpClient,
      userAgentOptions: { userAgentPrefix },
    });
    const telemetryString2 = await fetchTelemetryString(client2);
    assert.ok(telemetryString2.startsWith(`${userAgentPrefix} changefeed-js/${SDK_VERSION}`));
  });

  it("tracing", async () => {
    const tracer = setTracer();
    const rootSpan = tracer.startSpan("root");

    const pageIter = changeFeedClient.listChanges({
      tracingOptions: {
        tracingContext: setSpan(context.active(), rootSpan),
      },
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

  before(async function (this: Context) {
    if (process.env.CHANGE_FEED_ENABLED === "1" && !isPlaybackMode()) {
      this.skip();
    }
  });

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    changeFeedClient = getBlobChangeFeedClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should throw when fetching changes", async () => {
    let exceptionCaught = false;
    try {
      await changeFeedClient.listChanges().next();
    } catch (err: any) {
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });
});

describe("Change feed event schema test", async () => {
  let recorder: Recorder;

  before(async function (this: Context) {
    if (process.env.CHANGE_FEED_ENABLED === "1" && !isPlaybackMode()) {
      this.skip();
    }
  });

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Event schema v1 test", async () => {
    const eventSchemaV1 = path.join("test", "resources", "EventSchemaV1.json");
    const eventData = await streamToString(fs.createReadStream(eventSchemaV1));
    const eventObject = JSON.parse(eventData);
    const changeFeedEvent = rawEventToBlobChangeFeedEvent(eventObject);

    // Assert
    assert.equal(1, changeFeedEvent.schemaVersion);
    assert.equal(
      "/subscriptions/dd40261b-437d-43d0-86cf-ef222b78fd15/resourceGroups/haambaga/providers/Microsoft.Storage/storageAccounts/HAAMBAGA-DEV",
      changeFeedEvent.topic
    );
    assert.equal(
      "/blobServices/default/containers/apitestcontainerver/blobs/20220217_125928329_Blob_oaG6iu7ImEB1cX8M",
      changeFeedEvent.subject
    );
    assert.equal("BlobCreated", changeFeedEvent.eventType);
    assert.equal(
      new Date("2022-02-17T12:59:41.4003102Z").valueOf(),
      changeFeedEvent.eventTime.valueOf()
    );
    assert.equal("322343e3-8020-0000-00fe-233467066726", changeFeedEvent.id);
    assert.equal("PutBlob", changeFeedEvent.data.api);
    assert.equal("f0270546-168e-4398-8fa8-107a1ac214d2", changeFeedEvent.data.clientRequestId);
    assert.equal("322343e3-8020-0000-00fe-233467000000", changeFeedEvent.data.requestId);
    assert.equal("0x8D9F2155CBF7928", changeFeedEvent.data.etag);
    assert.equal("application/octet-stream", changeFeedEvent.data.contentType);
    assert.equal(128, changeFeedEvent.data.contentLength);
    assert.equal("BlockBlob", changeFeedEvent.data.blobType);
    assert.equal("https://www.myurl.com", changeFeedEvent.data.url);
    assert.equal(
      "00000000000000010000000000000002000000000000001d",
      changeFeedEvent.data.sequencer
    );
  });

  it("Event schema v3 test", async () => {
    const eventSchemaV3 = path.join("test", "resources", "EventSchemaV3.json");
    const eventData = await streamToString(fs.createReadStream(eventSchemaV3));
    const eventObject = JSON.parse(eventData);
    const changeFeedEvent = rawEventToBlobChangeFeedEvent(eventObject);

    assert.equal(3, changeFeedEvent.schemaVersion);
    assert.equal(
      "/subscriptions/dd40261b-437d-43d0-86cf-ef222b78fd15/resourceGroups/haambaga/providers/Microsoft.Storage/storageAccounts/HAAMBAGA-DEV",
      changeFeedEvent.topic
    );
    assert.equal(
      "/blobServices/default/containers/apitestcontainerver/blobs/20220217_130510699_Blob_oaG6iu7ImEB1cX8M",
      changeFeedEvent.subject
    );
    assert.equal("BlobCreated", changeFeedEvent.eventType);
    assert.equal(
      new Date("2022-02-17T13:05:19.6798242Z").valueOf(),
      changeFeedEvent.eventTime.valueOf()
    );
    assert.equal("eefe8fc8-8020-0000-00fe-23346706daaa", changeFeedEvent.id);
    assert.equal("PutBlob", changeFeedEvent.data.api);
    assert.equal("00c0b6b7-bb67-4748-a3dc-86464863d267", changeFeedEvent.data.clientRequestId);
    assert.equal("eefe8fc8-8020-0000-00fe-233467000000", changeFeedEvent.data.requestId);
    assert.equal("0x8D9F216266170DC", changeFeedEvent.data.etag);
    assert.equal("application/octet-stream", changeFeedEvent.data.contentType);
    assert.equal(128, changeFeedEvent.data.contentLength);
    assert.equal("BlockBlob", changeFeedEvent.data.blobType);
    assert.equal("https://www.myurl.com", changeFeedEvent.data.url);
    assert.equal(
      "00000000000000010000000000000002000000000000001d",
      changeFeedEvent.data.sequencer
    );

    assert.equal(
      "2022-02-17T13:08:42.4825913Z",
      changeFeedEvent.data.previousInfo?.softDeleteSnapshot
    );
    assert.ok(changeFeedEvent.data.previousInfo?.isBlobSoftDeleted === true);
    assert.equal("2024-02-17T16:11:52.0781797Z", changeFeedEvent.data.previousInfo?.newBlobVersion);
    assert.equal("2022-02-17T16:11:52.0781797Z", changeFeedEvent.data.previousInfo?.oldBlobVersion);
    assert.equal("Hot", changeFeedEvent.data.previousInfo?.previousTier);

    assert.equal("2022-02-17T16:09:16.7261278Z", changeFeedEvent.data.snapshot);

    assert.equal(
      "ContentLanguage",
      changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].propertyName
    );
    assert.equal("pl-Pl", changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].newValue);
    assert.equal("nl-NL", changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].oldValue);

    assert.equal(
      "CacheControl",
      changeFeedEvent.data.updatedBlobProperties!["CacheControl"].propertyName
    );
    assert.equal(
      "max-age=100",
      changeFeedEvent.data.updatedBlobProperties!["CacheControl"].newValue
    );
    assert.equal(
      "max-age=99",
      changeFeedEvent.data.updatedBlobProperties!["CacheControl"].oldValue
    );

    assert.equal(
      "ContentEncoding",
      changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].propertyName
    );
    assert.equal(
      "gzip, identity",
      changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].newValue
    );
    assert.equal("gzip", changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].oldValue);

    assert.equal(
      "ContentMD5",
      changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].propertyName
    );
    assert.equal(
      "Q2h1Y2sgSW51ZwDIAXR5IQ==",
      changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].newValue
    );
    assert.equal("Q2h1Y2sgSW=", changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].oldValue);

    assert.equal(
      "ContentDisposition",
      changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].propertyName
    );
    assert.equal(
      "attachment",
      changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].newValue
    );
    assert.equal("", changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].oldValue);

    assert.equal(
      "ContentType",
      changeFeedEvent.data.updatedBlobProperties!["ContentType"].propertyName
    );
    assert.equal(
      "application/json",
      changeFeedEvent.data.updatedBlobProperties!["ContentType"].newValue
    );
    assert.equal(
      "application/octet-stream",
      changeFeedEvent.data.updatedBlobProperties!["ContentType"].oldValue
    );
  });

  it("Event schema v4 test", async () => {
    const eventSchemaV4 = path.join("test", "resources", "EventSchemaV4.json");
    const eventData = await streamToString(fs.createReadStream(eventSchemaV4));
    const eventObject = JSON.parse(eventData);
    const changeFeedEvent = rawEventToBlobChangeFeedEvent(eventObject);

    assert.equal(4, changeFeedEvent.schemaVersion);
    assert.equal(
      "/subscriptions/dd40261b-437d-43d0-86cf-ef222b78fd15/resourceGroups/haambaga/providers/Microsoft.Storage/storageAccounts/HAAMBAGA-DEV",
      changeFeedEvent.topic
    );
    assert.equal(
      "/blobServices/default/containers/apitestcontainerver/blobs/20220217_130833395_Blob_oaG6iu7ImEB1cX8M",
      changeFeedEvent.subject
    );
    assert.equal("BlobCreated", changeFeedEvent.eventType);
    assert.equal(
      new Date("2022-02-17T13:08:42.4835902Z").valueOf(),
      changeFeedEvent.eventTime.valueOf()
    );
    assert.equal("ca76bce1-8020-0000-00ff-23346706e769", changeFeedEvent.id);
    assert.equal("PutBlob", changeFeedEvent.data.api);
    assert.equal("58fbfee9-6cf5-4096-9666-c42980beee65", changeFeedEvent.data.clientRequestId);
    assert.equal("ca76bce1-8020-0000-00ff-233467000000", changeFeedEvent.data.requestId);
    assert.equal("0x8D9F2169F42D701", changeFeedEvent.data.etag);
    assert.equal("application/octet-stream", changeFeedEvent.data.contentType);
    assert.equal(128, changeFeedEvent.data.contentLength);
    assert.equal("BlockBlob", changeFeedEvent.data.blobType);
    assert.equal("2022-02-17T16:11:52.5901564Z", changeFeedEvent.data.blobVersion);
    assert.equal("0000000000000001", changeFeedEvent.data.containerVersion);
    assert.equal("Archive", changeFeedEvent.data.blobAccessTier);
    assert.equal("https://www.myurl.com", changeFeedEvent.data.url);
    assert.equal(
      "00000000000000010000000000000002000000000000001d",
      changeFeedEvent.data.sequencer
    );

    assert.equal(
      "2022-02-17T13:08:42.4825913Z",
      changeFeedEvent.data.previousInfo?.softDeleteSnapshot
    );
    assert.ok(changeFeedEvent.data.previousInfo?.isBlobSoftDeleted === true);
    assert.equal("2024-02-17T16:11:52.0781797Z", changeFeedEvent.data.previousInfo?.newBlobVersion);
    assert.equal("2022-02-17T16:11:52.0781797Z", changeFeedEvent.data.previousInfo?.oldBlobVersion);
    assert.equal("Hot", changeFeedEvent.data.previousInfo?.previousTier);

    assert.equal("2022-02-17T16:09:16.7261278Z", changeFeedEvent.data.snapshot);

    assert.equal(
      "ContentLanguage",
      changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].propertyName
    );
    assert.equal("pl-Pl", changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].newValue);
    assert.equal("nl-NL", changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].oldValue);

    assert.equal(
      "CacheControl",
      changeFeedEvent.data.updatedBlobProperties!["CacheControl"].propertyName
    );
    assert.equal(
      "max-age=100",
      changeFeedEvent.data.updatedBlobProperties!["CacheControl"].newValue
    );
    assert.equal(
      "max-age=99",
      changeFeedEvent.data.updatedBlobProperties!["CacheControl"].oldValue
    );

    assert.equal(
      "ContentEncoding",
      changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].propertyName
    );
    assert.equal(
      "gzip, identity",
      changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].newValue
    );
    assert.equal("gzip", changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].oldValue);

    assert.equal(
      "ContentMD5",
      changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].propertyName
    );
    assert.equal(
      "Q2h1Y2sgSW51ZwDIAXR5IQ==",
      changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].newValue
    );
    assert.equal("Q2h1Y2sgSW=", changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].oldValue);

    assert.equal(
      "ContentDisposition",
      changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].propertyName
    );
    assert.equal(
      "attachment",
      changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].newValue
    );
    assert.equal("", changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].oldValue);

    assert.equal(
      "ContentType",
      changeFeedEvent.data.updatedBlobProperties!["ContentType"].propertyName
    );
    assert.equal(
      "application/json",
      changeFeedEvent.data.updatedBlobProperties!["ContentType"].newValue
    );
    assert.equal(
      "application/octet-stream",
      changeFeedEvent.data.updatedBlobProperties!["ContentType"].oldValue
    );

    assert.equal("Hot", changeFeedEvent.data.longRunningOperationInfo?.destinationAccessTier);
    assert.ok(changeFeedEvent.data.longRunningOperationInfo?.isAsync === true);
    assert.equal("copyId", changeFeedEvent.data.longRunningOperationInfo?.copyId);
  });

  it("Event schema v5 test", async () => {
    const eventSchemaV5 = path.join("test", "resources", "EventSchemaV5.json");
    const eventData = await streamToString(fs.createReadStream(eventSchemaV5));
    const eventObject = JSON.parse(eventData);
    const changeFeedEvent = rawEventToBlobChangeFeedEvent(eventObject);
    assert.equal(5, changeFeedEvent.schemaVersion);
    assert.equal(
      "/subscriptions/dd40261b-437d-43d0-86cf-ef222b78fd15/resourceGroups/haambaga/providers/Microsoft.Storage/storageAccounts/HAAMBAGA-DEV",
      changeFeedEvent.topic
    );
    assert.equal(
      "/blobServices/default/containers/apitestcontainerver/blobs/20220217_131202494_Blob_oaG6iu7ImEB1cX8M",
      changeFeedEvent.subject
    );
    assert.equal("BlobCreated", changeFeedEvent.eventType);
    assert.equal(
      new Date("2022-02-17T13:12:11.5746587Z").valueOf(),
      changeFeedEvent.eventTime.valueOf()
    );
    assert.equal("62616073-8020-0000-00ff-233467060cc0", changeFeedEvent.id);
    assert.equal("PutBlob", changeFeedEvent.data.api);
    assert.equal("b3f9b39a-ae5a-45ac-afad-95ac9e9f2791", changeFeedEvent.data.clientRequestId);
    assert.equal("62616073-8020-0000-00ff-233467000000", changeFeedEvent.data.requestId);
    assert.equal("0x8D9F2171BE32588", changeFeedEvent.data.etag);
    assert.equal("application/octet-stream", changeFeedEvent.data.contentType);
    assert.equal(128, changeFeedEvent.data.contentLength);
    assert.equal("BlockBlob", changeFeedEvent.data.blobType);
    assert.equal("2022-02-17T16:11:52.5901564Z", changeFeedEvent.data.blobVersion);
    assert.equal("0000000000000001", changeFeedEvent.data.containerVersion);
    assert.equal("Archive", changeFeedEvent.data.blobAccessTier);
    assert.equal("https://www.myurl.com", changeFeedEvent.data.url);
    assert.equal(
      "00000000000000010000000000000002000000000000001d",
      changeFeedEvent.data.sequencer
    );

    assert.equal(
      "2022-02-17T13:12:11.5726507Z",
      changeFeedEvent.data.previousInfo?.softDeleteSnapshot
    );
    assert.ok(changeFeedEvent.data.previousInfo?.isBlobSoftDeleted === true);
    assert.equal("2024-02-17T16:11:52.0781797Z", changeFeedEvent.data.previousInfo?.newBlobVersion);
    assert.equal("2022-02-17T16:11:52.0781797Z", changeFeedEvent.data.previousInfo?.oldBlobVersion);
    assert.equal("Hot", changeFeedEvent.data.previousInfo?.previousTier);

    assert.equal("2022-02-17T16:09:16.7261278Z", changeFeedEvent.data.snapshot);

    assert.equal(
      "ContentLanguage",
      changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].propertyName
    );
    assert.equal("pl-Pl", changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].newValue);
    assert.equal("nl-NL", changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].oldValue);

    assert.equal(
      "CacheControl",
      changeFeedEvent.data.updatedBlobProperties!["CacheControl"].propertyName
    );
    assert.equal(
      "max-age=100",
      changeFeedEvent.data.updatedBlobProperties!["CacheControl"].newValue
    );
    assert.equal(
      "max-age=99",
      changeFeedEvent.data.updatedBlobProperties!["CacheControl"].oldValue
    );

    assert.equal(
      "ContentEncoding",
      changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].propertyName
    );
    assert.equal(
      "gzip, identity",
      changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].newValue
    );
    assert.equal("gzip", changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].oldValue);

    assert.equal(
      "ContentMD5",
      changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].propertyName
    );
    assert.equal(
      "Q2h1Y2sgSW51ZwDIAXR5IQ==",
      changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].newValue
    );
    assert.equal("Q2h1Y2sgSW=", changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].oldValue);

    assert.equal(
      "ContentDisposition",
      changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].propertyName
    );
    assert.equal(
      "attachment",
      changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].newValue
    );
    assert.equal("", changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].oldValue);

    assert.equal(
      "ContentType",
      changeFeedEvent.data.updatedBlobProperties!["ContentType"].propertyName
    );
    assert.equal(
      "application/json",
      changeFeedEvent.data.updatedBlobProperties!["ContentType"].newValue
    );
    assert.equal(
      "application/octet-stream",
      changeFeedEvent.data.updatedBlobProperties!["ContentType"].oldValue
    );

    assert.equal("Hot", changeFeedEvent.data.longRunningOperationInfo?.destinationAccessTier);
    assert.ok(changeFeedEvent.data.longRunningOperationInfo?.isAsync === true);
    assert.equal("copyId", changeFeedEvent.data.longRunningOperationInfo?.copyId);

    assert.equal("Value1_3", changeFeedEvent.data.updatedBlobTags?.oldTags["Tag1"]);
    assert.equal("Value2_3", changeFeedEvent.data.updatedBlobTags?.oldTags["Tag2"]);

    assert.equal("Value1_4", changeFeedEvent.data.updatedBlobTags?.newTags["Tag1"]);
    assert.equal("Value2_4", changeFeedEvent.data.updatedBlobTags?.newTags["Tag2"]);
  });
});
