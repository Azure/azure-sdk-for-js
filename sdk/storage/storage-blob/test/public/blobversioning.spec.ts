// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay, isLiveMode, Recorder } from "@azure-tools/test-recorder";
import type {
  ContainerClient,
  BlobServiceClient,
  BlobClient,
  BlockBlobClient,
  BlockBlobUploadResponse,
} from "@azure/storage-blob";
import { BlobBatch } from "@azure/storage-blob";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createBlobServiceClient } from "./utils/clients.js";
import { bodyToString, getUniqueName, setURLParameter } from "./utils/utils.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { isRestError } from "@azure/core-rest-pipeline";

describe("Blob versioning", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  let uploadRes: BlockBlobUploadResponse;
  let uploadRes2: BlockBlobUploadResponse;
  const content = "Hello World";
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
    uploadRes = await blockBlobClient.upload(content, content.length);
    uploadRes2 = await blockBlobClient.upload("", 0);
  });

  afterEach(async () => {
    await containerClient.delete();
    await recorder.stop();
  });

  it("List Blobs include versions", async () => {
    const blobClients = [];
    blobClients.push(blobClient);

    const prefix = "blockblob";
    for (let i = 0; i < 2; i++) {
      const tmpBlobClient = containerClient.getBlobClient(
        getUniqueName(`${prefix}/${i}`, { recorder }),
      );
      const tmpBlockBlobClient = tmpBlobClient.getBlockBlobClient();
      await tmpBlockBlobClient.upload("", 0);
      blobClients.push(tmpBlobClient);
    }

    const result = (
      await containerClient
        .listBlobsFlat({
          includeVersions: true,
        })
        .byPage()
        .next()
    ).value;

    assert.equal(result.segment.blobItems!.length, 4);
    assert.equal(result.segment.blobItems![0].versionId, uploadRes.versionId);
    assert.equal(result.segment.blobItems![1].versionId, uploadRes2.versionId);
    assert.ok(result.segment.blobItems![1].isCurrentVersion);
  });

  it("download a blob version", async () => {
    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    const downloadRes = await blobVersionClient.download();
    assert.deepStrictEqual(await bodyToString(downloadRes, content.length), content);
    assert.deepStrictEqual(downloadRes.versionId, uploadRes.versionId);

    const downloadRes2 = await blobClient.withVersion(uploadRes2.versionId!).download();
    assert.deepStrictEqual(await bodyToString(downloadRes2), "");
    assert.deepStrictEqual(downloadRes2.versionId, uploadRes2.versionId);
  });

  it("get properties of a blob version", async () => {
    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    const getRes = await blobVersionClient.getProperties();
    assert.equal(getRes.contentLength, content.length);
    assert.equal(getRes.versionId, uploadRes.versionId);
    assert.isNotTrue(getRes.isCurrentVersion, "first upload version should not be current");

    const getRes2 = await blobClient.getProperties();
    assert.equal(getRes2.contentLength, 0);
    assert.equal(getRes2.versionId, uploadRes2.versionId);
    assert.isTrue(getRes2.isCurrentVersion, "second upload version should be current");

    // specify both snapshot and versionId
    const snapshotRes = await blobClient.createSnapshot();
    let exceptionCaught = false;
    try {
      await blobVersionClient.withSnapshot(snapshotRes.snapshot!).getProperties();
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.equal((err.details as any).errorCode, "MutuallyExclusiveQueryParameters");
      exceptionCaught = true;
    }
    assert.isTrue(exceptionCaught, "expected getProperties to throw");

    const existRes = await blobVersionClient.exists();
    assert.isTrue(existRes, "blob version should exist");
  });

  it("delete a version", async () => {
    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    await blobVersionClient.delete();

    const versionExists = await blobVersionClient.exists();
    assert.ok(!versionExists);

    const rootExists = await blobClient.exists();
    assert.ok(rootExists);
  });

  it.runIf(isLiveMode())("deleteBlobs should work for batch delete", async () => {
    const blockBlobCount = 3;
    const blockBlobClients: BlockBlobClient[] = new Array(blockBlobCount);
    const versions: string[] = new Array(blockBlobCount);
    for (let i = 0; i < blockBlobCount; i++) {
      const tmpBlobName = `blob${i}`;
      const tmpBlockBlobClient = containerClient.getBlockBlobClient(tmpBlobName);
      blockBlobClients[i] = tmpBlockBlobClient;
    }
    // Upload blobs.
    for (let i = 0; i < blockBlobCount; i++) {
      const tmpRes = await blockBlobClients[i].upload("", 0);
      versions[i] = tmpRes.versionId!;
      await blockBlobClients[i].upload(content, content.length);
    }

    // Assemble batch delete request.
    const blobBatchClient = blobServiceClient.getBlobBatchClient();
    const credential = createTestCredential();
    const batchDeleteRequest = new BlobBatch();
    for (let i = 0; i < blockBlobCount; i++) {
      await batchDeleteRequest.deleteBlob(
        blockBlobClients[i].withVersion(versions[i]!).url,
        credential,
      );
    }

    // Submit batch request and verify response.
    const resp = await blobBatchClient.submitBatch(batchDeleteRequest, {});

    assert.equal(resp.subResponses.length, blockBlobCount);
    assert.equal(resp.subResponsesSucceededCount, blockBlobCount);
    assert.equal(resp.subResponsesFailedCount, 0);

    for (let i = 0; i < blockBlobCount; i++) {
      assert.equal(resp.subResponses[i].errorCode, undefined);
      assert.equal(resp.subResponses[i].status, 202);
      assert.ok(resp.subResponses[i].statusMessage !== "");
      assert.ok(resp.subResponses[i].headers.contains("x-ms-request-id"));
      assert.equal(
        resp.subResponses[i]._request.url,
        blockBlobClients[i].withVersion(versions[i]!).url,
      );
    }

    // Verify blob versions deleted.
    const resp2 = (
      await containerClient
        .listBlobsFlat({
          includeVersions: true,
        })
        .byPage()
        .next()
    ).value;
    assert.equal(resp2.segment.blobItems.length, 2 + blockBlobCount);
  });

  it("deleting root blob with versionId should fail", async () => {
    await containerClient.deleteBlob(blobName, {
      versionId: uploadRes.versionId,
    });
    const versionExists = await blobClient.withVersion(uploadRes.versionId!).exists();
    assert.ok(!versionExists);

    let exceptionCaught: boolean = false;
    try {
      await containerClient.deleteBlob(blobName, {
        versionId: uploadRes2.versionId,
      });
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.equal((err.details as any).errorCode, "OperationNotAllowedOnRootBlob");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);
  });

  it("delete a snapshot", async () => {
    const result = await blobClient.createSnapshot();
    assert.ok(result.snapshot);
    assert.ok(result.versionId);

    const snapshotClient = blobClient.withSnapshot(result.snapshot!);
    await snapshotClient.delete();
    const snapshotExists = await snapshotClient.exists();
    assert.ok(!snapshotExists);

    const rootExists = await blobClient.exists();
    assert.ok(rootExists);
  });

  it("deleting a blob that has snapshots needs deleteSnapshots option", async () => {
    const result = await blobClient.createSnapshot();
    assert.ok(result.snapshot);

    let exceptionCaught: boolean = false;
    try {
      await blobClient.delete();
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.equal((err.details as any).errorCode, "SnapshotsPresent");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    await blobClient.delete({ deleteSnapshots: "include" });
    const snapshotExists = await blobClient.withSnapshot(result.snapshot!).exists();
    assert.ok(!snapshotExists);
    const rootExists = await blobClient.exists();
    assert.ok(!rootExists);
  });

  it("deleting a blob with both deleteSnapshots and versionId option should fail", async () => {
    const result = await blobClient.createSnapshot();
    assert.ok(result.snapshot);

    let exceptionCaught: boolean = false;
    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    try {
      await blobVersionClient.delete({ deleteSnapshots: "include" });
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.equal((err.details as any).errorCode, "InvalidQueryParameterValue");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    let exceptionCaught2 = false;
    const blobVersionClient2 = blobClient.withVersion(uploadRes2.versionId!);
    try {
      await blobVersionClient2.delete({ deleteSnapshots: "only" });
    } catch (err: any) {
      if (!isRestError(err)) {
        throw err;
      }
      assert.equal((err.details as any).errorCode, "InvalidQueryParameterValue");
      exceptionCaught2 = true;
    }
    assert.ok(exceptionCaught2);
  });

  it("deleting a versioned blob without extra parameters should succeed", async () => {
    await blobClient.delete();

    const rootExists = await blobClient.exists();
    assert.ok(!rootExists);

    const versionExists = await blobClient.withVersion(uploadRes.versionId!).exists();
    assert.ok(versionExists);
  });

  it("promote a version: as the copy source", async () => {
    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    await blobVersionClient.getProperties();

    const versionURL = setURLParameter(blobClient.url, "versionid", uploadRes.versionId);
    const copyRes = await (await blobClient.beginCopyFromURL(versionURL)).pollUntilDone();
    assert.ok(copyRes.copyId);

    const listRes = (
      await containerClient
        .listBlobsFlat({
          includeVersions: true,
        })
        .byPage()
        .next()
    ).value;

    const blobItemsLength = listRes.segment.blobItems!.length;
    assert.equal(blobItemsLength, 3);
    assert.equal(listRes.segment.blobItems![blobItemsLength - 1].versionId, copyRes.versionId);
    assert.ok(listRes.segment.blobItems![blobItemsLength - 1].isCurrentVersion);

    const downloadRes = await blobClient.download();
    assert.deepStrictEqual(await bodyToString(downloadRes, content.length), content);
  });

  it("blob create return versionId", async () => {
    const appendBlobName = getUniqueName("appendblob", { recorder });
    const appendBlobClient = containerClient.getBlobClient(appendBlobName).getAppendBlobClient();
    const appendCreateRes = await appendBlobClient.create();
    assert.ok(appendCreateRes.versionId);

    const pageBlobName = getUniqueName("pageblob", { recorder });
    const pageBlobClient = containerClient.getBlobClient(pageBlobName).getAppendBlobClient();
    const pageCreateRes = await pageBlobClient.create();
    assert.ok(pageCreateRes.versionId);
  });

  it("upload block blob return versionId", async () => {
    const containerUploadRes = await containerClient.uploadBlockBlob(
      blobName,
      content,
      content.length,
    );
    assert.ok(containerUploadRes.response.versionId);

    const bytes = new TextEncoder().encode(content);
    const uploadBrowserDataRes = await blockBlobClient.uploadData(bytes);
    assert.ok(uploadBrowserDataRes.versionId);
  });

  it("asynchorous copy return versionId", async () => {
    const newBlobClient = containerClient.getBlobClient(getUniqueName("copiedblob", { recorder }));
    const result = await (await newBlobClient.beginCopyFromURL(blobClient.url)).pollUntilDone();
    assert.ok(result.versionId);
  });

  it("setMetaData", async () => {
    const metadata = {
      keya: "a",
      keyb: "c",
    };
    const setMetaRes = await blobClient.setMetadata(metadata);
    assert.ok(setMetaRes.versionId);
  });

  it("undelete a soft-deleted version", async () => {
    let properties = await blobServiceClient.getProperties();
    if (!properties.deleteRetentionPolicy!.enabled) {
      await blobServiceClient.setProperties({
        deleteRetentionPolicy: {
          days: 7,
          enabled: true,
        },
      });
      await delay(30 * 1000);
      properties = await blobServiceClient.getProperties();
      assert.ok(
        properties.deleteRetentionPolicy!.enabled,
        "deleteRetentionPolicy should be enabled.",
      );
    }

    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    await blobVersionClient.delete();
    assert.ok(!(await blobVersionClient.exists()));

    await blobClient.undelete();
    assert.ok(await blobVersionClient.exists());
  });
});
