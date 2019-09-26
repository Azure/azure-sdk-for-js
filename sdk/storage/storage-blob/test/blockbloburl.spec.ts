import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { BlobURL } from "../src/BlobURL";
import { BlockBlobURL } from "../src/BlockBlobURL";
import { ContainerURL } from "../src/ContainerURL";
import { base64encode, bodyToString, getBSU } from "./utils";
import { record } from "./utils/recorder";
import * as dotenv from "dotenv";
import { Test_CPK_INFO } from "./utils/constants";
import { BlockBlobTier } from "../src";
dotenv.config({ path: "../.env" });

describe("BlockBlobURL", () => {
  const serviceURL = getBSU();
  let containerName: string;
  let containerURL: ContainerURL;
  let blobName: string;
  let blobURL: BlobURL;
  let blockBlobURL: BlockBlobURL;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.none);
    blobName = recorder.getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.none);
    recorder.stop();
  });

  it("upload with string body and default parameters", async () => {
    const body: string = recorder.getUniqueName("randomstring");
    await blockBlobURL.upload(Aborter.none, body, body.length);
    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
  });

  it("upload with string body and all parameters set", async () => {
    const body: string = recorder.getUniqueName("randomstring");
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
    await blockBlobURL.upload(Aborter.none, body, body.length, {
      blobHTTPHeaders: options,
      metadata: options.metadata,
      tier: BlockBlobTier.Cool
    });
    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, body.length), body);
    assert.deepStrictEqual(result.cacheControl, options.blobCacheControl);
    assert.deepStrictEqual(result.contentDisposition, options.blobContentDisposition);
    assert.deepStrictEqual(result.contentEncoding, options.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, options.blobContentLanguage);
    assert.deepStrictEqual(result.contentType, options.blobContentType);
    assert.deepStrictEqual(result.metadata, options.metadata);

    const gResp = await blobURL.getProperties(Aborter.none);
    assert.equal(gResp.accessTier, BlockBlobTier.Cool);
  });

  it("stageBlock", async () => {
    const body = "HelloWorld";
    await blockBlobURL.stageBlock(Aborter.none, base64encode("1"), body, body.length);
    await blockBlobURL.stageBlock(Aborter.none, base64encode("2"), body, body.length);
    const listResponse = await blockBlobURL.getBlockList(Aborter.none, "uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 2);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, body.length);
    assert.equal(listResponse.uncommittedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.uncommittedBlocks![1].size, body.length);
  });

  it("stageBlockFromURL copy source blob as single block", async () => {
    const body = "HelloWorld";
    await blockBlobURL.upload(Aborter.none, body, body.length);

    // When testing is in Node.js environment with shared key, setAccessPolicy will work
    // But in browsers testing with SAS tokens, below will throw an exception, ignore it
    try {
      await containerURL.setAccessPolicy(Aborter.none, "container");
      // tslint:disable-next-line:no-empty
    } catch (err) {}

    const newBlockBlobURL = BlockBlobURL.fromContainerURL(
      containerURL,
      recorder.getUniqueName("newblockblob")
    );
    await newBlockBlobURL.stageBlockFromURL(Aborter.none, base64encode("1"), blockBlobURL.url, 0);

    const listResponse = await newBlockBlobURL.getBlockList(Aborter.none, "uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 1);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, body.length);
  });

  it("stageBlockFromURL copy source blob as separate blocks", async () => {
    const body = "HelloWorld";
    await blockBlobURL.upload(Aborter.none, body, body.length);

    // When testing is in Node.js environment with shared key, setAccessPolicy will work
    // But in browsers testing with SAS tokens, below will throw an exception, ignore it
    try {
      await containerURL.setAccessPolicy(Aborter.none, "container");
      // tslint:disable-next-line:no-empty
    } catch (err) {}

    const newBlockBlobURL = BlockBlobURL.fromContainerURL(
      containerURL,
      recorder.getUniqueName("newblockblob")
    );
    await newBlockBlobURL.stageBlockFromURL(
      Aborter.none,
      base64encode("1"),
      blockBlobURL.url,
      0,
      4
    );
    await newBlockBlobURL.stageBlockFromURL(
      Aborter.none,
      base64encode("2"),
      blockBlobURL.url,
      4,
      4
    );
    await newBlockBlobURL.stageBlockFromURL(
      Aborter.none,
      base64encode("3"),
      blockBlobURL.url,
      8,
      2
    );

    const listResponse = await newBlockBlobURL.getBlockList(Aborter.none, "uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 3);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, 4);
    assert.equal(listResponse.uncommittedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.uncommittedBlocks![1].size, 4);
    assert.equal(listResponse.uncommittedBlocks![2].name, base64encode("3"));
    assert.equal(listResponse.uncommittedBlocks![2].size, 2);

    await newBlockBlobURL.commitBlockList(Aborter.none, [
      base64encode("1"),
      base64encode("2"),
      base64encode("3")
    ]);

    const downloadResponse = await newBlockBlobURL.download(Aborter.none, 0);
    assert.equal(await bodyToString(downloadResponse, 10), body);
  });

  it("commitBlockList", async () => {
    const body = "HelloWorld";
    await blockBlobURL.stageBlock(Aborter.none, base64encode("1"), body, body.length);
    await blockBlobURL.stageBlock(Aborter.none, base64encode("2"), body, body.length);
    await blockBlobURL.commitBlockList(Aborter.none, [base64encode("1"), base64encode("2")]);
    const listResponse = await blockBlobURL.getBlockList(Aborter.none, "committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);
  });

  it("commitBlockList with all parameters set", async () => {
    const body = "HelloWorld";
    await blockBlobURL.stageBlock(Aborter.none, base64encode("1"), body, body.length);
    await blockBlobURL.stageBlock(Aborter.none, base64encode("2"), body, body.length);

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
    await blockBlobURL.commitBlockList(Aborter.none, [base64encode("1"), base64encode("2")], {
      blobHTTPHeaders: options,
      metadata: options.metadata,
      tier: BlockBlobTier.Cool
    });

    const listResponse = await blockBlobURL.getBlockList(Aborter.none, "committed");
    assert.equal(listResponse.committedBlocks!.length, 2);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
    assert.equal(listResponse.committedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![1].size, body.length);

    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, body.repeat(2).length), body.repeat(2));
    assert.deepStrictEqual(result.cacheControl, options.blobCacheControl);
    assert.deepStrictEqual(result.contentDisposition, options.blobContentDisposition);
    assert.deepStrictEqual(result.contentEncoding, options.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, options.blobContentLanguage);
    assert.deepStrictEqual(result.contentType, options.blobContentType);
    assert.deepStrictEqual(result.metadata, options.metadata);

    const gResp = await blobURL.getProperties(Aborter.none);
    assert.equal(gResp.accessTier, BlockBlobTier.Cool);
  });

  it("getBlockList", async () => {
    const body = "HelloWorld";
    await blockBlobURL.stageBlock(Aborter.none, base64encode("1"), body, body.length);
    await blockBlobURL.stageBlock(Aborter.none, base64encode("2"), body, body.length);
    await blockBlobURL.commitBlockList(Aborter.none, [base64encode("2")]);
    const listResponse = await blockBlobURL.getBlockList(Aborter.none, "all");
    assert.equal(listResponse.committedBlocks!.length, 1);
    assert.equal(listResponse.uncommittedBlocks!.length, 0);
    assert.equal(listResponse.committedBlocks![0].name, base64encode("2"));
    assert.equal(listResponse.committedBlocks![0].size, body.length);
  });

  it("upload and download with CPK", async () => {
    const body: string = recorder.getUniqueName("randomstring");
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
    const uResp = await blockBlobURL.upload(Aborter.none, body, body.length, {
      blobHTTPHeaders: options,
      metadata: options.metadata,
      customerProvidedKey: Test_CPK_INFO
    });
    assert.equal(uResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);
    const result = await blobURL.download(Aborter.none, 0, undefined, {
      customerProvidedKey: Test_CPK_INFO
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
    await blockBlobURL.upload(Aborter.none, body, body.length);

    // When testing is in Node.js environment with shared key, setAccessPolicy will work
    // But in browsers testing with SAS tokens, below will throw an exception, ignore it
    try {
      await containerURL.setAccessPolicy(Aborter.none, "container");
      // tslint:disable-next-line:no-empty
    } catch (err) {}

    const newBlockBlobURL = BlockBlobURL.fromContainerURL(
      containerURL,
      recorder.getUniqueName("newblockblob")
    );
    const sResp = await newBlockBlobURL.stageBlock(
      Aborter.none,
      base64encode("1"),
      body.substring(0, 4),
      4,
      { customerProvidedKey: Test_CPK_INFO }
    );
    assert.equal(sResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const sResp2 = await newBlockBlobURL.stageBlockFromURL(
      Aborter.none,
      base64encode("2"),
      blockBlobURL.url,
      4,
      4,
      { customerProvidedKey: Test_CPK_INFO }
    );
    assert.equal(sResp2.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    await newBlockBlobURL.stageBlockFromURL(
      Aborter.none,
      base64encode("3"),
      blockBlobURL.url,
      8,
      2,
      { customerProvidedKey: Test_CPK_INFO }
    );

    const listResponse = await newBlockBlobURL.getBlockList(Aborter.none, "uncommitted");
    assert.equal(listResponse.uncommittedBlocks!.length, 3);
    assert.equal(listResponse.uncommittedBlocks![0].name, base64encode("1"));
    assert.equal(listResponse.uncommittedBlocks![0].size, 4);
    assert.equal(listResponse.uncommittedBlocks![1].name, base64encode("2"));
    assert.equal(listResponse.uncommittedBlocks![1].size, 4);
    assert.equal(listResponse.uncommittedBlocks![2].name, base64encode("3"));
    assert.equal(listResponse.uncommittedBlocks![2].size, 2);

    const cmResp = await newBlockBlobURL.commitBlockList(
      Aborter.none,
      [base64encode("1"), base64encode("2"), base64encode("3")],
      { customerProvidedKey: Test_CPK_INFO }
    );
    assert.equal(cmResp.encryptionKeySha256, Test_CPK_INFO.encryptionKeySha256);

    const downloadResponse = await newBlockBlobURL.download(Aborter.none, 0, undefined, {
      customerProvidedKey: Test_CPK_INFO
    });
    assert.equal(await bodyToString(downloadResponse, 10), body);
  });

  it("download without CPK should fail, if upload with CPK", async () => {
    const body: string = recorder.getUniqueName("randomstring");
    await blockBlobURL.upload(Aborter.none, body, body.length, {
      customerProvidedKey: Test_CPK_INFO
    });

    let exceptionCaught = false;
    try {
      await blobURL.download(Aborter.none, 0);
    } catch (error) {
      // HTTP/1.1 409 The blob is encrypted with customer specified encryption, but it was not provided in the request.
      exceptionCaught = true;
    }

    assert.ok(exceptionCaught);
  });

  it("stageBlock with invalid CRC64 should fail", async () => {
       const content = "Hello World!";
    let exceptionCaught = false;
    try
    {
      await blockBlobURL.stageBlock(Aborter.none, base64encode("1"), content, content.length, {
        transactionalContentCrc64: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      });
    } catch (err) {
      if (err instanceof Error && err.message.indexOf("Crc64Mismatch") != -1) {
        exceptionCaught = true;
      }
    }

    assert.ok(exceptionCaught);
  });
});
