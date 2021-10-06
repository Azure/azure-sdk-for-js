// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as zlib from "zlib";

import {
  base64encode,
  bodyToString,
  genearteRandomUint8Array,
  getBSU,
  getConnectionStringFromEnvironment,
  getTokenBSU,
  getTokenCredential,
  recorderEnvSetup
} from "../utils";
import {
  BlockBlobClient,
  newPipeline,
  StorageSharedKeyCredential,
  BlobClient,
  ContainerClient,
  BlobServiceClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions
} from "../../src";
import { TokenCredential } from "@azure/core-http";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { isPlaybackMode, record, Recorder } from "@azure-tools/test-recorder";
import { streamToBuffer3 } from "../../src/utils/utils.node";
import * as crypto from "crypto";
import { BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES } from "../../src/utils/constants";
import { Context } from "mocha";

describe("BlockBlobClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function(this: Context) {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await containerClient.delete();
      await recorder.stop();
    }
  });

  it("upload with Readable stream body and default parameters", async () => {
    const body: string = recorder.getUniqueName("randomstring");
    const bodyBuffer = Buffer.from(body);

    await blockBlobClient.upload(bodyBuffer, body.length);
    const result = await blobClient.download(0);

    const downloadedBody = await new Promise((resolve, reject) => {
      const buffer: string[] = [];
      result.readableStreamBody!.on("data", (data: Buffer) => {
        buffer.push(data.toString());
      });
      result.readableStreamBody!.on("end", () => {
        resolve(buffer.join(""));
      });
      result.readableStreamBody!.on("error", reject);
    });

    assert.deepStrictEqual(downloadedBody, body);
  });

  it("upload with Chinese string body and default parameters", async () => {
    const body: string = recorder.getUniqueName("randomstring你好");
    await blockBlobClient.upload(body, Buffer.byteLength(body));
    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, Buffer.byteLength(body)), body);
  });

  it("can be created with a url and a credential", async () => {
    const factories = (blockBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new BlockBlobClient(blockBlobClient.url, credential);

    const body: string = recorder.getUniqueName("randomstring");
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const factories = (blockBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new BlockBlobClient(blockBlobClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    const body: string = recorder.getUniqueName("randomstring");
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345
        })
    };
    const newClient = new BlockBlobClient(blockBlobClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = (blockBlobClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new BlockBlobClient(blockBlobClient.url, pipeline);

    const body: string = recorder.getUniqueName("randomstring");
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a connection string", async () => {
    const newClient = new BlockBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName
    );

    const body: string = recorder.getUniqueName("randomstring");
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a connection string and an option bag", async () => {
    const newClient = new BlockBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName,
      {
        retryOptions: {
          maxTries: 5
        }
      }
    );

    const body: string = recorder.getUniqueName("randomstring");
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("should not decompress during downloading", async () => {
    const body: string = "hello world body string!";
    const deflated = zlib.deflateSync(body);

    await blockBlobClient.upload(deflated, deflated.byteLength, {
      blobHTTPHeaders: {
        blobContentEncoding: "deflate",
        blobContentType: "text/plain"
      }
    });

    const downloaded = await blockBlobClient.downloadToBuffer();
    assert.deepStrictEqual(downloaded, deflated);
  });
});

