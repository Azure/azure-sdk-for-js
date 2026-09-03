// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isPlaybackMode, Recorder, env } from "@azure-tools/test-recorder";
import {
  recorderEnvSetup,
  getBlobChangeFeedClient,
  streamToString,
  uriSanitizers,
} from "./utils/index.js";
import type { BlobChangeFeedEvent, BlobChangeFeedEventPage } from "../src/index.js";
import { BlobChangeFeedClient } from "../src/index.js";
import type { BlobServiceClient, RequestPolicy } from "@azure/storage-blob";
import { SDK_VERSION } from "../src/utils/constants.js";
import fs from "node:fs";
import path from "node:path";
import { rawEventToBlobChangeFeedEvent } from "../src/utils/utils.common.js";
import type { RestError } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { describe, it, assert, expect, beforeEach, afterEach } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import type { OperationOptions } from "@azure/core-client";

expect.extend({ toSupportTracing });

const timeoutForLargeFileUploadingTest = 20 * 60 * 1000;

describe(
  "BlobChangeFeedClient",
  { skip: true },
  // TODO: Enable { skip: env.CHANGE_FEED_ENABLED !== "1" && !isPlaybackMode() },
  async () => {
    let recorder: Recorder;
    let changeFeedClient: BlobChangeFeedClient;

    beforeEach(async (ctx) => {
      recorder = new Recorder(ctx);
      await recorder.start(recorderEnvSetup);
      // make sure we add the sanitizers on playback for SAS strings
      await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
      changeFeedClient = getBlobChangeFeedClient(recorder);
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

      const client = getBlobChangeFeedClient(recorder, "", "", {
        httpClient: MockHttpClient,
      });
      const telemetryString = await fetchTelemetryString(client);
      assert.isTrue(telemetryString.startsWith(`changefeed-js/${SDK_VERSION}`));
      const blobServiceClient: BlobServiceClient = (changeFeedClient as any).blobServiceClient;
      const userAgentPrefix = "test/1 a b";
      const client2 = new BlobChangeFeedClient(
        blobServiceClient.url,
        blobServiceClient.credential,
        {
          httpClient: MockHttpClient,
          userAgentOptions: { userAgentPrefix },
        },
      );
      const telemetryString2 = await fetchTelemetryString(client2);
      assert.isTrue(telemetryString2.startsWith(`${userAgentPrefix} changefeed-js/${SDK_VERSION}`));
    });

    it("tracing", async () => {
      await expect(async (options: OperationOptions) => {
        const pageIter = changeFeedClient.listChanges(options);
        await pageIter.next();
      }).toSupportTracing(["ChangeFeedFactory-create", "ChangeFeed-getChange"]);
    });
  },
);

describe(
  "BlobChangeFeedClient: Change Feed not configured",
  { skip: env.CHANGE_FEED_ENABLED === "1" && !isPlaybackMode() },
  async () => {
    let recorder: Recorder;
    let changeFeedClient: BlobChangeFeedClient;

    beforeEach(async (ctx) => {
      recorder = new Recorder(ctx);
      await recorder.start(recorderEnvSetup);
      // make sure we add the sanitizers on playback for SAS strings
      await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
      changeFeedClient = getBlobChangeFeedClient(recorder);
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
      assert.isDefined(exceptionCaught);
    });
  },
);

