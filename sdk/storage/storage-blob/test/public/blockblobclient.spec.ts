// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlobClient, ContainerClient, BlobServiceClient } from "../../src/index.js";
import { type BlockBlobClient, getBlobServiceAccountAudience } from "../../src/index.js";
import { assertClientUsesTokenCredential } from "../utils/assert.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient, createBlockBlobClient } from "../utils/clients.js";
import { base64encode, getUniqueName } from "../utils/testHelpers.js";
import { SimpleTokenCredential } from "../utils/simpleToken.js";
import { isRestError } from "@azure/core-rest-pipeline";
import { getCustomerProvidedKey } from "../utils/injectables.js";

describe("BlockBlobClient", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let recorder: Recorder;
  let blobServiceClient: BlobServiceClient;
  const customerProvidedKey = getCustomerProvidedKey();

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
    await containerClient.delete();
    await recorder.stop();
  });

  it("Default audience should work", async () => {
    await blockBlobClient.upload("Hello", 5);
    const blockBlobClientWithOAuthToken = await createBlockBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
    });
    const exist = await blockBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Customized audience should work", async () => {
    await blockBlobClient.upload("Hello", 5);
    const blockBlobClientWithOAuthToken = await createBlockBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
      options: {
        audience: [getBlobServiceAccountAudience(blobServiceClient.accountName)],
      },
    });
    const exist = await blockBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("Bearer token challenge should work", async () => {
    await blockBlobClient.upload("Hello", 5);

    // Validate that bad audience should fail first.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );
    assert.isNotNull(authToken);
    const blockBlobClientWithPlainOAuthToken = await createBlockBlobClient("Custom", {
      recorder,
      blobName,
      containerName,
      credential: new SimpleTokenCredential(authToken.token),
    });

    try {
      await blockBlobClientWithPlainOAuthToken.exists();
      assert.fail("Should fail with 401");
    } catch (err) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.strictEqual(err.statusCode, 401);
    }

    const blockBlobClientWithOAuthToken = await createBlockBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
      options: {
        audience: ["https://badaudience.blob.core.windows.net/.default"],
      },
    });
    const exist = await blockBlobClientWithOAuthToken.exists();
    assert.equal(exist, true);
  });

  it("can be created with a url and a TokenCredential", async () => {
    const newClient = await createBlockBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
    });
    assertClientUsesTokenCredential(newClient);
  });

  it("stageBlock", async () => {
    const body = "HelloWorld";
    await blockBlobClient.stageBlock(base64encode("1"), body, body.length);
    await blockBlobClient.stageBlock(base64encode("2"), body, body.length);
    const listResponse = await blockBlobClient.getBlockList("uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 2);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, body.length);
    assert.equal(listResponse.uncommittedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.uncommittedBlocks![1].size, body.length);
  });

  it("stageBlock with progress report", async () => {
    const body = "HelloWorld";
    await blockBlobClient.stageBlock(base64encode("1"), body, body.length, {
      onProgress: () => {
        /* empty */
      },
    });
    await blockBlobClient.stageBlock(base64encode("2"), body, body.length, {
      onProgress: () => {
        /* empty */
      },
    });
    await blockBlobClient.commitBlockList([base64encode("1"), base64encode("2")]);
    const listResponse = await blockBlobClient.getBlockList("committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);
  });

  it("stageBlockFromURL copy source blob as single block", async () => {
    const body = "HelloWorld";
    await blockBlobClient.upload(body, body.length);

    const newBlockBlobClient = containerClient.getBlockBlobClient(
      getUniqueName("newblockblob", { recorder }),
    );
    await newBlockBlobClient.stageBlockFromURL(base64encode("1"), blockBlobClient.url);

    const listResponse = await newBlockBlobClient.getBlockList("uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 1);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, body.length);
  });

  it("commitBlockList", async () => {
    const body = "HelloWorld";
    await blockBlobClient.stageBlock(base64encode("1"), body, body.length);
    await blockBlobClient.stageBlock(base64encode("2"), body, body.length);
    await blockBlobClient.commitBlockList([base64encode("1"), base64encode("2")]);
    const listResponse = await blockBlobClient.getBlockList("committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);
  });

  it("getBlockList", async () => {
    const body = "HelloWorld";
    await blockBlobClient.stageBlock(base64encode("1"), body, body.length);
    await blockBlobClient.stageBlock(base64encode("2"), body, body.length);
    await blockBlobClient.commitBlockList([base64encode("2")]);
    const listResponse = await blockBlobClient.getBlockList("all");
    assert.equal(listResponse.committedBlocks!.length, 1);
    assert.equal(listResponse.uncommittedBlocks!.length, 0);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
  });

  it("download without CPK should fail, if upload with CPK", async () => {
    const body = getUniqueName("randomstring", { recorder });
    await blockBlobClient.upload(body, body.length, {
      customerProvidedKey,
    });

    let exceptionCaught = false;
    try {
      await blobClient.download(0);
    } catch (error: any) {
      if (!isRestError(error)) {
        throw error;
      }
      // HTTP/1.1 409 The blob is encrypted with customer specified encryption, but it was not provided in the request.
      exceptionCaught = true;
    }

    assert.isDefined(exceptionCaught);
  });

  it("stageBlock with invalid CRC64 should fail", async () => {
    const content = "Hello World!";
    let exceptionCaught = false;
    try {
      await blockBlobClient.stageBlock(base64encode("1"), content, content.length, {
        transactionalContentCrc64: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
      });
    } catch (err) {
      if (!isRestError(err)) {
        throw err;
      }
      if (
        err.message.startsWith(
          "The CRC64 value specified in the request did not match with the CRC64 value calculated by the server.",
        )
      ) {
        exceptionCaught = true;
      }
    }

    assert.isDefined(exceptionCaught);
  });

  it("syncUploadFromURL with public source should work", async () => {
    const metadata = {
      key1: "val1",
      key2: "val2",
    };

    await blockBlobClient.syncUploadFromURL("https://azure.github.io/azure-sdk-for-js/index.html", {
      conditions: {
        ifNoneMatch: "*",
      },
      metadata,
    });

    const getRes = await blockBlobClient.getProperties();
    assert.deepStrictEqual(getRes.metadata, metadata);

    try {
      await blockBlobClient.syncUploadFromURL(
        "https://azure.github.io/azure-sdk-for-js/index.html",
        {
          conditions: {
            ifNoneMatch: "*",
          },
          metadata,
        },
      );
      assert.fail();
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.deepStrictEqual(err.code, "BlobAlreadyExists");
    }
  });

  it("syncUploadFromURL with cold tier should work", async () => {
    await blockBlobClient.syncUploadFromURL("https://azure.github.io/azure-sdk-for-js/index.html", {
      tier: "Cold",
    });

    const properties = await blockBlobClient.getProperties();
    assert.isDefined(properties.accessTier);
    assert.equal(properties.accessTier!, "Cold");
  });
});
