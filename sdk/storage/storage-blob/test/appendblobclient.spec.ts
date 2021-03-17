// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { record, Recorder } from "@azure/test-utils-recorder";
import * as assert from "assert";
import * as dotenv from "dotenv";

import { AppendBlobClient, ContainerClient } from "../src";
import {
  bodyToString,
  getBSU,
  getSASConnectionStringFromEnvironment,
  recorderEnvSetup
} from "./utils";

dotenv.config();

describe("AppendBlobClient", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let appendBlobClient: AppendBlobClient;

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    appendBlobClient = containerClient.getAppendBlobClient(blobName);
  });

  afterEach(async function() {
    await containerClient.delete();
    await recorder.stop();
  });

  it("create with default parameters", async () => {
    await appendBlobClient.create();
    await appendBlobClient.download(0);
  });

  it("create with parameters configured", async () => {
    const options = {
      blobHTTPHeaders: {
        blobCacheControl: "blobCacheControl",
        blobContentDisposition: "blobContentDisposition",
        blobContentEncoding: "blobContentEncoding",
        blobContentLanguage: "blobContentLanguage",
        blobContentType: "blobContentType"
      },
      metadata: {
        key1: "vala",
        key2: "valb"
      }
    };
    await appendBlobClient.create(options);
    const properties = await appendBlobClient.getProperties();
    assert.equal(properties.cacheControl, options.blobHTTPHeaders.blobCacheControl);
    assert.equal(properties.contentDisposition, options.blobHTTPHeaders.blobContentDisposition);
    assert.equal(properties.contentEncoding, options.blobHTTPHeaders.blobContentEncoding);
    assert.equal(properties.contentLanguage, options.blobHTTPHeaders.blobContentLanguage);
    assert.equal(properties.contentType, options.blobHTTPHeaders.blobContentType);
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
  });

  it("createIfNotExists", async () => {
    const res = await appendBlobClient.createIfNotExists();
    assert.ok(res.succeeded);
    assert.ok(res.etag);

    const res2 = await appendBlobClient.createIfNotExists();
    assert.ok(!res2.succeeded);
    assert.equal(res2.errorCode, "BlobAlreadyExists");
  });

  it("appendBlock", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    await appendBlobClient.appendBlock(content, content.length);

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });

  it("appendBlock with progress report", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    await appendBlobClient.appendBlock(content, content.length, {
      onProgress: () => {}
    });

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });

  it("can be created with a sas connection string", async () => {
    const newClient = new AppendBlobClient(
      getSASConnectionStringFromEnvironment(),
      containerName,
      blobName
    );

    await newClient.create();
    await newClient.download();
  });

  it("throws error if constructor containerName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new AppendBlobClient(getSASConnectionStringFromEnvironment(), "", "blobName");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for containerName and blobName parameters",
        error.message,
        "Error message is different than expected."
      );
    }
  });

  it("throws error if constructor blobName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new AppendBlobClient(getSASConnectionStringFromEnvironment(), "containerName", "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for containerName and blobName parameters",
        error.message,
        "Error message is different than expected."
      );
    }
  });

  it("appendBlock with invalid CRC64 should fail", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    let exceptionCaught = false;
    try {
      await appendBlobClient.appendBlock(content, content.length, {
        transactionalContentCrc64: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      });
    } catch (err) {
      if (
        err instanceof Error &&
        err.message.startsWith(
          "The CRC64 value specified in the request did not match with the CRC64 value calculated by the server."
        )
      ) {
        exceptionCaught = true;
      }

      assert.equal(
        err.details.errorCode,
        "Crc64Mismatch",
        "Error does not contain details property"
      );
    }

    assert.ok(exceptionCaught);
  });

  it("Seal append blob", async () => {
    await appendBlobClient.create();
    await appendBlobClient.seal();

    const properties = await appendBlobClient.getProperties();
    assert.deepStrictEqual(properties.isSealed, true);

    const response = await appendBlobClient.download(0);
    assert.deepStrictEqual(response.isSealed, true);

    for await (const item of containerClient.listBlobsFlat()) {
      assert.ok(item.properties.isSealed);
    }
  });

  it("Copy seal blob", async () => {
    await appendBlobClient.create();
    await appendBlobClient.seal();

    let destBlobClient = containerClient.getAppendBlobClient(recorder.getUniqueName("copiedblob1"));
    await (
      await destBlobClient.beginCopyFromURL(appendBlobClient.url, {
        sealBlob: false
      })
    ).pollUntilDone();
    let properties = await destBlobClient.getProperties();
    assert.deepStrictEqual(properties.isSealed, undefined);

    destBlobClient = containerClient.getAppendBlobClient(recorder.getUniqueName("copiedblob2"));
    await (await destBlobClient.beginCopyFromURL(appendBlobClient.url, {})).pollUntilDone();
    properties = await destBlobClient.getProperties();
    assert.deepStrictEqual(properties.isSealed, true);

    destBlobClient = containerClient.getAppendBlobClient(recorder.getUniqueName("copiedblob3"));
    await (
      await destBlobClient.beginCopyFromURL(appendBlobClient.url, {
        sealBlob: true
      })
    ).pollUntilDone();
    properties = await destBlobClient.getProperties();
    assert.deepStrictEqual(properties.isSealed, true);
  });
});
