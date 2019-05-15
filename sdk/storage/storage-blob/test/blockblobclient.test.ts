import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { BlobClient } from "../src/BlobClient";
import { BlockBlobClient } from "../src/BlockBlobClient";
import { ContainerClient } from "../src/ContainerClient";
import { base64encode, bodyToString, getBSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("BlockBlobClient", () => {
  const serviceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
  let blobName: string = getUniqueName("blob");
  let blobClient = BlobClient.fromContainerClient(containerClient, blobName);
  let blockBlobClient = BlockBlobClient.fromBlobClient(blobClient);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
    await containerClient.create(Aborter.none);
    blobName = getUniqueName("blob");
    blobClient = BlobClient.fromContainerClient(containerClient, blobName);
    blockBlobClient = BlockBlobClient.fromBlobClient(blobClient);
  });

  afterEach(async () => {
    await containerClient.delete(Aborter.none);
  });

  it("upload with string body and default parameters", async () => {
    const body: string = getUniqueName("randomstring");
    await blockBlobClient.upload(Aborter.none, body, body.length);
    const result = await blobClient.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("upload with string body and all parameters set", async () => {
    const body: string = getUniqueName("randomstring");
    const options = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentType: "blobContentType",
      metadata: {
        keya: "vala",
        keyb: "valb"
      }
    };
    await blockBlobClient.upload(Aborter.none, body, body.length, {
      blobHTTPHeaders: options,
      metadata: options.metadata
    });
    const result = await blobClient.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
    assert.deepStrictEqual(result.cacheControl, options.blobCacheControl);
    assert.deepStrictEqual(result.contentDisposition, options.blobContentDisposition);
    assert.deepStrictEqual(result.contentEncoding, options.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, options.blobContentLanguage);
    assert.deepStrictEqual(result.contentType, options.blobContentType);
    assert.deepStrictEqual(result.metadata, options.metadata);
  });

  it("stageBlock", async () => {
    const body = "HelloWorld";
    await blockBlobClient.stageBlock(Aborter.none, base64encode("1"), body, body.length);
    await blockBlobClient.stageBlock(Aborter.none, base64encode("2"), body, body.length);
    const listResponse = await blockBlobClient.getBlockList(Aborter.none, "uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 2);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, body.length);
    assert.equal(listResponse.uncommittedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.uncommittedBlocks![1].size, body.length);
  });

  it("stageBlockFromURL copy source blob as single block", async () => {
    const body = "HelloWorld";
    await blockBlobClient.upload(Aborter.none, body, body.length);

    // When testing is in Node.js environment with shared key, setAccessPolicy will work
    // But in browsers testing with SAS tokens, below will throw an exception, ignore it
    try {
      await containerClient.setAccessPolicy(Aborter.none, "container");
      // tslint:disable-next-line:no-empty
    } catch (err) {}

    const newBlockBlobClient = BlockBlobClient.fromContainerClient(
      containerClient,
      getUniqueName("newblockblob")
    );
    await newBlockBlobClient.stageBlockFromURL(
      Aborter.none,
      base64encode("1"),
      blockBlobClient.url,
      0
    );

    const listResponse = await newBlockBlobClient.getBlockList(Aborter.none, "uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 1);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, body.length);
  });

  it("stageBlockFromURL copy source blob as separate blocks", async () => {
    const body = "HelloWorld";
    await blockBlobClient.upload(Aborter.none, body, body.length);

    // When testing is in Node.js environment with shared key, setAccessPolicy will work
    // But in browsers testing with SAS tokens, below will throw an exception, ignore it
    try {
      await containerClient.setAccessPolicy(Aborter.none, "container");
      // tslint:disable-next-line:no-empty
    } catch (err) {}

    const newBlockBlobClient = BlockBlobClient.fromContainerClient(
      containerClient,
      getUniqueName("newblockblob")
    );
    await newBlockBlobClient.stageBlockFromURL(
      Aborter.none,
      base64encode("1"),
      blockBlobClient.url,
      0,
      4
    );
    await newBlockBlobClient.stageBlockFromURL(
      Aborter.none,
      base64encode("2"),
      blockBlobClient.url,
      4,
      4
    );
    await newBlockBlobClient.stageBlockFromURL(
      Aborter.none,
      base64encode("3"),
      blockBlobClient.url,
      8,
      2
    );

    const listResponse = await newBlockBlobClient.getBlockList(Aborter.none, "uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 3);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, 4);
    assert.equal(listResponse.uncommittedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.uncommittedBlocks![1].size, 4);
    assert.equal(listResponse.uncommittedBlocks![2].name, base64encode("3"));
    assert.equal(listResponse.uncommittedBlocks![2].size, 2);

    await newBlockBlobClient.commitBlockList(Aborter.none, [
      base64encode("1"),
      base64encode("2"),
      base64encode("3")
    ]);

    const downloadResponse = await newBlockBlobClient.download(Aborter.none, 0);
    assert.equal(await bodyToString(downloadResponse, 10), body);
  });

  it("commitBlockList", async () => {
    const body = "HelloWorld";
    await blockBlobClient.stageBlock(Aborter.none, base64encode("1"), body, body.length);
    await blockBlobClient.stageBlock(Aborter.none, base64encode("2"), body, body.length);
    await blockBlobClient.commitBlockList(Aborter.none, [base64encode("1"), base64encode("2")]);
    const listResponse = await blockBlobClient.getBlockList(Aborter.none, "committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);
  });

  it("commitBlockList with all parameters set", async () => {
    const body = "HelloWorld";
    await blockBlobClient.stageBlock(Aborter.none, base64encode("1"), body, body.length);
    await blockBlobClient.stageBlock(Aborter.none, base64encode("2"), body, body.length);

    const options = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentType: "blobContentType",
      metadata: {
        keya: "vala",
        keyb: "valb"
      }
    };
    await blockBlobClient.commitBlockList(Aborter.none, [base64encode("1"), base64encode("2")], {
      blobHTTPHeaders: options,
      metadata: options.metadata
    });

    const listResponse = await blockBlobClient.getBlockList(Aborter.none, "committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);

    const result = await blobClient.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, body.repeat(2).length), body.repeat(2));
    assert.deepStrictEqual(result.cacheControl, options.blobCacheControl);
    assert.deepStrictEqual(result.contentDisposition, options.blobContentDisposition);
    assert.deepStrictEqual(result.contentEncoding, options.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, options.blobContentLanguage);
    assert.deepStrictEqual(result.contentType, options.blobContentType);
    assert.deepStrictEqual(result.metadata, options.metadata);
  });

  it("getBlockList", async () => {
    const body = "HelloWorld";
    await blockBlobClient.stageBlock(Aborter.none, base64encode("1"), body, body.length);
    await blockBlobClient.stageBlock(Aborter.none, base64encode("2"), body, body.length);
    await blockBlobClient.commitBlockList(Aborter.none, [base64encode("2")]);
    const listResponse = await blockBlobClient.getBlockList(Aborter.none, "all");
    assert.equal(listResponse.committedBlocks!.length, 1);
    assert.equal(listResponse.uncommittedBlocks!.length, 0);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
  });
});
