// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import {
  recorderEnvSetup,
  uriSanitizers,
  getUniqueName,
  getTokenBSUWithDefaultCredential,
  bodyToString,
} from "../utils";
import { Recorder } from "@azure-tools/test-recorder";
import { ShareClient, ShareDirectoryClient, ShareFileClient } from "../../src";
import { Context } from "mocha";

// for file
describe("LeaseClient Node.js only - OAuth", () => {
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
      ["record", "playback"],
    );
    const serviceClient = getTokenBSUWithDefaultCredential(recorder, "", "", {
      fileRequestIntent: "backup",
    });
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

  it("changeLease", async () => {
    const initialGuid = "6291baf2-9d1c-4f64-aa20-c16d8e8ac666";
    const leaseClient = fileClient.getShareLeaseClient(initialGuid);
    await leaseClient.acquireLease(duration);
    const changeResp = await leaseClient.changeLease(guid);
    assert.equal(changeResp.leaseId, guid);
  });

  it("release lease", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"],
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
      ["record", "playback"],
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
});

// for share
describe("LeaseClient with ShareClient Node.js Only - OAuth", () => {
  let shareName: string;
  let shareClient: ShareClient;
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
      ["record", "playback"],
    );
    const serviceClient = getTokenBSUWithDefaultCredential(recorder, "", "", {
      fileRequestIntent: "backup",
    });
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async function () {
    await shareClient.delete();
    await recorder.stop();
  });

  // lease management:
  it("acquireLease", async () => {
    const leaseClient = shareClient.getShareLeaseClient(guid);

    const acquireResp = await leaseClient.acquireLease(duration);
    assert.equal(acquireResp.leaseId, guid);

    const result = await shareClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("changeLease", async () => {
    const initialGuid = "6291baf2-9d1c-4f64-aa20-c16d8e8ac666";
    const leaseClient = shareClient.getShareLeaseClient(initialGuid);
    await leaseClient.acquireLease(duration);
    const changeResp = await leaseClient.changeLease(guid);
    assert.equal(changeResp.leaseId, guid);
    await leaseClient.releaseLease();
  });

  it("break lease and then release it", async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"],
    );
    const leaseClient = shareClient.getShareLeaseClient();
    await leaseClient.acquireLease();
    let result = await shareClient.getProperties();
    assert.equal(result.leaseState, "leased");

    const res = await leaseClient.breakLease();
    assert.equal(res.leaseTimeInSeconds, 0);

    result = await shareClient.getProperties();
    assert.equal(result.leaseState, "broken");

    await leaseClient.releaseLease();
  });

  it("setProperties with lease", async () => {
    const leaseClient = shareClient.getShareLeaseClient(guid);

    await leaseClient.acquireLease();
    const result = await shareClient.getProperties();
    assert.equal(result.leaseState, "leased");

    try {
      await shareClient.setProperties();
      assert.fail("lease id required if the share has an active lease");
    } catch (err: any) {
      assert.equal(err.statusCode, 412);
    }
    await shareClient.setProperties({ leaseAccessConditions: { leaseId: guid } });

    await leaseClient.releaseLease();
  });
});
