// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlobClient, ContainerClient, BlobServiceClient } from "@azure/storage-blob";
import {
  type BlockBlobClient,
  BlockBlobTier,
  getBlobServiceAccountAudience,
} from "@azure/storage-blob";
import { assertClientUsesTokenCredential } from "./utils/assert.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient, createBlockBlobClient } from "./utils/clients.js";
import { base64encode, bodyToString, getUniqueName } from "./utils/utils.js";
import { SimpleTokenCredential } from "./utils/simpleToken.js";
import { isRestError } from "@azure/core-rest-pipeline";
import { getCustomerProvidedKey } from "../utils/injectables.js";

const textEncoder = new TextEncoder();

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

    assert.ok(exceptionCaught);
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

    assert.ok(exceptionCaught);
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
    assert.ok(properties.accessTier);
    assert.equal(properties.accessTier!, "Cold");
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
