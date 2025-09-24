// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "@azure/core-util";
import { delay, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import type {
  BlockBlobClient,
  BlobServiceClient,
  ContainerClient,
  RehydratePriority,
  BlobImmutabilityPolicyMode,
} from "@azure/storage-blob";
import { BlobClient, BlockBlobTier } from "@azure/storage-blob";
import { isRestError } from "@azure/core-rest-pipeline";
import { describe, it, assert, beforeEach, afterEach, expect } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import type { OperationOptions } from "@azure/core-client";
import { createBlobClient, createBlobServiceClient } from "./utils/clients.js";
import {
  base64encode,
  bodyToString,
  getUniqueName,
  shouldRunObjectReplicationTests,
} from "./utils/utils.js";
import {
  getCustomerProvidedKey,
  getEncryptionScope1,
  getImmutableContainerName,
  getOrDestContainerName,
  getOrSourceContainerName,
} from "../utils/injectables.js";
import { assertDestReplicationProps, assertSrcReplicationProps } from "./utils/assert.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { STORAGE_SCOPE } from "./utils/constants.js";

expect.extend({ toSupportTracing });

describe("BlobClient", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";
  const customerProvidedKey = getCustomerProvidedKey();

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    containerName = getUniqueName("container", { recorder });
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("download with with default parameters", async () => {
    const result = await blobClient.download();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
  });

  it("download with with default parameters", async () => {
    const result = await blobClient.download();
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    assert.exists(result.createdOn);
  });

  it("download with progress report", async () => {
    let downloadedBytes = 0;
    const result = await blobClient.download(0, undefined, {
      onProgress: (data) => {
        downloadedBytes = data.loadedBytes;
      },
    });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    assert.equal(downloadedBytes, content.length);
  });

  it("download should not have aborted error after download finishes", async () => {
    const aborter = new AbortController();
    const result = await blobClient.download(0, undefined, { abortSignal: aborter.signal });
    assert.deepStrictEqual(await bodyToString(result, content.length), content);
    aborter.abort();
  });

  it("download all parameters set", async () => {
    // For browser scenario, please ensure CORS settings exposed headers: content-md5,x-ms-content-crc64
    // So JS can get contentCrc64 and contentMD5.
    const result1 = await blobClient.download(0, 1, {
      rangeGetContentCrc64: true,
    });
    assert.ok(result1.clientRequestId);
    // assert.ok(result1.contentCrc64!);
    assert.deepStrictEqual(await bodyToString(result1, 1), content[0]);
    assert.ok(result1.clientRequestId);

    const result2 = await blobClient.download(1, 1, {
      rangeGetContentMD5: true,
    });
    assert.ok(result2.clientRequestId);
    // assert.ok(result2.contentMD5!);

    let exceptionCaught = false;
    try {
      await blobClient.download(2, 1, {
        rangeGetContentMD5: true,
        rangeGetContentCrc64: true,
      });
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("beginCopyFromURL with rehydrate priority", async () => {
    const newBlobURL = containerClient.getBlobClient(
      getUniqueName("copiedblobrehydrate", { recorder }),
    );
    const initialTier = BlockBlobTier.Archive;
    const result = await (
      await newBlobURL.beginCopyFromURL(blobClient.url, {
        tier: initialTier,
        rehydratePriority: "Standard",
      })
    ).pollUntilDone();
    assert.isDefined(result.copyId);
    await delay(1000);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobURL.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    assert.equal(properties2.accessTier, initialTier);
    assert.strictEqual(
      blobClient.url,
      properties2.copySource,
      "copySource does not match original source",
    );

    await newBlobURL.setAccessTier(BlockBlobTier.Hot);
    const properties3 = await newBlobURL.getProperties();
    assert.equal(properties3.archiveStatus!.toLowerCase(), "rehydrate-pending-to-hot");
  });

  it("Set and get blob tags should work with lease condition", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const leaseClient = blockBlobClient.getBlobLeaseClient(guid);
    await leaseClient.acquireLease(-1);

    const tags = {
      tag1: "val1",
      tag2: "val2",
    };
    await blockBlobClient.setTags(tags, { conditions: { leaseId: leaseClient.leaseId } });
    const response = await blockBlobClient.getTags({
      conditions: { leaseId: leaseClient.leaseId },
    });
    assert.deepStrictEqual(response.tags, tags);

    const tags1 = {
      tag1: "val",
    };
    try {
      await blockBlobClient.setTags(tags1);
      assert.fail(
        "Should have failed when setting tags without the right lease condition of a leased blob",
      );
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.deepStrictEqual(err.code, "LeaseIdMissing");
    }

    try {
      const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
      await blockBlobClient.getTags({ conditions: { leaseId: newGuid } });
      assert.fail(
        "Should have failed when setting tags without the right lease condition of a leased blob",
      );
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.deepStrictEqual(err.code, "LeaseIdMismatchWithBlobOperation");
    }

    await leaseClient.releaseLease();
  });

  it("Set blob tags should work", async () => {
    const tags = {
      tag1: "val1",
      tag2: "val2",
    };
    await blockBlobClient.setTags(tags);

    const response = await blockBlobClient.getTags();
    assert.deepStrictEqual(response.tags, tags);

    const properties = await blockBlobClient.getProperties();
    assert.deepStrictEqual(properties.tagCount, 2);

    const download = await blockBlobClient.download();
    assert.deepStrictEqual(download.tagCount, 2);

    const listblob = containerClient.listBlobsFlat({ includeTags: true });

    const iter = listblob.byPage();
    const segment = await iter.next();

    // TODO: Make blob tag type consistency cross all request or response
    assert.deepStrictEqual(segment.value.segment.blobItems[0].tags, tags);
  });

  it("Get blob tags should work with a snapshot", async () => {
    const tags = {
      tag1: "val1",
      tag2: "val2",
    };
    await blockBlobClient.setTags(tags);

    const snapshotResponse = await blockBlobClient.createSnapshot();
    const blockBlobClientSnapshot = blockBlobClient.withSnapshot(snapshotResponse.snapshot!);

    const response = await blockBlobClientSnapshot.getTags();
    assert.deepStrictEqual(response.tags, tags);
  });

  it("Create block blob should work with tags", async () => {
    await blockBlobClient.delete();

    const tags = {
      tag1: "val1",
      tag2: "val2",
    };
    await blockBlobClient.upload("hello", 5, { tags });

    const response = await blockBlobClient.getTags();
    assert.deepStrictEqual(response.tags, tags);
  });

  it("Create append blob should work with tags", async () => {
    const tags = {
      tag1: "val1",
      tag2: "val2",
    };

    const appendBlobName = getUniqueName("appendBlob", { recorder });
    const appendBlobClient = containerClient.getAppendBlobClient(appendBlobName);
    await appendBlobClient.create({ tags });

    const response = await appendBlobClient.getTags();
    assert.deepStrictEqual(response.tags, tags);
  });

  it("Create page blob should work with tags", async () => {
    const tags = {
      tag1: "val1",
      tag2: "val2",
    };

    const pageBlobName = getUniqueName("pageBlobName", { recorder });
    const blobClient2 = containerClient.getBlobClient(pageBlobName);
    const pageBlobClient = blobClient2.getPageBlobClient();
    await pageBlobClient.create(512, { tags });

    const response = await pageBlobClient.getTags();
    assert.deepStrictEqual(response.tags, tags);
  });

  it("setMetadata with new metadata set", async () => {
    const metadata = {
      a: "a",
      b: "b",
    };
    await blobClient.setMetadata(metadata);
    const result = await blobClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("setMetadata with cleaning up metadata", async () => {
    const metadata = {
      a: "a",
      b: "b",
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
      blobContentMD5: new Uint8Array([1, 2, 3, 4]),
      blobContentType: "blobContentType",
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

  it("deleteIfExists", async () => {
    const res = await blobClient.deleteIfExists();
    assert.ok(res.succeeded);

    const blobName2 = getUniqueName("blob2", { recorder });
    const blobClient2 = containerClient.getBlobClient(blobName2);
    // delete a non-existent blob
    const res2 = await blobClient2.deleteIfExists();
    assert.ok(!res2.succeeded);
    assert.equal(res2.errorCode, "BlobNotFound");
  });

  // The following code illustrates deleting a snapshot after creating one
  it("delete snapshot", async () => {
    const result = await blobClient.createSnapshot();
    assert.ok(result.snapshot);

    const blobSnapshotClient = blobClient.withSnapshot(result.snapshot!);
    await blobSnapshotClient.getProperties();

    await blobSnapshotClient.delete();
    const res = await blobSnapshotClient.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "BlobNotFound");

    await blobClient.delete();

    const result2 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true,
        })
        .byPage()
        .next()
    ).value;

    // Verify that the snapshot is deleted
    assert.equal(result2.segment.blobItems!.length, 0);
  });

  it("createSnapshot", async () => {
    const result = await blobClient.createSnapshot();
    assert.ok(result.snapshot);

    const blobSnapshotClient = blobClient.withSnapshot(result.snapshot!);
    await blobSnapshotClient.getProperties();

    const result3 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true,
        })
        .byPage()
        .next()
    ).value;

    // As a snapshot doesn't have leaseStatus and leaseState properties but origin blob has,
    // let assign them to undefined both for other properties' easy comparison
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.leaseState =
      result3.segment.blobItems![1].properties.leaseState = undefined;
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.leaseStatus =
      result3.segment.blobItems![1].properties.leaseStatus = undefined;
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.accessTier =
      result3.segment.blobItems![1].properties.accessTier = undefined;
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.accessTierInferred =
      result3.segment.blobItems![1].properties.accessTierInferred = undefined;
    // tslint:disable-next-line:max-line-length
    result3.segment.blobItems![0].properties.lastAccessedOn =
      result3.segment.blobItems![1].properties.lastAccessedOn = undefined;

    assert.deepStrictEqual(
      result3.segment.blobItems![0].properties,
      result3.segment.blobItems![1].properties,
    );
    assert.ok(result3.segment.blobItems![0].snapshot || result3.segment.blobItems![1].snapshot);
  });

  it("undelete", async () => {
    let properties = await blobServiceClient.getProperties();
    if (!properties.deleteRetentionPolicy!.enabled) {
      await blobServiceClient.setProperties({
        deleteRetentionPolicy: {
          days: 7,
          enabled: true,
        },
      });
      // await delay(15 * 1000);
      properties = await blobServiceClient.getProperties();
      assert.ok(
        properties.deleteRetentionPolicy!.enabled,
        "deleteRetentionPolicy should be enabled.",
      );
    }

    await blobClient.delete();

    const iter = containerClient
      .listBlobsFlat({
        includeDeleted: true,
        includeVersions: true,
      })
      .byPage({ maxPageSize: 1 });

    let res = await iter.next();
    let result = res.value;
    while (!res.done) {
      if (
        !!result &&
        !!result.segment &&
        !!result.segment.blobItems &&
        result.segment.blobItems.length > 0
      ) {
        break;
      }
      res = await iter.next();
      result = res.value;
    }

    assert.ok(result, "Expect valid iterator value");
    assert.ok(result.segment, "Expect valid segment response");

    assert.ok(
      result.segment.blobItems,
      "Expect non empty result from list blobs({ includeDeleted: true, includeVersions: true }) with page size of 1.",
    );

    assert.equal(
      result.segment.blobItems.length,
      1,
      `Expect result.segment.blobItems.length === 1 but got ${result.segment.blobItems.length}.`,
    );

    assert.ok(
      result.segment.blobItems![0],
      "Expect a valid element in result array from list blobs({ includeDeleted: true }) with page size of 1.",
    );

    await blobClient.undelete();

    const iter2 = containerClient
      .listBlobsFlat({
        includeDeleted: true,
        includeVersions: true,
      })
      .byPage();

    res = await iter2.next();
    result = res.value;
    while (!res.done) {
      if (
        !!result &&
        !!result.segment &&
        !!result.segment.blobItems &&
        result.segment.blobItems.length > 0
      ) {
        break;
      }
      res = await iter2.next();
      result = res.value;
    }

    assert.ok(result, "Expect valid iterator value");
    assert.ok(result.segment, "Expect valid segment response");

    assert.ok(result.segment.blobItems, "Expect non empty result from list blobs().");
    assert.ok(
      !result.segment.blobItems![0].deleted,
      "Expect that the blob is NOT marked for deletion",
    );
  });

  it("abortCopyFromClient should failed for a completed copy operation", async () => {
    const newBlobClient = containerClient.getBlobClient(getUniqueName("copiedblob", { recorder }));
    const result = await (await newBlobClient.beginCopyFromURL(blobClient.url)).pollUntilDone();
    assert.ok(result.copyId);
    await delay(1 * 1000);

    try {
      await newBlobClient.abortCopyFromURL(result.copyId!);
      assert.fail(
        "AbortCopyFromClient should be failed and throw exception for an completed copy operation.",
      );
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.equal(err.code, "NoPendingCopyOperation");
    }
  });

  it("can be created with a url and a credential", async () => {
    const newClient = await createBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
    });

    const metadata = {
      a: "a",
      b: "b",
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const newClient = await createBlobClient("TokenCredential", {
      recorder,
      blobName,
      containerName,
      options: {
        retryOptions: {
          maxTries: 5,
        },
      },
    });
    const metadata = {
      a: "a",
      b: "b",
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("can be created with a url and a pipeline", async () => {
    const newClient = await createBlobClient("Pipeline", { recorder, blobName, containerName });

    const metadata = {
      a: "a",
      b: "b",
    };
    await newClient.setMetadata(metadata);
    const result = await newClient.getProperties();
    assert.deepStrictEqual(result.metadata, metadata);
  });

  it("syncCopyFromURL - destination bearer token", async () => {
    const newBlobName = getUniqueName("copiedblob", { recorder });
    const tokenBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    const tokenNewBlobClient = tokenBlobServiceClient
      .getContainerClient(containerName)
      .getAppendBlobClient(newBlobName);
    const newBlobClient = containerClient.getBlobClient(newBlobName);

    const result = await tokenNewBlobClient.syncCopyFromURL(blobClient.url);
    assert.ok(result.copyId);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
  });

  it("syncCopyFromURL - source bearer token and destination account key", async () => {
    const newBlobName = getUniqueName("copiedblob", { recorder });
    const newBlobClient = containerClient.getBlobClient(newBlobName);

    const accessToken = await createTestCredential().getToken([STORAGE_SCOPE]);
    if (!accessToken) {
      assert.fail("Failed to get access token");
    }

    const result = await newBlobClient.syncCopyFromURL(blobClient.url, {
      sourceAuthorization: {
        scheme: "Bearer",
        value: accessToken.token,
      },
    });
    assert.ok(result.copyId);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
  });

  it("syncCopyFromURL - with COPY tags", async () => {
    const newBlobClient = containerClient.getBlobClient(getUniqueName("copiedblob", { recorder }));
    await blobClient.setTags({
      tag1: "val1",
    });

    const result = await newBlobClient.syncCopyFromURL(blobClient.url, {
      copySourceTags: "COPY",
    });

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    const sourceBlobTags = await blobClient.getTags();
    const destBlobTags = await newBlobClient.getTags();
    assert.deepStrictEqual(sourceBlobTags.tags, destBlobTags.tags);
  });

  it("syncCopyFromURL - with REPLACE tags", async () => {
    const newBlobClient = containerClient.getBlobClient(getUniqueName("copiedblob", { recorder }));
    await blobClient.setTags({
      tag1: "val1",
    });

    const tags = {
      tag2: "val2",
    };
    const result = await newBlobClient.syncCopyFromURL(blobClient.url, {
      tags: tags,
      copySourceTags: "REPLACE",
    });

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    const destBlobTags = await newBlobClient.getTags();
    assert.deepStrictEqual(tags, destBlobTags.tags);
  });

  it("sync copy with cold tier", async () => {
    const newBlobClient = containerClient.getBlockBlobClient(
      getUniqueName("copiedblob", { recorder }),
    );

    await newBlobClient.syncCopyFromURL("https://azure.github.io/azure-sdk-for-js/index.html", {
      tier: "Cold",
    });

    const properties = await newBlobClient.getProperties();
    assert.ok(properties.accessTier);
    assert.equal(properties.accessTier!, "Cold");
  });

  it("setAccessTier set default to cool", async () => {
    await blockBlobClient.setAccessTier("Cool");
    const properties = await blockBlobClient.getProperties();
    assert.ok(properties.accessTier);
    assert.equal(properties.accessTier!, "Cool");
  });

  it("setAccessTier set archive to hot", async () => {
    await blockBlobClient.setAccessTier("Archive");
    let properties = await blockBlobClient.getProperties();
    assert.ok(properties.accessTier);
    assert.equal(properties.accessTier!, "Archive");

    await blockBlobClient.setAccessTier("Hot");
    properties = await blockBlobClient.getProperties();
    if (properties.archiveStatus) {
      assert.equal(properties.archiveStatus.toLowerCase(), "rehydrate-pending-to-hot");
    }
  });

  it("setAccessTier set archive to cold", async () => {
    await blockBlobClient.setAccessTier("Archive");
    const properties = await blockBlobClient.getProperties();
    assert.equal(properties.accessTier!.toLowerCase(), "archive");

    await blockBlobClient.setAccessTier("Cold");
    for await (const blobItem of containerClient.listBlobsFlat()) {
      if (blobItem.name === blockBlobClient.name) {
        if (blobItem.properties.archiveStatus) {
          assert.equal(
            blobItem.properties.archiveStatus.toLowerCase(),
            "rehydrate-pending-to-cold",
          );
        }
      }
    }
  });

  it("setAccessTier set to/from cold", async () => {
    await blockBlobClient.setAccessTier("Cold");
    const properties = await blockBlobClient.getProperties();
    assert.ok(properties.accessTier);
    assert.equal(properties.accessTier!, "Cold");

    await blockBlobClient.setAccessTier("Hot");
    const properties1 = await blockBlobClient.getProperties();
    assert.ok(properties1.accessTier);
    assert.equal(properties1.accessTier!, "Hot");

    await blockBlobClient.setAccessTier("Cold");
    const properties2 = await blockBlobClient.getProperties();
    assert.ok(properties2.accessTier);
    assert.equal(properties2.accessTier!, "Cold");

    await blockBlobClient.setAccessTier("Cool");
    const properties3 = await blockBlobClient.getProperties();
    assert.ok(properties3.accessTier);
    assert.equal(properties3.accessTier!, "Cool");
  });

  it("setAccessTier with snapshot", async () => {
    const resp = await blockBlobClient.createSnapshot();
    const blockBlobClientWithSnapshot = blockBlobClient.withSnapshot(resp.snapshot!);

    await blockBlobClientWithSnapshot.setAccessTier("Cool");

    const properties = await blockBlobClientWithSnapshot.getProperties();
    assert.ok(properties.accessTier);
    assert.equal(properties.accessTier!, "Cool");
  });

  it("setAccessTier with versioning", async () => {
    const resp = await blockBlobClient.setMetadata({ a: "a" });
    const blockBlobClientWithVersion = blockBlobClient.withVersion(resp.versionId!);

    await blockBlobClientWithVersion.setAccessTier("Cool");

    const properties = await blockBlobClientWithVersion.getProperties();
    assert.ok(properties.accessTier);
    assert.equal(properties.accessTier!, "Cool");
  });

  it("setMetadata with CPK on a blob uploaded without CPK should fail", async () => {
    let exceptionCaught = false;
    try {
      await blobClient.setMetadata({ a: "a" }, { customerProvidedKey });
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("setMetadata, setHTTPHeaders, getProperties and createSnapshot with CPK", async () => {
    blobName = getUniqueName("blobCPK", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length, {
      customerProvidedKey,
    });

    const metadata = {
      a: "a",
      b: "b",
    };
    const smResp = await blobClient.setMetadata(metadata, {
      customerProvidedKey,
    });
    assert.equal(smResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

    let exceptionCaught = false;
    try {
      await blobClient.getProperties();
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    const headers = {
      blobCacheControl: "blobCacheControl",
      blobContentDisposition: "blobContentDisposition",
      blobContentEncoding: "blobContentEncoding",
      blobContentLanguage: "blobContentLanguage",
      blobContentMD5: new Uint8Array([1, 2, 3, 4]),
      blobContentType: "blobContentType",
    };
    await blobClient.setHTTPHeaders(headers, { customerProvidedKey });

    const gResp = await blobClient.getProperties({ customerProvidedKey });
    assert.equal(gResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);
    assert.ok(gResp.date);
    assert.deepStrictEqual(gResp.blobType, "BlockBlob");
    assert.ok(gResp.lastModified);
    assert.deepStrictEqual(gResp.metadata, metadata);
    assert.deepStrictEqual(gResp.cacheControl, headers.blobCacheControl);
    assert.deepStrictEqual(gResp.contentType, headers.blobContentType);
    assert.deepStrictEqual(gResp.contentMD5, headers.blobContentMD5);
    assert.deepStrictEqual(gResp.contentEncoding, headers.blobContentEncoding);
    assert.deepStrictEqual(gResp.contentLanguage, headers.blobContentLanguage);
    assert.deepStrictEqual(gResp.contentDisposition, headers.blobContentDisposition);

    const csResp = await blobClient.createSnapshot({
      customerProvidedKey,
    });
    // assert.equal(csResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256); service side issue?
    assert.ok(csResp.snapshot);

    const blobSnapshotURL = blobClient.withSnapshot(csResp.snapshot!);
    await blobSnapshotURL.getProperties({ customerProvidedKey });

    exceptionCaught = false;
    try {
      await blobSnapshotURL.getProperties();
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("beginCopyFromURL with cold tier", async () => {
    const newBlobURL = containerClient.getBlobClient(getUniqueName("copiedblob", { recorder }));
    const newTier = BlockBlobTier.Cold;
    const result = await (
      await newBlobURL.beginCopyFromURL(blobClient.url, {
        tier: newTier,
      })
    ).pollUntilDone();
    assert.ok(result.copyId);
    delay(1 * 1000);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobURL.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
    assert.equal(properties2.accessTier, newTier);
  });

  it("setAccessTier with rehydrate priority", async () => {
    await blockBlobClient.setAccessTier("Archive", { rehydratePriority: "High" });
    await blockBlobClient.setAccessTier("Cool");
    const properties = await blockBlobClient.getProperties();
    if (properties.archiveStatus) {
      assert.equal(properties.archiveStatus.toLowerCase(), "rehydrate-pending-to-cool");
    }
  });

  it("download with default parameters and tracing", async () => {
    await expect((options: OperationOptions) =>
      blobClient.download(undefined, undefined, options),
    ).toSupportTracing(["BlobClient-download"]);
  });

  it("exists returns true on an existing blob", async () => {
    const result = await blobClient.exists();
    assert.ok(result, "exists() should return true for an existing blob");
  });

  it("exists returns false on non-existing blob", async () => {
    const newBlobClient = containerClient.getBlobClient(getUniqueName("newblob", { recorder }));
    const result = await newBlobClient.exists();
    assert.ok(result === false, "exists() should return true for an existing blob");
  });

  it("exists works with customer provided key", async () => {
    blobName = getUniqueName("blobCPK", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length, {
      customerProvidedKey,
    });

    const metadata = { a: "a" };
    const smResp = await blobClient.setMetadata(metadata, {
      customerProvidedKey,
    });
    assert.equal(smResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

    const result = await blobClient.exists({
      customerProvidedKey,
    });
    assert.ok(result, "exists() should return true");
  });

  it("exists works without customer provided key on a blob with CPK", async () => {
    blobName = getUniqueName("blobCPK", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length, {
      customerProvidedKey,
    });

    const result = await blobClient.exists();
    assert.ok(result, "exists() should return true");
  });

  it("exists works against blob uploaded with customer provided key", async () => {
    blobName = getUniqueName("blobCPK", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length, {
      customerProvidedKey,
    });

    const metadata = { a: "a" };
    const smResp = await blobClient.setMetadata(metadata, {
      customerProvidedKey,
    });
    assert.equal(smResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

    const result = await blobClient.exists();
    assert.ok(result, "exists() should return true");
  });

  it("exists re-throws error from getProperties", async () => {
    blobName = getUniqueName("blobCPK", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length, {
      customerProvidedKey,
    });

    const metadata = { a: "a" };
    const smResp = await blobClient.setMetadata(metadata, {
      customerProvidedKey,
    });
    assert.equal(smResp.encryptionKeySha256, customerProvidedKey.encryptionKeySha256);

    let exceptionCaught = false;
    const anonymousBlobClient = await createBlobClient("Custom", {
      blobName,
      containerName,
      credential: undefined,
    });

    try {
      await anonymousBlobClient.exists();
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("exists with condition", async () => {
    const proposedLeaseId = recorder.variable("proposedLeaseId", randomUUID());
    const leaseResp = await blobClient.getBlobLeaseClient(proposedLeaseId).acquireLease(30);
    assert.ok(leaseResp.leaseId);

    assert.ok(await blobClient.exists({ conditions: { leaseId: leaseResp.leaseId! } }));

    let exceptionCaught = false;
    try {
      let guid = "ca761232ed4211cebacd00aa0057b223";
      if (guid === leaseResp.leaseId) {
        guid = "ca761232ed4211cebacd00aa0057b224";
      }

      await blobClient.exists({ conditions: { leaseId: guid } });
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.equal((err.details as any).errorCode, "LeaseIdMismatchWithBlobOperation");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  async function checkRehydratePriority(rehydratePriority: RehydratePriority): Promise<void> {
    await blobClient.setAccessTier("Archive");
    await blobClient.setAccessTier("Hot", { rehydratePriority });

    const res = await blobClient.getProperties();
    assert.equal(res.rehydratePriority, rehydratePriority);

    for await (const item of containerClient.listBlobsFlat()) {
      if (item.name === blobName) {
        assert.equal(item.properties.rehydratePriority, rehydratePriority);
      }
    }

    for await (const item of containerClient.listBlobsByHierarchy("/")) {
      if (item.kind === "blob" && item.name === blobName) {
        assert.equal(item.properties.rehydratePriority, rehydratePriority);
      }
    }
  }

  it("getProperties and listBlob RehydratePriority = High", async () => {
    await checkRehydratePriority("High");
  });

  it("getProperties and listBlob RehydratePriority = Standard", async () => {
    await checkRehydratePriority("Standard");
  });

  it("getAccountInfo", async () => {
    const accountInfo = await blobClient.getAccountInfo();
    assert.ok(accountInfo.accountKind);
    assert.ok(accountInfo.skuName);
    assert.deepStrictEqual(accountInfo.isHierarchicalNamespaceEnabled, false);
  });

  // Skipped for now as it's not working in live tests pipeline.
  it.skip("lastAccessed returned", async function () {
    const downloadRes = await blockBlobClient.download();
    assert.ok(downloadRes.lastAccessed);

    const getPropertiesRes = await blockBlobClient.getProperties();
    assert.ok(getPropertiesRes.lastAccessed);

    for await (const blobItem of containerClient.listBlobsFlat({ prefix: blobName })) {
      if (blobItem.name === blobName) {
        assert.ok(blobItem.properties.lastAccessedOn);
        break;
      }
    }
  });

  it("syncCopyFromURL - destination encryption scope", async function () {
    const encryptionScope = getEncryptionScope1();
    const newBlobName = getUniqueName("copiedblob", { recorder });
    const newBlobClient = containerClient.getBlobClient(newBlobName);

    const result = await newBlobClient.syncCopyFromURL(blobClient.url, {
      encryptionScope,
    });
    assert.ok(result.copyId);
    assert.deepStrictEqual(result.encryptionScope, encryptionScope);

    const properties1 = await blobClient.getProperties();
    const properties2 = await newBlobClient.getProperties();
    assert.deepStrictEqual(properties1.contentMD5, properties2.contentMD5);
    assert.deepStrictEqual(properties2.copyId, result.copyId);
  });

  describe("conditional tags", () => {
    const tags = {
      tag1: "val1",
      tag2: "val2",
    };

    const tagConditionMet = { tagConditions: "tag1 = 'val1'" };
    const tagConditionUnmet = { tagConditions: "tag1 = 'val2'" };

    beforeEach(async () => {
      await blobClient.setTags(tags);
    });

    async function throwExpectedError(promise: Promise<any>, errorCode: string): Promise<void> {
      try {
        await promise;
        assert.fail("Expected promise to reject with a RestError");
      } catch (e: unknown) {
        if (isRestError(e)) {
          if (e.code) {
            assert.equal(e.code, errorCode);
          } else if (e.details) {
            assert.nestedPropertyVal(e.details, "errorCode", errorCode);
          } else {
            throw e;
          }
        } else {
          throw e;
        }
      }
    }

    it("getTags", async () => {
      await blobClient.getTags({ conditions: tagConditionMet });

      await throwExpectedError(
        blobClient.getTags({ conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
    });

    it("setTags", async () => {
      const tags2 = {
        tag1: "val",
      };
      await blobClient.setTags(tags2, { conditions: tagConditionMet });

      await throwExpectedError(
        blobClient.setTags(tags, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
    });

    it("lease blob", async () => {
      const guid = "ca761232ed4211cebacd00aa0057b223";
      const duration = 15;
      const leaseClient = blobClient.getBlobLeaseClient(guid);
      await leaseClient.acquireLease(duration, { conditions: tagConditionMet });

      const result = await blobClient.getProperties();
      assert.equal(result.leaseDuration, "fixed");
      assert.equal(result.leaseState, "leased");
      assert.equal(result.leaseStatus, "locked");

      const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
      await throwExpectedError(
        leaseClient.changeLease(newGuid, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
    });

    it("lease container should throw for unsupported conditions options", async () => {
      const guid = "ca761232ed4211cebacd00aa0057b223";
      const duration = 15;
      const leaseClient = containerClient.getBlobLeaseClient(guid);

      const promise = leaseClient.acquireLease(duration, { conditions: tagConditionMet });
      await expect(promise).rejects.toThrow(RangeError);
    });

    it("async copy's destination blob", async () => {
      const newBlobClient = containerClient.getBlockBlobClient(
        getUniqueName("copiedblob", { recorder }),
      );
      const tags2 = {
        tag: "val",
      };
      await newBlobClient.upload(content, content.length, { tags: tags2 });

      await throwExpectedError(
        newBlobClient.beginCopyFromURL(blobClient.url, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );

      await newBlobClient.beginCopyFromURL(blobClient.url, {
        conditions: { tagConditions: "tag = 'val'" },
      });
    });

    it("async copy's source blob", async () => {
      const newBlobClient = containerClient.getBlockBlobClient(
        getUniqueName("copiedblob", { recorder }),
      );

      await throwExpectedError(
        newBlobClient.beginCopyFromURL(blobClient.url, { sourceConditions: tagConditionUnmet }),
        "ConditionNotMet",
      );

      await newBlobClient.beginCopyFromURL(blobClient.url, {
        sourceConditions: tagConditionMet,
      });
    });

    it("sync copy's destination blob", async () => {
      const newBlobClient = containerClient.getBlockBlobClient(
        getUniqueName("copiedblob", { recorder }),
      );
      const tags2 = {
        tag: "val",
      };
      await newBlobClient.upload(content, content.length, { tags: tags2 });
      await throwExpectedError(
        newBlobClient.syncCopyFromURL("https://azure.github.io/azure-sdk-for-js/index.html", {
          conditions: tagConditionUnmet,
        }),
        "ConditionNotMet",
      );

      await newBlobClient.syncCopyFromURL("https://azure.github.io/azure-sdk-for-js/index.html", {
        conditions: { tagConditions: "tag = 'val'" },
      });
    });

    it("download", async () => {
      await throwExpectedError(
        blobClient.download(undefined, undefined, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await blobClient.download(undefined, undefined, { conditions: tagConditionMet });
    });

    it("getProperties", async () => {
      await throwExpectedError(
        blobClient.getProperties({ conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await blobClient.getProperties({ conditions: tagConditionMet });
    });

    it("delete", async () => {
      await throwExpectedError(
        blobClient.delete({ conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await blobClient.delete({ conditions: tagConditionMet });
    });

    it("setHTTPHeaders", async () => {
      await throwExpectedError(
        blobClient.setHTTPHeaders({}, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await blobClient.setHTTPHeaders({}, { conditions: tagConditionMet });
    });

    it("setMetadata", async () => {
      const metadata = {
        a: "a",
        b: "b",
      };
      await throwExpectedError(
        blobClient.setMetadata(metadata, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await blobClient.setMetadata(metadata, { conditions: tagConditionMet });
    });

    it("createSnapshot", async () => {
      await throwExpectedError(
        blobClient.createSnapshot({ conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await blobClient.createSnapshot({ conditions: tagConditionMet });
    });

    it("setAccessTier", async () => {
      await throwExpectedError(
        blobClient.setAccessTier("Hot", { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await blobClient.setAccessTier("Hot", { conditions: tagConditionMet });
    });

    it("AppendBlobClient.create", async () => {
      const newBlobClient = containerClient.getAppendBlobClient(
        getUniqueName("appendBlob", { recorder }),
      );
      await newBlobClient.create({ tags });
      await throwExpectedError(
        newBlobClient.create({ conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await newBlobClient.create({ conditions: tagConditionMet });
    });

    it("AppendBlobClient.appendBlock", async () => {
      const newBlobClient = containerClient.getAppendBlobClient(
        getUniqueName("appendBlob", { recorder }),
      );
      await newBlobClient.create({ tags });
      await throwExpectedError(
        newBlobClient.appendBlock(content, content.length, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await newBlobClient.appendBlock(content, content.length, { conditions: tagConditionMet });
    });

    it("BlockBlobClient.upload", async () => {
      await throwExpectedError(
        blockBlobClient.upload(content, content.length, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await blockBlobClient.upload(content, content.length, { conditions: tagConditionMet });
    });

    it("BlockBlobClient.commitBlockList", async () => {
      const body = "HelloWorld";
      await blockBlobClient.stageBlock(base64encode("1"), body, body.length);
      await blockBlobClient.stageBlock(base64encode("2"), body, body.length);

      await throwExpectedError(
        blockBlobClient.commitBlockList([base64encode("1"), base64encode("2")], {
          conditions: tagConditionUnmet,
        }),
        "ConditionNotMet",
      );
      await blockBlobClient.commitBlockList([base64encode("1"), base64encode("2")], {
        conditions: tagConditionMet,
      });
    });

    it("BlockBlobClient.getBlockList", async () => {
      const body = "HelloWorld";
      await blockBlobClient.stageBlock(base64encode("1"), body, body.length);
      await blockBlobClient.stageBlock(base64encode("2"), body, body.length);
      await blockBlobClient.commitBlockList([base64encode("1"), base64encode("2")], { tags });

      await throwExpectedError(
        blockBlobClient.getBlockList("all", { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await blockBlobClient.getBlockList("all", { conditions: tagConditionMet });
    });

    it("PageBlobClient.create", async () => {
      const newBlobClient = containerClient.getPageBlobClient(
        getUniqueName("pageBlob", { recorder }),
      );
      await newBlobClient.create(512, { tags });
      await throwExpectedError(
        newBlobClient.create(512, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await newBlobClient.create(512, { conditions: tagConditionMet });
    });

    it("PageBlobClient.uploadPages", async () => {
      const newBlobClient = containerClient.getPageBlobClient(
        getUniqueName("pageBlob", { recorder }),
      );
      await newBlobClient.create(512, { tags });
      await throwExpectedError(
        newBlobClient.uploadPages("a".repeat(512), 0, 512, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await newBlobClient.uploadPages("a".repeat(512), 0, 512, { conditions: tagConditionMet });
    });

    it("PageBlobClient.clearPages", async () => {
      const newBlobClient = containerClient.getPageBlobClient(
        getUniqueName("pageBlob", { recorder }),
      );
      await newBlobClient.create(512, { tags });
      await throwExpectedError(
        newBlobClient.clearPages(0, 512, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await newBlobClient.clearPages(0, 512, { conditions: tagConditionMet });
    });

    it("PageBlobClient.listPageRanges", async () => {
      const newBlobClient = containerClient.getPageBlobClient(
        getUniqueName("pageBlob", { recorder }),
      );
      await newBlobClient.create(512, { tags });
      await throwExpectedError(
        newBlobClient
          .listPageRanges(0, 512, {
            conditions: tagConditionUnmet,
          })
          .byPage()
          .next(),
        "ConditionNotMet",
      );
      await newBlobClient
        .listPageRanges(0, 512, {
          conditions: tagConditionMet,
        })
        .byPage()
        .next();
    });

    it("PageBlobClient.listPageRangesDiff", async () => {
      const newBlobClient = containerClient.getPageBlobClient(
        getUniqueName("pageBlob", { recorder }),
      );
      await newBlobClient.create(512, { tags });
      const snapshotResult = await newBlobClient.createSnapshot();
      assert.ok(snapshotResult.snapshot);
      await newBlobClient.uploadPages("a".repeat(512), 0, 512);

      await throwExpectedError(
        newBlobClient
          .listPageRangesDiff(0, 512, snapshotResult.snapshot!, {
            conditions: tagConditionUnmet,
          })
          .byPage()
          .next(),
        "ConditionNotMet",
      );
      await newBlobClient
        .listPageRangesDiff(0, 512, snapshotResult.snapshot!, {
          conditions: tagConditionMet,
        })
        .byPage()
        .next();
    });

    it("PageBlobClient.getPageRanges", async () => {
      const newBlobClient = containerClient.getPageBlobClient(
        getUniqueName("pageBlob", { recorder }),
      );
      await newBlobClient.create(512, { tags });
      await throwExpectedError(
        newBlobClient.getPageRanges(0, 512, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await newBlobClient.getPageRanges(0, 512, { conditions: tagConditionMet });
    });

    it("PageBlobClient.getPageRangesDiff", async () => {
      const newBlobClient = containerClient.getPageBlobClient(
        getUniqueName("pageBlob", { recorder }),
      );
      await newBlobClient.create(512, { tags });
      const snapshotResult = await newBlobClient.createSnapshot();
      assert.ok(snapshotResult.snapshot);
      await newBlobClient.uploadPages("a".repeat(512), 0, 512);

      await throwExpectedError(
        newBlobClient.getPageRangesDiff(0, 512, snapshotResult.snapshot!, {
          conditions: tagConditionUnmet,
        }),
        "ConditionNotMet",
      );
      await newBlobClient.getPageRangesDiff(0, 512, snapshotResult.snapshot!, {
        conditions: tagConditionMet,
      });
    });

    it("PageBlobClient.resize", async () => {
      const newBlobClient = containerClient.getPageBlobClient(
        getUniqueName("pageBlob", { recorder }),
      );
      await newBlobClient.create(512, { tags });
      await throwExpectedError(
        newBlobClient.resize(1024, { conditions: tagConditionUnmet }),
        "ConditionNotMet",
      );
      await newBlobClient.resize(1024, { conditions: tagConditionMet });
    });

    it("PageBlobClient.updateSequenceNumber", async () => {
      const newBlobClient = containerClient.getPageBlobClient(
        getUniqueName("pageBlob", { recorder }),
      );
      await newBlobClient.create(512, { tags });
      await throwExpectedError(
        newBlobClient.updateSequenceNumber("increment", undefined, {
          conditions: tagConditionUnmet,
        }),
        "ConditionNotMet",
      );
      await newBlobClient.updateSequenceNumber("increment", undefined, {
        conditions: tagConditionMet,
      });
    });
  });
});

describe("BlobClient - Verify Name Properties", () => {
  const accountName = "myaccount";
  const blobName = "blob/part/1.txt";
  const containerName = "containername";

  function verifyNameProperties(url: string): void {
    const newClient = new BlobClient(url);
    assert.equal(
      newClient.containerName,
      containerName,
      "Container name is not the same as the one provided.",
    );
    assert.equal(newClient.name, blobName, "Blob name is not the same as the one provided.");
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided.",
    );
  }

  it("verify endpoint from the portal", async () => {
    verifyNameProperties(
      `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`,
    );
  });

  it("verify IPv4 host address as Endpoint", async () => {
    verifyNameProperties(`https://192.0.0.10:1900/${accountName}/${containerName}/${blobName}`);
  });

  it("verify IPv6 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${containerName}/${blobName}`,
    );
  });

  it("verify endpoint without dots", async () => {
    verifyNameProperties(`https://localhost:80/${accountName}/${containerName}/${blobName}`);
  });

  it("verify custom endpoint without valid accountName", async () => {
    const newClient = new BlobClient(`https://customdomain.com/${containerName}/${blobName}`);
    assert.equal(newClient.accountName, "", "Account name is not the same as expected.");
    assert.equal(
      newClient.containerName,
      containerName,
      "Container name is not the same as the one provided.",
    );
    assert.equal(newClient.name, blobName, "Blob name is not the same as the one provided.");
  });
});

// Run OR policy tests only if the policy enablement time is at least 24h (86400000 ms) in the past.
describe.runIf(
  shouldRunObjectReplicationTests() && getOrSourceContainerName() && getOrDestContainerName(),
)("BlobClient - Object Replication", () => {
  const srcContainerName = getOrSourceContainerName();
  const destContainerName = getOrDestContainerName();
  assert.isDefined(srcContainerName);
  assert.isDefined(destContainerName);
  const blobName = "orsBlob";

  let srcBlobServiceClient: BlobServiceClient;
  let destBlobServiceClient: BlobServiceClient;
  let srcContainerClient: ContainerClient;
  let destContainerClient: ContainerClient;
  let srcBlobClient: BlobClient;
  let destBlobClient: BlobClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    srcBlobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });
    destBlobServiceClient = await createBlobServiceClient("TokenCredential", {
      recorder,
      account: "objectReplication",
    });
    srcContainerClient = srcBlobServiceClient.getContainerClient(srcContainerName);
    destContainerClient = destBlobServiceClient.getContainerClient(destContainerName);
    srcBlobClient = srcContainerClient.getBlobClient(blobName);
    destBlobClient = destContainerClient.getBlobClient(blobName);

    // Ensure the source blob exists; create it if missing to trigger replication.
    if (!isPlaybackMode()) {
      try {
        await srcBlobClient.getProperties();
      } catch (e: any) {
        if (!isRestError(e)) {
          throw e;
        }
        if (e.statusCode === 404) {
          const bb = srcBlobClient.getBlockBlobClient();
          const body = Buffer.from("object-replication-test");
          await bb.upload(body, body.length);
        } else {
          throw e;
        }
      }

      while (true) {
        try {
          console.log("Waiting for blob replication...");
          await delay(30000);
          await destBlobClient.getProperties();
          break;
        } catch (e: any) {
          if (!isRestError(e)) {
            throw e;
          }
          if (e.statusCode === 404) {
            await delay(3000);
            continue;
          }
          throw e;
        }
      }
    }
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("source blob get properties", async () => {
    const srcRes = await srcBlobClient.getProperties();
    assertSrcReplicationProps(srcRes);
  });

  it("destination blob get properties", async () => {
    const getRes = await destBlobClient.getProperties();
    assertDestReplicationProps(getRes);
  });

  it("listBlob", async () => {
    for await (const blobItem of srcContainerClient.listBlobsFlat()) {
      if (blobItem.name === blobName) {
        assertSrcReplicationProps(blobItem);
      }
    }

    for await (const blobItem of destContainerClient.listBlobsFlat()) {
      if (blobItem.name === blobName) {
        assertDestReplicationProps(blobItem);
      }
    }
  });

  it("download blob", async () => {
    const srcRes = await srcBlobClient.download();
    assertSrcReplicationProps(srcRes);

    const destRes = await destBlobClient.download();
    assertDestReplicationProps(destRes);
  });
});

describe("BlobClient - ImmutabilityPolicy", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  const content = "Hello World";

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    containerName = getImmutableContainerName();
    recorder = new Recorder(ctx);
    blobServiceClient = await createBlobServiceClient("TokenCredential", { recorder });

    containerClient = blobServiceClient.getContainerClient(containerName);
    blobName = getUniqueName("blob", { recorder });
    blobClient = containerClient.getBlobClient(blobName);
  });

  afterEach(async () => {
    const listResult = (await containerClient.listBlobsFlat().byPage().next()).value;

    for (let i = 0; i < listResult.segment.blobItems!.length; ++i) {
      const deleteBlobClient = containerClient.getBlobClient(listResult.segment.blobItems[i].name);

      await deleteBlobClient.setLegalHold(false);

      await deleteBlobClient.deleteImmutabilityPolicy();
      await deleteBlobClient.delete({ deleteSnapshots: "include" });
    }
    await recorder.stop();
  });

  it("Set immutability policy", async () => {
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);

    const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);

    const result = await blobClient.setImmutabilityPolicy({
      expiriesOn: minutesLater,
      policyMode: "Unlocked",
    });

    assert.ok(result.immutabilityPolicyExpiry);
    assert.equal(
      result.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );

    const propertiesResult = await blobClient.getProperties();

    assert.ok(propertiesResult.immutabilityPolicyExpiresOn);
    assert.equal(
      propertiesResult.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );

    const listResult = (
      await containerClient
        .listBlobsFlat({
          includeImmutabilityPolicy: true,
        })
        .byPage()
        .next()
    ).value;
    assert.deepStrictEqual(listResult.segment.blobItems!.length, 1);
    assert.ok(listResult.segment.blobItems[0].properties.immutabilityPolicyExpiresOn);
    assert.equal(listResult.segment.blobItems[0].properties.immutabilityPolicyMode, "unlocked");

    const downloadResult = await blobClient.download();
    assert.ok(downloadResult.immutabilityPolicyExpiresOn);
    assert.equal(
      downloadResult.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );
  });

  it("Set immutability policy with ifModified access condition", async () => {
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
    const minutesBefore = new Date(recorder.variable("minutesBefore", new Date().toISOString()));
    minutesBefore.setMinutes(minutesBefore.getMinutes() - 5);

    const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);

    const result = await blobClient.setImmutabilityPolicy(
      {
        expiriesOn: minutesLater,
        policyMode: "Unlocked",
      },
      {
        modifiedAccessCondition: {
          ifModifiedSince: minutesBefore,
        },
      },
    );

    assert.ok(result.immutabilityPolicyExpiry);
    assert.equal(
      result.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );

    const propertiesResult = await blobClient.getProperties();

    assert.ok(propertiesResult.immutabilityPolicyExpiresOn);
    assert.equal(
      propertiesResult.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );

    const listResult = (
      await containerClient
        .listBlobsByHierarchy("/", {
          includeImmutabilityPolicy: true,
        })
        .byPage()
        .next()
    ).value;
    assert.deepStrictEqual(listResult.segment.blobItems!.length, 1);
    assert.ok(listResult.segment.blobItems[0].properties.immutabilityPolicyExpiresOn);
    assert.equal(listResult.segment.blobItems[0].properties.immutabilityPolicyMode, "unlocked");

    const downloadResult = await blobClient.download();
    assert.ok(downloadResult.immutabilityPolicyExpiresOn);
    assert.ok(downloadResult.immutabilityPolicyMode);
  });

  it("Set immutability policy and set legalhold and delete immutability policy", async () => {
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);

    const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);

    const result = await blobClient.setImmutabilityPolicy({
      expiriesOn: minutesLater,
      policyMode: "Unlocked",
    });

    assert.ok(result.immutabilityPolicyExpiry);
    assert.equal(
      result.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );

    let setLegalHoldResult = await blobClient.setLegalHold(true);
    assert.equal(setLegalHoldResult.legalHold, true);

    const listResult = (
      await containerClient
        .listBlobsFlat({
          includeImmutabilityPolicy: true,
          includeLegalHold: true,
        })
        .byPage()
        .next()
    ).value;

    assert.deepStrictEqual(listResult.segment.blobItems!.length, 1);
    assert.ok(listResult.segment.blobItems[0].properties.immutabilityPolicyExpiresOn);
    assert.equal(listResult.segment.blobItems[0].properties.immutabilityPolicyMode, "unlocked");
    assert.equal(listResult.segment.blobItems[0].properties.legalHold, true);

    const downloadResult = await blobClient.download();
    assert.ok(downloadResult.immutabilityPolicyExpiresOn);
    assert.equal(
      downloadResult.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );
    assert.equal(downloadResult.legalHold, true);

    setLegalHoldResult = await blobClient.setLegalHold(false);
    assert.equal(setLegalHoldResult.legalHold, false);

    await blobClient.deleteImmutabilityPolicy();
    await blobClient.delete();
  });

  it("Set immutability policy and set legalhold and delete immutability policy on blob snapshot", async () => {
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);

    const snapshotResult = await blockBlobClient.createSnapshot();
    const blobSnapshotClient = blockBlobClient.withSnapshot(snapshotResult.snapshot!);

    const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);

    const result = await blobSnapshotClient.setImmutabilityPolicy({
      expiriesOn: minutesLater,
      policyMode: "Unlocked",
    });

    assert.ok(result.immutabilityPolicyExpiry);
    assert.equal(
      result.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );

    let setLegalHoldResult = await blobSnapshotClient.setLegalHold(true);
    assert.equal(setLegalHoldResult.legalHold, true);

    setLegalHoldResult = await blobSnapshotClient.setLegalHold(false);
    assert.equal(setLegalHoldResult.legalHold, false);

    await blobSnapshotClient.deleteImmutabilityPolicy();
    await blobClient.delete({ deleteSnapshots: "include" });
  });

  it("Set immutability policy and set legalhold and delete immutability policy on blob with version", async () => {
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);

    const setMetadataResult = await blockBlobClient.setMetadata({
      key1: "value1",
    });
    const blobWithVersion = blockBlobClient.withVersion(setMetadataResult.versionId!);

    const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);

    const result = await blobWithVersion.setImmutabilityPolicy({
      expiriesOn: minutesLater,
      policyMode: "Unlocked",
    });

    assert.ok(result.immutabilityPolicyExpiry);
    assert.equal(
      result.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );

    let setLegalHoldResult = await blobWithVersion.setLegalHold(true);
    assert.equal(setLegalHoldResult.legalHold, true);

    setLegalHoldResult = await blobWithVersion.setLegalHold(false);
    assert.equal(setLegalHoldResult.legalHold, false);

    await blobWithVersion.deleteImmutabilityPolicy();
  });

  it("Set immutability policy - blob does not exist", async () => {
    const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);
    let caughtException = false;

    try {
      await blobClient.setImmutabilityPolicy({
        expiriesOn: minutesLater,
        policyMode: "Unlocked",
      });
      assert.fail("setImmutabilityPolicy against a non-exist blob should not succeed");
    } catch (error: any) {
      if (!isRestError(error)) {
        throw error;
      }
      caughtException = true;
    }
    assert.ok(
      caughtException,
      "Should catch exception when setImmutabilityPolicy against a non-exist blob",
    );
  });

  it("Set immutability policy mode to mutable", async () => {
    const blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);

    const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);
    let caughtException = false;

    try {
      await blobClient.setImmutabilityPolicy({
        expiriesOn: minutesLater,
        policyMode: "Mutable",
      });
      assert.fail("Setting ImmutabilityPolicy mode to Mutable should not succeed");
    } catch (error: any) {
      if (!isRestError(error)) {
        throw error;
      }
      caughtException = true;
    }
    assert.ok(
      caughtException,
      "Should catch exception when setting ImmutabilityPolicy mode to Mutable",
    );
  });

  it("Set legalhold - blob does not exist", async () => {
    let caughtException = false;
    try {
      await blobClient.setLegalHold(true);
      assert.fail("setLegalHold against a non-exist blob should not succeed");
    } catch (error: any) {
      if (!isRestError(error)) {
        throw error;
      }
      caughtException = true;
    }
    assert.ok(caughtException, "Should catch exception when setLegalHold against a non-exist blob");
  });

  it("Delete immutability policy - blob does not exist", async () => {
    let caughtException = false;

    try {
      await blobClient.deleteImmutabilityPolicy();
      assert.fail("Delete immutability policy against a non-exist blob should not succeed");
    } catch (error: any) {
      if (!isRestError(error)) {
        throw error;
      }
      caughtException = true;
    }
    assert.ok(
      caughtException,
      "Should catch exception when deleting immutability policy against a non-exist blob",
    );
  });

  it("Create append blob with immutability policy", async () => {
    const appendBlobClient = blobClient.getAppendBlobClient();

    const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);

    await appendBlobClient.create({
      immutabilityPolicy: {
        expiriesOn: minutesLater,
        policyMode: "Unlocked",
      },
    });

    const properties = await blobClient.getProperties();
    assert.ok(properties.immutabilityPolicyExpiresOn);
    assert.equal(
      properties.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );
  });

  it("Create append blob with legalhold", async () => {
    const appendBlobClient = blobClient.getAppendBlobClient();

    await appendBlobClient.create({
      legalHold: true,
    });

    const properties = await blobClient.getProperties();
    assert.ok(properties.legalHold);
  });

  it("Create page blob with immutability policy", async () => {
    const pageBlobClient = blobClient.getPageBlobClient();

    const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);

    await pageBlobClient.create(512, {
      immutabilityPolicy: {
        expiriesOn: minutesLater,
        policyMode: "Unlocked",
      },
    });

    const properties = await blobClient.getProperties();
    assert.ok(properties.immutabilityPolicyExpiresOn);
    assert.equal(
      properties.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );
  });

  it("Create page blob with legalhold", async () => {
    const pageBlobClient = blobClient.getPageBlobClient();

    await pageBlobClient.create(512, {
      legalHold: true,
    });

    const properties = await blobClient.getProperties();
    assert.ok(properties.legalHold);
  });

  it("Commit block list with immutability policy", async () => {
    const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);

    const blockBlob = blobClient.getBlockBlobClient();

    await blockBlob.stageBlock(base64encode("1"), content, content.length);

    await blockBlob.commitBlockList([base64encode("1")], {
      immutabilityPolicy: {
        expiriesOn: minutesLater,
        policyMode: "Unlocked",
      },
    });

    const properties = await blobClient.getProperties();
    assert.ok(properties.immutabilityPolicyExpiresOn);
    assert.equal(
      properties.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );
  });

  it("Commit block list with legalhold", async () => {
    const blockBlob = blobClient.getBlockBlobClient();
    const blockId = base64encode("1");

    await blockBlob.stageBlock(blockId, content, content.length);
    const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);

    await blockBlob.commitBlockList([blockId], {
      legalHold: true,
    });

    const properties = await blobClient.getProperties();
    assert.ok(properties.legalHold);
  });

  it("Blockblob upload with immutability policy", async () => {
    const blockBlob = blobClient.getBlockBlobClient();
    const minutesLater = new Date(recorder.variable("minutesLater", new Date().toISOString()));
    minutesLater.setMinutes(minutesLater.getMinutes() + 5);

    await blockBlob.upload(content, content.length, {
      immutabilityPolicy: {
        expiriesOn: minutesLater,
        policyMode: "Unlocked",
      },
    });

    const properties = await blobClient.getProperties();
    assert.ok(properties.immutabilityPolicyExpiresOn);
    assert.equal(
      properties.immutabilityPolicyMode,
      "unlocked" as BlobImmutabilityPolicyMode | undefined,
    );
  });

  it("Blockblob upload with legalhold", async () => {
    const blockBlob = blobClient.getBlockBlobClient();

    await blockBlob.upload(content, content.length, {
      legalHold: true,
    });

    const properties = await blobClient.getProperties();
    assert.ok(properties.legalHold);
  });
});
