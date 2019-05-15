import * as assert from "assert";

import { isNode } from "@azure/ms-rest-js";
import { Aborter } from "../src/Aborter";
import { BlobClient } from "../src/BlobClient";
import { BlockBlobClient } from "../src/BlockBlobClient";
import { ContainerClient } from "../src/ContainerClient";
import { bodyToString, getBSU, getUniqueName, sleep } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });
describe("BlobClient", () => {
  const serviceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
  let blobName: string = getUniqueName("blob");
  let blobClient = BlobClient.fromContainerClient(containerClient, blobName);
  let blockBlobClient = BlockBlobClient.fromBlobClient(blobClient);
  const content = "Hello World";

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
    await containerClient.create(Aborter.none);
    blobName = getUniqueName("blob");
    blobClient = BlobClient.fromContainerClient(containerClient, blobName);
    blockBlobClient = BlockBlobClient.fromBlobClient(blobClient);
    await blockBlobClient.upload(Aborter.none, content, content.length);
  });

  afterEach(async () => {
    await containerClient.delete(Aborter.none);
  });

  it("download with with default parameters", async () => {
    const result = await blobClient.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("download all parameters set", async () => {
    const result = await blobClient.download(Aborter.none, 0, 1, {
      rangeGetContentMD5: true
    });
    assert.deepStrictEqual(await bodyToString(result, 1), content[0]);
  });

  it("setMetadata with new metadata set", async () => {
    const metadata = {
      a: "a",
      b: "b"
    };
    await blobClient.setMetadata(Aborter.none, metadata);
    const result = await blobClient.getProperties(Aborter.none);
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async () => {
    const metadata = {
      a: "a",
      b: "b"
    };
    await blobClient.setMetadata(Aborter.none, metadata);
    const result = await blobClient.getProperties(Aborter.none);
    assert.deepStrictEqual(result.metadata, metadata);

    await blobClient.setMetadata(Aborter.none);
    const result2 = await blobClient.getProperties(Aborter.none);
    assert.deepStrictEqual(result2.metadata, {});
  });

  it("setHTTPHeaders with default parameters", async () => {
    await blobClient.setHTTPHeaders(Aborter.none, {});
    const result = await blobClient.getProperties(Aborter.none);

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
    await blobClient.setHTTPHeaders(Aborter.none, headers);
    const result = await blobClient.getProperties(Aborter.none);
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

  it("acquireLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    await blobClient.acquireLease(Aborter.none, guid, duration);

    const result = await blobClient.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await blobClient.releaseLease(Aborter.none, guid);
  });

  it("releaseLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    await blobClient.acquireLease(Aborter.none, guid, duration);

    const result = await blobClient.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await blobClient.releaseLease(Aborter.none, guid);
  });

  it("renewLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    await blobClient.acquireLease(Aborter.none, guid, duration);

    const result = await blobClient.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await sleep(20 * 1000);

    const result2 = await blobClient.getProperties(Aborter.none);
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "expired");
    assert.equal(result2.leaseStatus, "unlocked");

    await blobClient.renewLease(Aborter.none, guid);
    const result3 = await blobClient.getProperties(Aborter.none);
    assert.equal(result3.leaseDuration, "fixed");
    assert.equal(result3.leaseState, "leased");
    assert.equal(result3.leaseStatus, "locked");

    await blobClient.releaseLease(Aborter.none, guid);
  });

  it("changeLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    await blobClient.acquireLease(Aborter.none, guid, duration);

    const result = await blobClient.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await blobClient.changeLease(Aborter.none, guid, newGuid);

    await blobClient.getProperties(Aborter.none);
    await blobClient.releaseLease(Aborter.none, newGuid);
  });

  it("breakLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    await blobClient.acquireLease(Aborter.none, guid, duration);

    const result = await blobClient.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await blobClient.breakLease(Aborter.none, 5);

    const result2 = await blobClient.getProperties(Aborter.none);
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "breaking");
    assert.equal(result2.leaseStatus, "locked");

    await sleep(5 * 1000);

    const result3 = await blobClient.getProperties(Aborter.none);
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    assert.equal(result3.leaseStatus, "unlocked");
  });

  it("delete", async () => {
    await blobClient.delete(Aborter.none);
  });

  // The following code illustrates deleting a snapshot after creating one
  it("delete snapshot", async () => {
    const result = await blobClient.createSnapshot(Aborter.none);
    assert.ok(result.snapshot);

    const blobSnapshotClient = blobClient.withSnapshot(result.snapshot!);
    await blobSnapshotClient.getProperties(Aborter.none);

    await blobSnapshotClient.delete(Aborter.none);
    await blobClient.delete(Aborter.none);

    const result2 = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["snapshots"]
    });

    // Verify that the snapshot is deleted
    assert.equal(result2.segment.blobItems!.length, 0);
  });

  it("createSnapshot", async () => {
    const result = await blobClient.createSnapshot(Aborter.none);
    assert.ok(result.snapshot);

    const blobSnapshotClient = blobClient.withSnapshot(result.snapshot!);
    await blobSnapshotClient.getProperties(Aborter.none);

    const result3 = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["snapshots"]
    });

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
    const properties = await serviceClient.getProperties(Aborter.none);
    if (!properties.deleteRetentionPolicy!.enabled) {
      await serviceClient.setProperties(Aborter.none, {
        deleteRetentionPolicy: {
          days: 7,
          enabled: true
        }
      });
      await sleep(15 * 1000);
    }

    await blobClient.delete(Aborter.none);

    const result = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["deleted"]
    });
    assert.ok(result.segment.blobItems![0].deleted);

    await blobClient.undelete(Aborter.none);
    const result2 = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["deleted"]
    });
    assert.ok(!result2.segment.blobItems![0].deleted);
  });

  it("startCopyFromClient", async () => {
    const newBlobClient = BlobClient.fromContainerClient(
      containerClient,
      getUniqueName("copiedblob")
    );
    const result = await newBlobClient.startCopyFromURL(Aborter.none, blobClient.url);
    assert.ok(result.copyId);

    const properties1 = await blobClient.getProperties(Aborter.none);
    const properties2 = await newBlobClient.getProperties(Aborter.none);
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    assert.deepStrictEqual(properties2.copySource, blobClient.url);
  });

  it("abortCopyFromClient should failed for a completed copy operation", async () => {
    const newBlobClient = BlobClient.fromContainerClient(
      containerClient,
      getUniqueName("copiedblob")
    );
    const result = await newBlobClient.startCopyFromURL(Aborter.none, blobClient.url);
    assert.ok(result.copyId);
    sleep(1 * 1000);

    try {
      await newBlobClient.startCopyFromURL(Aborter.none, result.copyId!);
      assert.fail(
        "AbortCopyFromClient should be failed and throw exception for an completed copy operation."
      );
    } catch (err) {
      assert.ok(true);
    }
  });

  it("setTier set default to cool", async () => {
    await blockBlobClient.setTier(Aborter.none, "Cool");
    const properties = await blockBlobClient.getProperties(Aborter.none);
    assert.equal(properties.accessTier!.toLowerCase(), "cool");
  });

  it("setTier set archive to hot", async () => {
    await blockBlobClient.setTier(Aborter.none, "Archive");
    let properties = await blockBlobClient.getProperties(Aborter.none);
    assert.equal(properties.accessTier!.toLowerCase(), "archive");

    await blockBlobClient.setTier(Aborter.none, "Hot");
    properties = await blockBlobClient.getProperties(Aborter.none);
    if (properties.archiveStatus) {
      assert.equal(properties.archiveStatus.toLowerCase(), "rehydrate-pending-to-hot");
    }
  });
});
