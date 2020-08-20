import * as assert from "assert";
import * as dotenv from "dotenv";
import {
  getGenericBSU,
  getGenericCredential,
  getTokenCredential,
  SimpleTokenCredential,
  recorderEnvSetup
} from "./utils";
import { record, Recorder } from "@azure/test-utils-recorder";
import { BlobBatch } from "../src";
import {
  ContainerClient,
  BlockBlobClient,
  BlobServiceClient,
  newPipeline,
  BlobBatchClient,
  StorageSharedKeyCredential
} from "../src";

dotenv.config();

describe("BlobBatch", () => {
  let blobServiceClient: BlobServiceClient;
  let blobBatchClient: BlobBatchClient;
  let credential: StorageSharedKeyCredential;
  let containerName: string;
  let containerClient: ContainerClient;
  const blockBlobCount = 3;
  let blockBlobClients: BlockBlobClient[] = new Array(blockBlobCount);
  const content = "Hello World";

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);

    blobServiceClient = getGenericBSU("");
    blobBatchClient = blobServiceClient.getBlobBatchClient();
    credential = getGenericCredential("");
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    for (let i = 0; i < blockBlobCount - 1; i++) {
      let tmpBlobName = `blob${i}`;
      let tmpBlockBlobClient = containerClient.getBlockBlobClient(tmpBlobName);
      blockBlobClients[i] = tmpBlockBlobClient;
    }

    let specialBlobName = `å ä ö`;
    let tmpBlockBlobClient = containerClient.getBlockBlobClient(specialBlobName);
    blockBlobClients[blockBlobCount - 1] = tmpBlockBlobClient;
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await containerClient.delete();
      await recorder.stop();
    }
  });

  it("submitBatch should work for batch delete", async () => {
    recorder.skip(
      undefined,
      "UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
    );
    // Upload blobs.
    for (let i = 0; i < blockBlobCount; i++) {
      await blockBlobClients[i].upload(content, content.length);
    }

    // Assemble batch delete request.
    let batchDeleteRequest = new BlobBatch();
    for (let i = 0; i < blockBlobCount; i++) {
      await batchDeleteRequest.deleteBlob(blockBlobClients[i].url, credential, {});
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
      assert.equal(resp.subResponses[i]._request.url, blockBlobClients[i].url);
    }

    // Verify blobs deleted.
    const resp2 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true
        })
        .byPage({ maxPageSize: 1 })
        .next()
    ).value;
    assert.equal(resp2.segment.blobItems.length, 0);
  });

  it("deleteBlobs should work for batch delete", async () => {
    recorder.skip(
      undefined,
      "UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
    );
    // Upload blobs.
    for (let i = 0; i < blockBlobCount; i++) {
      await blockBlobClients[i].upload(content, content.length);
    }

    // Submit batch request and verify response.
    const urls = blockBlobClients.map((b) => b.url);
    const resp = await blobBatchClient.deleteBlobs(urls, credential, {});
    assert.equal(resp.subResponses.length, blockBlobCount);
    assert.equal(resp.subResponsesSucceededCount, blockBlobCount);
    assert.equal(resp.subResponsesFailedCount, 0);

    for (let i = 0; i < blockBlobCount; i++) {
      assert.equal(resp.subResponses[i].errorCode, undefined);
      assert.equal(resp.subResponses[i].status, 202);
      assert.ok(resp.subResponses[i].statusMessage != "");
      assert.ok(resp.subResponses[i].headers.contains("x-ms-request-id"));
      assert.equal(resp.subResponses[i]._request.url, blockBlobClients[i].url);
    }

    // Verify blobs deleted.
    const resp2 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true
        })
        .byPage({ maxPageSize: 1 })
        .next()
    ).value;
    assert.equal(resp2.segment.blobItems.length, 0);
  });

  it("submitBatch should work for batch delete with snapshot", async () => {
    recorder.skip(
      undefined,
      "UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
    );
    //
    // Test delete blob with snapshot.
    //
    // Upload blob.
    await blockBlobClients[0].upload(content, content.length);
    await blockBlobClients[0].createSnapshot();

    // Assemble batch delete request which delete blob with its snapshot.
    let batchDeleteRequest = new BlobBatch();
    await batchDeleteRequest.deleteBlob(blockBlobClients[0].url, credential, {
      deleteSnapshots: "include"
    });

    // Ensure blobs ready.
    let respList1 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true
        })
        .byPage({ maxPageSize: 5 })
        .next()
    ).value;
    assert.equal(respList1.segment.blobItems.length, 2);

    // Submit batch request and verify response.
    const respSubmitBatch1 = await blobBatchClient.submitBatch(batchDeleteRequest, {});
    assert.equal(respSubmitBatch1.subResponses.length, 1);
    assert.equal(respSubmitBatch1.subResponsesSucceededCount, 1);
    assert.equal(respSubmitBatch1.subResponsesFailedCount, 0);

    // Validate that blob and its snapshot all get deleted.
    respList1 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true
        })
        .byPage({ maxPageSize: 5 })
        .next()
    ).value;
    assert.equal(respList1.segment.blobItems.length, 0);

    //
    // Test delete snapshot only with snapshot's url and Credential.
    //
    // Upload blob.
    await blockBlobClients[1].upload(content, content.length);
    const createSnapshotResp = await blockBlobClients[1].createSnapshot();
    const snapshotClient = blockBlobClients[1].withSnapshot(createSnapshotResp.snapshot!);

    // Assemble batch delete request.
    let batchDeleteRequest2 = new BlobBatch();
    await batchDeleteRequest2.deleteBlob(snapshotClient.url, credential);

    // Ensure blobs ready.
    let respList2 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true
        })
        .byPage({ maxPageSize: 5 })
        .next()
    ).value;
    assert.equal(respList2.segment.blobItems.length, 2);

    // Submit batch request and verify response.
    const respSubmitBatch2 = await blobBatchClient.submitBatch(batchDeleteRequest2, {});
    assert.equal(respSubmitBatch2.subResponses.length, 1);
    assert.equal(respSubmitBatch2.subResponsesSucceededCount, 1);
    assert.equal(respSubmitBatch2.subResponsesFailedCount, 0);

    // Validate that snapshot get deleted.
    respList2 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true
        })
        .byPage({ maxPageSize: 5 })
        .next()
    ).value;
    assert.equal(respList2.segment.blobItems.length, 1);

    //
    // Test delete snapshot only with snapshot's url using snapshot's BlobURL.
    //
    // Upload blob.
    await blockBlobClients[2].upload(content, content.length);
    const createSnapshotResp2 = await blockBlobClients[2].createSnapshot();
    const snapshotClient2 = blockBlobClients[2].withSnapshot(createSnapshotResp2.snapshot!);

    // Assemble batch delete request.
    let batchDeleteRequest3 = new BlobBatch();
    await batchDeleteRequest3.deleteBlob(snapshotClient2);

    // Ensure blobs ready.
    let respList3 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true
        })
        .byPage({ maxPageSize: 5 })
        .next()
    ).value;
    assert.equal(respList3.segment.blobItems.length, 3);

    // Submit batch request and verify response.
    const respSubmitBatch3 = await blobBatchClient.submitBatch(batchDeleteRequest3, {});
    assert.equal(respSubmitBatch3.subResponses.length, 1);
    assert.equal(respSubmitBatch3.subResponsesSucceededCount, 1);
    assert.equal(respSubmitBatch3.subResponsesFailedCount, 0);

    // Validate that snapshot get deleted.
    respList3 = (
      await containerClient
        .listBlobsFlat({
          includeSnapshots: true
        })
        .byPage({ maxPageSize: 5 })
        .next()
    ).value;
    assert.equal(respList3.segment.blobItems.length, 2);
  });

  it("submitBatch should work for batch delete with access condition and partial succeed", async () => {
    recorder.skip(
      undefined,
      "UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
    );
    // Upload blobs.
    const b0 = await blockBlobClients[0].upload(content, content.length);
    const b1 = await blockBlobClients[1].upload(content, content.length);

    // Assemble batch delete request.
    let batchDeleteRequest = new BlobBatch();
    await batchDeleteRequest.deleteBlob(blockBlobClients[0], {
      conditions: {
        ifMatch: b0.etag
      }
    });
    await batchDeleteRequest.deleteBlob(blockBlobClients[1], {
      conditions: {
        ifNoneMatch: b1.etag
      }
    });

    // Submit batch request and verify response.
    const resp = await blobBatchClient.submitBatch(batchDeleteRequest, {});
    assert.equal(resp.subResponses.length, 2);
    assert.equal(resp.subResponsesSucceededCount, 1);
    assert.equal(resp.subResponsesFailedCount, 1);

    // First succeeded.
    assert.equal(resp.subResponses[0].errorCode, undefined);
    assert.equal(resp.subResponses[0].status, 202);
    assert.ok(resp.subResponses[0].statusMessage != "");
    assert.equal(resp.subResponses[0]._request.url, blockBlobClients[0].url);

    // Second failed.
    assert.ok(resp.subResponses[1].errorCode != undefined);
    assert.ok(resp.subResponses[1].status == 412);
    assert.ok(resp.subResponses[1].statusMessage != "");
    assert.equal(resp.subResponses[1]._request.url, blockBlobClients[1].url);
  });

  it("submitBatch should work for batch set tier", async () => {
    recorder.skip(
      undefined,
      "UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
    );
    // Upload blobs.
    for (let i = 0; i < blockBlobCount; i++) {
      await blockBlobClients[i].upload(content, content.length);
    }

    // Assemble batch set tier request.
    let batchSetTierRequest = new BlobBatch();
    for (let i = 0; i < blockBlobCount; i++) {
      await batchSetTierRequest.setBlobAccessTier(blockBlobClients[i].url, credential, "Cool", {});
    }

    // Submit batch request and verify response.
    const resp = await blobBatchClient.submitBatch(batchSetTierRequest, {});
    assert.equal(resp.subResponses.length, blockBlobCount);
    assert.equal(resp.subResponsesSucceededCount, blockBlobCount);
    assert.equal(resp.subResponsesFailedCount, 0);

    for (let i = 0; i < blockBlobCount; i++) {
      assert.equal(resp.subResponses[i].errorCode, undefined);
      assert.equal(resp.subResponses[i].status, 200);
      assert.ok(resp.subResponses[i].statusMessage != "");
      assert.ok(resp.subResponses[i].headers.contains("x-ms-request-id"));
      assert.equal(resp.subResponses[i]._request.url, blockBlobClients[i].url);

      // Check blob tier set properly.
      let resp2 = await blockBlobClients[i].getProperties();
      assert.equal(resp2.accessTier, "Cool");
    }
  });

  it("setBlobsAccessTier should work for batch set tier", async () => {
    recorder.skip(
      undefined,
      "UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
    );
    // Upload blobs.
    for (let i = 0; i < blockBlobCount; i++) {
      await blockBlobClients[i].upload(content, content.length);
    }

    // Submit batch request and verify response.
    const urls = blockBlobClients.map((b) => b.url);
    const resp = await blobBatchClient.setBlobsAccessTier(urls, credential, "Cool", {});
    assert.equal(resp.subResponses.length, blockBlobCount);
    assert.equal(resp.subResponsesSucceededCount, blockBlobCount);
    assert.equal(resp.subResponsesFailedCount, 0);

    for (let i = 0; i < blockBlobCount; i++) {
      assert.equal(resp.subResponses[i].errorCode, undefined);
      assert.equal(resp.subResponses[i].status, 200);
      assert.ok(resp.subResponses[i].statusMessage != "");
      assert.ok(resp.subResponses[i].headers.contains("x-ms-request-id"));
      assert.equal(resp.subResponses[i]._request.url, blockBlobClients[i].url);

      // Check blob tier set properly.
      let resp2 = await blockBlobClients[i].getProperties();
      assert.equal(resp2.accessTier, "Cool");
    }
  });

  it("submitBatch should work for batch set tier with lease condition", async () => {
    recorder.skip(
      undefined,
      "UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
    );
    // Upload blobs.
    await blockBlobClients[0].upload(content, content.length);
    await blockBlobClients[1].upload(content, content.length);

    // Lease one blob.
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    const leaseResp = await blockBlobClients[1].getBlobLeaseClient(guid).acquireLease(duration);
    assert.ok(leaseResp.leaseId! != "");

    // Assemble batch set tier request.
    let batchSetTierRequest = new BlobBatch();
    await batchSetTierRequest.setBlobAccessTier(blockBlobClients[0], "Cool");
    await batchSetTierRequest.setBlobAccessTier(blockBlobClients[1], "Cool", {
      conditions: { leaseId: leaseResp.leaseId! }
    });

    // Submit batch request and verify response.
    const resp = await blobBatchClient.submitBatch(batchSetTierRequest, {});
    assert.equal(resp.subResponses.length, 2);
    assert.equal(resp.subResponsesSucceededCount, 2);
    assert.equal(resp.subResponsesFailedCount, 0);

    for (let i = 0; i < 2; i++) {
      assert.equal(resp.subResponses[i].errorCode, undefined);
      assert.equal(resp.subResponses[i].status, 200);
      assert.ok(resp.subResponses[i].statusMessage != "");
      assert.ok(resp.subResponses[i].headers.contains("x-ms-request-id"));
      assert.equal(resp.subResponses[i]._request.url, blockBlobClients[i].url);

      // Check blob tier set properly.
      let resp2 = await blockBlobClients[i].getProperties();
      assert.equal(resp2.accessTier, "Cool");
    }
  });

  it("submitBatch should work with multiple types of credentials for subrequests", async function() {
    recorder.skip(
      undefined,
      "UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
    );
    // Try to get serviceURL object with TokenCredential
    // when ACCOUNT_TOKEN environment variable is set
    let tokenCredential;
    try {
      tokenCredential = getTokenCredential();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (tokenCredential === undefined) {
      this.skip();
    }

    // Upload blobs.
    await blockBlobClients[0].upload(content, content.length);
    await blockBlobClients[1].upload(content, content.length);

    // Assemble batch set tier request.
    let batchSetTierRequest = new BlobBatch();
    await batchSetTierRequest.setBlobAccessTier(blockBlobClients[0].url, credential, "Cool");
    // When it's using token credential be sure it's not with SAS (browser testing case)
    let blockBlobClient1WithoutSAS = blockBlobClients[1].url;
    if (blockBlobClient1WithoutSAS.indexOf("?") != -1) {
      // remove query part for this testing for ease
      blockBlobClient1WithoutSAS = blockBlobClients[1].url.substring(
        0,
        blockBlobClients[1].url.indexOf("?")
      );
    }
    await batchSetTierRequest.setBlobAccessTier(
      blockBlobClient1WithoutSAS,
      getTokenCredential(),
      "Cool"
    );

    // Submit batch request and verify response.
    const resp = await blobBatchClient.submitBatch(batchSetTierRequest, {});
    assert.equal(resp.subResponses.length, 2);
    assert.equal(resp.subResponsesSucceededCount, 2);
    assert.equal(resp.subResponsesFailedCount, 0);

    for (let i = 0; i < 2; i++) {
      assert.equal(resp.subResponses[i].errorCode, undefined);
      assert.equal(resp.subResponses[i].status, 200);
      assert.ok(resp.subResponses[i].statusMessage != "");
      assert.ok(resp.subResponses[i].headers.contains("x-ms-request-id"));

      // Check blob tier set properly.
      let resp2 = await blockBlobClients[i].getProperties();
      assert.equal(resp2.accessTier, "Cool");
    }

    assert.equal(resp.subResponses[0]._request.url, blockBlobClients[0].url);
    assert.equal(resp.subResponses[1]._request.url, blockBlobClient1WithoutSAS);
  });

  it("submitBatch should report error when sub requests exceed 256", async () => {
    let batchSetTierRequest = new BlobBatch();

    for (let i = 0; i < 256; i++) {
      let tmpBlobClient = containerClient.getBlobClient(`blob${i}`);

      await batchSetTierRequest.setBlobAccessTier(tmpBlobClient.url, credential, "Cool");
    }

    let exceptionCaught = false;

    try {
      let tmpBlobClient = containerClient.getBlobClient(`blobexceed`);
      await batchSetTierRequest.setBlobAccessTier(tmpBlobClient.url, credential, "Cool");
    } catch (err) {
      if (
        err instanceof RangeError &&
        err.message == "Cannot exceed 256 sub requests in a single batch"
      ) {
        exceptionCaught = true;
      }
    }

    assert.ok(exceptionCaught);
  });

  it("submitBatch should report error when sub request with invalid url or invalid credential", async () => {
    let batchSetTierRequest = new BlobBatch();
    let exceptionCaught = false;

    try {
      await batchSetTierRequest.setBlobAccessTier("invalidurl", credential, "Cool");
    } catch (err) {
      if (err instanceof RangeError && err.message.indexOf("Invalid url for sub request: ") != -1) {
        exceptionCaught = true;
      }
    }
    assert.ok(exceptionCaught);
  });

  it("submitBatch should report error with 0 sub request", async () => {
    let batchDeleteRequest = new BlobBatch();

    let exceptionCaught = false;
    try {
      await blobBatchClient.submitBatch(batchDeleteRequest);
    } catch (err) {
      if (
        err instanceof RangeError &&
        err.message == "Batch request should contain one or more sub requests."
      ) {
        exceptionCaught = true;
      }
    }
    assert.ok(exceptionCaught);
  });

  it("submitBatch should report error with invalid credential for batch request", async () => {
    recorder.skip(
      undefined,
      "UUID is randomly generated within the SDK and used in the HTTP request and cannot be preserved."
    );
    // Upload blobs.
    await blockBlobClients[0].upload(content, content.length);

    // Assemble batch set tier request.
    let batchSetTierRequest = new BlobBatch();
    await batchSetTierRequest.setBlobAccessTier(blockBlobClients[0].url, credential, "Cool");

    const invalidCredServiceClient = new BlobServiceClient(
      blobServiceClient.url,
      newPipeline(new SimpleTokenCredential("invalidtoken"))
    ).getBlobBatchClient();

    let exceptionCaught = false;
    // Submit batch request and verify response.
    try {
      await invalidCredServiceClient.submitBatch(batchSetTierRequest, {});
    } catch (err) {
      // Error: Unexpected status code: 403
      // at new RestError (C:\SDKRoot\Type\azure-sdk-for-js\common\temp\node_modules\.registry.npmjs.org\@azure\ms-rest-js\2.0.4\node_modules\@azure\ms-rest-js\lib\restError.ts:18:5)
      // at C:\SDKRoot\Type\azure-sdk-for-js\common\temp\node_modules\.registry.npmjs.org\@azure\ms-rest-js\2.0.4\node_modules\@azure\ms-rest-js\lib\policies\deserializationPolicy.ts:117:27
      // at process._tickCallback (internal/process/next_tick.js:68:7)
      exceptionCaught = true;
    }

    assert.ok(exceptionCaught);
  });

  it("BlobBatch should report error when mixing different request types in one batch", async () => {
    let batchRequest = new BlobBatch();

    let exceptionCaught = false;
    try {
      await batchRequest.deleteBlob(blockBlobClients[0].url, credential);
      await batchRequest.setBlobAccessTier(blockBlobClients[0].url, credential, "Cool");
    } catch (err) {
      if (
        err instanceof RangeError &&
        err.message ==
          "BlobBatch only supports one operation type per batch and it already is being used for delete operations."
      ) {
        exceptionCaught = true;
      }
    }
    assert.ok(exceptionCaught);
  });
});
