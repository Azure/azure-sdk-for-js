import * as assert from "assert";
import * as dotenv from "dotenv";
import { Aborter } from "../src/Aborter";
import { BlobURL } from "../src/BlobURL";
import { BlockBlobURL } from "../src/BlockBlobURL";
import { ContainerURL } from "../src/ContainerURL";
import { StorageURL } from "../src/StorageURL";
import { getGenericBSU, getGenericCredential, getTokenCredential } from "./utils";
import { record } from "./utils/recorder";
import { BatchDeleteRequest, BatchSetTierRequest } from "../src/BatchRequest";
import { TokenCredential } from '../src';

dotenv.config({ path: "../.env" });

describe("BlobURL", () => {
  const serviceURL = getGenericBSU("");
  const credential = getGenericCredential("");
  let containerName: string;
  let containerURL: ContainerURL;
  const blockBlobCount = 3;
  let blockBlobURLs: BlockBlobURL[] = new Array(blockBlobCount);
  const content = "Hello World";

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.none);

    for (let i = 0; i < blockBlobCount-1; i++) {
      let tmpBlobName = `blob${i}`;
      let tmpBlobURL = BlobURL.fromContainerURL(containerURL, tmpBlobName);
      let tmpBlockBlobURL = BlockBlobURL.fromBlobURL(tmpBlobURL);
      blockBlobURLs[i] = tmpBlockBlobURL;
    }

    let specialBlobName = `å ä ö`;
    let tmpBlobURL = BlobURL.fromContainerURL(containerURL, specialBlobName);
    let tmpBlockBlobURL = BlockBlobURL.fromBlobURL(tmpBlobURL);
    blockBlobURLs[blockBlobCount-1] = tmpBlockBlobURL;

  });

  afterEach(async () => {
    await containerURL.delete(Aborter.none);
    recorder.stop();
  });

  it("submitBatch should work for batch delete", async () => {
    // Upload blobs.
    for (let i = 0; i < blockBlobCount; i++) {
      await blockBlobURLs[i].upload(Aborter.none, content, content.length);
    }

    // Assemble batch delete request.
    let batchDeleteRequest = new BatchDeleteRequest();
    for (let i = 0; i < blockBlobCount; i++) {
      await batchDeleteRequest.addDeleteOperation(blockBlobURLs[i].url, credential, {});
    }

    // Submit batch request and verify response.
    const resp = await serviceURL.submitBatch(Aborter.none, batchDeleteRequest, {});
    assert.equal(resp.subResponses.length, blockBlobCount);
    assert.equal(resp.subResponsesSucceededCount, blockBlobCount);
    assert.equal(resp.subResponsesFailedCount, 0);

    for (let i = 0; i < blockBlobCount; i++) {
      assert.equal(resp.subResponses[i].errorCode, undefined);
      assert.equal(resp.subResponses[i].status, 202);
      assert.ok(resp.subResponses[i].statusMessage != "");
      assert.ok(resp.subResponses[i].headers.contains("x-ms-request-id"));
      assert.equal(resp.subResponses[i]._request.url, blockBlobURLs[i].url);
    }

    // Verify blobs deleted.
    const resp2 = await containerURL.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["snapshots"]
    });
    assert.equal(resp2.segment.blobItems.length, 0);
  });

  it("submitBatch should work for batch delete with snapshot", async () => {
    //
    // Test delete blob with snapshot.
    //
    // Upload blob.
    await blockBlobURLs[0].upload(Aborter.none, content, content.length);
    await blockBlobURLs[0].createSnapshot(Aborter.none);

    // Assemble batch delete request which delete blob with its snapshot.
    let batchDeleteRequest = new BatchDeleteRequest();
    await batchDeleteRequest.addDeleteOperation(blockBlobURLs[0].url, credential, {
      deleteSnapshots: "include"
    });

    // Ensure blobs ready.
    const respList1 = await containerURL.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["snapshots"]
    });
    assert.equal(respList1.segment.blobItems.length, 2);

    // Submit batch request and verify response.
    const respSubmitBatch1 = await serviceURL.submitBatch(Aborter.none, batchDeleteRequest, {});
    assert.equal(respSubmitBatch1.subResponses.length, 1);
    assert.equal(respSubmitBatch1.subResponsesSucceededCount, 1);
    assert.equal(respSubmitBatch1.subResponsesFailedCount, 0);

    // Validate that blob and its snapshot all get deleted.
    const respList2 = await containerURL.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["snapshots"]
    });
    assert.equal(respList2.segment.blobItems.length, 0);

    //
    // Test delete snapshot only with snapshot's url
    //
    // Upload blob.
    await blockBlobURLs[1].upload(Aborter.none, content, content.length);
    const createSnapshotResp = await blockBlobURLs[1].createSnapshot(Aborter.none);
    const snapshotURL = blockBlobURLs[1].withSnapshot(createSnapshotResp.snapshot!);
 
    // Assemble batch delete request.
    let batchDeleteRequest2 = new BatchDeleteRequest();
    await batchDeleteRequest2.addDeleteOperation(snapshotURL.url, credential);
 
    // Ensure blobs ready.
    const respList3 = await containerURL.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["snapshots"]
    });
    assert.equal(respList3.segment.blobItems.length, 2);
 
    // Submit batch request and verify response.
    const respSubmitBatch2 = await serviceURL.submitBatch(Aborter.none, batchDeleteRequest2, {});
    assert.equal(respSubmitBatch2.subResponses.length, 1);
    assert.equal(respSubmitBatch2.subResponsesSucceededCount, 1);
    assert.equal(respSubmitBatch2.subResponsesFailedCount, 0);
 
    // Validate that blob and its snapshot all get deleted.
    const respList4 = await containerURL.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["snapshots"]
    });
    assert.equal(respList4.segment.blobItems.length, 1);
  });

  it("submitBatch should work for batch delete with access condition and partial succeed", async () => {
    // Upload blobs.
    const b0 = await blockBlobURLs[0].upload(Aborter.none, content, content.length);
    const b1 = await blockBlobURLs[1].upload(Aborter.none, content, content.length);

    // Assemble batch delete request.
    let batchDeleteRequest = new BatchDeleteRequest();
    await batchDeleteRequest.addDeleteOperation(blockBlobURLs[0].url, credential, {
      blobAccessConditions: {
        modifiedAccessConditions: {
          ifMatch: b0.eTag
        }
      }
    });
    await batchDeleteRequest.addDeleteOperation(blockBlobURLs[1].url, credential, {
      blobAccessConditions: {
        modifiedAccessConditions: {
          ifNoneMatch: b1.eTag
        }
      }
    });

    // Submit batch request and verify response.
    const resp = await serviceURL.submitBatch(Aborter.none, batchDeleteRequest, {});
    assert.equal(resp.subResponses.length, 2);
    assert.equal(resp.subResponsesSucceededCount, 1);
    assert.equal(resp.subResponsesFailedCount, 1);

    // First succeeded.
    assert.equal(resp.subResponses[0].errorCode, undefined);
    assert.equal(resp.subResponses[0].status, 202);
    assert.ok(resp.subResponses[0].statusMessage != "");
    assert.equal(resp.subResponses[0]._request.url, blockBlobURLs[0].url);

    // Second failed.
    assert.ok(resp.subResponses[1].errorCode != undefined);
    assert.ok(resp.subResponses[1].status == 412);
    assert.ok(resp.subResponses[1].statusMessage != "");
    assert.equal(resp.subResponses[1]._request.url, blockBlobURLs[1].url);
  });

  it("submitBatch should work for batch set tier", async () => {
    // Upload blobs.
    for (let i = 0; i < blockBlobCount; i++) {
      await blockBlobURLs[i].upload(Aborter.none, content, content.length);
    }

    // Assemble batch set tier request.
    let batchSetTierRequest = new BatchSetTierRequest();
    for (let i = 0; i < blockBlobCount; i++) {
      await batchSetTierRequest.addSetTierOperation(blockBlobURLs[i].url, credential, "Cool", {});
    }

    // Submit batch request and verify response.
    const resp = await serviceURL.submitBatch(Aborter.none, batchSetTierRequest, {});
    assert.equal(resp.subResponses.length, blockBlobCount);
    assert.equal(resp.subResponsesSucceededCount, blockBlobCount);
    assert.equal(resp.subResponsesFailedCount, 0);

    for (let i = 0; i < blockBlobCount; i++) {
      assert.equal(resp.subResponses[i].errorCode, undefined);
      assert.equal(resp.subResponses[i].status, 200);
      assert.ok(resp.subResponses[i].statusMessage != "");
      assert.ok(resp.subResponses[i].headers.contains("x-ms-request-id"));
      assert.equal(resp.subResponses[i]._request.url, blockBlobURLs[i].url);

      // Check blob tier set properly.
      let resp2 = await blockBlobURLs[i].getProperties(Aborter.none);
      assert.equal(resp2.accessTier, "Cool");
    }
  });

  it("submitBatch should work for batch set tier with lease condition", async () => {
    // Upload blobs.
    await blockBlobURLs[0].upload(Aborter.none, content, content.length);
    await blockBlobURLs[1].upload(Aborter.none, content, content.length);

    // Lease one blob.
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    const leaseResp = await blockBlobURLs[1].acquireLease(Aborter.none, guid, duration);
    assert.ok(leaseResp.leaseId! != "");

    // Assemble batch set tier request.
    let batchSetTierRequest = new BatchSetTierRequest();
    await batchSetTierRequest.addSetTierOperation(blockBlobURLs[0].url, credential, "Cool");
    await batchSetTierRequest.addSetTierOperation(blockBlobURLs[1].url, credential, "Cool", {
      leaseAccessConditions: { leaseId: leaseResp.leaseId! }
    });

    // Submit batch request and verify response.
    const resp = await serviceURL.submitBatch(Aborter.none, batchSetTierRequest, {});
    assert.equal(resp.subResponses.length, 2);
    assert.equal(resp.subResponsesSucceededCount, 2);
    assert.equal(resp.subResponsesFailedCount, 0);

    for (let i = 0; i < 2; i++) {
      assert.equal(resp.subResponses[i].errorCode, undefined);
      assert.equal(resp.subResponses[i].status, 200);
      assert.ok(resp.subResponses[i].statusMessage != "");
      assert.ok(resp.subResponses[i].headers.contains("x-ms-request-id"));
      assert.equal(resp.subResponses[i]._request.url, blockBlobURLs[i].url);

      // Check blob tier set properly.
      let resp2 = await blockBlobURLs[i].getProperties(Aborter.none);
      assert.equal(resp2.accessTier, "Cool");
    }
  });

  it("submitBatch should work with multiple types of credentials for subrequests", async () => {
    // Upload blobs.
    await blockBlobURLs[0].upload(Aborter.none, content, content.length);
    await blockBlobURLs[1].upload(Aborter.none, content, content.length);

    // Assemble batch set tier request.
    let batchSetTierRequest = new BatchSetTierRequest();
    await batchSetTierRequest.addSetTierOperation(blockBlobURLs[0].url, credential, "Cool");
    // When it's using token credential be sure it's not with SAS (browser testing case)
    let blockBlobURL1WithoutSAS = blockBlobURLs[1].url;
    if (blockBlobURL1WithoutSAS.indexOf("?") != -1) { // remove query part for this testing for ease
      blockBlobURL1WithoutSAS = blockBlobURLs[1].url.substring(0, blockBlobURLs[1].url.indexOf("?"));
    }
    await batchSetTierRequest.addSetTierOperation(blockBlobURL1WithoutSAS, getTokenCredential(), "Cool"); 

    // Submit batch request and verify response.
    const resp = await serviceURL.submitBatch(Aborter.none, batchSetTierRequest, {});
    assert.equal(resp.subResponses.length, 2);
    assert.equal(resp.subResponsesSucceededCount, 2);
    assert.equal(resp.subResponsesFailedCount, 0);

    for (let i = 0; i < 2; i++) {
      assert.equal(resp.subResponses[i].errorCode, undefined);
      assert.equal(resp.subResponses[i].status, 200);
      assert.ok(resp.subResponses[i].statusMessage != "");
      assert.ok(resp.subResponses[i].headers.contains("x-ms-request-id"));

      // Check blob tier set properly.
      let resp2 = await blockBlobURLs[i].getProperties(Aborter.none);
      assert.equal(resp2.accessTier, "Cool");
    }

    assert.equal(resp.subResponses[0]._request.url, blockBlobURLs[0].url);
    assert.equal(resp.subResponses[1]._request.url, blockBlobURL1WithoutSAS);
  });

  it("submitBatch should report error when sub requests exceed 256", async () => {
    let batchSetTierRequest = new BatchSetTierRequest();

    for (let i = 0; i < 256; i++) {
      let tmpBlobURL = BlobURL.fromContainerURL(containerURL, `blob${i}`);

      await batchSetTierRequest.addSetTierOperation(tmpBlobURL.url, credential, "Cool");
    }

    let exceptionCaught = false;

    try {
      let tmpBlobURL = BlobURL.fromContainerURL(containerURL, `blobexceed`);
      await batchSetTierRequest.addSetTierOperation(tmpBlobURL.url, credential, "Cool");
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
    let batchSetTierRequest = new BatchSetTierRequest();
    let exceptionCaught = false;

    try {
      await batchSetTierRequest.addSetTierOperation("invalidurl", credential, "Cool");
    } catch (err) {
      if (
        err instanceof RangeError &&
        err.message.indexOf("Invalid url for sub request: ") != -1
      ) {
        exceptionCaught = true;
      }
    }
    assert.ok(exceptionCaught);
  });

  it("submitBatch should report error with 0 sub request", async () => {
    let batchDeleteRequest = new BatchDeleteRequest();

    let exceptionCaught = false;
    try {
      await serviceURL.submitBatch(Aborter.none, batchDeleteRequest);
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
    // Upload blobs.
    await blockBlobURLs[0].upload(Aborter.none, content, content.length);

    // Assemble batch set tier request.
    let batchSetTierRequest = new BatchSetTierRequest();
    await batchSetTierRequest.addSetTierOperation(blockBlobURLs[0].url, credential, "Cool");

    const invalidCredServiceURL = serviceURL.withPipeline(StorageURL.newPipeline(new TokenCredential("invalidtoken")))

    let exceptionCaught = false;
    // Submit batch request and verify response.
    try {
      await invalidCredServiceURL.submitBatch(Aborter.none, batchSetTierRequest, {});
    } catch (err) {
      // Error: Unexpected status code: 403
      // at new RestError (C:\SDKRoot\Type\azure-sdk-for-js\common\temp\node_modules\.registry.npmjs.org\@azure\ms-rest-js\2.0.4\node_modules\@azure\ms-rest-js\lib\restError.ts:18:5)       
      // at C:\SDKRoot\Type\azure-sdk-for-js\common\temp\node_modules\.registry.npmjs.org\@azure\ms-rest-js\2.0.4\node_modules\@azure\ms-rest-js\lib\policies\deserializationPolicy.ts:117:27
      // at process._tickCallback (internal/process/next_tick.js:68:7)
      exceptionCaught = true;
    }

    assert.ok(exceptionCaught);
  });
});
