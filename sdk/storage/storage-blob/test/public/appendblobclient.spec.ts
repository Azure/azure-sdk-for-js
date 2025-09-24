// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import {
  type BlobServiceClient,
  getBlobServiceAccountAudience,
  type ContainerClient,
  type AppendBlobClient,
} from "@azure/storage-blob";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createAppendBlobClient, createBlobServiceClient } from "./utils/clients.js";
import { bodyToString, getUniqueName } from "./utils/utils.js";
import { SimpleTokenCredential } from "./utils/simpleToken.js";
import { isRestError } from "@azure/core-rest-pipeline";
import { createTestCredential } from "@azure-tools/test-credential";

describe("AppendBlobClient", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let appendBlobClient: AppendBlobClient;
  let blobServiceClient: BlobServiceClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob", { recorder });
    appendBlobClient = containerClient.getAppendBlobClient(blobName);
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("create with default parameters", async () => {
    await appendBlobClient.create();
    await appendBlobClient.download(0);
  });

  it("Bearer token challenge should work", async () => {
    await appendBlobClient.create();

    // To validate that bad audience should fail.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const appendBlobClientWithPlainOAuthToken = await createAppendBlobClient("Custom", {
      blobName,
      containerName,
      recorder,
      credential: new SimpleTokenCredential(authToken.token),
    });

    try {
      await appendBlobClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.strictEqual(err.statusCode, 401);
    }
    const appendBlobClientWithOAuthToken = await createAppendBlobClient("TokenCredential", {
      blobName,
      containerName,
      recorder,
      options: {
        audience: ["https://badaudience.blob.core.windows.net/.default"],
      },
    });
    const exist = await appendBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
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
      onProgress: () => {
        /* empty */
      },
    });

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });

  it("appendBlockFromURL", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    const blockBlobName = getUniqueName("blockblob", { recorder });
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    await appendBlobClient.appendBlock(content, content.length);
    await appendBlobClient.appendBlockFromURL(blockBlobClient.url, 0, content.length);

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length * 2), content + content);
    assert.equal(downloadResponse.contentLength, content.length * 2);
  });

  it("appendBlockFromURL - destination bearer token", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    const blockBlobName = getUniqueName("blockblob", { recorder });
    const blockBlobClient = containerClient.getBlockBlobClient(blockBlobName);
    await blockBlobClient.upload(content, content.length);

    const tokenBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    const tokenAppendBlobClient = tokenBlobServiceClient
      .getContainerClient(containerName)
      .getAppendBlobClient(blobName);
    await tokenAppendBlobClient.appendBlockFromURL(blockBlobClient.url, 0, content.length);

    const downloadResponse = await appendBlobClient.download(0);
    assert.equal(await bodyToString(downloadResponse, content.length), content);
    assert.equal(downloadResponse.contentLength!, content.length);
  });

  it("create with parameters configured", async () => {
    const options = {
      blobHTTPHeaders: {
        blobCacheControl: "blobCacheControl",
        blobContentDisposition: "blobContentDisposition",
        blobContentEncoding: "blobContentEncoding",
        blobContentLanguage: "blobContentLanguage",
        blobContentType: "blobContentType",
      },
      metadata: {
        key1: "vala",
        key2: "valb",
      },
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

  it("throws error if constructor containerName parameter is empty", async () => {
    try {
      await createAppendBlobClient("TokenCredential", {
        blobName: "blobName",
        containerName: "",
        recorder,
      });
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        error.message,
        "Unable to extract blobName and containerName with provided information.",
        "Error message is different than expected.",
      );
    }
  });

  it("appendBlock with invalid CRC64 should fail", async () => {
    await appendBlobClient.create();

    const content = "Hello World!";
    let exceptionCaught = false;
    try {
      await appendBlobClient.appendBlock(content, content.length, {
        transactionalContentCrc64: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
      });
    } catch (err: any) {
      if (
        err instanceof Error &&
        err.message.startsWith(
          "The CRC64 value specified in the request did not match with the CRC64 value calculated by the server.",
        )
      ) {
        exceptionCaught = true;
      }

      assert.equal(
        err.details.errorCode,
        "Crc64Mismatch",
        "Error does not contain details property",
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

    let destBlobClient = containerClient.getAppendBlobClient(
      getUniqueName("copiedblob1", { recorder }),
    );
    await (
      await destBlobClient.beginCopyFromURL(appendBlobClient.url, {
        sealBlob: false,
      })
    ).pollUntilDone();
    let properties = await destBlobClient.getProperties();
    assert.deepStrictEqual(properties.isSealed, undefined);

    destBlobClient = containerClient.getAppendBlobClient(
      getUniqueName("copiedblob2", { recorder }),
    );
    await (await destBlobClient.beginCopyFromURL(appendBlobClient.url, {})).pollUntilDone();
    properties = await destBlobClient.getProperties();
    assert.deepStrictEqual(properties.isSealed, true);

    destBlobClient = containerClient.getAppendBlobClient(
      getUniqueName("copiedblob3", { recorder }),
    );
    await (
      await destBlobClient.beginCopyFromURL(appendBlobClient.url, {
        sealBlob: true,
      })
    ).pollUntilDone();
    properties = await destBlobClient.getProperties();
    assert.deepStrictEqual(properties.isSealed, true);
  });

  it("can be created with a url and a pipeline", async () => {
    const newClient = await createAppendBlobClient("Pipeline", {
      recorder,
      blobName,
      containerName,
    });

    await newClient.create();
    await newClient.download();
  });

  it("Customized audience should work", async () => {
    await appendBlobClient.create();
    const appendBlobClientWithOAuthToken = await createAppendBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
      options: {
        audience: [getBlobServiceAccountAudience(blobServiceClient.accountName)],
      },
    });
    const exist = await appendBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });
});
