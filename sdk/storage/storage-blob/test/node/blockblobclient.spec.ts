// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as zlib from "zlib";

import {
  SimpleTokenCredential,
  base64encode,
  bodyToString,
  configureBlobStorageClient,
  generateRandomUint8Array,
  getBSU,
  getConnectionStringFromEnvironment,
  getStorageAccessTokenWithDefaultCredential,
  getTokenBSUWithDefaultCredential,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "../utils";
import {
  BlockBlobClient,
  newPipeline,
  StorageSharedKeyCredential,
  BlobClient,
  ContainerClient,
  BlobServiceClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  getBlobServiceAccountAudience,
} from "../../src";
import { TokenCredential } from "@azure/core-auth";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { streamToBuffer3 } from "../../src/utils/utils.node";
import * as crypto from "crypto";
import { BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES } from "../../src/utils/constants";
import { Context } from "mocha";
import { DefaultAzureCredential } from "@azure/identity";

describe("BlockBlobClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let recorder: Recorder;

  let blobServiceClient: BlobServiceClient;
  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.variable("blob", getUniqueName("blob"));
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
  });

  afterEach(async function (this: Context) {
    if (containerClient) {
      await containerClient.delete();
    }
    await recorder.stop();
  });

  it("Default audience should work", async () => {
    await blockBlobClient.upload("Hello", 5);
    const blockBlobClientWithOAuthToken = new BlockBlobClient(
      blockBlobClient.url,
      new DefaultAzureCredential()
    );
    const exist = await blockBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Customized audience should work", async () => {
    await blockBlobClient.upload("Hello", 5);
    const blockBlobClientWithOAuthToken = new BlockBlobClient(
      blockBlobClient.url,
      new DefaultAzureCredential(),
      {
        audience: [getBlobServiceAccountAudience(blobServiceClient.accountName)],
      }
    );
    const exist = await blockBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Bearer token challenge should work", async () => {
    await blockBlobClient.upload("Hello", 5);

    // Validate that bad audience should fail first.
    const authToken = await new DefaultAzureCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default"
    );
    const blockBlobClientWithPlainOAuthToken = new BlockBlobClient(
      blockBlobClient.url,
      new SimpleTokenCredential(authToken.token)
    );

    try {
      await blockBlobClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const blockBlobClientWithOAuthToken = new BlockBlobClient(
      blockBlobClient.url,
      new DefaultAzureCredential(),
      {
        audience: ["https://badaudience.blob.core.windows.net/.default"],
      }
    );
    const exist = await blockBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("upload with Readable stream body and default parameters", async () => {
    const body: string = recorder.variable("randomstring", getUniqueName("randomstring"));
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

  it("upload with Chinese string body and default parameters", async function () {
    const body: string = recorder.variable("randomstring你好", getUniqueName("randomstring你好"));
    await blockBlobClient.upload(body, Buffer.byteLength(body));
    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, Buffer.byteLength(body)), body);
  });

  it("can be created with a url and a credential", async function () {
    const credential = (blockBlobClient as any).credential as StorageSharedKeyCredential;
    const newClient = new BlockBlobClient(blockBlobClient.url, credential);
    configureBlobStorageClient(recorder, newClient);

    const body: string = recorder.variable("randomstring", getUniqueName("randomstring"));
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a url and a credential and an option bag", async function () {
    const credential = (blockBlobClient as any).credential as StorageSharedKeyCredential;
    const newClient = new BlockBlobClient(blockBlobClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureBlobStorageClient(recorder, newClient);

    const body: string = recorder.variable("randomstring", getUniqueName("randomstring"));
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a url and a TokenCredential", async function () {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345,
        }),
    };
    const newClient = new BlockBlobClient(blockBlobClient.url, tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });

  it("can be created with a url and a pipeline", async function () {
    const credential = (blockBlobClient as any).credential as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new BlockBlobClient(blockBlobClient.url, pipeline);
    configureBlobStorageClient(recorder, newClient);

    const body: string = recorder.variable("randomstring", getUniqueName("randomstring"));
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a connection string", async function () {
    const newClient = new BlockBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName,
    );
    configureBlobStorageClient(recorder, newClient);

    const body: string = recorder.variable("randomstring", getUniqueName("randomstring"));
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a connection string and an option bag", async function () {
    const newClient = new BlockBlobClient(
      getConnectionStringFromEnvironment(),
      containerName,
      blobName,
      {
        retryOptions: {
          maxTries: 5,
        },
      },
    );
    configureBlobStorageClient(recorder, newClient);

    const body: string = recorder.variable("randomstring", getUniqueName("randomstring"));
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("should not decompress during downloading", async function () {
    // recorder doesn't save binary payload correctly
    if (!isLiveMode()) {
      this.skip();
    }
    const body: string = "hello world body string!";
    const deflated = zlib.deflateSync(body);

    await blockBlobClient.upload(deflated, deflated.byteLength, {
      blobHTTPHeaders: {
        blobContentEncoding: "deflate",
        blobContentType: "text/plain",
      },
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
    blobContentType: "blobContentType",
  };

  before(async function () {
    largeContent = generateRandomUint8Array(BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES);
  });

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        uriSanitizers,
        removeHeaderSanitizer: {
          headersForRemoval: [
            "x-ms-copy-source",
            "x-ms-copy-source-authorization",
            "x-ms-encryption-key",
          ],
        },
      },
      ["playback", "record"],
    );
    const blobServiceClient = getBSU(recorder);
    const containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const blobName = recorder.variable("blockblob", getUniqueName("blockblob"));
    blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // generate source blob SAS

    const srcBlobName = recorder.variable("srcblob/%2+%2F", getUniqueName("srcblob/%2+%2F"));
    sourceBlob = containerClient.getBlockBlobClient(srcBlobName);
    const uploadSrcRes = await sourceBlob.upload(content, content.length, {
      blobHTTPHeaders: srcHttpHeaders,
    });
    srcEtag = uploadSrcRes.etag;

    const expiryTime = new Date(recorder.variable("expiry", new Date().toISOString()));
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        permissions: BlobSASPermissions.parse("r"),
        containerName,
        blobName: srcBlobName,
      },
      sourceBlob.credential as StorageSharedKeyCredential,
    );
    sourceBlobURLWithSAS = sourceBlob.url + "?" + sas;
  });

  afterEach(async function (this: Context) {
    if (containerClient) {
      await containerClient.delete();
    }
    await recorder.stop();
  });

  it("stageBlockFromURL - source SAS and destination bearer token", async function (this: Context) {
    const stokenBlobServiceClient = getTokenBSUWithDefaultCredential(recorder);
    const tokenNewBlockBlobClient = stokenBlobServiceClient
      .getContainerClient(containerClient.containerName)
      .getBlockBlobClient(blockBlobClient.name);

    await tokenNewBlockBlobClient.stageBlockFromURL(
      base64encode("1"),
      sourceBlobURLWithSAS,
      0,
      content.length,
    );
    await tokenNewBlockBlobClient.stageBlockFromURL(
      base64encode("2"),
      sourceBlobURLWithSAS,
      0,
      content.length,
    );

    await blockBlobClient.commitBlockList([base64encode("1"), base64encode("2")]);
    const listResponse = await blockBlobClient.getBlockList("committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, content.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, content.length);
  });

  it("stageBlockFromURL - source bear token and destination account key", async function (this: Context) {
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const accessToken = await getStorageAccessTokenWithDefaultCredential();

    const newBlockBlobClient = containerClient.getBlockBlobClient(
      recorder.variable("newblockblob", getUniqueName("newblockblob")),
    );

    await newBlockBlobClient.stageBlockFromURL(
      base64encode("1"),
      blockBlobClient.url,
      0,
      body.length,
      {
        sourceAuthorization: {
          scheme: "Bearer",
          value: accessToken!.token,
        },
      },
    );

    await newBlockBlobClient.stageBlockFromURL(
      base64encode("2"),
      blockBlobClient.url,
      0,
      body.length,
      {
        sourceAuthorization: {
          scheme: "Bearer",
          value: accessToken!.token,
        },
      },
    );

    await newBlockBlobClient.commitBlockList([base64encode("1"), base64encode("2")]);
    const listResponse = await newBlockBlobClient.getBlockList("committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);
  });

  it("stageBlockFromURL - destination bearer token", async function (this: Context) {
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const accessToken = await getStorageAccessTokenWithDefaultCredential();

    const stokenBlobServiceClient = getTokenBSUWithDefaultCredential(recorder);
    const newBlobName = recorder.variable("newblockblob", getUniqueName("newblockblob"));
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
          value: accessToken!.token,
        },
      },
    );

    await tokenNewBlockBlobClient.stageBlockFromURL(
      base64encode("2"),
      blockBlobClient.url,
      0,
      body.length,
      {
        sourceAuthorization: {
          scheme: "Bearer",
          value: accessToken!.token,
        },
      },
    );

    await newBlockBlobClient.commitBlockList([base64encode("1"), base64encode("2")]);
    const listResponse = await newBlockBlobClient.getBlockList("committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);
  });

  it("syncUploadFromURL - source SAS and destination bearer token", async function (this: Context) {
    const stokenBlobServiceClient = getTokenBSUWithDefaultCredential(recorder);
    const tokenNewBlockBlobClient = stokenBlobServiceClient
      .getContainerClient(containerClient.containerName)
      .getBlockBlobClient(blockBlobClient.name);

    await tokenNewBlockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS);

    // Validate source and destination blob content match.
    const downloadRes = await blockBlobClient.download();
    const downloadBuffer = await streamToBuffer3(downloadRes.readableStreamBody!);
    assert.ok(downloadBuffer.compare(Buffer.from(content)) === 0);
  });

  it("syncUploadFromURL - source bear token and destination account key", async function (this: Context) {
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const accessToken = await getStorageAccessTokenWithDefaultCredential();

    const newBlockBlobClient = containerClient.getBlockBlobClient(
      recorder.variable("newblockblob", getUniqueName("newblockblob")),
    );

    await newBlockBlobClient.syncUploadFromURL(blockBlobClient.url, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken!.token,
      },
    });

    // Validate source and destination blob content match.
    const downloadRes = await newBlockBlobClient.download();
    assert.equal(await bodyToString(downloadRes, body.length), body);
    assert.equal(downloadRes.contentLength!, body.length);
  });

  it("syncUploadFromURL - destination bearer token", async function (this: Context) {
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const accessToken = await getStorageAccessTokenWithDefaultCredential();

    const stokenBlobServiceClient = getTokenBSUWithDefaultCredential(recorder);
    const newBlobName = recorder.variable("newblockblob", getUniqueName("newblockblob"));
    const newBlockBlobClient = containerClient.getBlockBlobClient(newBlobName);
    const tokenNewBlockBlobClient = stokenBlobServiceClient
      .getContainerClient(containerClient.containerName)
      .getBlockBlobClient(newBlobName);

    await tokenNewBlockBlobClient.syncUploadFromURL(blockBlobClient.url, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken!.token,
      },
    });

    // Validate source and destination blob content match.
    const downloadRes = await newBlockBlobClient.download();
    assert.equal(await bodyToString(downloadRes, body.length), body);
    assert.equal(downloadRes.contentLength!, body.length);
  });

  it("with default options", async function () {
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

  it("set some of the properties on the request", async function () {
    const blobHTTPHeaders = {
      blobContentLanguage: "blobContentLanguage1",
      blobContentType: "blobContentType1",
    };

    const tags = {
      tag1: "val1",
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

  it("syncUploadFromURL - with COPY tags", async () => {
    const tags = {
      tag1: "val1",
    };
    await sourceBlob.setTags(tags);
    const expiryTime = new Date(recorder.variable("tagtestexpiry", new Date().toISOString()));
    expiryTime.setDate(expiryTime.getDate() + 1);
    const sas = generateBlobSASQueryParameters(
      {
        expiresOn: expiryTime,
        permissions: BlobSASPermissions.parse("rt"),
        containerName: sourceBlob.containerName,
        blobName: sourceBlob.name,
      },
      sourceBlob.credential as StorageSharedKeyCredential,
    );
    const urlWithSAS = sourceBlob.url + "?" + sas;
    await blockBlobClient.syncUploadFromURL(urlWithSAS, { copySourceTags: "COPY" });

    // Validate source and destination blob content match.
    const downloadRes = await blockBlobClient.download();
    const downloadBuffer = await streamToBuffer3(downloadRes.readableStreamBody!);
    assert.ok(downloadBuffer.compare(Buffer.from(content)) === 0);

    // Validate tags set correctly
    const getTagsRes = await blockBlobClient.getTags();
    assert.deepStrictEqual(getTagsRes.tags, tags);
  });

  it("syncUploadFromURL - with REPLACE tags", async () => {
    await sourceBlob.setTags({
      tag1: "val1",
    });
    const tags = {
      tag2: "val2",
    };
    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
      tags: tags,
      copySourceTags: "REPLACE",
    });

    // Validate source and destination blob content match.
    const downloadRes = await blockBlobClient.download();
    const downloadBuffer = await streamToBuffer3(downloadRes.readableStreamBody!);
    assert.ok(downloadBuffer.compare(Buffer.from(content)) === 0);

    // Validate tags set correctly
    const getTagsRes = await blockBlobClient.getTags();
    assert.deepStrictEqual(getTagsRes.tags, tags);
  });

  it("copySourceBlobProperties = false", async () => {
    const blobHTTPHeaders = {
      blobContentLanguage: "blobContentLanguage1",
      blobContentType: "blobContentType1",
    };

    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
      blobHTTPHeaders,
      copySourceBlobProperties: false,
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

  it("destination conditon", async function () {
    // upload to dest blob first
    const hello = "hello";
    await blockBlobClient.upload(hello, hello.length);
    const getRes = await blockBlobClient.getProperties();

    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
      conditions: {
        ifMatch: getRes.etag,
      },
    });

    try {
      await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
        conditions: {
          ifMatch: '"invalidetag"',
        },
      });
      assert.fail("Should have failed with unmet condition.");
    } catch (err: any) {
      assert.deepStrictEqual(err.code, "TargetConditionNotMet");
    }
  });

  it("source conditon", async function () {
    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
      sourceConditions: {
        ifMatch: srcEtag,
      },
    });

    try {
      await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
        sourceConditions: {
          ifMatch: '"invalidetag"',
        },
      });
      assert.fail("Should have failed with unmet condition.");
    } catch (err: any) {
      assert.deepStrictEqual(err.code, "SourceConditionNotMet");
    }
  });

  it("sourceContentMD5", async function () {
    const sourceContentMD5 = crypto.createHash("md5").update(Buffer.from(content)).digest();
    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
      sourceContentMD5,
    });

    try {
      const invalidMD5 = crypto.createHash("md5").update("hello").digest();
      await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
        sourceContentMD5: invalidMD5,
      });
      assert.fail("Should have failed with unmet condition.");
    } catch (err: any) {
      assert.deepStrictEqual(err.code, "Md5Mismatch");
    }
  });

  it("large content", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    await sourceBlob.uploadData(largeContent);
    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS);
  }).timeout(10 * 60 * 1000);

  it("large content with timeout", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    await sourceBlob.uploadData(largeContent);

    let exceptionCaught = false;
    try {
      await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
        timeoutInSeconds: 1,
      });
    } catch (err: any) {
      assert.deepStrictEqual(err.code, "OperationTimedOut");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  }).timeout(10 * 60 * 1000);
});
