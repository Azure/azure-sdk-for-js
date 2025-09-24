// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as zlib from "zlib";
import type {
  StorageSharedKeyCredential,
  BlobClient,
  ContainerClient,
  BlobServiceClient,
} from "@azure/storage-blob";
import {
  BlockBlobClient,
  newPipeline,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol,
  AnonymousCredential,
} from "@azure/storage-blob";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import crypto from "node:crypto";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach, beforeAll } from "vitest";
import { createBlobServiceClient, createBlockBlobClient } from "./utils/clients.js";
import { base64encode, generateRandomUint8Array, getUniqueName } from "../utils/utils.js";
import { bodyToString } from "./utils/utils.js";
import {
  getAccountKey,
  getStorageConnectionString,
  getStorageConnectionStringWithSas,
} from "../../utils/injectables.js";
import { ensureClientRecording } from "../utils/recorder.js";
import { buffer } from "node:stream/consumers";
import { STORAGE_SCOPE, BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES } from "../utils/constants.js";
import { isRestError } from "@azure/core-rest-pipeline";

describe("BlockBlobClient Node.js only", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let recorder: Recorder;
  let blobServiceClient: BlobServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
  });

  afterEach(async () => {
    if (containerClient) {
      await containerClient.delete();
    }
    await recorder.stop();
  });

  it.runIf(getAccountKey())("Upload special content with SAS token should work", async () => {
    const content =
      "////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'+%2F'%25%";

    const client = await createBlockBlobClient("AccountKey", { recorder, blobName, containerName });
    if (!client) {
      assert.fail("Expecting a client but got undefined.");
    }

    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const sasURL = await client.generateSasUrl({
      expiresOn: tmr,
      permissions: BlobSASPermissions.parse("racwd"),
      protocol: SASProtocol.HttpsAndHttp,
    });
    const blobClientWithSAS = new BlockBlobClient(sasURL, newPipeline(new AnonymousCredential()));
    ensureClientRecording(recorder, blobClientWithSAS);

    await blobClientWithSAS.upload(content, content.length);

    const result = await blobClientWithSAS.download();
    assert.deepStrictEqual(await bodyToString(result), content);
  });

  it.runIf(getStorageConnectionString())("can be created with a connection string", async () => {
    const newClient = await createBlockBlobClient("AccountConnectionString", {
      recorder,
      blobName,
      containerName,
    });
    if (!newClient) {
      assert.fail("Expected client constructed with connection string to be defined");
    }
    const body = getUniqueName("randomstring", { recorder });
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it.runIf(getStorageConnectionString())(
    "can be created with a connection string and an option bag",
    async () => {
      const newClient = await createBlockBlobClient("AccountConnectionString", {
        recorder,
        blobName,
        containerName,
        options: { retryOptions: { maxTries: 5 } },
      });
      if (!newClient) {
        assert.fail("Expected client constructed with connection string to be defined");
      }
      const body = getUniqueName("randomstring", { recorder });
      await newClient.upload(body, body.length);
      const result = await newClient.download(0);
      assert.deepStrictEqual(await bodyToString(result, body.length), body);
    },
  );

  it.runIf(isLiveMode())("should not decompress during downloading", async () => {
    const body = "hello world body string!";
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

  it.runIf(isLiveMode() && getStorageConnectionStringWithSas())(
    "can be created with a sas connection string",
    async () => {
      const newClient = await createBlockBlobClient("SASConnectionString", {
        recorder,
        blobName,
        containerName,
      });
      if (!newClient) {
        assert.fail("Expected client with SAS connection string to be created");
      }

      const body = getUniqueName("randomstring", { recorder });
      await newClient.upload(body, body.length);
      const result = await newClient.download(0);
      assert.deepStrictEqual(await bodyToString(result, body.length), body);
    },
  );

  it.runIf(getStorageConnectionStringWithSas())(
    "throws error if constructor containerName parameter is empty",
    async () => {
      try {
        await createBlockBlobClient("SASConnectionString", {
          recorder,
          blobName: "blobName",
          containerName: "",
        });
        assert.fail("Expecting an thrown error but didn't get one.");
      } catch (error: any) {
        assert.equal(
          "Expecting non-empty strings for containerName and blobName parameters",
          error.message,
          "Error message is different than expected.",
        );
      }
    },
  );

  it.runIf(getStorageConnectionString())(
    "throws error if constructor blobName parameter is empty",
    async () => {
      try {
        await createBlockBlobClient("SASConnectionString", {
          recorder,
          blobName: "",
          containerName: "containerName",
        });
        assert.fail("Expecting an thrown error but didn't get one.");
      } catch (error: any) {
        assert.equal(
          "Expecting non-empty strings for containerName and blobName parameters",
          error.message,
          "Error message is different than expected.",
        );
      }
    },
  );
});

describe.runIf(getAccountKey())("syncUploadFromURL", () => {
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

  beforeAll(async () => {
    largeContent = generateRandomUint8Array(BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES);
  });

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const blobServiceClient = await createBlobServiceClient("AccountKey", { recorder });
    assert.isDefined(blobServiceClient);
    const containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    const blobName = getUniqueName("blockblob", { recorder });
    blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // generate source blob SAS

    const srcBlobName = getUniqueName("srcblob/%2+%2F", { recorder });
    sourceBlob = containerClient.getBlockBlobClient(srcBlobName);
    const uploadSrcRes = await sourceBlob.upload(content, content.length, {
      blobHTTPHeaders: srcHttpHeaders,
    });
    srcEtag = uploadSrcRes.etag;

    const expiryTime = new Date(new Date().toISOString());
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

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("stageBlockFromURL - source SAS and destination bearer token", async () => {
    const stokenBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
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

  it("stageBlockFromURL - source bear token and destination account key", async () => {
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const accessToken = await createTestCredential().getToken(STORAGE_SCOPE);
    assert.isNotNull(accessToken);

    const newBlockBlobClient = containerClient.getBlockBlobClient(
      getUniqueName("newblockblob", { recorder }),
    );

    await newBlockBlobClient.stageBlockFromURL(
      base64encode("1"),
      blockBlobClient.url,
      0,
      body.length,
      {
        sourceAuthorization: {
          scheme: "Bearer",
          value: accessToken.token,
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
          value: accessToken.token,
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

  it("stageBlockFromURL - destination bearer token", async () => {
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const accessToken = await createTestCredential().getToken(STORAGE_SCOPE);
    assert.isNotNull(accessToken);

    const stokenBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    const newBlobName = getUniqueName("newblockblob", { recorder });
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
          value: accessToken.token,
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
          value: accessToken.token,
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

  it("syncUploadFromURL - source SAS and destination bearer token", async () => {
    const stokenBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    const tokenNewBlockBlobClient = stokenBlobServiceClient
      .getContainerClient(containerClient.containerName)
      .getBlockBlobClient(blockBlobClient.name);

    await tokenNewBlockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS);

    // Validate source and destination blob content match.
    const downloadRes = await blockBlobClient.download();
    const stream = downloadRes.readableStreamBody;
    if (!stream) {
      assert.fail("Expected response stream");
    }
    const downloadBuffer = await buffer(stream);
    assert.ok(downloadBuffer.compare(Buffer.from(content)) === 0);
  });

  it("syncUploadFromURL - source bear token and destination account key", async () => {
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const accessToken = await createTestCredential().getToken(STORAGE_SCOPE);
    assert.isNotNull(accessToken);

    const newBlockBlobClient = containerClient.getBlockBlobClient(
      getUniqueName("newblockblob", { recorder }),
    );

    await newBlockBlobClient.syncUploadFromURL(blockBlobClient.url, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken.token,
      },
    });

    // Validate source and destination blob content match.
    const downloadRes = await newBlockBlobClient.download();
    assert.equal(await bodyToString(downloadRes, body.length), body);
    assert.equal(downloadRes.contentLength, body.length);
  });

  it("syncUploadFromURL - destination bearer token", async () => {
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const accessToken = await createTestCredential().getToken(STORAGE_SCOPE);
    assert.isNotNull(accessToken);

    const stokenBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    const newBlobName = getUniqueName("newblockblob", { recorder });
    const newBlockBlobClient = containerClient.getBlockBlobClient(newBlobName);
    const tokenNewBlockBlobClient = stokenBlobServiceClient
      .getContainerClient(containerClient.containerName)
      .getBlockBlobClient(newBlobName);

    await tokenNewBlockBlobClient.syncUploadFromURL(blockBlobClient.url, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken.token,
      },
    });

    // Validate source and destination blob content match.
    const downloadRes = await newBlockBlobClient.download();
    assert.equal(await bodyToString(downloadRes, body.length), body);
    assert.equal(downloadRes.contentLength, body.length);
  });

  it("with default options", async () => {
    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS);

    // Validate source and destination blob content match.
    const downloadRes = await blockBlobClient.download();
    const stream = downloadRes.readableStreamBody;
    if (!stream) {
      assert.fail("Expected stream response");
    }
    const downloadBuffer = await buffer(stream);
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
      blobContentType: "blobContentType1",
    };

    const tags = {
      tag1: "val1",
    };
    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, { blobHTTPHeaders, tags });

    // Validate source and destination blob content match.
    const downloadRes = await blockBlobClient.download();
    const stream = downloadRes.readableStreamBody;
    if (!stream) {
      assert.fail("Expected stream response");
    }
    const downloadBuffer = await buffer(stream);
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
    const stream = downloadRes.readableStreamBody;
    if (!stream) {
      assert.fail("Expected stream response");
    }
    const downloadBuffer = await buffer(stream);
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
    const stream = downloadRes.readableStreamBody;
    if (!stream) {
      assert.fail("Expected stream response");
    }
    const downloadBuffer = await buffer(stream);
    assert.ok(downloadBuffer.compare(Buffer.from(content)) === 0);

    // Validate tags set correctly
    const getTagsRes = await blockBlobClient.getTags();
    assert.deepStrictEqual(getTagsRes.tags, tags);
  });

  it("syncUploadFromURL - should fail with copy source error message", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const newBlobClient = containerClient.getBlockBlobClient(
      getUniqueName("copiedblob", { recorder }),
    );

    const sourceUrl = await blockBlobClient.generateSasUrl({
      permissions: BlobSASPermissions.parse("d"),
      expiresOn: tmr,
    });

    try {
      await newBlobClient.syncUploadFromURL(sourceUrl);
    } catch (err) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.deepEqual(err.code, "CannotVerifyCopySource");
      assert.equal((err.details as any).copySourceStatusCode, 403);
      assert.deepEqual((err.details as any).copySourceErrorCode, "AuthorizationPermissionMismatch");
      assert.deepEqual(
        (err.details as any).copySourceErrorMessage,
        "This request is not authorized to perform this operation using this permission.",
      );
    }
  });

  it("stageBlockFromURL - should fail with copy source error message", async () => {
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);

    const newBlobClient = containerClient.getBlockBlobClient(
      getUniqueName("copiedblob", { recorder }),
    );

    const sourceUrl = await blockBlobClient.generateSasUrl({
      permissions: BlobSASPermissions.parse("d"),
      expiresOn: tmr,
    });

    try {
      await newBlobClient.stageBlockFromURL(base64encode("1"), sourceUrl);
    } catch (err) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.deepEqual(err.code, "CannotVerifyCopySource");
      assert.equal((err.details as any).copySourceStatusCode, 403);
      assert.deepEqual((err.details as any).copySourceErrorCode, "AuthorizationPermissionMismatch");
      assert.deepEqual(
        (err.details as any).copySourceErrorMessage,
        "This request is not authorized to perform this operation using this permission.",
      );
    }
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
    const stream = downloadRes.readableStreamBody;
    if (!stream) {
      assert.fail("Expected stream response");
    }
    const downloadBuffer = await buffer(stream);
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
    } catch (err) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.deepStrictEqual(err.code, "TargetConditionNotMet");
    }
  });

  it("source conditon", async () => {
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
    } catch (err) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.deepStrictEqual(err.code, "SourceConditionNotMet");
    }
  });

  it("sourceContentMD5", async () => {
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
    } catch (err) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.deepStrictEqual(err.code, "Md5Mismatch");
    }
  });

  it.runIf(isLiveMode())("large content", { timeout: 10 * 60 * 1000 }, async () => {
    await sourceBlob.uploadData(largeContent);
    await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS);
  });

  // TODO: should enable this case when service is ready
  it.runIf(isLiveMode()).skip(
    "large content with timeout",
    { timeout: 10 * 60 * 1000 },
    async () => {
      await sourceBlob.uploadData(largeContent);

      let exceptionCaught = false;
      try {
        await blockBlobClient.syncUploadFromURL(sourceBlobURLWithSAS, {
          timeoutInSeconds: 1,
        });
      } catch (err) {
        if (!isRestError(err)) {
          throw err;
        }
        assert.deepStrictEqual(err.code, "OperationTimedOut");
        exceptionCaught = true;
      }
      assert.ok(exceptionCaught);
    },
  );
});
