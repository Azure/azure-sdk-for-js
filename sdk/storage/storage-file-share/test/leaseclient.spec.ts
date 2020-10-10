import * as assert from "assert";
import { getBSU, recorderEnvSetup, bodyToString } from "./utils";
import { record, Recorder } from "@azure/test-utils-recorder";
import {
  ShareClient,
  ShareDirectoryClient,
  ShareFileClient,
  ShareLeaseClient,
  ShareServiceClient
} from "../src";
import * as dotenv from "dotenv";
dotenv.config();

// for file
describe("LeaseClient", () => {
  let shareName: string;
  let shareClient: ShareClient;
  let dirName: string;
  let dirClient: ShareDirectoryClient;
  let fileName: string;
  let fileClient: ShareFileClient;
  const content = "Hello World";
  const duration = -1;
  const guid = "e9890485-bf47-4d9a-b3d0-aceb18506124";

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getBSU();
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.getUniqueName("dir");
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    fileName = recorder.getUniqueName("file");
    fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(content.length);
  });

  afterEach(async function() {
    await shareClient.delete();
    await recorder.stop();
  });

  // lease management:
  it("acquireLease", async () => {
    const leaseClient = fileClient.getShareLeaseClient(guid);

    const acquireResp = await leaseClient.acquireLease(duration);
    assert.equal(acquireResp.leaseId, guid);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("acquireLease without proposed lease id", async () => {
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");
  });

  it("acquireLease again with another lease id", async () => {
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease(duration);

    const anotherLeaseClient = fileClient.getShareLeaseClient(guid);
    try {
      await anotherLeaseClient.acquireLease(duration);
      assert.fail("acquireLease a leased lease should fail with a different lease id");
    } catch (err) {
      assert.equal(err.statusCode, 409);
    }
  });

  it("acquireLease again with same lease id", async () => {
    const leaseClient = fileClient.getShareLeaseClient(guid);
    await leaseClient.acquireLease();
    leaseClient.acquireLease(duration);
  });

  it("invalid duration for acquireLease", async () => {
    // only -1 for infinite is allowed.
    const invalid_duration = 20;
    const leaseClient = fileClient.getShareLeaseClient();
    try {
      await leaseClient.acquireLease(invalid_duration);
      assert.fail(`acquireLease should fail for an invalid duration: ${invalid_duration}`);
    } catch (err) {
      assert.equal(err.statusCode, 400);
    }
  });

  it("changeLease", async () => {
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease(duration);
    const changeResp = await leaseClient.changeLease(guid);
    assert.equal(changeResp.leaseId, guid);
  });

  it("changeLease before acquiring a lease", async () => {
    const leaseClient = fileClient.getShareLeaseClient();
    try {
      const changeResp = await leaseClient.changeLease(guid);
      assert.equal(changeResp.leaseId, guid);
      await leaseClient.releaseLease();
    } catch (err) {
      assert.equal(err.statusCode, 409);
    }
  });

  it("release lease", async () => {
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease();
    await leaseClient.releaseLease();

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, undefined);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
  });

  it("break lease and then release it", async () => {
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease();
    let result = await fileClient.getProperties();
    assert.equal(result.leaseState, "leased");

    const res = await leaseClient.breakLease();
    assert.equal(res.leaseTimeInSeconds, undefined);

    result = await fileClient.getProperties();
    assert.equal(result.leaseState, "broken");

    await leaseClient.releaseLease();
  });

  it("break a broken lease", async () => {
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease();
    await leaseClient.breakLease();
    await leaseClient.breakLease();
    await leaseClient.releaseLease();
  });

  it("acquire a broken lease", async () => {
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease();
    await leaseClient.breakLease();
    let result = await fileClient.getProperties();
    assert.equal(result.leaseState, "broken");

    await leaseClient.acquireLease();
    result = await fileClient.getProperties();
    assert.equal(result.leaseState, "leased");

    await leaseClient.releaseLease();
  });

  // lease id in request is required if the file has an active lease:
  it("create file", async () => {
    const leaseClient = fileClient.getShareLeaseClient(guid);

    await leaseClient.acquireLease();
    const result = await fileClient.getProperties();
    assert.equal(result.leaseState, "leased");

    // create
    const newSize = content.length - 1;
    try {
      await fileClient.create(newSize);
      assert.fail("lease id required if the file has an active lease");
    } catch (err) {
      assert.equal(err.statusCode, 412);
    }
    await fileClient.create(newSize, { leaseAccessConditions: { leaseId: guid } });
    const downResult = await fileClient.download(0);
    assert.deepStrictEqual(await bodyToString(downResult), "\u0000".repeat(newSize));

    await leaseClient.releaseLease();
  });

  it("setProperties", async () => {
    const leaseClient = fileClient.getShareLeaseClient(guid);

    await leaseClient.acquireLease();
    const result = await fileClient.getProperties();
    assert.equal(result.leaseState, "leased");

    try {
      await fileClient.setProperties();
      assert.fail("lease id required if the file has an active lease");
    } catch (err) {
      assert.equal(err.statusCode, 412);
    }
    await fileClient.setProperties({ leaseAccessConditions: { leaseId: guid } });

    await leaseClient.releaseLease();
  });

  it("delete file", async () => {
    const leaseClient = fileClient.getShareLeaseClient(guid);

    await leaseClient.acquireLease();
    const result = await fileClient.getProperties();
    assert.equal(result.leaseState, "leased");

    try {
      await fileClient.delete();
      assert.fail("lease id required if the file has an active lease");
    } catch (err) {
      assert.equal(err.statusCode, 412);
    }
    await fileClient.delete({ leaseAccessConditions: { leaseId: guid } });
  });

  it("uploadRange", async () => {
    const leaseClient = fileClient.getShareLeaseClient(guid);
    await leaseClient.acquireLease();
    try {
      await fileClient.uploadRange(content, 0, content.length);
      assert.fail("lease id required if the file has an active lease");
    } catch (err) {
      assert.equal(err.statusCode, 412);
    }
    await fileClient.uploadRange(content, 0, content.length, {
      leaseAccessConditions: { leaseId: guid }
    });
  });

  it("startCopyFromURL", async () => {
    const leaseClient = fileClient.getShareLeaseClient(guid);
    await leaseClient.acquireLease();

    const newFileClient = dirClient.getFileClient(recorder.getUniqueName("copiedfile"));
    await newFileClient.create(content.length);
    try {
      await fileClient.startCopyFromURL(newFileClient.url);
      assert.fail("lease id required if the file has an active lease");
    } catch (err) {
      assert.equal(err.statusCode, 412);
    }
    await fileClient.startCopyFromURL(newFileClient.url, {
      leaseAccessConditions: { leaseId: guid }
    });
  });

  it("setMetadata", async () => {
    const leaseClient = fileClient.getShareLeaseClient(guid);
    await leaseClient.acquireLease();

    try {
      await fileClient.setMetadata();
      assert.fail("lease id required if the file has an active lease");
    } catch (err) {
      assert.equal(err.statusCode, 412);
    }
    await fileClient.setMetadata({}, { leaseAccessConditions: { leaseId: guid } });
  });

  // The lease ID is optional in the request but should matches that of the file if specified.
  it("getRangeList", async () => {
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease();

    await fileClient.getRangeList();
    try {
      await fileClient.getRangeList({ leaseAccessConditions: { leaseId: guid } });
      assert.fail(
        "The lease ID specified in the request should matches that of the file if specified"
      );
    } catch (err) {
      assert.equal(err.statusCode, 412);
    }

    await fileClient.getRangeList({ leaseAccessConditions: { leaseId: leaseClient.leaseId } });
  });

  // The lease ID is optional in the request but should matches that of the file if specified.
  // Also has lease headers in the response.
  it("download file", async () => {
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease();

    const downloadRes = await fileClient.download();
    assert.equal(downloadRes.leaseDuration, "infinite");
    assert.equal(downloadRes.leaseState, "leased");
    assert.equal(downloadRes.leaseStatus, "locked");

    try {
      await fileClient.download(0, undefined, { leaseAccessConditions: { leaseId: guid } });
      assert.fail(
        "The lease ID specified in the request should matches that of the file if specified"
      );
    } catch (err) {
      assert.equal(err.statusCode, 412);
    }

    await fileClient.download(0, undefined, {
      leaseAccessConditions: { leaseId: leaseClient.leaseId }
    });
  });

  it("getProperties", async () => {
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease();

    const downloadRes = await fileClient.getProperties();
    assert.equal(downloadRes.leaseDuration, "infinite");
    assert.equal(downloadRes.leaseState, "leased");
    assert.equal(downloadRes.leaseStatus, "locked");

    try {
      await fileClient.getProperties({ leaseAccessConditions: { leaseId: guid } });
      assert.fail(
        "The lease ID specified in the request should matches that of the file if specified"
      );
    } catch (err) {
      assert.equal(err.statusCode, 412);
    }

    await fileClient.getProperties({ leaseAccessConditions: { leaseId: leaseClient.leaseId } });
  });
});

