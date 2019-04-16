import * as assert from "assert";

import { BlobURL } from "../src/BlobURL";
import { BlockBlobURL } from "../src/BlockBlobURL";
import { ContainerURL } from "../src/ContainerURL";
import { base64encode, bodyToString, getBSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({path:"../.env"});

describe("BlockBlobURL", () => {
  const serviceURL = getBSU();
  let containerName: string = getUniqueName("container");
  let containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  let blobName: string = getUniqueName("blob");
  let blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  let blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create();
    blobName = getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  });

  afterEach(async () => {
    await containerURL.delete();
  });

  it("upload with string body and default parameters", async () => {
    const body: string = getUniqueName("randomstring");
    await blockBlobURL.upload(body, body.length);
    const result = await blobURL.download(0);
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
    await blockBlobURL.upload(body, body.length, {
      blobHTTPHeaders: options,
      metadata: options.metadata
    });
    const result = await blobURL.download(0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
    assert.deepStrictEqual(result.cacheControl, options.blobCacheControl);
    assert.deepStrictEqual(
      result.contentDisposition,
      options.blobContentDisposition
    );
    assert.deepStrictEqual(result.contentEncoding, options.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, options.blobContentLanguage);
    assert.deepStrictEqual(result.contentType, options.blobContentType);
    assert.deepStrictEqual(result.metadata, options.metadata);
  });

  it("stageBlock", async () => {
    const body = "HelloWorld";
    await blockBlobURL.stageBlock(
      base64encode("1"),
      body,
      body.length
    );
    await blockBlobURL.stageBlock(
      base64encode("2"),
      body,
      body.length
    );
    const listResponse = await blockBlobURL.getBlockList(
      "uncommitted"
    );
    assert.equal(listResponse.uncommittedBlocks!.length, 2);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, body.length);
    assert.equal(listResponse.uncommittedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.uncommittedBlocks![1].size, body.length);
  });

  it("stageBlockFromURL copy source blob as single block", async () => {
    const body = "HelloWorld";
    await blockBlobURL.upload(body, body.length);

    // When testing is in Node.js environment with shared key, setAccessPolicy will work
    // But in browsers testing with SAS tokens, below will throw an exception, ignore it
    try {
      await containerURL.setAccessPolicy("container");
      // tslint:disable-next-line:no-empty
    } catch (err) {}

    const newBlockBlobURL = BlockBlobURL.fromContainerURL(
      containerURL,
      getUniqueName("newblockblob")
    );
    await newBlockBlobURL.stageBlockFromURL(
      base64encode("1"),
      blockBlobURL.url,
      0
    );

    const listResponse = await newBlockBlobURL.getBlockList(
      "uncommitted"
    );
    assert.equal(listResponse.uncommittedBlocks!.length, 1);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, body.length);
  });

  it("stageBlockFromURL copy source blob as separate blocks", async () => {
    const body = "HelloWorld";
    await blockBlobURL.upload(body, body.length);

    // When testing is in Node.js environment with shared key, setAccessPolicy will work
    // But in browsers testing with SAS tokens, below will throw an exception, ignore it
    try {
      await containerURL.setAccessPolicy("container");
      // tslint:disable-next-line:no-empty
    } catch (err) {}

    const newBlockBlobURL = BlockBlobURL.fromContainerURL(
      containerURL,
      getUniqueName("newblockblob")
    );
    await newBlockBlobURL.stageBlockFromURL(
      base64encode("1"),
      blockBlobURL.url,
      0,
      4
    );
    await newBlockBlobURL.stageBlockFromURL(
      base64encode("2"),
      blockBlobURL.url,
      4,
      4
    );
    await newBlockBlobURL.stageBlockFromURL(
      base64encode("3"),
      blockBlobURL.url,
      8,
      2
    );

    const listResponse = await newBlockBlobURL.getBlockList(
      "uncommitted"
    );
    assert.equal(listResponse.uncommittedBlocks!.length, 3);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, 4);
    assert.equal(listResponse.uncommittedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.uncommittedBlocks![1].size, 4);
    assert.equal(listResponse.uncommittedBlocks![2].name, base64encode("3"));
    assert.equal(listResponse.uncommittedBlocks![2].size, 2);

    await newBlockBlobURL.commitBlockList([
      base64encode("1"),
      base64encode("2"),
      base64encode("3")
    ]);

    const downloadResponse = await newBlockBlobURL.download(0);
    assert.equal(await bodyToString(downloadResponse, 10), body);
  });

  it("commitBlockList", async () => {
    const body = "HelloWorld";
    await blockBlobURL.stageBlock(
      base64encode("1"),
      body,
      body.length
    );
    await blockBlobURL.stageBlock(
      base64encode("2"),
      body,
      body.length
    );
    await blockBlobURL.commitBlockList([
      base64encode("1"),
      base64encode("2")
    ]);
    const listResponse = await blockBlobURL.getBlockList(
      "committed"
    );
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);
  });

  it("commitBlockList with all parameters set", async () => {
    const body = "HelloWorld";
    await blockBlobURL.stageBlock(
      base64encode("1"),
      body,
      body.length
    );
    await blockBlobURL.stageBlock(
      base64encode("2"),
      body,
      body.length
    );

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
    await blockBlobURL.commitBlockList(
      [base64encode("1"), base64encode("2")],
      {
        blobHTTPHeaders: options,
        metadata: options.metadata
      }
    );

    const listResponse = await blockBlobURL.getBlockList(
      "committed"
    );
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);

    const result = await blobURL.download(0);
    assert.deepStrictEqual(
      await bodyToString(result, body.repeat(2).length),
      body.repeat(2)
    );
    assert.deepStrictEqual(result.cacheControl, options.blobCacheControl);
    assert.deepStrictEqual(
      result.contentDisposition,
      options.blobContentDisposition
    );
    assert.deepStrictEqual(result.contentEncoding, options.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, options.blobContentLanguage);
    assert.deepStrictEqual(result.contentType, options.blobContentType);
    assert.deepStrictEqual(result.metadata, options.metadata);
  });

  it("getBlockList", async () => {
    const body = "HelloWorld";
    await blockBlobURL.stageBlock(
      base64encode("1"),
      body,
      body.length
    );
    await blockBlobURL.stageBlock(
      base64encode("2"),
      body,
      body.length
    );
    await blockBlobURL.commitBlockList([base64encode("2")]);
    const listResponse = await blockBlobURL.getBlockList("all");
    assert.equal(listResponse.committedBlocks!.length, 1);
    assert.equal(listResponse.uncommittedBlocks!.length, 0);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
  });
});