describe("syncUploadFromURL", () => {
  let recorder: Recorder;
  let containerClient: ContainerClient;
  let sourceBlob: BlockBlobClient;
  let sourceBlobURLWithSAS: string;
  let blockBlobClient: BlockBlobClient;
  let largeContent: Uint8Array;
  let srcEtag: string | undefined;

  const content = "Hello World";
  const srcHttpHeaders = {
    blobCacheControl: "blobCacheControl",
    blobContentDisposition: "blobContentDisposition",
    blobContentEncoding: "blobContentEncoding",
    blobContentLanguage: "blobContentLanguage",
    blobContentType: "blobContentType"
  };

  before(async function() {
    largeContent = genearteRandomUint8Array(BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES);
  });

  beforeEach(async function(this: Context) {
    recorder = record(this, recorderEnvSetup);
    const blobServiceClient = getBSU();
    const containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const blobName = recorder.getUniqueName("blockblob");
    blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // generate source blob SAS
    const srcBlobName = recorder.getUniqueName("srcblob/%2+%2F");
    sourceBlob = containerClient.getBlockBlobClient(srcBlobName);
    const uploadSrcRes = await sourceBlob.upload(content, content.length, {
      blobHTTPHeaders: srcHttpHeaders
    });
    srcEtag = uploadSrcRes.etag;

    const expiryTime = recorder.newDate("expiry");
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        permissions: BlobSASPermissions.parse("r"),
        containerName,
        blobName: srcBlobName
      },
      sourceBlob.credential as StorageSharedKeyCredential
    );
    sourceBlobURLWithSAS = sourceBlob.url + "?" + sas;
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await containerClient.delete();
      await recorder.stop();
    }
  });

  it("stageBlockFromURL - source SAS and destination bearer token", async function(this: Context) {
    if (!isPlaybackMode()) {
      // Enable this when STG78 - version 2020-10-02 is enabled on production.
      this.skip();
    }
    const stokenBlobServiceClient = getTokenBSU();
    const tokenNewBlockBlobClient = stokenBlobServiceClient
      .getContainerClient(containerClient.containerName)
      .getBlockBlobClient(blockBlobClient.name);

    await tokenNewBlockBlobClient.stageBlockFromURL(
      base64encode("1"),
      sourceBlobURLWithSAS,
      0,
      content.length
    );
    await tokenNewBlockBlobClient.stageBlockFromURL(
      base64encode("2"),
      sourceBlobURLWithSAS,
      0,
      content.length
    );

    await blockBlobClient.commitBlockList([base64encode("1"), base64encode("2")]);
    const listResponse = await blockBlobClient.getBlockList("committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, content.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, content.length);
  });

  it("stageBlockFromURL - source bear token and destination account key", async function(this: Context) {
    if (!isPlaybackMode()) {
      // Enable this when STG78 - version 2020-10-02 is enabled on production.
      this.skip();
    }
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const tokenCredential = getTokenCredential();
    const accessToken = await tokenCredential.getToken([]);

    const newBlockBlobClient = containerClient.getBlockBlobClient(
      recorder.getUniqueName("newblockblob")
    );

    await newBlockBlobClient.stageBlockFromURL(
      base64encode("1"),
      blockBlobClient.url,
      0,
      body.length,
      {
        sourceAuthorization: {
          scheme: "Bearer",
          value: accessToken!.token
        }
      }
    );

    await newBlockBlobClient.stageBlockFromURL(
      base64encode("2"),
      blockBlobClient.url,
      0,
      body.length,
      {
        sourceAuthorization: {
          scheme: "Bearer",
          value: accessToken!.token
        }
      }
    );

    await newBlockBlobClient.commitBlockList([base64encode("1"), base64encode("2")]);
    const listResponse = await newBlockBlobClient.getBlockList("committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);
  });

  it("stageBlockFromURL - destination bearer token", async function(this: Context) {
    if (!isPlaybackMode()) {
      // Enable this when STG78 - version 2020-10-02 is enabled on production.
      this.skip();
    }
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const tokenCredential = getTokenCredential();
    const accessToken = await tokenCredential.getToken([]);

    const stokenBlobServiceClient = getTokenBSU();
    const newBlobName = recorder.getUniqueName("newblockblob");
    const newBlockBlobClient = containerClient.getBlockBlobClient(newBlobName);
    const tokenNewBlockBlobClient = stokenBlobServiceClient
      .getContainerClient(containerClient.containerName)
      .getBlockBlobClient(newBlobName);

    await tokenNewBlockBlobClient.stageBlockFromURL(
      base64encode("1"),
      blockBlobClient.url,
      0,
      body.length,
      {
        sourceAuthorization: {
          scheme: "Bearer",
          value: accessToken!.token
        }
      }
    );

    await tokenNewBlockBlobClient.stageBlockFromURL(
      base64encode("2"),
      blockBlobClient.url,
      0,
      body.length,
      {
        sourceAuthorization: {
          scheme: "Bearer",
          value: accessToken!.token
        }
      }
    );

    await newBlockBlobClient.commitBlockList([base64encode("1"), base64encode("2")]);
    const listResponse = await newBlockBlobClient.getBlockList("committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);
  });

  it("syncUploadFromURL - source SAS and destination bearer token", async function(this: Context) {
    if (!isPlaybackMode()) {
      // Enable this when STG78 - version 2020-10-02 is enabled on production.
      this.skip();
    }
    const stokenBlobServiceClient = getTokenBSU();
    const tokenNewBlockBlobClient = stokenBlobServiceClient
      .getContainerClient(containerClient.containerName)
      .getBlockBlobClient(blockBlobClient.name);

    await tokenNewBlockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS);

    // Validate source and destination blob content match.
    const downloadRes = await blockBlobClient.download();
    const downloadBuffer = await streamToBuffer3(downloadRes.readableStreamBody!);
    assert.ok(downloadBuffer.compare(Buffer.from(content)) === 0);
  });

  it("syncUploadFromURL - source bear token and destination account key", async function(this: Context) {
    if (!isPlaybackMode()) {
      // Enable this when STG78 - version 2020-10-02 is enabled on production.
      this.skip();
    }
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const tokenCredential = getTokenCredential();
    const accessToken = await tokenCredential.getToken([]);

    const newBlockBlobClient = containerClient.getBlockBlobClient(
      recorder.getUniqueName("newblockblob")
    );

    await newBlockBlobClient.syncUploadFromURL(blockBlobClient.url, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken!.token
      }
    });

    // Validate source and destination blob content match.
    const downloadRes = await newBlockBlobClient.download();
    assert.equal(await bodyToString(downloadRes, body.length), body);
    assert.equal(downloadRes.contentLength!, body.length);
  });

  it("syncUploadFromURL - destination bearer token", async function(this: Context) {
    if (!isPlaybackMode()) {
      // Enable this when STG78 - version 2020-10-02 is enabled on production.
      this.skip();
    }
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const tokenCredential = getTokenCredential();
    const accessToken = await tokenCredential.getToken([]);

    const stokenBlobServiceClient = getTokenBSU();
    const newBlobName = recorder.getUniqueName("newblockblob");
    const newBlockBlobClient = containerClient.getBlockBlobClient(newBlobName);
    const tokenNewBlockBlobClient = stokenBlobServiceClient
      .getContainerClient(containerClient.containerName)
      .getBlockBlobClient(newBlobName);

    await tokenNewBlockBlobClient.syncUploadFromURL(blockBlobClient.url, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken!.token
      }
    });

    // Validate source and destination blob content match.
    const downloadRes = await newBlockBlobClient.download();
    assert.equal(await bodyToString(downloadRes, body.length), body);
    assert.equal(downloadRes.contentLength!, body.length);
  });

  it("with default options", async () => {
    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS);

    // Validate source and destination blob content match.
    const downloadRes = await blockBlobClient.download();
    const downloadBuffer = await streamToBuffer3(downloadRes.readableStreamBody!);
    assert.ok(downloadBuffer.compare(Buffer.from(content)) === 0);

    // Validate source and desintation BlobHttpHeaders match.
    assert.deepStrictEqual(downloadRes.cacheControl, srcHttpHeaders.blobCacheControl);
    assert.deepStrictEqual(downloadRes.contentDisposition, srcHttpHeaders.blobContentDisposition);
    assert.deepStrictEqual(downloadRes.contentEncoding, srcHttpHeaders.blobContentEncoding);
    assert.deepStrictEqual(downloadRes.contentLanguage, srcHttpHeaders.blobContentLanguage);
    assert.deepStrictEqual(downloadRes.contentType, srcHttpHeaders.blobContentType);
  });

  it("set some of the properties on the request", async () => {
    const blobHTTPHeaders = {
      blobContentLanguage: "blobContentLanguage1",
      blobContentType: "blobContentType1"
    };

    const tags = {
      tag1: "val1"
    };
    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, { blobHTTPHeaders, tags });

    // Validate source and destination blob content match.
    const downloadRes = await blockBlobClient.download();
    const downloadBuffer = await streamToBuffer3(downloadRes.readableStreamBody!);
    assert.ok(downloadBuffer.compare(Buffer.from(content)) === 0);

    // Validate BlobHttpHeaders merged.
    assert.deepStrictEqual(downloadRes.cacheControl, srcHttpHeaders.blobCacheControl);
    assert.deepStrictEqual(downloadRes.contentDisposition, srcHttpHeaders.blobContentDisposition);
    assert.deepStrictEqual(downloadRes.contentEncoding, srcHttpHeaders.blobContentEncoding);
    assert.deepStrictEqual(downloadRes.contentLanguage, blobHTTPHeaders.blobContentLanguage);
    assert.deepStrictEqual(downloadRes.contentType, blobHTTPHeaders.blobContentType);

    // Validate tags set correctly
    const getTagsRes = await blockBlobClient.getTags();
    assert.deepStrictEqual(getTagsRes.tags, tags);
  });

  it("copySourceBlobProperties = false", async () => {
    const blobHTTPHeaders = {
      blobContentLanguage: "blobContentLanguage1",
      blobContentType: "blobContentType1"
    };

    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
      blobHTTPHeaders,
      copySourceBlobProperties: false
    });

    // Validate source and destination blob content match.
    const downloadRes = await blockBlobClient.download();
    const downloadBuffer = await streamToBuffer3(downloadRes.readableStreamBody!);
    assert.ok(downloadBuffer.compare(Buffer.from(content)) === 0);

    // Validate BlobHttpHeaders merged.
    assert.deepStrictEqual(downloadRes.cacheControl, undefined);
    assert.deepStrictEqual(downloadRes.contentDisposition, undefined);
    assert.deepStrictEqual(downloadRes.contentEncoding, undefined);
    assert.deepStrictEqual(downloadRes.contentLanguage, blobHTTPHeaders.blobContentLanguage);
    assert.deepStrictEqual(downloadRes.contentType, blobHTTPHeaders.blobContentType);
  });

  it("destination conditon", async () => {
    // upload to dest blob first
    const hello = "hello";
    await blockBlobClient.upload(hello, hello.length);
    const getRes = await blockBlobClient.getProperties();

    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
      conditions: {
        ifMatch: getRes.etag
      }
    });

    try {
      await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
        conditions: {
          ifMatch: '"invalidetag"'
        }
      });
      assert.fail("Should have failed with unmet condition.");
    } catch (err) {
      assert.deepStrictEqual(err.code, "TargetConditionNotMet");
    }
  });

  it("source conditon", async () => {
    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
      sourceConditions: {
        ifMatch: srcEtag
      }
    });

    try {
      await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
        sourceConditions: {
          ifMatch: '"invalidetag"'
        }
      });
      assert.fail("Should have failed with unmet condition.");
    } catch (err) {
      assert.deepStrictEqual(err.code, "SourceConditionNotMet");
    }
  });

  it("sourceContentMD5", async () => {
    const sourceContentMD5 = crypto
      .createHash("md5")
      .update(Buffer.from(content))
      .digest();
    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
      sourceContentMD5
    });

    try {
      const invalidMD5 = crypto
        .createHash("md5")
        .update("hello")
        .digest();
      await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
        sourceContentMD5: invalidMD5
      });
      assert.fail("Should have failed with unmet condition.");
    } catch (err) {
      assert.deepStrictEqual(err.code, "Md5Mismatch");
    }
  });

  it("large content", async () => {
    recorder.skip(
      undefined,
      "recording file too large, exceeds GitHub's file size limit of 100.00 MB"
    );
    await sourceBlob.uploadData(largeContent);
    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS);
  }).timeout(10 * 60 * 1000);

  it("large content with timeout", async () => {
    recorder.skip(
      undefined,
      "recording file too large, exceeds GitHub's file size limit of 100.00 MB"
    );
    await sourceBlob.uploadData(largeContent);

    let exceptionCaught = false;
    try {
      await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
        timeoutInSeconds: 1
      });
    } catch (err) {
      assert.deepStrictEqual(err.code, "OperationTimedOut");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  }).timeout(10 * 60 * 1000);
});
