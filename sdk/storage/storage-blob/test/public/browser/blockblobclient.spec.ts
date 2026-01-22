// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  BlockBlobClient,
  BlobClient,
  ContainerClient,
  BlobServiceClient,
} from "@azure/storage-blob";
import { BlockBlobTier } from "@azure/storage-blob";
import { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient, createBlockBlobClient } from "../../utils/clients.js";
import { base64encode, getUniqueName } from "../../utils/testHelpers.js";
import { bodyToString } from "../../utils/browser/testHelpers.js";
import { getCustomerProvidedKey } from "../../utils/injectables.js";

const textEncoder = new TextEncoder();

describe("BlockBlobClient - browser", () => {
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
