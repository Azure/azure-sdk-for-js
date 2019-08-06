import { isNode } from "@azure/ms-rest-js";
import * as assert from "assert";
import * as dotenv from "dotenv";

import { Aborter } from "../src/Aborter";
import { BlobURL } from "../src/BlobURL";
import { BlockBlobURL } from "../src/BlockBlobURL";
import { ContainerURL } from "../src/ContainerURL";
import { bodyToString, getBSU } from "./utils";
import { delay, record } from "./utils/recorder";

dotenv.config({ path: "../.env" });

describe("BlobURL", () => {
  const serviceURL = getBSU();
  let containerName: string;
  let containerURL: ContainerURL;
  let blobName: string;
  let blobURL: BlobURL;
  let blockBlobURL: BlockBlobURL;
  const content = "Hello World";

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.none);
    blobName = recorder.getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
    await blockBlobURL.upload(Aborter.none, content, content.length);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.none);
    recorder.stop();
  });

  it("download with default parameters", async () => {
    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("download should not have aborted error after download finishes", async () => {
    const aborter = Aborter.none;
    const result = await blobURL.download(aborter, 0);
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    aborter.abort();
  });

  it("download all parameters set", async () => {
    const result = await blobURL.download(Aborter.none, 0, 1, {
      rangeGetContentMD5: true
    });
    assert.deepStrictEqual(await bodyToString(result, 1), content[0]);
  });

  it("setMetadata with new metadata set", async () => {
    const metadata = {
      a: "a",
      b: "b"
    };
    await blobURL.setMetadata(Aborter.none, metadata);
    const result = await blobURL.getProperties(Aborter.none);
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async () => {
    const metadata = {
      a: "a",
      b: "b"
    };
    await blobURL.setMetadata(Aborter.none, metadata);
    const result = await blobURL.getProperties(Aborter.none);
    assert.deepStrictEqual(result.metadata, metadata);

    await blobURL.setMetadata(Aborter.none);
    const result2 = await blobURL.getProperties(Aborter.none);
    assert.deepStrictEqual(result2.metadata, {});
  });

  it("setHTTPHeaders with default parameters", async () => {
    await blobURL.setHTTPHeaders(Aborter.none, {});
    const result = await blobURL.getProperties(Aborter.none);

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
    await blobURL.setHTTPHeaders(Aborter.none, headers);
    const result = await blobURL.getProperties(Aborter.none);
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
    await blobURL.acquireLease(Aborter.none, guid, duration);

    const result = await blobURL.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await blobURL.releaseLease(Aborter.none, guid);
  });

  it("releaseLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    await blobURL.acquireLease(Aborter.none, guid, duration);

    const result = await blobURL.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await blobURL.releaseLease(Aborter.none, guid);
  });

  it("renewLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    await blobURL.acquireLease(Aborter.none, guid, duration);

    const result = await blobURL.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await delay(20 * 1000);

    const result2 = await blobURL.getProperties(Aborter.none);
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "expired");
    assert.equal(result2.leaseStatus, "unlocked");

    await blobURL.renewLease(Aborter.none, guid);
    const result3 = await blobURL.getProperties(Aborter.none);
    assert.equal(result3.leaseDuration, "fixed");
    assert.equal(result3.leaseState, "leased");
    assert.equal(result3.leaseStatus, "locked");

    await blobURL.releaseLease(Aborter.none, guid);
  });

  it("changeLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    await blobURL.acquireLease(Aborter.none, guid, duration);

    const result = await blobURL.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await blobURL.changeLease(Aborter.none, guid, newGuid);

    await blobURL.getProperties(Aborter.none);
    await blobURL.releaseLease(Aborter.none, newGuid);
  });

  it("breakLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    await blobURL.acquireLease(Aborter.none, guid, duration);

    const result = await blobURL.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await blobURL.breakLease(Aborter.none, 5);

    const result2 = await blobURL.getProperties(Aborter.none);
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "breaking");
    assert.equal(result2.leaseStatus, "locked");

    await delay(5 * 1000);

    const result3 = await blobURL.getProperties(Aborter.none);
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    assert.equal(result3.leaseStatus, "unlocked");
  });

  it("delete", async () => {
    await blobURL.delete(Aborter.none);
  });

  // The following code illustrates deleting a snapshot after creating one
  it("delete snapshot", async () => {
    const result = await blobURL.createSnapshot(Aborter.none);
    assert.ok(result.snapshot);

    const blobSnapshotURL = blobURL.withSnapshot(result.snapshot!);
    await blobSnapshotURL.getProperties(Aborter.none);

    await blobSnapshotURL.delete(Aborter.none);
    await blobURL.delete(Aborter.none);

    const result2 = await containerURL.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["snapshots"]
    });

    // Verify that the snapshot is deleted
    assert.equal(result2.segment.blobItems!.length, 0);
  });

  it("createSnapshot", async () => {
    const result = await blobURL.createSnapshot(Aborter.none);
    assert.ok(result.snapshot);

    const blobSnapshotURL = blobURL.withSnapshot(result.snapshot!);
    await blobSnapshotURL.getProperties(Aborter.none);

    const result3 = await containerURL.listBlobFlatSegment(Aborter.none, undefined, {
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
    const properties = await serviceURL.getProperties(Aborter.none);
    if (!properties.deleteRetentionPolicy!.enabled) {
      await serviceURL.setProperties(Aborter.none, {
        deleteRetentionPolicy: {
          days: 7,
          enabled: true
        }
      });
      await delay(15 * 1000);
    }

    await blobURL.delete(Aborter.none);

    const result = await containerURL.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["deleted"]
    });
    assert.ok(result.segment.blobItems![0].deleted);

    await blobURL.undelete(Aborter.none);
    const result2 = await containerURL.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["deleted"]
    });
    assert.ok(!result2.segment.blobItems![0].deleted);
  });

  it("startCopyFromURL", async () => {
    const newBlobURL = BlobURL.fromContainerURL(containerURL, recorder.getUniqueName("copiedblob"));
    const result = await newBlobURL.startCopyFromURL(Aborter.none, blobURL.url);
    assert.ok(result.copyId);

    const properties1 = await blobURL.getProperties(Aborter.none);
    const properties2 = await newBlobURL.getProperties(Aborter.none);
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    assert.deepStrictEqual(properties2.copySource, blobURL.url);
  });

  it("abortCopyFromURL should failed for a completed copy operation", async () => {
    const newBlobURL = BlobURL.fromContainerURL(containerURL, recorder.getUniqueName("copiedblob"));
    const result = await newBlobURL.startCopyFromURL(Aborter.none, blobURL.url);
    assert.ok(result.copyId);
    delay(1 * 1000);

    try {
      await newBlobURL.abortCopyFromURL(Aborter.none, result.copyId!);
      assert.fail(
        "AbortCopyFromURL should be failed and throw exception for an completed copy operation."
      );
    } catch (err) {
      assert.ok(true);
    }
  });

  it("setTier set default to cool", async () => {
    await blockBlobURL.setTier(Aborter.none, "Cool");
    const properties = await blockBlobURL.getProperties(Aborter.none);
    assert.equal(properties.accessTier!.toLowerCase(), "cool");
  });

  it("setTier set archive to hot", async () => {
    await blockBlobURL.setTier(Aborter.none, "Archive");
    let properties = await blockBlobURL.getProperties(Aborter.none);
    assert.equal(properties.accessTier!.toLowerCase(), "archive");

    await blockBlobURL.setTier(Aborter.none, "Hot");
    properties = await blockBlobURL.getProperties(Aborter.none);
    if (properties.archiveStatus) {
      assert.equal(properties.archiveStatus.toLowerCase(), "rehydrate-pending-to-hot");
    }
  });
});
