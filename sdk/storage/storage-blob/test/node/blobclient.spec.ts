// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { readFileSync, unlinkSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

import { AbortController } from "@azure/abort-controller";
import { isNode, TokenCredential } from "@azure/core-http";
import { delay, record, Recorder } from "@azure-tools/test-recorder";

import {
  BlobClient,
  BlobImmutabilityPolicyMode,
  BlobSASPermissions,
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
  generateBlobSASQueryParameters,
  newPipeline,
  StorageSharedKeyCredential,
} from "../../src";
import {
  bodyToString,
  createRandomLocalFile,
  getBSU,
  getConnectionStringFromEnvironment,
  getEncryptionScope_1,
  getImmutableContainerName,
  getStorageAccessTokenWithDefaultCredential,
  getTokenBSUWithDefaultCredential,
  recorderEnvSetup,
} from "../utils";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { readStreamToLocalFileWithLogs } from "../utils/testutils.node";
import { streamToBuffer3 } from "../../src/utils/utils.node";
import { Context } from "mocha";
import { Test_CPK_INFO } from "../utils/fakeTestSecrets";

describe("BlobClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";
  const tempFolderPath = "temp";

  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
  });

  afterEach(async function () {
    await containerClient.delete();
    await recorder.stop();
  });

  before(async function () {
    if (!existsSync(tempFolderPath)) {
      mkdirSync(tempFolderPath);
    }
  });

  it("download with with default parameters", async () => {
    const result = await blobClient.download();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("download all parameters set", async () => {
    const result = await blobClient.download(0, 1, {
      rangeGetContentMD5: true,
    });
    assert.deepStrictEqual(await bodyToString(result, 1), content[0]);
  });

  it("setMetadata with new metadata set", async () => {
    const metadata = {
      a: "a",
      b: "b",
    };
    await blobClient.setMetadata(metadata);
    const result = await blobClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async () => {
    const metadata = {
      a: "a",
      b: "b",
    };
    await blobClient.setMetadata(metadata);
    const result = await blobClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);

    await blobClient.setMetadata();
    const result2 = await blobClient.getProperties();
    assert.deepStrictEqual(result2.metadata, {});
  });

  it("setHTTPHeaders with default parameters", async () => {
    await blobClient.setHTTPHeaders({});
    const result = await blobClient.getProperties();

    assert.deepStrictEqual(result.blobType, "BlockBlob");
    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
  });

  it("setHTTPHeaders with all parameters set", async () => {
    const headers = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentMD5: isNode ? Buffer.from([1, 2, 3, 4]) : new Uint8Array([1, 2, 3, 4]),
      blobContentType: "blobContentType",
    };
    await blobClient.setHTTPHeaders(headers);
    const result = await blobClient.getProperties();
    assert.ok(result.date);
    assert.deepStrictEqual(result.blobType, "BlockBlob");
    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.deepStrictEqual(result.cacheControl, headers.blobCacheControl);
    assert.deepStrictEqual(result.contentType, headers.blobContentType);
    assert.deepStrictEqual(result.contentMD5, headers.blobContentMD5);
    assert.deepStrictEqual(result.contentEncoding, headers.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, headers.blobContentLanguage);
    assert.deepStrictEqual(result.contentDisposition, headers.blobContentDisposition);
  });

  it("delete", async () => {
    await blobClient.delete();
  });

  // The following code illustrates deleting a snapshot after creating one
  it("delete snapshot", async () => {
    const result = await blobClient.createSnapshot();
    assert.ok(result.snapshot);

    const blobSnapshotClient = blobClient.withSnapshot(result.snapshot!);
    await blobSnapshotClient.getProperties();

    await blobSnapshotClient.delete();
    await blobClient.delete();

    const result2 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true,
        })
        .byPage()
        .next()
    ).value;

    // Verify that the snapshot is deleted
    assert.equal(result2.segment.blobItems!.length, 0);
  });

  it("createSnapshot", async () => {
    const result = await blobClient.createSnapshot();
    assert.ok(result.snapshot);

    const blobSnapshotClient = blobClient.withSnapshot(result.snapshot!);
    await blobSnapshotClient.getProperties();

    const result3 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true,
        })
        .byPage()
        .next()
    ).value;

    // As a snapshot doesn't have leaseStatus and leaseState properties but origin blob has,
    // let assign them to undefined both for other properties' easy comparison
    result3.segment.blobItems![0].properties.leaseState =
      result3.segment.blobItems![1].properties.leaseState = undefined;
    result3.segment.blobItems![0].properties.leaseStatus =
      result3.segment.blobItems![1].properties.leaseStatus = undefined;
    result3.segment.blobItems![0].properties.accessTier =
      result3.segment.blobItems![1].properties.accessTier = undefined;
    result3.segment.blobItems![0].properties.accessTierInferred =
      result3.segment.blobItems![1].properties.accessTierInferred = undefined;

    assert.deepStrictEqual(
      result3.segment.blobItems![0].properties,
      result3.segment.blobItems![1].properties
    );
    assert.ok(result3.segment.blobItems![0].snapshot || result3.segment.blobItems![1].snapshot);
  });

  it("syncCopyFromURL - destination encryption scope", async function (this: Context) {
    let encryptionScopeName: string;

    try {
      encryptionScopeName = getEncryptionScope_1();
    } catch {
      this.skip();
    }

    const newBlobName = recorder.getUniqueName("copiedblob");
    const newBlobClient = containerClient.getBlobClient(newBlobName);

    // Different from startCopyFromURL, syncCopyFromURL requires sourceURL includes a valid SAS
    const expiryTime = recorder.newDate("expiry");
    expiryTime.setDate(expiryTime.getDate() + 1);

    const factories = (containerClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;

    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        permissions: BlobSASPermissions.parse("racwd"),
        containerName,
        blobName,
      },
      credential
    );

    const copyURL = blobClient.url + "?" + sas;
    const result = await newBlobClient.syncCopyFromURL(copyURL, {
      encryptionScope: encryptionScopeName,
    });
    assert.ok(result.copyId);
    assert.deepStrictEqual(result.encryptionScope, encryptionScopeName);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
  });

  it("syncCopyFromURL - source SAS and destination bearer token", async function (this: Context) {
    const newBlobName = recorder.getUniqueName("copiedblob");
    const tokenBlobServiceClient = getTokenBSUWithDefaultCredential();
    const tokenNewBlobClient = tokenBlobServiceClient
      .getContainerClient(containerName)
      .getAppendBlobClient(newBlobName);
    const newBlobClient = containerClient.getBlobClient(newBlobName);

    // Different from startCopyFromURL, syncCopyFromURL requires sourceURL includes a valid SAS
    const expiryTime = recorder.newDate("expiry");
    expiryTime.setDate(expiryTime.getDate() + 1);

    const factories = (containerClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;

    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        permissions: BlobSASPermissions.parse("racwd"),
        containerName,
        blobName,
      },
      credential
    );

    const copyURL = blobClient.url + "?" + sas;
    const result = await tokenNewBlobClient.syncCopyFromURL(copyURL);
    assert.ok(result.copyId);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
  });

  it("syncCopyFromURL - destination bearer token", async function (this: Context) {
    const newBlobName = recorder.getUniqueName("copiedblob");
    const tokenBlobServiceClient = getTokenBSUWithDefaultCredential();
    const tokenNewBlobClient = tokenBlobServiceClient
      .getContainerClient(containerName)
      .getAppendBlobClient(newBlobName);
    const newBlobClient = containerClient.getBlobClient(newBlobName);

    const result = await tokenNewBlobClient.syncCopyFromURL(blobClient.url);
    assert.ok(result.copyId);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
  });

  it("syncCopyFromURL - source bearer token and destination account key", async function (this: Context) {
    const newBlobName = recorder.getUniqueName("copiedblob");
    const newBlobClient = containerClient.getBlobClient(newBlobName);

    const accessToken = await getStorageAccessTokenWithDefaultCredential();

    const result = await newBlobClient.syncCopyFromURL(blobClient.url, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken!.token,
      },
    });
    assert.ok(result.copyId);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
  });

  it("syncCopyFromURL", async () => {
    const newBlobClient = containerClient.getBlobClient(recorder.getUniqueName("copiedblob"));

    // Different from startCopyFromURL, syncCopyFromURL requires sourceURL includes a valid SAS
    const expiryTime = recorder.newDate("expiry");
    expiryTime.setDate(expiryTime.getDate() + 1);

    const factories = (containerClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;

    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        permissions: BlobSASPermissions.parse("racwd"),
        containerName,
        blobName,
      },
      credential
    );

    const copyURL = blobClient.url + "?" + sas;
    const result = await newBlobClient.syncCopyFromURL(copyURL);
    assert.ok(result.versionId);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
  });

  it("syncCopyFromURL - with COPY tags", async () => {
    const newBlobClient = containerClient.getBlobClient(recorder.getUniqueName("copiedblob"));
    await blobClient.setTags({
      tag1: "val1",
    });

    // Different from startCopyFromURL, syncCopyFromURL requires sourceURL includes a valid SAS
    const expiryTime = recorder.newDate("expiry");
    expiryTime.setDate(expiryTime.getDate() + 1);

    const factories = (containerClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;

    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        permissions: BlobSASPermissions.parse("racwdt"),
        containerName,
        blobName,
      },
      credential
    );

    const copyURL = blobClient.url + "?" + sas;
    const result = await newBlobClient.syncCopyFromURL(copyURL, {
      copySourceTags: "COPY",
    });

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    const sourceBlobTags = await blobClient.getTags();
    const destBlobTags = await newBlobClient.getTags();
    assert.deepStrictEqual(sourceBlobTags.tags, destBlobTags.tags);
  });

  it("syncCopyFromURL - with REPLACE tags", async () => {
    const newBlobClient = containerClient.getBlobClient(recorder.getUniqueName("copiedblob"));
    await blobClient.setTags({
      tag1: "val1",
    });

    // Different from startCopyFromURL, syncCopyFromURL requires sourceURL includes a valid SAS
    const expiryTime = recorder.newDate("expiry");
    expiryTime.setDate(expiryTime.getDate() + 1);

    const factories = (containerClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;

    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        permissions: BlobSASPermissions.parse("racwd"),
        containerName,
        blobName,
      },
      credential
    );

    const copyURL = blobClient.url + "?" + sas;
    const tags = {
      tag2: "val2",
    };
    const result = await newBlobClient.syncCopyFromURL(copyURL, {
      tags: tags,
      copySourceTags: "REPLACE",
    });

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    const destBlobTags = await newBlobClient.getTags();
    assert.deepStrictEqual(tags, destBlobTags.tags);
  });

  it("abortCopyFromClient should failed for a completed copy operation", async () => {
    const newBlobClient = containerClient.getBlobClient(recorder.getUniqueName("copiedblob"));
    const result = await (await newBlobClient.beginCopyFromURL(blobClient.url)).pollUntilDone();
    assert.ok(result.copyId);
    delay(1 * 1000);

    try {
      await newBlobClient.beginCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromClient should be failed and throw exception for an completed copy operation."
      );
    } catch (err: any) {
      assert.ok(err.code === "InvalidHeaderValue");
    }
  });

  it("setAccessTier set default to cool", async () => {
    await blockBlobClient.setAccessTier("Cool");
    const properties = await blockBlobClient.getProperties();
    assert.equal(properties.accessTier!.toLowerCase(), "cool");
  });

  it("setAccessTier set archive to hot", async () => {
    await blockBlobClient.setAccessTier("Archive");
    let properties = await blockBlobClient.getProperties();
    assert.equal(properties.accessTier!.toLowerCase(), "archive");

    await blockBlobClient.setAccessTier("Hot");
    properties = await blockBlobClient.getProperties();
    if (properties.archiveStatus) {
      assert.equal(properties.archiveStatus.toLowerCase(), "rehydrate-pending-to-hot");
    }
  });

  it("can be created with a url and a credential", async () => {
    const factories = (blobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new BlobClient(blobClient.url, credential);

    const metadata = {
      a: "a",
      b: "b",
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (blobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new BlobClient(blobClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });

    const metadata = {
      a: "a",
      b: "b",
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    const newClient = new BlobClient(blobClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (blobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new BlobClient(blobClient.url, pipeline);

    const metadata = {
      a: "a",
      b: "b",
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("can be created with a connection string", async () => {
    const newClient = new BlobClient(getConnectionStringFromEnvironment(), containerName, blobName);
    const metadata = {
      a: "a",
      b: "b",
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("can be created with a connection string and an option bag", async () => {
    const newClient = new BlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName,
      {
        retryOptions: {
          maxTries: 5,
        },
      }
    );
    const metadata = {
      a: "a",
      b: "b",
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("query should work", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage");
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("query should work with conditional tags", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length, { tags: { tag: "val" } });

    let exceptionCaught = false;
    try {
      await blockBlobClient.query("select * from BlobStorage", {
        conditions: { tagConditions: "tag = 'val1'" },
      });
    } catch (e: any) {
      assert.equal(e.details?.errorCode, "ConditionNotMet");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      conditions: { tagConditions: "tag = 'val'" },
    });
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("query should work with access conditions", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    const uploadResponse = await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      conditions: {
        ifModifiedSince: new Date("2010/01/01"),
        ifUnmodifiedSince: new Date("2100/01/01"),
        ifMatch: uploadResponse.etag,
        ifNoneMatch: "invalidetag",
      },
    });
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("query should not work with access conditions ifModifiedSince", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    try {
      await blockBlobClient.query("select * from BlobStorage", {
        conditions: {
          ifModifiedSince: new Date("2100/01/01"),
        },
      });
    } catch (err: any) {
      assert.deepStrictEqual(err.statusCode, 304);
      return;
    }
    assert.fail();
  });

  it("query should not work with access conditions leaseId", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    try {
      await blockBlobClient.query("select * from BlobStorage", {
        conditions: {
          leaseId: "invalid",
        },
      });
    } catch (err: any) {
      assert.deepStrictEqual(err.statusCode, 400);
      return;
    }
    assert.fail();
  });

  it("query should work with snapshot", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);
    const snapshotResponse = await blockBlobClient.createSnapshot();
    const blockBlobSnapshotClient = blockBlobClient.withSnapshot(snapshotResponse.snapshot!);

    const response = await blockBlobSnapshotClient.query("select * from BlobStorage");
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });

  it("query should work with where conditionals", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select _2 from BlobStorage where _1 > 100");
    assert.deepStrictEqual(await bodyToString(response), "250\n");
  });

  it("query should work with empty results", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select _2 from BlobStorage where _1 > 200");

    assert.deepStrictEqual(await bodyToString(response), "");
  });

  it("query should work with blob properties", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage");
    assert.deepStrictEqual(response.contentType, "avro/binary");
    assert.deepStrictEqual(typeof response.etag, "string");
    assert.deepStrictEqual(response.blobType, "BlockBlob");
    assert.deepStrictEqual(response.leaseState, "available");
    assert.deepStrictEqual(response.leaseStatus, "unlocked");
    assert.deepStrictEqual(response.acceptRanges, "bytes");
    assert.deepStrictEqual(typeof response.clientRequestId, "string");
    assert.deepStrictEqual(typeof response.requestId, "string");
    assert.deepStrictEqual(typeof response.version, "string");
    assert.deepStrictEqual(typeof response.date, "object");
  });

  it("query should work with large file", async function () {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const csvContentUnit = "100,200,300,400\n150,250,350,450\n";
    const tempFileLarge = await createRandomLocalFile(
      tempFolderPath,
      1024 * 1024,
      Buffer.from(csvContentUnit)
    );
    await blockBlobClient.uploadFile(tempFileLarge);

    const response = await blockBlobClient.query("select * from BlobStorage");

    const downloadedFile = join(tempFolderPath, recorder.getUniqueName("downloadfile."));
    await readStreamToLocalFileWithLogs(response.readableStreamBody!, downloadedFile);

    const downloadedData = await readFileSync(downloadedFile);
    const uploadedData = await readFileSync(tempFileLarge);

    unlinkSync(downloadedFile);
    unlinkSync(tempFileLarge);

    assert.ok(downloadedData.equals(uploadedData));
  });

  it("query should work with aborter", async function () {
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const csvContentUnit = "100,200,300,400\n150,250,350,450\n";
    const tempFileLarge = await createRandomLocalFile(
      tempFolderPath,
      1024 * 256 * 2,
      Buffer.from(csvContentUnit)
    );
    await blockBlobClient.uploadFile(tempFileLarge);

    const aborter = new AbortController();
    const response = await blockBlobClient.query("select * from BlobStorage", {
      abortSignal: aborter.signal,
      onProgress: () => {
        // Abort parse when first progress event trigger (by default 4MB)
        aborter.abort();
      },
    });

    const downloadedFile = join(tempFolderPath, recorder.getUniqueName("downloadfile."));

    try {
      await readStreamToLocalFileWithLogs(response.readableStreamBody!, downloadedFile);
    } catch (error: any) {
      assert.deepStrictEqual(error.name, "AbortError");
      unlinkSync(downloadedFile);
      unlinkSync(tempFileLarge);
      return;
    }

    unlinkSync(downloadedFile);
    unlinkSync(tempFileLarge);
    assert.fail();
  });

  it("query should work with progress event", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    await new Promise<void>((resolve, reject) => {
      blockBlobClient
        .query("select * from BlobStorage", {
          onProgress: (progress) => {
            assert.deepStrictEqual(progress.loadedBytes, csvContent.length);
            resolve();
          },
        })
        .then((response) => {
          return bodyToString(response);
        })
        .then((_data) => {
          return;
        })
        .catch(reject);
    });
  });

  it("query should work with fatal error event", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      inputTextConfiguration: {
        kind: "json",
        recordSeparator: "\n",
      },
      onError: (err) => {
        assert.deepStrictEqual(err.isFatal, true);
        assert.deepStrictEqual(err.name, "ParseError");
        assert.deepStrictEqual(err.position, 0);
        assert.ok(
          err.description.startsWith(
            "Unexpected token ',' at [byte: 3]. Expecting tokens '{', or '['."
          )
        );
        return;
      },
    });
    assert.deepStrictEqual(await bodyToString(response), "\n");
  });

  it("query should work with non fatal error event", async function () {
    const csvContent = "100,hello,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select _2 from BlobStorage where _2 > 100", {
      onError: (err) => {
        assert.deepStrictEqual(err.isFatal, false);
        assert.deepStrictEqual(err.name, "InvalidTypeConversion");
        assert.deepStrictEqual(err.position, 0);
        assert.deepStrictEqual(err.description, "Invalid type conversion.");
        return;
      },
    });
    assert.deepStrictEqual(await bodyToString(response), "250\n");
  });

  it("query should work with CSV input and output configurations", async function () {
    const csvContent = "100.200.300.400!150.250.350.450!180.280.380.480!";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select _1 from BlobStorage", {
      inputTextConfiguration: {
        kind: "csv",
        recordSeparator: "!",
        columnSeparator: ".",
        // escapeCharacter: "\\", // What does this do?
        // fieldQuote: '"', // What does this do?
        hasHeaders: true,
      },
      outputTextConfiguration: {
        kind: "csv",
        recordSeparator: "!",
        columnSeparator: ".",
        // escapeCharacter: "\\",
        // fieldQuote: '"',
        hasHeaders: false,
      },
    });
    assert.deepStrictEqual(await bodyToString(response), "150!180!");
  });

  it("query should work with JSON input and output configurations", async function () {
    const recordSeparator = "\n";
    const jsonContent =
      [
        JSON.stringify({ _1: "100", _2: "200", _3: "300", _4: "400" }),
        JSON.stringify({ _1: "150", _2: "250", _3: "350", _4: "450" }),
        JSON.stringify({ _1: "180", _2: "280", _3: "380", _4: "480" }),
      ].join(recordSeparator) + recordSeparator;
    await blockBlobClient.upload(jsonContent, jsonContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      inputTextConfiguration: {
        kind: "json",
        recordSeparator,
      },
      outputTextConfiguration: {
        kind: "json",
        recordSeparator,
      },
    });
    assert.deepStrictEqual(await bodyToString(response), jsonContent);
  });

  it("query should work with arrow output configurations", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    const response = await blockBlobClient.query("select * from BlobStorage", {
      outputTextConfiguration: {
        kind: "arrow",
        schema: [
          {
            type: "decimal",
            name: "name",
            precision: 4,
            scale: 2,
          },
        ],
      },
    });
    assert.equal(
      (await streamToBuffer3(response.readableStreamBody!)).toString("hex"),
      "ffffffff800000001000000000000a000c000600050008000a000000000104000c000000080008000000040008000000040000000100000014000000100014000800060007000c0000001000100000000000010710000000200000000400000000000000040000006e616d650000000008000c000400080008000000040000000200000000000000ffffffff700000001000000000000a000e000600050008000a000000000304001000000000000a000c000000040008000a0000003000000004000000020000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000"
    );
  });

  it("query should work with arrow output configurations for timestamp[ms]", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length);

    await blockBlobClient.query("select * from BlobStorage", {
      outputTextConfiguration: {
        kind: "arrow",
        schema: [
          {
            type: "timestamp[ms]",
          },
        ],
      },
    });
  });

  it("query should work with Parquet input configuration", async function (this: Context) {
    // Enable the case when STG78 - version 2020-10-02 features is enabled in production.
    this.skip();
    const parquetFilePath = join("test", "resources", "parquet.parquet");
    await blockBlobClient.uploadFile(parquetFilePath);

    const response = await blockBlobClient.query("select * from blobstorage where id < 1;", {
      inputTextConfiguration: {
        kind: "parquet",
      },
    });

    assert.deepStrictEqual(await bodyToString(response), "0,mdifjt55.ea3,mdifjt55.ea3\n");
  });

  it("query with CPK", async function () {
    const csvContent = "100,200,300,400\n150,250,350,450\n";
    await blockBlobClient.upload(csvContent, csvContent.length, {
      customerProvidedKey: Test_CPK_INFO,
    });

    const response = await blockBlobClient.query("select * from BlobStorage", {
      customerProvidedKey: Test_CPK_INFO,
    });
    assert.deepStrictEqual(await bodyToString(response), csvContent);
  });
});

