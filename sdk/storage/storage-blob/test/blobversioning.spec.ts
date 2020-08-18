import * as assert from "assert";
import * as dotenv from "dotenv";
import * as fs from "fs";
import { isNode, delay } from "@azure/core-http";
import { getBSU, recorderEnvSetup, bodyToString, getGenericCredential } from "./utils";
import { record, Recorder } from "@azure/test-utils-recorder";
import {
  ContainerClient,
  BlobServiceClient,
  BlobClient,
  BlockBlobClient,
  BlockBlobUploadResponse,
  BlobBatch
} from "../src";
import { setURLParameter } from "../src/utils/utils.common";
dotenv.config({ path: "../.env" });

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

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.getUniqueName("blob");
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    uploadRes = await blockBlobClient.upload(content, content.length);
    uploadRes2 = await blockBlobClient.upload("", 0);
  });

  afterEach(async function() {
    await containerClient.delete();
    await recorder.stop();
  });

  it("List Blobs include versions", async () => {
    const blobClients = [];
    blobClients.push(blobClient);

    const prefix = "blockblob";
    for (let i = 0; i < 2; i++) {
      const tmpBlobClient = containerClient.getBlobClient(recorder.getUniqueName(`${prefix}/${i}`));
      const tmpBlockBlobClient = tmpBlobClient.getBlockBlobClient();
      await tmpBlockBlobClient.upload("", 0);
      blobClients.push(tmpBlobClient);
    }

    const result = (
      await containerClient
        .listBlobsFlat({
          includeVersions: true
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

    if (isNode) {
      const downloadToBufferRes = await blobVersionClient.downloadToBuffer();
      assert.ok(downloadToBufferRes.equals(Buffer.from(content)));
    }
  });

  it("download a version to file", async function() {
    if (!isNode) {
      // downloadToFile only available in Node.js
      this.skip();
    }
    recorder.skip("node", "Temp file - recorder doesn't support saving the file");
    const downloadedFilePath = recorder.getUniqueName("downloadedtofile");
    await blobClient.withVersion(uploadRes.versionId!).downloadToFile(downloadedFilePath);
    const downloadedFileContent = fs.readFileSync(downloadedFilePath);
    assert.ok(downloadedFileContent.equals(Buffer.from(content)));
    fs.unlinkSync(downloadedFilePath);
  });

  it("get properties of a blob version", async () => {
    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    const getRes = await blobVersionClient.getProperties();
    assert.equal(getRes.contentLength, content.length);
    assert.equal(getRes.versionId, uploadRes.versionId);
    assert.ok(!getRes.isCurrentVersion);

    const getRes2 = await blobClient.getProperties();
    assert.equal(getRes2.contentLength, 0);
    assert.equal(getRes2.versionId, uploadRes2.versionId);
    assert.ok(getRes2.isCurrentVersion);

    // specify both snapshot and versionId
    const snapshotRes = await blobClient.createSnapshot();
    let exceptionCaught = false;
    try {
      await blobVersionClient.withSnapshot(snapshotRes.snapshot!).getProperties();
    } catch (err) {
      assert.equal(err.details.errorCode, "MutuallyExclusiveQueryParameters");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    const existRes = await blobVersionClient.exists();
    assert.ok(existRes);
  });

  it("delete a version", async function() {
    if (!isNode) {
      // SAS in test pipeline need to support the new permission.
      this.skip();
    }

    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    await blobVersionClient.delete();

    const versionExists = await blobVersionClient.exists();
    assert.ok(!versionExists);

    const rootExists = await blobClient.exists();
    assert.ok(rootExists);
  });

  it("deleteBlobs should work for batch delete", async function() {
    if (!isNode) {
      // SAS in test pipeline need to support the new permission.
      this.skip();
    }

    recorder.skip(
      undefined,
      "UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
    );
    const blockBlobCount = 3;
    let blockBlobClients: BlockBlobClient[] = new Array(blockBlobCount);
    let versions: string[] = new Array(blockBlobCount);
    for (let i = 0; i < blockBlobCount; i++) {
      let tmpBlobName = `blob${i}`;
      let tmpBlockBlobClient = containerClient.getBlockBlobClient(tmpBlobName);
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
    const credential = getGenericCredential("");
    let batchDeleteRequest = new BlobBatch();
    for (let i = 0; i < blockBlobCount; i++) {
      await batchDeleteRequest.deleteBlob(
        blockBlobClients[i].withVersion(versions[i]!).url,
        credential
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
      assert.ok(resp.subResponses[i].statusMessage != "");
      assert.ok(resp.subResponses[i].headers.contains("x-ms-request-id"));
      assert.equal(
        resp.subResponses[i]._request.url,
        blockBlobClients[i].withVersion(versions[i]!).url
      );
    }

    // Verify blob versions deleted.
    const resp2 = (
      await containerClient
        .listBlobsFlat({
          includeVersions: true
        })
        .byPage()
        .next()
    ).value;
    assert.equal(resp2.segment.blobItems.length, 2 + blockBlobCount);
  });

  it("deleting root blob with versionId should fail", async function() {
    if (!isNode) {
      // SAS in test pipeline need to support the new permission.
      this.skip();
    }

    await containerClient.deleteBlob(blobName, {
      versionId: uploadRes.versionId
    });
    const versionExists = await blobClient.withVersion(uploadRes.versionId!).exists();
    assert.ok(!versionExists);

    let exceptionCaught: boolean = false;
    try {
      await containerClient.deleteBlob(blobName, {
        versionId: uploadRes2.versionId
      });
    } catch (err) {
      assert.equal(err.details.errorCode, "OperationNotAllowedOnRootBlob");
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

  it("deleting a blob that has snapshots needs deleteSnapshots option", async function() {
    if (!isNode) {
      // SAS in test pipeline need to support the new permission.
      this.skip();
    }

    const result = await blobClient.createSnapshot();
    assert.ok(result.snapshot);

    let exceptionCaught: boolean = false;
    try {
      await blobClient.delete();
    } catch (err) {
      assert.equal(err.details.errorCode, "SnapshotsPresent");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    blobClient.delete({ deleteSnapshots: "include" });
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
    } catch (err) {
      assert.equal(err.details.errorCode, "InvalidQueryParameterValue");
      exceptionCaught = true;
    }
    assert.ok(exceptionCaught);

    let exceptionCaught2 = false;
    const blobVersionClient2 = blobClient.withVersion(uploadRes2.versionId!);
    try {
      await blobVersionClient2.delete({ deleteSnapshots: "only" });
    } catch (err) {
      assert.equal(err.details.errorCode, "InvalidQueryParameterValue");
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

  it("promote a version: as the copy source", async function() {
    if (!isNode) {
      // SAS in test pipeline need to support the new permission.
      this.skip();
    }

    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    await blobVersionClient.getProperties();

    const versionURL = setURLParameter(blobClient.url, "versionid", uploadRes.versionId);
    const copyRes = await (await blobClient.beginCopyFromURL(versionURL)).pollUntilDone();
    assert.ok(copyRes.copyId);

    const listRes = (
      await containerClient
        .listBlobsFlat({
          includeVersions: true
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
    const appendBlobName = recorder.getUniqueName("appendblob");
    const appendBlobClient = containerClient.getBlobClient(appendBlobName).getAppendBlobClient();
    const appendCreateRes = await appendBlobClient.create();
    assert.ok(appendCreateRes.versionId);

    const pageBlobName = recorder.getUniqueName("pageblob");
    const pageBlobClient = containerClient.getBlobClient(pageBlobName).getAppendBlobClient();
    const pageCreateRes = await pageBlobClient.create();
    assert.ok(pageCreateRes.versionId);
  });

  it("upload block blob return versionId", async () => {
    const containerUploadRes = await containerClient.uploadBlockBlob(
      blobName,
      content,
      content.length
    );
    assert.ok(containerUploadRes.response.versionId);

    if (!isNode) {
      const uploadBrowserDataRes = await blockBlobClient.uploadBrowserData(new Blob([content]));
      assert.ok(uploadBrowserDataRes.versionId);
    }
  });

  it("asynchorous copy return versionId", async () => {
    const newBlobClient = containerClient.getBlobClient(recorder.getUniqueName("copiedblob"));
    const result = await (await newBlobClient.beginCopyFromURL(blobClient.url)).pollUntilDone();
    assert.ok(result.versionId);
  });

  it("setMetaData", async () => {
    const metadata = {
      keya: "a",
      keyb: "c"
    };
    const setMetaRes = await blobClient.setMetadata(metadata);
    assert.ok(setMetaRes.versionId);
  });

  it("undelete a soft-deleted version", async function() {
    if (!isNode) {
      // SAS in test pipeline need to support the new permission.
      this.skip();
    }

    let properties = await blobServiceClient.getProperties();
    if (!properties.deleteRetentionPolicy!.enabled) {
      await blobServiceClient.setProperties({
        deleteRetentionPolicy: {
          days: 7,
          enabled: true
        }
      });
      await delay(30 * 1000);
      properties = await blobServiceClient.getProperties();
      assert.ok(
        properties.deleteRetentionPolicy!.enabled,
        "deleteRetentionPolicy should be enabled."
      );
    }

    const blobVersionClient = blobClient.withVersion(uploadRes.versionId!);
    await blobVersionClient.delete();
    assert.ok(!(await blobVersionClient.exists()));

    await blobClient.undelete();
    assert.ok(await blobVersionClient.exists());
  });
});
