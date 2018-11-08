import * as assert from "assert";

import { isNode } from "ms-rest-js";
import { Aborter } from "../lib/Aborter";
import { BlobURL } from "../lib/BlobURL";
import { BlockBlobURL } from "../lib/BlockBlobURL";
import { ContainerURL } from "../lib/ContainerURL";
import {
  AccessTier,
  BlobType,
  LeaseDurationType,
  LeaseStateType,
  LeaseStatusType,
  ListBlobsIncludeItem
} from "../lib/generated/models";
import { bodyToString, getBSU, getUniqueName, sleep } from "./utils";

describe("BlobURL", () => {
  const serviceURL = getBSU();
  let containerName: string = getUniqueName("container");
  let containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  let blobName: string = getUniqueName("blob");
  let blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  let blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  const content = "Hello World";

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.none);
    blobName = getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
    await blockBlobURL.upload(Aborter.none, content, content.length);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.none);
  });

  it("download with with default parameters", async () => {
    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
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
    await blobURL.setMetadata(Aborter.none, { metadata });
    const result = await blobURL.getProperties(Aborter.none);
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async () => {
    const metadata = {
      a: "a",
      b: "b"
    };
    await blobURL.setMetadata(Aborter.none, { metadata });
    const result = await blobURL.getProperties(Aborter.none);
    assert.deepStrictEqual(result.metadata, metadata);

    await blobURL.setMetadata(Aborter.none);
    const result2 = await blobURL.getProperties(Aborter.none);
    assert.deepStrictEqual(result2.metadata, {});
  });

  it("setHTTPHeaders with default parameters", async () => {
    await blobURL.setHTTPHeaders(Aborter.none, {});
    const result = await blobURL.getProperties(Aborter.none);

    assert.deepStrictEqual(result.blobType, BlobType.BlockBlob);
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
      blobContentMD5: isNode
        ? Buffer.from([1, 2, 3, 4])
        : new Uint8Array([1, 2, 3, 4]),
      blobContentType: "blobContentType"
    };
    await blobURL.setHTTPHeaders(Aborter.none, {
      blobHTTPHeaders: headers
    });
    const result = await blobURL.getProperties(Aborter.none);
    assert.deepStrictEqual(result.blobType, BlobType.BlockBlob);
    assert.ok(result.lastModified);
    assert.deepStrictEqual(result.metadata, {});
    assert.deepStrictEqual(result.cacheControl, headers.blobCacheControl);
    assert.deepStrictEqual(result.contentType, headers.blobContentType);
    assert.deepStrictEqual(result.contentMD5, headers.blobContentMD5);
    assert.deepStrictEqual(result.contentEncoding, headers.blobContentEncoding);
    assert.deepStrictEqual(result.contentLanguage, headers.blobContentLanguage);
    assert.deepStrictEqual(
      result.contentDisposition,
      headers.blobContentDisposition
    );
  });

  it("acquireLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    await blobURL.acquireLease(Aborter.none, guid, duration);

    const result = await blobURL.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, LeaseDurationType.Fixed);
    assert.equal(result.leaseState, LeaseStateType.Leased);
    assert.equal(result.leaseStatus, LeaseStatusType.Locked);

    await blobURL.releaseLease(Aborter.none, guid);
  });

  it("releaseLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    await blobURL.acquireLease(Aborter.none, guid, duration);

    const result = await blobURL.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, LeaseDurationType.Infinite);
    assert.equal(result.leaseState, LeaseStateType.Leased);
    assert.equal(result.leaseStatus, LeaseStatusType.Locked);

    await blobURL.releaseLease(Aborter.none, guid);
  });

  it("renewLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    await blobURL.acquireLease(Aborter.none, guid, duration);

    const result = await blobURL.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, LeaseDurationType.Fixed);
    assert.equal(result.leaseState, LeaseStateType.Leased);
    assert.equal(result.leaseStatus, LeaseStatusType.Locked);

    await sleep(16 * 1000);
    const result2 = await blobURL.getProperties(Aborter.none);
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, LeaseStateType.Expired);
    assert.equal(result2.leaseStatus, LeaseStatusType.Unlocked);

    await blobURL.renewLease(Aborter.none, guid);
    const result3 = await blobURL.getProperties(Aborter.none);
    assert.equal(result3.leaseDuration, LeaseDurationType.Fixed);
    assert.equal(result3.leaseState, LeaseStateType.Leased);
    assert.equal(result3.leaseStatus, LeaseStatusType.Locked);

    await blobURL.releaseLease(Aborter.none, guid);
  });

  it("changeLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    await blobURL.acquireLease(Aborter.none, guid, duration);

    const result = await blobURL.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, LeaseDurationType.Fixed);
    assert.equal(result.leaseState, LeaseStateType.Leased);
    assert.equal(result.leaseStatus, LeaseStatusType.Locked);

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
    assert.equal(result.leaseDuration, LeaseDurationType.Fixed);
    assert.equal(result.leaseState, LeaseStateType.Leased);
    assert.equal(result.leaseStatus, LeaseStatusType.Locked);

    await blobURL.breakLease(Aborter.none, 3);

    const result2 = await blobURL.getProperties(Aborter.none);
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, LeaseStateType.Breaking);
    assert.equal(result2.leaseStatus, LeaseStatusType.Locked);

    await sleep(3 * 1000);

    const result3 = await blobURL.getProperties(Aborter.none);
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, LeaseStateType.Broken);
    assert.equal(result3.leaseStatus, LeaseStatusType.Unlocked);
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

    const result2 = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        include: [ListBlobsIncludeItem.Snapshots]
      }
    );

    // Verify that the snapshot is deleted
    assert.equal(result2.segment.blobItems!.length, 0);
  });

  it("createSnapshot", async () => {
    const result = await blobURL.createSnapshot(Aborter.none);
    assert.ok(result.snapshot);

    const blobSnapshotURL = blobURL.withSnapshot(result.snapshot!);
    await blobSnapshotURL.getProperties(Aborter.none);

    const result3 = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        include: [ListBlobsIncludeItem.Snapshots]
      }
    );

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
    assert.ok(
      result3.segment.blobItems![0].snapshot ||
        result3.segment.blobItems![1].snapshot
    );
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
      await sleep(15 * 1000);
    }

    await blobURL.delete(Aborter.none);

    const result = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        include: [ListBlobsIncludeItem.Deleted]
      }
    );
    assert.ok(result.segment.blobItems![0].deleted);

    await blobURL.undelete(Aborter.none);
    const result2 = await containerURL.listBlobFlatSegment(
      Aborter.none,
      undefined,
      {
        include: [ListBlobsIncludeItem.Deleted]
      }
    );
    assert.ok(!result2.segment.blobItems![0].deleted);
  });

  it("startCopyFromURL", async () => {
    const newBlobURL = BlobURL.fromContainerURL(
      containerURL,
      getUniqueName("copiedblob")
    );
    const result = await newBlobURL.startCopyFromURL(Aborter.none, blobURL.url);
    assert.ok(result.copyId);

    const properties1 = await blobURL.getProperties(Aborter.none);
    const properties2 = await newBlobURL.getProperties(Aborter.none);
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    assert.deepStrictEqual(properties2.copySource, blobURL.url);
  });

  it("abortCopyFromURL should failed for a completed copy operation", async () => {
    const newBlobURL = BlobURL.fromContainerURL(
      containerURL,
      getUniqueName("copiedblob")
    );
    const result = await newBlobURL.startCopyFromURL(Aborter.none, blobURL.url);
    assert.ok(result.copyId);
    sleep(1 * 1000);

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
    await blockBlobURL.setTier(Aborter.none, AccessTier.Cool);
    const properties = await blockBlobURL.getProperties(Aborter.none);
    assert.equal(properties.accessTier!.toLowerCase(), "cool");
  });

  it("setTier set archive to hot", async () => {
    await blockBlobURL.setTier(Aborter.none, AccessTier.Archive);
    let properties = await blockBlobURL.getProperties(Aborter.none);
    assert.equal(properties.accessTier!.toLowerCase(), "archive");

    await blockBlobURL.setTier(Aborter.none, AccessTier.Hot);
    properties = await blockBlobURL.getProperties(Aborter.none);
    if (properties.archiveStatus) {
      assert.equal(
        properties.archiveStatus.toLowerCase(),
        "rehydrate-pending-to-hot"
      );
    }
  });
});