describe(
  "Change feed event schema test",
  { skip: env.CHANGE_FEED_ENABLED === "1" && !isPlaybackMode() },
  async () => {
    let recorder: Recorder;

    beforeEach(async (ctx) => {
      recorder = new Recorder(ctx);
      await recorder.start(recorderEnvSetup);
      // make sure we add the sanitizers on playback for SAS strings
      await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("Event schema v1 test", async () => {
      const eventSchemaV1 = path.join("test", "resources", "EventSchemaV1.json");
      const eventData = await streamToString(fs.createReadStream(eventSchemaV1));
      const eventObject = JSON.parse(eventData);
      const changeFeedEvent = rawEventToBlobChangeFeedEvent(eventObject);

      // Assert
      assert.equal(changeFeedEvent.schemaVersion, 1);
      assert.equal(
        "/subscriptions/dd40261b-437d-43d0-86cf-ef222b78fd15/resourceGroups/haambaga/providers/Microsoft.Storage/storageAccounts/HAAMBAGA-DEV",
        changeFeedEvent.topic,
      );
      assert.equal(
        "/blobServices/default/containers/apitestcontainerver/blobs/20220217_125928329_Blob_oaG6iu7ImEB1cX8M",
        changeFeedEvent.subject,
      );
      assert.equal(changeFeedEvent.eventType, "BlobCreated");
      assert.equal(
        new Date("2022-02-17T12:59:41.4003102Z").valueOf(),
        changeFeedEvent.eventTime.valueOf(),
      );
      assert.equal(changeFeedEvent.id, "322343e3-8020-0000-00fe-233467066726");
      assert.equal(changeFeedEvent.data.api, "PutBlob");
      assert.equal(changeFeedEvent.data.clientRequestId, "f0270546-168e-4398-8fa8-107a1ac214d2");
      assert.equal(changeFeedEvent.data.requestId, "322343e3-8020-0000-00fe-233467000000");
      assert.equal(changeFeedEvent.data.etag, "0x8D9F2155CBF7928");
      assert.equal(changeFeedEvent.data.contentType, "application/octet-stream");
      assert.equal(changeFeedEvent.data.contentLength, 128);
      assert.equal(changeFeedEvent.data.blobType, "BlockBlob");
      assert.equal(changeFeedEvent.data.url, "https://www.myurl.com");
      assert.equal(
        "00000000000000010000000000000002000000000000001d",
        changeFeedEvent.data.sequencer,
      );
    });

    it("Event schema v3 test", async () => {
      const eventSchemaV3 = path.join("test", "resources", "EventSchemaV3.json");
      const eventData = await streamToString(fs.createReadStream(eventSchemaV3));
      const eventObject = JSON.parse(eventData);
      const changeFeedEvent = rawEventToBlobChangeFeedEvent(eventObject);

      assert.equal(changeFeedEvent.schemaVersion, 3);
      assert.equal(
        "/subscriptions/dd40261b-437d-43d0-86cf-ef222b78fd15/resourceGroups/haambaga/providers/Microsoft.Storage/storageAccounts/HAAMBAGA-DEV",
        changeFeedEvent.topic,
      );
      assert.equal(
        "/blobServices/default/containers/apitestcontainerver/blobs/20220217_130510699_Blob_oaG6iu7ImEB1cX8M",
        changeFeedEvent.subject,
      );
      assert.equal(changeFeedEvent.eventType, "BlobCreated");
      assert.equal(
        new Date("2022-02-17T13:05:19.6798242Z").valueOf(),
        changeFeedEvent.eventTime.valueOf(),
      );
      assert.equal(changeFeedEvent.id, "eefe8fc8-8020-0000-00fe-23346706daaa");
      assert.equal(changeFeedEvent.data.api, "PutBlob");
      assert.equal(changeFeedEvent.data.clientRequestId, "00c0b6b7-bb67-4748-a3dc-86464863d267");
      assert.equal(changeFeedEvent.data.requestId, "eefe8fc8-8020-0000-00fe-233467000000");
      assert.equal(changeFeedEvent.data.etag, "0x8D9F216266170DC");
      assert.equal(changeFeedEvent.data.contentType, "application/octet-stream");
      assert.equal(changeFeedEvent.data.contentLength, 128);
      assert.equal(changeFeedEvent.data.blobType, "BlockBlob");
      assert.equal(changeFeedEvent.data.url, "https://www.myurl.com");
      assert.equal(
        "00000000000000010000000000000002000000000000001d",
        changeFeedEvent.data.sequencer,
      );

      assert.equal(
        "2022-02-17T13:08:42.4825913Z",
        changeFeedEvent.data.previousInfo?.softDeleteSnapshot,
      );
      assert.isTrue(changeFeedEvent.data.previousInfo?.isBlobSoftDeleted);
      assert.equal(
        "2024-02-17T16:11:52.0781797Z",
        changeFeedEvent.data.previousInfo?.newBlobVersion,
      );
      assert.equal(
        "2022-02-17T16:11:52.0781797Z",
        changeFeedEvent.data.previousInfo?.oldBlobVersion,
      );
      assert.equal(changeFeedEvent.data.previousInfo?.previousTier, "Hot");

      assert.equal(changeFeedEvent.data.snapshot, "2022-02-17T16:09:16.7261278Z");

      assert.equal(
        "ContentLanguage",
        changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].propertyName,
      );
      assert.equal(
        "pl-Pl",
        changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].newValue,
      );
      assert.equal(
        "nl-NL",
        changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].oldValue,
      );

      assert.equal(
        "CacheControl",
        changeFeedEvent.data.updatedBlobProperties!["CacheControl"].propertyName,
      );
      assert.equal(
        "max-age=100",
        changeFeedEvent.data.updatedBlobProperties!["CacheControl"].newValue,
      );
      assert.equal(
        "max-age=99",
        changeFeedEvent.data.updatedBlobProperties!["CacheControl"].oldValue,
      );

      assert.equal(
        "ContentEncoding",
        changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].propertyName,
      );
      assert.equal(
        "gzip, identity",
        changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].newValue,
      );
      assert.equal(changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].oldValue, "gzip");

      assert.equal(
        "ContentMD5",
        changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].propertyName,
      );
      assert.equal(
        "Q2h1Y2sgSW51ZwDIAXR5IQ==",
        changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].newValue,
      );
      assert.equal(
        "Q2h1Y2sgSW=",
        changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].oldValue,
      );

      assert.equal(
        "ContentDisposition",
        changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].propertyName,
      );
      assert.equal(
        "attachment",
        changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].newValue,
      );
      assert.equal(changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].oldValue, "");

      assert.equal(
        "ContentType",
        changeFeedEvent.data.updatedBlobProperties!["ContentType"].propertyName,
      );
      assert.equal(
        "application/json",
        changeFeedEvent.data.updatedBlobProperties!["ContentType"].newValue,
      );
      assert.equal(
        "application/octet-stream",
        changeFeedEvent.data.updatedBlobProperties!["ContentType"].oldValue,
      );
    });

    it("Event schema v4 test", async () => {
      const eventSchemaV4 = path.join("test", "resources", "EventSchemaV4.json");
      const eventData = await streamToString(fs.createReadStream(eventSchemaV4));
      const eventObject = JSON.parse(eventData);
      const changeFeedEvent = rawEventToBlobChangeFeedEvent(eventObject);

      assert.equal(changeFeedEvent.schemaVersion, 4);
      assert.equal(
        "/subscriptions/dd40261b-437d-43d0-86cf-ef222b78fd15/resourceGroups/haambaga/providers/Microsoft.Storage/storageAccounts/HAAMBAGA-DEV",
        changeFeedEvent.topic,
      );
      assert.equal(
        "/blobServices/default/containers/apitestcontainerver/blobs/20220217_130833395_Blob_oaG6iu7ImEB1cX8M",
        changeFeedEvent.subject,
      );
      assert.equal(changeFeedEvent.eventType, "BlobCreated");
      assert.equal(
        new Date("2022-02-17T13:08:42.4835902Z").valueOf(),
        changeFeedEvent.eventTime.valueOf(),
      );
      assert.equal(changeFeedEvent.id, "ca76bce1-8020-0000-00ff-23346706e769");
      assert.equal(changeFeedEvent.data.api, "PutBlob");
      assert.equal(changeFeedEvent.data.clientRequestId, "58fbfee9-6cf5-4096-9666-c42980beee65");
      assert.equal(changeFeedEvent.data.requestId, "ca76bce1-8020-0000-00ff-233467000000");
      assert.equal(changeFeedEvent.data.etag, "0x8D9F2169F42D701");
      assert.equal(changeFeedEvent.data.contentType, "application/octet-stream");
      assert.equal(changeFeedEvent.data.contentLength, 128);
      assert.equal(changeFeedEvent.data.blobType, "BlockBlob");
      assert.equal(changeFeedEvent.data.blobVersion, "2022-02-17T16:11:52.5901564Z");
      assert.equal(changeFeedEvent.data.containerVersion, "0000000000000001");
      assert.equal(changeFeedEvent.data.blobAccessTier, "Archive");
      assert.equal(changeFeedEvent.data.url, "https://www.myurl.com");
      assert.equal(
        "00000000000000010000000000000002000000000000001d",
        changeFeedEvent.data.sequencer,
      );

      assert.equal(
        "2022-02-17T13:08:42.4825913Z",
        changeFeedEvent.data.previousInfo?.softDeleteSnapshot,
      );
      assert.isTrue(changeFeedEvent.data.previousInfo?.isBlobSoftDeleted);
      assert.equal(
        "2024-02-17T16:11:52.0781797Z",
        changeFeedEvent.data.previousInfo?.newBlobVersion,
      );
      assert.equal(
        "2022-02-17T16:11:52.0781797Z",
        changeFeedEvent.data.previousInfo?.oldBlobVersion,
      );
      assert.equal(changeFeedEvent.data.previousInfo?.previousTier, "Hot");

      assert.equal(changeFeedEvent.data.snapshot, "2022-02-17T16:09:16.7261278Z");

      assert.equal(
        "ContentLanguage",
        changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].propertyName,
      );
      assert.equal(
        "pl-Pl",
        changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].newValue,
      );
      assert.equal(
        "nl-NL",
        changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].oldValue,
      );

      assert.equal(
        "CacheControl",
        changeFeedEvent.data.updatedBlobProperties!["CacheControl"].propertyName,
      );
      assert.equal(
        "max-age=100",
        changeFeedEvent.data.updatedBlobProperties!["CacheControl"].newValue,
      );
      assert.equal(
        "max-age=99",
        changeFeedEvent.data.updatedBlobProperties!["CacheControl"].oldValue,
      );

      assert.equal(
        "ContentEncoding",
        changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].propertyName,
      );
      assert.equal(
        "gzip, identity",
        changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].newValue,
      );
      assert.equal(changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].oldValue, "gzip");

      assert.equal(
        "ContentMD5",
        changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].propertyName,
      );
      assert.equal(
        "Q2h1Y2sgSW51ZwDIAXR5IQ==",
        changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].newValue,
      );
      assert.equal(
        "Q2h1Y2sgSW=",
        changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].oldValue,
      );

      assert.equal(
        "ContentDisposition",
        changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].propertyName,
      );
      assert.equal(
        "attachment",
        changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].newValue,
      );
      assert.equal(changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].oldValue, "");

      assert.equal(
        "ContentType",
        changeFeedEvent.data.updatedBlobProperties!["ContentType"].propertyName,
      );
      assert.equal(
        "application/json",
        changeFeedEvent.data.updatedBlobProperties!["ContentType"].newValue,
      );
      assert.equal(
        "application/octet-stream",
        changeFeedEvent.data.updatedBlobProperties!["ContentType"].oldValue,
      );

      assert.equal(changeFeedEvent.data.longRunningOperationInfo?.destinationAccessTier, "Hot");
      assert.isTrue(changeFeedEvent.data.longRunningOperationInfo?.isAsync);
      assert.equal(changeFeedEvent.data.longRunningOperationInfo?.copyId, "copyId");
    });

    it("Event schema v5 test", async () => {
      const eventSchemaV5 = path.join("test", "resources", "EventSchemaV5.json");
      const eventData = await streamToString(fs.createReadStream(eventSchemaV5));
      const eventObject = JSON.parse(eventData);
      const changeFeedEvent = rawEventToBlobChangeFeedEvent(eventObject);
      assert.equal(changeFeedEvent.schemaVersion, 5);
      assert.equal(
        "/subscriptions/dd40261b-437d-43d0-86cf-ef222b78fd15/resourceGroups/haambaga/providers/Microsoft.Storage/storageAccounts/HAAMBAGA-DEV",
        changeFeedEvent.topic,
      );
      assert.equal(
        "/blobServices/default/containers/apitestcontainerver/blobs/20220217_131202494_Blob_oaG6iu7ImEB1cX8M",
        changeFeedEvent.subject,
      );
      assert.equal(changeFeedEvent.eventType, "BlobCreated");
      assert.equal(
        new Date("2022-02-17T13:12:11.5746587Z").valueOf(),
        changeFeedEvent.eventTime.valueOf(),
      );
      assert.equal(changeFeedEvent.id, "62616073-8020-0000-00ff-233467060cc0");
      assert.equal(changeFeedEvent.data.api, "PutBlob");
      assert.equal(changeFeedEvent.data.clientRequestId, "b3f9b39a-ae5a-45ac-afad-95ac9e9f2791");
      assert.equal(changeFeedEvent.data.requestId, "62616073-8020-0000-00ff-233467000000");
      assert.equal(changeFeedEvent.data.etag, "0x8D9F2171BE32588");
      assert.equal(changeFeedEvent.data.contentType, "application/octet-stream");
      assert.equal(changeFeedEvent.data.contentLength, 128);
      assert.equal(changeFeedEvent.data.blobType, "BlockBlob");
      assert.equal(changeFeedEvent.data.blobVersion, "2022-02-17T16:11:52.5901564Z");
      assert.equal(changeFeedEvent.data.containerVersion, "0000000000000001");
      assert.equal(changeFeedEvent.data.blobAccessTier, "Archive");
      assert.equal(changeFeedEvent.data.url, "https://www.myurl.com");
      assert.equal(
        "00000000000000010000000000000002000000000000001d",
        changeFeedEvent.data.sequencer,
      );

      assert.equal(
        "2022-02-17T13:12:11.5726507Z",
        changeFeedEvent.data.previousInfo?.softDeleteSnapshot,
      );
      assert.isTrue(changeFeedEvent.data.previousInfo?.isBlobSoftDeleted);
      assert.equal(
        "2024-02-17T16:11:52.0781797Z",
        changeFeedEvent.data.previousInfo?.newBlobVersion,
      );
      assert.equal(
        "2022-02-17T16:11:52.0781797Z",
        changeFeedEvent.data.previousInfo?.oldBlobVersion,
      );
      assert.equal(changeFeedEvent.data.previousInfo?.previousTier, "Hot");

      assert.equal(changeFeedEvent.data.snapshot, "2022-02-17T16:09:16.7261278Z");

      assert.equal(
        "ContentLanguage",
        changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].propertyName,
      );
      assert.equal(
        "pl-Pl",
        changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].newValue,
      );
      assert.equal(
        "nl-NL",
        changeFeedEvent.data.updatedBlobProperties!["ContentLanguage"].oldValue,
      );

      assert.equal(
        "CacheControl",
        changeFeedEvent.data.updatedBlobProperties!["CacheControl"].propertyName,
      );
      assert.equal(
        "max-age=100",
        changeFeedEvent.data.updatedBlobProperties!["CacheControl"].newValue,
      );
      assert.equal(
        "max-age=99",
        changeFeedEvent.data.updatedBlobProperties!["CacheControl"].oldValue,
      );

      assert.equal(
        "ContentEncoding",
        changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].propertyName,
      );
      assert.equal(
        "gzip, identity",
        changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].newValue,
      );
      assert.equal(changeFeedEvent.data.updatedBlobProperties!["ContentEncoding"].oldValue, "gzip");

      assert.equal(
        "ContentMD5",
        changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].propertyName,
      );
      assert.equal(
        "Q2h1Y2sgSW51ZwDIAXR5IQ==",
        changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].newValue,
      );
      assert.equal(
        "Q2h1Y2sgSW=",
        changeFeedEvent.data.updatedBlobProperties!["ContentMD5"].oldValue,
      );

      assert.equal(
        "ContentDisposition",
        changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].propertyName,
      );
      assert.equal(
        "attachment",
        changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].newValue,
      );
      assert.equal(changeFeedEvent.data.updatedBlobProperties!["ContentDisposition"].oldValue, "");

      assert.equal(
        "ContentType",
        changeFeedEvent.data.updatedBlobProperties!["ContentType"].propertyName,
      );
      assert.equal(
        "application/json",
        changeFeedEvent.data.updatedBlobProperties!["ContentType"].newValue,
      );
      assert.equal(
        "application/octet-stream",
        changeFeedEvent.data.updatedBlobProperties!["ContentType"].oldValue,
      );

      assert.equal(changeFeedEvent.data.longRunningOperationInfo?.destinationAccessTier, "Hot");
      assert.isTrue(changeFeedEvent.data.longRunningOperationInfo?.isAsync);
      assert.equal(changeFeedEvent.data.longRunningOperationInfo?.copyId, "copyId");

      assert.equal(changeFeedEvent.data.updatedBlobTags?.oldTags["Tag1"], "Value1_3");
      assert.equal(changeFeedEvent.data.updatedBlobTags?.oldTags["Tag2"], "Value2_3");

      assert.equal(changeFeedEvent.data.updatedBlobTags?.newTags["Tag1"], "Value1_4");
      assert.equal(changeFeedEvent.data.updatedBlobTags?.newTags["Tag2"], "Value2_4");
    });
  },
);
