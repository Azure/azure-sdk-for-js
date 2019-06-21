import * as assert from "assert";

import { isNode } from "@azure/ms-rest-js";
import * as dotenv from "dotenv";
import { bodyToString, getBSU, getUniqueName, sleep } from "./utils";
dotenv.config({ path: "../.env" });

describe("BlobClient", () => {
  const blobServiceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = blobServiceClient.createContainerClient(containerName);
  let blobName: string = getUniqueName("blob");
  let blobClient = containerClient.createBlobClient(blobName);
  let blockBlobClient = blobClient.createBlockBlobClient();
  const content = "Hello World";

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = blobServiceClient.createContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob");
    blobClient = containerClient.createBlobClient(blobName);
    blockBlobClient = blobClient.createBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
  });

  afterEach(async () => {
    await containerClient.delete();
  });

  it("download with with default parameters", async () => {
    const result = await blobClient.download();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("download all parameters set", async () => {
    const result = await blobClient.download(0, 1, {
      rangeGetContentMD5: true
    });
    assert.deepStrictEqual(await bodyToString(result, 1), content[0]);
  });

  it("setMetadata with new metadata set", async () => {
    const metadata = {
      a: "a",
      b: "b"
    };
    await blobClient.setMetadata(metadata);
    const result = await blobClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async () => {
    const metadata = {
      a: "a",
      b: "b"
    };
    await blobClient.setMetadata(metadata);
    const result = await blobClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);

    await blobClient.setMetadata();
    const result2 = await blobClient.getProperties();
    assert.deepStrictEqual(result2.metadata, {});
  });

  it("setHTTPHeaders with default parameters", async () => {
    await blobClient.setHTTPHeaders({});
    const result = await blobClient.getProperties();

    assert.deepStrictEqual(result.blobType, "BlockBlob");
    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.ok(!result.cacheControl);
    assert.ok(!result.contentType);
    assert.ok(!result.contentMD5);
    assert.ok(!result.contentEncoding);
    assert.ok(!result.contentLanguage);
    assert.ok(!result.contentDisposition);
  });

  it("setHTTPHeaders with all parameters set", async () => {
    const headers = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentMD5: isNode ? Buffer.from([1, 2, 3, 4]) : new Uint8Array([1, 2, 3, 4]),
      blobContentType: "blobContentType"
    };
    await blobClient.setHTTPHeaders(headers);
    const result = await blobClient.getProperties();
    assert.ok(result.date);
    assert.deepStrictEqual(result.blobType, "BlockBlob");
    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.deepStrictEqual(result.cacheControl, headers.blobCacheControl);
    assert.deepStrictEqual(result.contentType, headers.blobContentType);
    assert.deepStrictEqual(result.contentMD5, headers.blobContentMD5);
    assert.deepStrictEqual(result.contentEncoding, headers.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, headers.blobContentLanguage);
    assert.deepStrictEqual(result.contentDisposition, headers.blobContentDisposition);
  });

  it("delete", async () => {
    await blobClient.delete();
  });

  // The following code illustrates deleting a snapshot after creating one
  it("delete snapshot", async () => {
    const result = await blobClient.createSnapshot();
    assert.ok(result.snapshot);

    const blobSnapshotClient = blobClient.withSnapshot(result.snapshot!);
    await blobSnapshotClient.getProperties();

    await blobSnapshotClient.delete();
    await blobClient.delete();

    const result2 = (await (await containerClient
      .listBlobsFlat({
        include: ["snapshots"]
      })
      .byPage()).next()).value;

    // Verify that the snapshot is deleted
    assert.equal(result2.segment.blobItems!.length, 0);
  });

  it("createSnapshot", async () => {
    const result = await blobClient.createSnapshot();
    assert.ok(result.snapshot);

    const blobSnapshotClient = blobClient.withSnapshot(result.snapshot!);
    await blobSnapshotClient.getProperties();

    const result3 = (await (await containerClient
      .listBlobsFlat({
        include: ["snapshots"]
      })
      .byPage()).next()).value;

    // As a snapshot doesn't have leaseStatus and leaseState properties but origin blob has,
    // let assign them to undefined both for other properties' easy comparison
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.leaseState = result3.segment.blobItems![1].properties.leaseState = undefined;
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.leaseStatus = result3.segment.blobItems![1].properties.leaseStatus = undefined;
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.accessTier = result3.segment.blobItems![1].properties.accessTier = undefined;
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.accessTierInferred = result3.segment.blobItems![1].properties.accessTierInferred = undefined;

    assert.deepStrictEqual(
      result3.segment.blobItems![0].properties,
      result3.segment.blobItems![1].properties
    );
    assert.ok(result3.segment.blobItems![0].snapshot || result3.segment.blobItems![1].snapshot);
  });

  it("undelete", async () => {
    const properties = await blobServiceClient.getProperties();
    if (!properties.deleteRetentionPolicy!.enabled) {
      await blobServiceClient.setProperties({
        deleteRetentionPolicy: {
          days: 7,
          enabled: true
        }
      });
      await sleep(15 * 1000);
    }

    await blobClient.delete();

    const result = (await (await containerClient
      .listBlobsFlat({
        include: ["deleted"]
      })
      .byPage()).next()).value;

    assert.ok(result.segment.blobItems![0].deleted);

    await blobClient.undelete();

    const result2 = (await (await containerClient
      .listBlobsFlat({
        include: ["deleted"]
      })
      .byPage()).next()).value;

    assert.ok(!result2.segment.blobItems![0].deleted);
  });

  it("startCopyFromClient", async () => {
    const newBlobClient = containerClient.createBlobClient(getUniqueName("copiedblob"));
    const result = await newBlobClient.startCopyFromURL(blobClient.url);
    assert.ok(result.copyId);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    assert.deepStrictEqual(properties2.copySource, blobClient.url);
  });

  it("abortCopyFromClient should failed for a completed copy operation", async () => {
    const newBlobClient = containerClient.createBlobClient(getUniqueName("copiedblob"));
    const result = await newBlobClient.startCopyFromURL(blobClient.url);
    assert.ok(result.copyId);
    sleep(1 * 1000);

    try {
      await newBlobClient.startCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromClient should be failed and throw exception for an completed copy operation."
      );
    } catch (err) {
      assert.ok(true);
    }
  });

  it("setTier set default to cool", async () => {
    await blockBlobClient.setTier("Cool");
    const properties = await blockBlobClient.getProperties();
    assert.equal(properties.accessTier!.toLowerCase(), "cool");
  });

  it("setTier set archive to hot", async () => {
    await blockBlobClient.setTier("Archive");
    let properties = await blockBlobClient.getProperties();
    assert.equal(properties.accessTier!.toLowerCase(), "archive");

    await blockBlobClient.setTier("Hot");
    properties = await blockBlobClient.getProperties();
    if (properties.archiveStatus) {
      assert.equal(properties.archiveStatus.toLowerCase(), "rehydrate-pending-to-hot");
    }
  });
});
