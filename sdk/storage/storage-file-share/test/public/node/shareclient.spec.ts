// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import type { ShareServiceClient, SignedIdentifier } from "../../../src/index.js";
import type { ShareClient } from "../../../src/index.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { createShareServiceClient, createShareClient } from "./utils/clients.js";
import { getUniqueName } from "../utils/utils.js";
import { getAccountKey, getStorageConnectionStringWithSas } from "../../utils/injectables.js";

describe("ShareClient Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    const serviceClient = await createShareServiceClient("TokenCredential", { recorder });
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async () => {
    await shareClient.delete();
    await recorder.stop();
  });

  it("setAccessPolicy", async () => {
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

    await shareClient.setAccessPolicy(identifiers);
    const getAccessPolicyResponse = await shareClient.getAccessPolicy();

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
  });

  it("getAccessPolicy", () => {
    // create() with default parameters has been tested in setAccessPolicy
  });

  it("setAccessPolicy and getAccessPolicy with empty SignedIdentifier", async () => {
    const identifiers: any = [
      {
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];

    await shareClient.setAccessPolicy(identifiers);
    const getAccessPolicyResponse = await shareClient.getAccessPolicy();

    assert.equal(getAccessPolicyResponse.signedIdentifiers[0].id, identifiers[0].id);
    assert.deepStrictEqual(getAccessPolicyResponse.signedIdentifiers[0].accessPolicy, undefined);
  });

  it.runIf(getAccountKey())("can be created with a url and a credential", async () => {
    const newClient = await createShareClient("SharedKeyCredential", { shareName, recorder });
    assert.isDefined(newClient);
    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it.runIf(getAccountKey())(
    "can be created with a url and a credential and an option bag",
    async () => {
      const newClient = await createShareClient("SharedKeyCredential", {
        shareName,
        recorder,
        options: {
          retryOptions: {
            maxTries: 5,
          },
        },
      });
      assert.isDefined(newClient);
      const result = await newClient.getProperties();

      assert.isAbove(result.etag!.length, 0);
      assert.isDefined(result.lastModified);
      assert.isDefined(result.requestId);
      assert.isDefined(result.version);
      assert.isDefined(result.date);
    },
  );

  it.runIf(getAccountKey())("can be created with a url and a pipeline", async () => {
    const newClient = await createShareClient("Pipeline", { shareName, recorder });
    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("can be created with a connection string and a share name", async () => {
    const newClient = await createShareClient("SasConnectionString", {
      shareName,
      recorder,
    });
    assert.isDefined(newClient);
    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("can be created with a connection string and a share name and an option bag", async () => {
    const newClient = await createShareClient("SasConnectionString", {
      shareName,
      recorder,
      options: {
        retryOptions: {
          maxTries: 5,
        },
      },
    });
    assert.isDefined(newClient);
    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });
});

describe("ShareClient Node.js only - OAuth", () => {
  let serviceClient: ShareServiceClient;
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);

    serviceClient = await createShareServiceClient("TokenCredential", { recorder });
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async () => {
    await shareClient.delete();
    await recorder.stop();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    await shareClient.setMetadata(metadata);

    const result = await shareClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("exists", async () => {
    assert.isTrue(await shareClient.exists());

    const shareClient2 = serviceClient.getShareClient(getUniqueName(shareName, { recorder }));
    assert.isFalse(await shareClient2.exists());
  });

  it("getProperties", async () => {
    const result = await shareClient.getProperties();
    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("create with default parameters", () => {
    // create() with default parameters has been tested in beforeEach
  });

  it("createIfNotExists", async () => {
    const shareClient2 = serviceClient.getShareClient(getUniqueName(shareName, { recorder }));
    const res = await shareClient2.createIfNotExists();
    assert.isTrue(res.succeeded);

    const res2 = await shareClient2.createIfNotExists();
    assert.isFalse(res2.succeeded);
    assert.equal(res2.errorCode, "ShareAlreadyExists");

    await shareClient2.delete();
  });

  it("delete", () => {});

  it("deleteIfExists", async () => {
    const shareClient2 = serviceClient.getShareClient(getUniqueName(shareName, { recorder }));
    await shareClient2.create();
    const res = await shareClient2.deleteIfExists();
    assert.isTrue(res.succeeded);

    const shareClient3 = serviceClient.getShareClient(getUniqueName(shareName + "3", { recorder }));
    const res2 = await shareClient3.deleteIfExists();
    assert.isFalse(res2.succeeded);
    assert.equal(res2.errorCode, "ShareNotFound");
  });

  it("setQuota", async () => {
    const quotaInGB = 20;
    await shareClient.setQuota(quotaInGB);
    const propertiesResponse = await shareClient.getProperties();
    assert.equal(propertiesResponse.quota, quotaInGB);
  });

  it("getStatistics", async () => {
    const statisticsResponse = await shareClient.getStatistics();
    assert.notEqual(statisticsResponse.shareUsage, undefined);
  });

  it("create snapshot", async () => {
    const metadata = { key1: "value1", key2: "value2" };
    const createSnapshotResponse = await shareClient.createSnapshot({
      metadata,
    });

    assert.notEqual(createSnapshotResponse.snapshot, undefined);
    const sanpshot = createSnapshotResponse.snapshot!;
    const snapshotShareClient = shareClient.withSnapshot(sanpshot);

    const snapshotProperties = await snapshotShareClient.getProperties();
    assert.deepStrictEqual(snapshotProperties.metadata, metadata);

    const originProperties = await shareClient.getProperties();
    assert.notDeepEqual(originProperties.metadata, metadata);

    await snapshotShareClient.delete({});
  });

  it("create and get permission", async () => {
    const directoryClient = shareClient.getDirectoryClient("test0");

    const cResp = await directoryClient.create();
    assert.isDefined(cResp.filePermissionKey);

    const getPermissionResp = await shareClient.getPermission(cResp.filePermissionKey!);
    assert.isDefined(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
    assert.isDefined(getPermissionResp.permission);
    assert.notStrictEqual(getPermissionResp.permission, "");
    assert.isDefined(getPermissionResp.requestId!);
    assert.isDefined(getPermissionResp.version!);

    const createPermResp = await shareClient.createPermission(getPermissionResp.permission);
    assert.isDefined(createPermResp.filePermissionKey!);
    assert.isDefined(createPermResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
    assert.isDefined(createPermResp.requestId!);
    assert.isDefined(createPermResp.version!);
  });

  it("setProperties", async () => {
    const accessTier = "Hot";
    const quotaInGB = 20;
    await shareClient.setProperties({ accessTier, quotaInGB });
    const getRes = await shareClient.getProperties();

    assert.deepStrictEqual(getRes.accessTier, accessTier);
    assert.isDefined(getRes.accessTierChangeTime);
    assert.deepStrictEqual(getRes.accessTierTransitionState, "pending-from-transactionOptimized");
    assert.equal(getRes.quota, quotaInGB);
  });

  it("setAccessPolicy", async () => {
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

    await shareClient.setAccessPolicy(identifiers);
    const getAccessPolicyResponse = await shareClient.getAccessPolicy();

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
  });
});

describe.runIf(getStorageConnectionStringWithSas())("ShareClient - SAS Connection String", () => {
  let recorder: Recorder;
  let serviceClient: ShareServiceClient;
  let shareName: string;
  let shareClient: ShareClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    serviceClient = await createShareServiceClient("TokenCredential", { recorder });
    shareName = getUniqueName("share", { recorder });
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async () => {
    await shareClient.delete();
    await recorder.stop();
  });

  it("can be created with a sas connection string and a share name", async () => {
    const newClient = await createShareClient("SasConnectionString", { shareName, recorder });
    assert.isDefined(newClient);
    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("can be created with a sas connection string and a share name and an option bag", async () => {
    const newClient = await createShareClient("SasConnectionString", {
      shareName,
      recorder,
      options: {
        retryOptions: {
          maxTries: 5,
        },
      },
    });
    assert.isDefined(newClient);

    const result = await newClient.getProperties();

    assert.isAbove(result.etag!.length, 0);
    assert.isDefined(result.lastModified);
    assert.isDefined(result.requestId);
    assert.isDefined(result.version);
    assert.isDefined(result.date);
  });

  it("throws error if constructor shareName parameter is empty", async () => {
    try {
      await createShareClient("SasConnectionString", {
        shareName: "",
        recorder,
      });
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Expecting non-empty strings for name parameter",
        error.message,
        "Error message is different than expected.",
      );
    }
  });
});