describe("LeaseClient for share", () => {
  let serviceClient: ShareServiceClient;
  let shareName: string;
  let shareClient: ShareClient;
  const infiniteDuration = -1;
  const finiteDuration = 15;
  const guid = "e9890485-bf47-4d9a-b3d0-aceb18506124";

  let recorder: Recorder;
  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getBSU();
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async function() {
    await shareClient.deleteIfExists({ deleteSnapshots: "include-leased" });
    await recorder.stop();
  });

  // lease management:
  it("acquireLease", async () => {
    const leaseClient = shareClient.getShareLeaseClient(guid);

    const acquireResp = await leaseClient.acquireLease(infiniteDuration);
    assert.equal(acquireResp.leaseId, guid);

    const result = await shareClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("acquireLease for snapshot", async () => {
    const snapshotRes = await shareClient.createSnapshot();
    assert.ok(snapshotRes.snapshot);
    const snapshotShareClient = shareClient.withSnapshot(snapshotRes.snapshot!);

    const leaseClient = snapshotShareClient.getShareLeaseClient(guid);
    const acquireResp = await leaseClient.acquireLease(infiniteDuration);
    assert.equal(acquireResp.leaseId, guid);

    const snapshotResult = await snapshotShareClient.getProperties();
    assert.equal(snapshotResult.leaseDuration, "infinite");
    assert.equal(snapshotResult.leaseState, "leased");
    assert.equal(snapshotResult.leaseStatus, "locked");

    const result = await shareClient.getProperties();
    assert.equal(result.leaseDuration, undefined);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
  });

  it("acquireLease without proposed lease id, with a finite duration", async () => {
    const leaseClient = shareClient.getShareLeaseClient();
    await leaseClient.acquireLease(finiteDuration);

    const result = await shareClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("acquireLease again with another lease id", async () => {
    const leaseClient = shareClient.getShareLeaseClient();
    await leaseClient.acquireLease(infiniteDuration);

    const anotherLeaseClient = shareClient.getShareLeaseClient(guid);
    try {
      await anotherLeaseClient.acquireLease(infiniteDuration);
      assert.fail("acquireLease a leased lease should fail with a different lease id");
    } catch (err) {
      assert.equal(err.statusCode, 409);
    }

    await leaseClient.releaseLease();
  });

  it("acquireLease again with same lease id", async () => {
    const leaseClient = shareClient.getShareLeaseClient(guid);
    await leaseClient.acquireLease();
    await leaseClient.acquireLease(infiniteDuration);

    await leaseClient.releaseLease();
  });

  it("invalid duration for acquireLease", async () => {
    // only -1 for infinite is allowed.
    const invalidDuration = 1;
    const leaseClient = shareClient.getShareLeaseClient();
    try {
      await leaseClient.acquireLease(invalidDuration);
      assert.fail(`acquireLease should fail for an invalid duration: ${invalidDuration}`);
    } catch (err) {
      assert.equal(err.statusCode, 400);
    }
  });

  it("changeLease", async () => {
    const leaseClient = shareClient.getShareLeaseClient();
    await leaseClient.acquireLease(infiniteDuration);
    const changeResp = await leaseClient.changeLease(guid);
    assert.equal(changeResp.leaseId, guid);

    await leaseClient.releaseLease();
  });

  it("changeLease before acquiring a lease", async () => {
    const leaseClient = shareClient.getShareLeaseClient();
    try {
      const changeResp = await leaseClient.changeLease(guid);
      assert.equal(changeResp.leaseId, guid);
      await leaseClient.releaseLease();
    } catch (err) {
      assert.equal(err.statusCode, 409);
    }
  });

  it("release lease", async () => {
    const leaseClient = shareClient.getShareLeaseClient();
    await leaseClient.acquireLease();
    await leaseClient.releaseLease();

    const result = await shareClient.getProperties();
    assert.equal(result.leaseDuration, undefined);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
  });

  it("break lease and then release it", async () => {
    const leaseClient = shareClient.getShareLeaseClient();
    await leaseClient.acquireLease();
    let result = await shareClient.getProperties();
    assert.equal(result.leaseState, "leased");

    const breakRes = await leaseClient.breakLease();
    // infinite lease broken immediately
    assert.equal(breakRes.leaseTimeInSeconds, 0);

    result = await shareClient.getProperties();
    assert.equal(result.leaseState, "broken");

    await leaseClient.releaseLease();
  });

  it("break a broken lease", async () => {
    const leaseClient = shareClient.getShareLeaseClient();
    await leaseClient.acquireLease(finiteDuration);
    const breakRes = await leaseClient.breakLease();
    assert.ok(breakRes.leaseTimeInSeconds);
    await leaseClient.breakLease();

    await leaseClient.releaseLease();
  });

  it("acquire a broken lease", async () => {
    const leaseClient = shareClient.getShareLeaseClient();
    await leaseClient.acquireLease();
    await leaseClient.breakLease();
    let result = await shareClient.getProperties();
    assert.equal(result.leaseState, "broken");

    await leaseClient.acquireLease();
    result = await shareClient.getProperties();
    assert.equal(result.leaseState, "leased");

    await leaseClient.releaseLease();
  });

  it("renew a lease", async () => {
    const leaseClient = shareClient.getShareLeaseClient(guid);
    await leaseClient.acquireLease();
    await leaseClient.renewLease();

    await leaseClient.releaseLease();
  });

  it("lease properties properly returned", async () => {
    const leaseClient = shareClient.getShareLeaseClient();
    await leaseClient.acquireLease();

    const getPropertiesRes = await shareClient.getProperties();
    assert.equal(getPropertiesRes.leaseDuration, "infinite");
    assert.equal(getPropertiesRes.leaseState, "leased");
    assert.equal(getPropertiesRes.leaseStatus, "locked");

    for await (const shareItem of serviceClient.listShares()) {
      if (shareItem.name === shareName) {
        assert.equal(shareItem.properties.leaseDuration, "infinite");
        assert.equal(shareItem.properties.leaseState, "leased");
        assert.equal(shareItem.properties.leaseStatus, "locked");
      }
    }

    await leaseClient.releaseLease();
  });

  // lease conditions
  it("lease condition for delete", async () => {
    const leaseClient = new ShareLeaseClient(shareClient, guid);
    await leaseClient.acquireLease();

    try {
      await shareClient.delete();
      assert.fail("Delete without lease condition should have failed.");
    } catch (err) {
      assert.equal(err.details.errorCode, "LeaseIdMissing");
    }

    await shareClient.delete({ leaseAccessConditions: { leaseId: guid } });
  });

  it("lease condition for get operations", async () => {
    const leaseClient = new ShareLeaseClient(shareClient);
    await leaseClient.acquireLease();

    await shareClient.getProperties();

    try {
      await shareClient.getProperties({ leaseAccessConditions: { leaseId: guid } });
      assert.fail("get with miss-match lease ID should have failed.");
    } catch (err) {
      assert.equal(err.details.errorCode, "LeaseIdMismatchWithContainerOperation");
    }

    await shareClient.getProperties({ leaseAccessConditions: { leaseId: leaseClient.leaseId } });

    await leaseClient.releaseLease();
  });

  it("lease condition for write operations", async () => {
    const leaseClient = new ShareLeaseClient(shareClient);
    await leaseClient.acquireLease();

    const meta = { key: "val" };

    try {
      await shareClient.setMetadata(meta);
      assert.fail("write without lease ID should have failed.");
    } catch (err) {
      assert.equal(err.details.errorCode, "LeaseIdMissing");
    }

    try {
      await shareClient.setMetadata(meta, { leaseAccessConditions: { leaseId: guid } });
      assert.fail("write with miss-match lease ID should have failed.");
    } catch (err) {
      assert.equal(err.details.errorCode, "LeaseIdMismatchWithContainerOperation");
    }

    await shareClient.setMetadata(meta, {
      leaseAccessConditions: { leaseId: leaseClient.leaseId }
    });

    await leaseClient.releaseLease();
  });
});
