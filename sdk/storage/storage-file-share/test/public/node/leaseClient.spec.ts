// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Recorder } from "@azure-tools/test-recorder";
import type {
  ShareClient,
  ShareDirectoryClient,
  ShareFileClient,
  SignedIdentifier,
} from "../../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createShareServiceClient } from "../../utils/node/clients.js";
import { bodyToString } from "../../utils/node/testHelpers.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { getAccountKey } from "../../utils/injectables.js";

// for file
describe.runIf(getAccountKey())("LeaseClient Node.js only - SharedKey", () => {
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

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createShareServiceClient("SharedKeyCredential", { recorder });
    assert.isDefined(serviceClient);
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();

    dirName = getUniqueName("dir", { recorder });
    dirClient = shareClient.getDirectoryClient(dirName);
    await dirClient.create();

    fileName = getUniqueName("file", { recorder });
    fileClient = dirClient.getFileClient(fileName);
    await fileClient.create(content.length);
  });

  afterEach(async () => {
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
    const leaseClient = fileClient.getShareLeaseClient(guid);
    await leaseClient.acquireLease();
    await leaseClient.releaseLease();

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, undefined);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
  });

  it("break lease and then release it", async () => {
    const leaseClient = fileClient.getShareLeaseClient(guid);
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
describe.runIf(getAccountKey())("LeaseClient with ShareClient Node.js Only - SharedKey", () => {
  let shareName: string;
  let shareClient: ShareClient;
  const duration = -1;
  const guid = "e9890485-bf47-4d9a-b3d0-aceb18506124";
  const anotherGuid = "6291baf2-9d1c-4f64-aa20-c16d8e8ac666";

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createShareServiceClient("SharedKeyCredential", { recorder });
    assert.isDefined(serviceClient);
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async () => {
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
    const leaseClient = shareClient.getShareLeaseClient(guid);
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

  it("setAccessPolicy", async () => {
    const leaseClient = shareClient.getShareLeaseClient(guid);
    const leaseResponse = await leaseClient.acquireLease();
    const yesterday = new Date(recorder.variable("now", new Date().toISOString()));
    const tomorrow = new Date(recorder.variable("now", new Date().toISOString()));
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const identifiers: SignedIdentifier[] = [
      {
        accessPolicy: {
          expiresOn: tomorrow,
          permissions: "rwd",
          startsOn: yesterday,
        },
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];

    try {
      await shareClient.setAccessPolicy(identifiers);
      assert.fail("lease id required if the file has an active lease");
    } catch (err: any) {
      assert.equal(err.statusCode, 412);
    }
    await shareClient.setAccessPolicy(identifiers, {
      leaseAccessConditions: { leaseId: leaseResponse.leaseId },
    });

    try {
      await shareClient.getAccessPolicy({ leaseAccessConditions: { leaseId: anotherGuid } });
      assert.fail("lease id required if the file has an active lease");
    } catch (err: any) {
      assert.equal(err.statusCode, 412);
    }
    const getAccessPolicyResponse = await shareClient.getAccessPolicy({
      leaseAccessConditions: { leaseId: leaseResponse.leaseId },
    });

    assert.equal(getAccessPolicyResponse.signedIdentifiers[0].id, identifiers[0].id);
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.expiresOn.getTime(),
      identifiers[0].accessPolicy.expiresOn.getTime(),
    );
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.startsOn.getTime(),
      identifiers[0].accessPolicy.startsOn.getTime(),
    );
    assert.equal(
      getAccessPolicyResponse.signedIdentifiers[0].accessPolicy.permissions,
      identifiers[0].accessPolicy.permissions,
    );
    await leaseClient.releaseLease();
  });
});
