import * as assert from 'assert';

import { isNode } from 'ms-rest-js';
import { Aborter } from '../lib/Aborter';
import { BlobURL } from '../lib/BlobURL';
import { BlockBlobURL } from '../lib/BlockBlobURL';
import { ContainerURL } from '../lib/ContainerURL';
import {
  AccessTier,
  BlobType,
  LeaseDurationType,
  LeaseStateType,
  LeaseStatusType,
  ListBlobsIncludeItem
} from '../lib/generated/models';
import { bodyToString, getBSU, getUniqueName, sleep } from './utils';

describe('BlobURL', () => {
  const serviceURL = getBSU();
  let containerName: string = getUniqueName('container');
  let containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
  let blobName: string = getUniqueName('blob');
  let blobURL = BlobURL.fromContainerURL(containerURL, blobName);
  let blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
  const content = 'Hello World';

  beforeEach(async () => {
    containerName = getUniqueName('container');
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.None);
    blobName = getUniqueName('blob');
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
    await blockBlobURL.upload(Aborter.None, content, content.length);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.None);
  });

  it('download with with default parameters', async () => {
    const result = await blobURL.download(Aborter.None, 0);
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it('download all parameters set', async () => {
    const result = await blobURL.download(Aborter.None, 0, 1, {
      rangeGetContentMD5: true
    });
    assert.deepStrictEqual(await bodyToString(result, 1), content[0]);
  });

  it('setMetadata with new metadata set', async () => {
    const metadata = {
      a: 'a',
      b: 'b'
    };
    await blobURL.setMetadata(Aborter.None, { metadata });
    const result = await blobURL.getProperties(Aborter.None);
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it('setMetadata with cleaning up metadata', async () => {
    const metadata = {
      a: 'a',
      b: 'b'
    };
    await blobURL.setMetadata(Aborter.None, { metadata });
    const result = await blobURL.getProperties(Aborter.None);
    assert.deepStrictEqual(result.metadata, metadata);

    await blobURL.setMetadata(Aborter.None);
    const result2 = await blobURL.getProperties(Aborter.None);
    assert.deepStrictEqual(result2.metadata, {});
  });

  it('setHTTPHeaders with default parameters', async () => {
    await blobURL.setHTTPHeaders(Aborter.None, {});
    const result = await blobURL.getProperties(Aborter.None);

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

  it('setHTTPHeaders with all parameters set', async () => {
    const headers = {
      blobCacheControl: 'blobCacheControl',
      blobContentDisposition: 'blobContentDisposition',
      blobContentEncoding: 'blobContentEncoding',
      blobContentLanguage: 'blobContentLanguage',
      blobContentMD5: isNode
        ? Buffer.from([1, 2, 3, 4])
        : new Uint8Array([1, 2, 3, 4]),
      blobContentType: 'blobContentType'
    };
    await blobURL.setHTTPHeaders(Aborter.None, {
      blobHTTPHeaders: headers
    });
    const result = await blobURL.getProperties(Aborter.None);
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

  it('acquireLease', async () => {
    const guid = 'ca761232ed4211cebacd00aa0057b223';
    const duration = 30;
    await blobURL.acquireLease(Aborter.None, guid, duration);

    const result = await blobURL.getProperties(Aborter.None);
    assert.equal(result.leaseDuration, LeaseDurationType.Fixed);
    assert.equal(result.leaseState, LeaseStateType.Leased);
    assert.equal(result.leaseStatus, LeaseStatusType.Locked);

    await blobURL.releaseLease(Aborter.None, guid);
  });

  it('releaseLease', async () => {
    const guid = 'ca761232ed4211cebacd00aa0057b223';
    const duration = -1;
    await blobURL.acquireLease(Aborter.None, guid, duration);

    const result = await blobURL.getProperties(Aborter.None);
    assert.equal(result.leaseDuration, LeaseDurationType.Infinite);
    assert.equal(result.leaseState, LeaseStateType.Leased);
    assert.equal(result.leaseStatus, LeaseStatusType.Locked);

    await blobURL.releaseLease(Aborter.None, guid);
  });

  it('renewLease', async () => {
    const guid = 'ca761232ed4211cebacd00aa0057b223';
    const duration = 15;
    await blobURL.acquireLease(Aborter.None, guid, duration);

    const result = await blobURL.getProperties(Aborter.None);
    assert.equal(result.leaseDuration, LeaseDurationType.Fixed);
    assert.equal(result.leaseState, LeaseStateType.Leased);
    assert.equal(result.leaseStatus, LeaseStatusType.Locked);

    await sleep(16 * 1000);
    const result2 = await blobURL.getProperties(Aborter.None);
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, LeaseStateType.Expired);
    assert.equal(result2.leaseStatus, LeaseStatusType.Unlocked);

    await blobURL.renewLease(Aborter.None, guid);
    const result3 = await blobURL.getProperties(Aborter.None);
    assert.equal(result3.leaseDuration, LeaseDurationType.Fixed);
    assert.equal(result3.leaseState, LeaseStateType.Leased);
    assert.equal(result3.leaseStatus, LeaseStatusType.Locked);

    await blobURL.releaseLease(Aborter.None, guid);
  });

  it('changeLease', async () => {
    const guid = 'ca761232ed4211cebacd00aa0057b223';
    const duration = 15;
    await blobURL.acquireLease(Aborter.None, guid, duration);

    const result = await blobURL.getProperties(Aborter.None);
    assert.equal(result.leaseDuration, LeaseDurationType.Fixed);
    assert.equal(result.leaseState, LeaseStateType.Leased);
    assert.equal(result.leaseStatus, LeaseStatusType.Locked);

    const newGuid = '3c7e72ebb4304526bc53d8ecef03798f';
    await blobURL.changeLease(Aborter.None, guid, newGuid);

    await blobURL.getProperties(Aborter.None);
    await blobURL.releaseLease(Aborter.None, newGuid);
  });

  it('breakLease', async () => {
    const guid = 'ca761232ed4211cebacd00aa0057b223';
    const duration = 15;
    await blobURL.acquireLease(Aborter.None, guid, duration);

    const result = await blobURL.getProperties(Aborter.None);
    assert.equal(result.leaseDuration, LeaseDurationType.Fixed);
    assert.equal(result.leaseState, LeaseStateType.Leased);
    assert.equal(result.leaseStatus, LeaseStatusType.Locked);

    await blobURL.breakLease(Aborter.None, 3);

    const result2 = await blobURL.getProperties(Aborter.None);
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, LeaseStateType.Breaking);
    assert.equal(result2.leaseStatus, LeaseStatusType.Locked);

    await sleep(3 * 1000);

    const result3 = await blobURL.getProperties(Aborter.None);
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, LeaseStateType.Broken);
    assert.equal(result3.leaseStatus, LeaseStatusType.Unlocked);
  });

  it('delete', async () => {
    await blobURL.delete(Aborter.None);
  });

  // The following code illustrates deleting a snapshot after creating one
  it('delete snapshot', async () => {
    const result = await blobURL.createSnapshot(Aborter.None);
    assert.ok(result.snapshot);

    const blobSnapshotURL = blobURL.withSnapshot(result.snapshot!);
    await blobSnapshotURL.getProperties(Aborter.None);

    await blobSnapshotURL.delete(Aborter.None);
    await blobURL.delete(Aborter.None);

    const result2 = await containerURL.listBlobFlatSegment(
      Aborter.None,
      undefined,
      {
        include: [ListBlobsIncludeItem.Snapshots]
      }
    );

    // Verify that the snapshot is deleted
    assert.equal(result2.segment.blobItems!.length, 0);
  });

  it('createSnapshot', async () => {
    const result = await blobURL.createSnapshot(Aborter.None);
    assert.ok(result.snapshot);

    const blobSnapshotURL = blobURL.withSnapshot(result.snapshot!);
    await blobSnapshotURL.getProperties(Aborter.None);

    const result3 = await containerURL.listBlobFlatSegment(
      Aborter.None,
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

  it('undelete', async () => {
    const properties = await serviceURL.getProperties(Aborter.None);
    if (!properties.deleteRetentionPolicy!.enabled) {
      await serviceURL.setProperties(Aborter.None, {
        deleteRetentionPolicy: {
          days: 7,
          enabled: true
        }
      });
      await sleep(15 * 1000);
    }

    await blobURL.delete(Aborter.None);

    const result = await containerURL.listBlobFlatSegment(
      Aborter.None,
      undefined,
      {
        include: [ListBlobsIncludeItem.Deleted]
      }
    );
    assert.ok(result.segment.blobItems![0].deleted);

    await blobURL.undelete(Aborter.None);
    const result2 = await containerURL.listBlobFlatSegment(
      Aborter.None,
      undefined,
      {
        include: [ListBlobsIncludeItem.Deleted]
      }
    );
    assert.ok(!result2.segment.blobItems![0].deleted);
  });

  it('startCopyFromURL', async () => {
    const newBlobURL = BlobURL.fromContainerURL(
      containerURL,
      getUniqueName('copiedblob')
    );
    const result = await newBlobURL.startCopyFromURL(Aborter.None, blobURL.url);
    assert.ok(result.copyId);

    const properties1 = await blobURL.getProperties(Aborter.None);
    const properties2 = await newBlobURL.getProperties(Aborter.None);
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    assert.deepStrictEqual(properties2.copySource, blobURL.url);
  });

  it('abortCopyFromURL should failed for a completed copy operation', async () => {
    const newBlobURL = BlobURL.fromContainerURL(
      containerURL,
      getUniqueName('copiedblob')
    );
    const result = await newBlobURL.startCopyFromURL(Aborter.None, blobURL.url);
    assert.ok(result.copyId);
    sleep(1 * 1000);

    try {
      await newBlobURL.abortCopyFromURL(Aborter.None, result.copyId!);
      assert.fail(
        'AbortCopyFromURL should be failed and throw exception for an completed copy operation.'
      );
    } catch (err) {
      assert.ok(true);
    }
  });

  it('setTier set default to cool', async () => {
    await blockBlobURL.setTier(Aborter.None, AccessTier.Cool);
    const properties = await blockBlobURL.getProperties(Aborter.None);
    assert.equal(properties.accessTier!.toLowerCase(), 'cool');
  });

  it('setTier set archive to hot', async () => {
    await blockBlobURL.setTier(Aborter.None, AccessTier.Archive);
    let properties = await blockBlobURL.getProperties(Aborter.None);
    assert.equal(properties.accessTier!.toLowerCase(), 'archive');

    await blockBlobURL.setTier(Aborter.None, AccessTier.Hot);
    properties = await blockBlobURL.getProperties(Aborter.None);
    if (properties.archiveStatus) {
      assert.equal(
        properties.archiveStatus.toLowerCase(),
        'rehydrate-pending-to-hot'
      );
    }
  });
});