describe("BlobClient Node.js Only - ImmutabilityPolicy", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  const content = "Hello World";

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    try {
      containerName = getImmutableContainerName();
    } catch {
      this.skip();
    }
    containerClient = blobServiceClient.getContainerClient(containerName);
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      const listResult = (
        await containerClient
          .listBlobsFlat({
            includeImmutabilityPolicy: true,
          })
          .byPage()
          .next()
      ).value;

      for (let i = 0; i < listResult.segment.blobItems!.length; ++i) {
        const deleteBlobClient = containerClient.getBlobClient(
          listResult.segment.blobItems[i].name
        );
        await deleteBlobClient.setLegalHold(false);
        await deleteBlobClient.deleteImmutabilityPolicy();
        await deleteBlobClient.delete();
      }
      await recorder.stop();
    }
  });

  it("Blob syncCopyFromURL with immutability policy", async () => {
    const sourceName = recorder.getUniqueName("blobsource");
    const sourceBlobClient = containerClient.getBlockBlobClient(sourceName);
    await sourceBlobClient.upload(content, content.length);

    const aDayLater = recorder.newDate("aDayLater");
    aDayLater.setDate(aDayLater.getDate() + 1);

    const sourceUrl = await sourceBlobClient.generateSasUrl({
      permissions: BlobSASPermissions.parse("r"),
      expiresOn: aDayLater,
    });

    const minutesLater = recorder.newDate("minutesLater");
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);
    await blobClient.syncCopyFromURL(sourceUrl, {
      immutabilityPolicy: {
        expiriesOn: minutesLater,
        policyMode: "Unlocked",
      },
    });

    const properties = await blobClient.getProperties();
    assert.ok(properties.immutabilityPolicyExpiresOn);
    assert.equal(
      properties.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined
    );
  });

  it("Blob syncCopyFromURL with legalhold", async () => {
    const sourceName = recorder.getUniqueName("blobsource");
    const sourceBlobClient = containerClient.getBlockBlobClient(sourceName);
    await sourceBlobClient.upload(content, content.length);

    const aDayLater = recorder.newDate("aDayLater");
    aDayLater.setDate(aDayLater.getDate() + 1);

    const sourceUrl = await sourceBlobClient.generateSasUrl({
      permissions: BlobSASPermissions.parse("r"),
      expiresOn: aDayLater,
    });

    await blobClient.syncCopyFromURL(sourceUrl, {
      legalHold: true,
    });

    const properties = await blobClient.getProperties();
    assert.ok(properties.legalHold);
  });
});
