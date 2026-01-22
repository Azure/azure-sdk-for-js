// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as zlib from "zlib";
import type {
  StorageSharedKeyCredential,
  BlobClient,
  ContainerClient,
  BlobServiceClient,
} from "../../../src/index.js";
import {
  BlockBlobClient,
  BlockBlobTier,
  newPipeline,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  SASProtocol,
  AnonymousCredential,
} from "../../../src/index.js";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import crypto from "node:crypto";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach, beforeAll } from "vitest";
import { createBlobServiceClient, createBlockBlobClient } from "../../utils/node/clients.js";
import { base64encode, generateRandomUint8Array, getUniqueName } from "../../utils/testHelpers.js";
import { bodyToString, parseJwt } from "../../utils/node/testHelpers.js";
import {
  getAccountKey,
  getCustomerProvidedKey,
  getStorageConnectionString,
  getStorageConnectionStringWithSas,
} from "../../utils/injectables.js";
import { ensureClientRecording } from "../../utils/recorder.js";
import { buffer } from "node:stream/consumers";
import {
  STORAGE_SCOPE,
  BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES,
  SERVICE_VERSION,
} from "../../utils/constants.js";
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

  const textEncoder = new TextEncoder();
  const customerProvidedKey = getCustomerProvidedKey();

  it("Upload special content should work", async () => {
    const content =
      "////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'+%2F'%25%";

    await blockBlobClient.upload(content, content.length);

    const result = await blockBlobClient.download();
    assert.deepStrictEqual(await bodyToString(result), content);
  });

  it("Upload special content with OAuth should work", async () => {
    const content =
      "////Upper/blob/empty /another 汉字 ру́сский язы́к ру́сский язы́к عربي/عربى にっぽんご/にほんご . special ~!@#$%^&*()_+`1234567890-={}|[]\\:\";'<>?,/'+%2F'%25%";

    const blockBlobClientWithOAuthToken = await createBlockBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
    });
    await blockBlobClientWithOAuthToken.upload(content, content.length);

    const result = await blockBlobClientWithOAuthToken.download();
    assert.deepStrictEqual(await bodyToString(result), content);
  });

  it("upload with Readable stream body and default parameters", async () => {
    const body = getUniqueName("randomstring", { recorder });
    const bodyBytes = textEncoder.encode(body);
    await blockBlobClient.upload(bodyBytes, bodyBytes.byteLength);
    const result = await blobClient.download(0);

    const downloadedBody = await bodyToString(result);

    assert.deepStrictEqual(downloadedBody, body);
  });

  it("upload with Chinese string body and default parameters", async () => {
    const body = getUniqueName("randomstring你好", { recorder });
    const byteLength = textEncoder.encode(body).length;
    await blockBlobClient.upload(body, byteLength);
    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, byteLength), body);
  });

  it("upload with progress report", async () => {
    const body = getUniqueName("randomstring", { recorder });
    await blockBlobClient.upload(body, body.length, {
      onProgress: () => {
        /* empty */
      },
    });
    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("upload with string body and all parameters set", async () => {
    const body = getUniqueName("randomstring", { recorder });
    const options = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentType: "blobContentType",
      metadata: {
        keya: "vala",
        keyb: "valb",
      },
    };
    await blockBlobClient.upload(body, body.length, {
      blobHTTPHeaders: options,
      metadata: options.metadata,
      tier: BlockBlobTier.Cool,
    });
    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
    assert.deepStrictEqual(result.cacheControl, options.blobCacheControl);
    assert.deepStrictEqual(result.contentDisposition, options.blobContentDisposition);
    assert.deepStrictEqual(result.contentEncoding, options.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, options.blobContentLanguage);
    assert.deepStrictEqual(result.contentType, options.blobContentType);
    assert.deepStrictEqual(result.metadata, options.metadata);

    const gResp = await blobClient.getProperties();
    assert.equal(gResp.accessTier, BlockBlobTier.Cool);
  });

  it("can be created with a url and a credential", async () => {
    const newClient = await createBlockBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
    });

    const body = getUniqueName("randomstring", { recorder });
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const newClient = await createBlockBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
      options: { retryOptions: { maxTries: 5 } },
    });

    const body = getUniqueName("randomstring", { recorder });
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("can be created with a url and a pipeline", async () => {
    const newClient = await createBlockBlobClient("Pipeline", {
      recorder,
      blobName,
      containerName,
    });

    const body = getUniqueName("randomstring", { recorder });
    await newClient.upload(body, body.length);
    const result = await newClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("stageBlockFromURL copy source blob as separate blocks", async () => {
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const newBlockBlobClient = containerClient.getBlockBlobClient(
      getUniqueName("newblockblob", { recorder }),
    );
    await newBlockBlobClient.stageBlockFromURL(base64encode("1"), blockBlobClient.url, 0, 4);
    await newBlockBlobClient.stageBlockFromURL(base64encode("2"), blockBlobClient.url, 4, 4);
    await newBlockBlobClient.stageBlockFromURL(base64encode("3"), blockBlobClient.url, 8, 2);

    const listResponse = await newBlockBlobClient.getBlockList("uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 3);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, 4);
    assert.equal(listResponse.uncommittedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.uncommittedBlocks![1].size, 4);
    assert.equal(listResponse.uncommittedBlocks![2].name, base64encode("3"));
    assert.equal(listResponse.uncommittedBlocks![2].size, 2);

    await newBlockBlobClient.commitBlockList([
      base64encode("1"),
      base64encode("2"),
      base64encode("3"),
    ]);

    const downloadResponse = await newBlockBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, 10), body);
  });

  it("commitBlockList with all parameters set", async () => {
    const body = "HelloWorld";
    await blockBlobClient.stageBlock(base64encode("1"), body, body.length);
    await blockBlobClient.stageBlock(base64encode("2"), body, body.length);

    const options = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentType: "blobContentType",
      metadata: {
        keya: "vala",
        keyb: "valb",
      },
    };
    await blockBlobClient.commitBlockList([base64encode("1"), base64encode("2")], {
      blobHTTPHeaders: options,
      metadata: options.metadata,
      tier: BlockBlobTier.Cool,
    });

    const listResponse = await blockBlobClient.getBlockList("committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);

    const result = await blobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.repeat(2).length), body.repeat(2));
    assert.deepStrictEqual(result.cacheControl, options.blobCacheControl);
    assert.deepStrictEqual(result.contentDisposition, options.blobContentDisposition);
    assert.deepStrictEqual(result.contentEncoding, options.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, options.blobContentLanguage);
    assert.deepStrictEqual(result.contentType, options.blobContentType);
    assert.deepStrictEqual(result.metadata, options.metadata);

    const gResp = await blobClient.getProperties();
    assert.equal(gResp.accessTier, BlockBlobTier.Cool);
  });

  it("commitBlockList with cold tier", async () => {
    const body = "HelloWorld";
    await blockBlobClient.stageBlock(base64encode("1"), body, body.length);
    await blockBlobClient.stageBlock(base64encode("2"), body, body.length);
    await blockBlobClient.commitBlockList([base64encode("1"), base64encode("2")], {
      tier: "Cold",
    });

    const properties = await blockBlobClient.getProperties();
    assert.equal(properties.accessTier, "Cold");

    const result = await blockBlobClient.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length * 2), "HelloWorldHelloWorld");
  });

  it("upload and download with CPK", async () => {
    const body = getUniqueName("randomstring", { recorder });
    const options = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentType: "blobContentType",
      metadata: {
        keya: "vala",
        keyb: "valb",
      },
    };
    const uResp = await blockBlobClient.upload(body, body.length, {
      blobHTTPHeaders: options,
      metadata: options.metadata,
      customerProvidedKey,
    });
    assert.equal(uResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);
    const result = await blobClient.download(0, undefined, {
      customerProvidedKey,
    });
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
    assert.deepStrictEqual(result.cacheControl, options.blobCacheControl);
    assert.deepStrictEqual(result.contentDisposition, options.blobContentDisposition);
    assert.deepStrictEqual(result.contentEncoding, options.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, options.blobContentLanguage);
    assert.deepStrictEqual(result.contentType, options.blobContentType);
    assert.deepStrictEqual(result.metadata, options.metadata);
  });

  it("stageBlock, stageBlockURL and commitBlockList with CPK", async () => {
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const newBlockBlobURL = containerClient.getBlockBlobClient(
      getUniqueName("newblockblob", { recorder }),
    );
    const sResp = await newBlockBlobURL.stageBlock(base64encode("1"), body.substring(0, 4), 4, {
      customerProvidedKey,
    });
    assert.equal(sResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

    const sResp2 = await newBlockBlobURL.stageBlockFromURL(
      base64encode("2"),
      blockBlobClient.url,
      4,
      4,
      { customerProvidedKey },
    );
    assert.equal(sResp2.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

    await newBlockBlobURL.stageBlockFromURL(base64encode("3"), blockBlobClient.url, 8, 2, {
      customerProvidedKey,
    });

    const listResponse = await newBlockBlobURL.getBlockList("uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 3);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, 4);
    assert.equal(listResponse.uncommittedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.uncommittedBlocks![1].size, 4);
    assert.equal(listResponse.uncommittedBlocks![2].name, base64encode("3"));
    assert.equal(listResponse.uncommittedBlocks![2].size, 2);

    const cmResp = await newBlockBlobURL.commitBlockList(
      [base64encode("1"), base64encode("2"), base64encode("3")],
      { customerProvidedKey },
    );
    assert.equal(cmResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

    const downloadResponse = await newBlockBlobURL.download(0, undefined, {
      customerProvidedKey,
    });
    assert.equal(await bodyToString(downloadResponse, 10), body);
  });
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
    assert.equal(downloadBuffer.compare(Buffer.from(content)), 0);
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

  it.runIf(isLiveMode())(
    "syncUploadFromURL - source delegation sas with bear token and destination account key",
    async () => {
      // The token is sanitized in recording, we cannot get the object id from it.
      const blobServiceClientWithToken = await createBlobServiceClient("TokenCredential", {
        recorder,
      });

      const credential = createTestCredential();
      const token = (await credential.getToken(STORAGE_SCOPE))?.token;
      if (!token) {
        assert.fail("Expected token to be defined");
      }
      const jwtObj = parseJwt(token);

      const now = new Date(recorder.variable("now", new Date().toISOString()));
      now.setHours(now.getHours() - 1);
      const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
      tmr.setDate(tmr.getDate() + 1);
      const userDelegationKey = await blobServiceClientWithToken.getUserDelegationKey(now, tmr);

      const sharedKeyCredential = containerClient.credential as StorageSharedKeyCredential;
      const accountName = sharedKeyCredential.accountName;

      const body = "HelloWorld";
      await blockBlobClient.upload(body, body.length);

      const delegationSAS = generateBlobSASQueryParameters(
        {
          containerName: containerClient.containerName,
          blobName: blockBlobClient.name,
          expiresOn: tmr,
          permissions: BlobSASPermissions.parse("racwd"),
          protocol: SASProtocol.HttpsAndHttp,
          startsOn: now,
          version: SERVICE_VERSION,
          delegatedUserObjectId: jwtObj.oid,
        },
        userDelegationKey,
        accountName,
      );

      const newBlockBlobClient = containerClient.getBlockBlobClient(
        getUniqueName("newblockblob", { recorder }),
      );

      await newBlockBlobClient.syncUploadFromURL(`${blockBlobClient.url}?${delegationSAS}`, {
        sourceAuthorization: {
          scheme: "Bearer",
          value: token,
        },
      });

      // Validate source and destination blob content match.
      const downloadRes = await newBlockBlobClient.download();
      assert.equal(await bodyToString(downloadRes, body.length), body);
      assert.equal(downloadRes.contentLength!, body.length);
    },
  );

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
    assert.equal(downloadBuffer.compare(Buffer.from(content)), 0);

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
    assert.equal(downloadBuffer.compare(Buffer.from(content)), 0);

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
    assert.equal(downloadBuffer.compare(Buffer.from(content)), 0);

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
    assert.equal(downloadBuffer.compare(Buffer.from(content)), 0);

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
    assert.equal(downloadBuffer.compare(Buffer.from(content)), 0);

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
      assert.isTrue(exceptionCaught);
    },
  );
});
