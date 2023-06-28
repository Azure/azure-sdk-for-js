// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getBSU, recorderEnvSetup, bodyToString, uriSanitizers, getUniqueName } from "./utils";
import { Recorder } from "@azure-tools/test-recorder";
import { ShareClient, ShareDirectoryClient, ShareFileClient } from "../src";
import { Context } from "mocha";

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

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["x-ms-file-rename-source", "x-ms-copy-source"],
        },
        uriSanitizers,
      },
      ["record", "playback"]
    );
    const serviceClient = getBSU(recorder);
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = recorder.variable("dir", getUniqueName("dir"));
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(content.length);
  });

  afterEach(async function () {
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
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"]
    );
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");
  });

  it("acquireLease again with another lease id", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"]
    );
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease(duration);

    const anotherLeaseClient = fileClient.getShareLeaseClient(guid);
    try {
      await anotherLeaseClient.acquireLease(duration);
      assert.fail("acquireLease a leased lease should fail with a different lease id");
    } catch (err: any) {
      assert.equal(err.statusCode, 409);
    }
  });

  it("acquireLease again with same lease id", async () => {
    const leaseClient = fileClient.getShareLeaseClient(guid);
    await leaseClient.acquireLease();
    leaseClient.acquireLease(duration);
  });

  it("invalid duration for acquireLease", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"]
    );
    // only -1 for infinite is allowed.
    const invalid_duration = 20;
    const leaseClient = fileClient.getShareLeaseClient();
    try {
      await leaseClient.acquireLease(invalid_duration);
      assert.fail(`acquireLease should fail for an invalid duration: ${invalid_duration}`);
    } catch (err: any) {
      assert.equal(err.statusCode, 400);
    }
  });

  it("changeLease", async () => {
    const initialGuid = "6291baf2-9d1c-4f64-aa20-c16d8e8ac666";
    const leaseClient = fileClient.getShareLeaseClient(initialGuid);
    await leaseClient.acquireLease(duration);
    const changeResp = await leaseClient.changeLease(guid);
    assert.equal(changeResp.leaseId, guid);
  });

  it("changeLease before acquiring a lease", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"]
    );
    const leaseClient = fileClient.getShareLeaseClient();
    try {
      const changeResp = await leaseClient.changeLease(guid);
      assert.equal(changeResp.leaseId, guid);
      await leaseClient.releaseLease();
    } catch (err: any) {
      assert.equal(err.statusCode, 409);
    }
  });

  it("release lease", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"]
    );
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease();
    await leaseClient.releaseLease();

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, undefined);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
  });

  it("break lease and then release it", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"]
    );
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
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"]
    );
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease();
    await leaseClient.breakLease();
    await leaseClient.breakLease();
    await leaseClient.releaseLease();
  });

  it("acquire a broken lease", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"]
    );
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
    } catch (err: any) {
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
    } catch (err: any) {
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
    } catch (err: any) {
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
    } catch (err: any) {
      assert.equal(err.statusCode, 412);
    }
    await fileClient.uploadRange(content, 0, content.length, {
      leaseAccessConditions: { leaseId: guid },
    });
  });

  it("startCopyFromURL", async () => {
    const leaseClient = fileClient.getShareLeaseClient(guid);
    await leaseClient.acquireLease();

    const newFileClient = dirClient.getFileClient(
      recorder.variable("copiedfile", getUniqueName("copiedfile"))
    );
    await newFileClient.create(content.length);
    try {
      await fileClient.startCopyFromURL(newFileClient.url);
      assert.fail("lease id required if the file has an active lease");
    } catch (err: any) {
      assert.equal(err.statusCode, 412);
    }
    await fileClient.startCopyFromURL(newFileClient.url, {
      leaseAccessConditions: { leaseId: guid },
    });
  });

  it("setMetadata", async () => {
    const leaseClient = fileClient.getShareLeaseClient(guid);
    await leaseClient.acquireLease();

    try {
      await fileClient.setMetadata();
      assert.fail("lease id required if the file has an active lease");
    } catch (err: any) {
      assert.equal(err.statusCode, 412);
    }
    await fileClient.setMetadata({}, { leaseAccessConditions: { leaseId: guid } });
  });

  // The lease ID is optional in the request but should matches that of the file if specified.
  it("getRangeList", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"]
    );
    const leaseClient = fileClient.getShareLeaseClient();
    await leaseClient.acquireLease();

    await fileClient.getRangeList();
    try {
      await fileClient.getRangeList({ leaseAccessConditions: { leaseId: guid } });
      assert.fail(
        "The lease ID specified in the request should matches that of the file if specified"
      );
    } catch (err: any) {
      assert.equal(err.statusCode, 412);
    }

    await fileClient.getRangeList({ leaseAccessConditions: { leaseId: leaseClient.leaseId } });
  });

  // The lease ID is optional in the request but should matches that of the file if specified.
  // Also has lease headers in the response.
  it("download file", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"]
    );
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
    } catch (err: any) {
      assert.equal(err.statusCode, 412);
    }

    await fileClient.download(0, undefined, {
      leaseAccessConditions: { leaseId: leaseClient.leaseId },
    });
  });

  it("getProperties", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"]
    );
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
    } catch (err: any) {
      assert.equal(err.statusCode, 412);
    }

    await fileClient.getProperties({ leaseAccessConditions: { leaseId: leaseClient.leaseId } });
  });
});
