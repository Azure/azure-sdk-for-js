// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { Context } from "mocha";

import { Recorder } from "@azure-tools/test-recorder";

import {
  getAccountName,
  configureStorageClient,
  getBSU,
  getConnectionStringFromEnvironment,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
  SimpleTokenCredential,
  getTokenBSUWithDefaultCredential,
} from "../utils";
import {
  getFileServiceAccountAudience,
  newPipeline,
  ShareClient,
  ShareServiceClient,
  SignedIdentifier,
  StorageSharedKeyCredential,
} from "../../src";
import { createTestCredential } from "@azure-tools/test-credential";

describe("ShareClient Node.js only", () => {
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const serviceClient = getBSU(recorder);
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async function () {
    await shareClient.delete();
    await recorder.stop();
  });

  it("Default audience should work", async () => {
    const directoryName = recorder.variable("dir", getUniqueName("dir"));
    const directoryClient = shareClient.getDirectoryClient(directoryName);

    const cResp = await directoryClient.create();
    assert.ok(cResp.filePermissionKey);

    const shareClientWithOAuthToken = new ShareClient(shareClient.url, createTestCredential(), {
      fileRequestIntent: "backup",
    });
    configureStorageClient(recorder, shareClientWithOAuthToken);

    const getPermissionResp = await shareClientWithOAuthToken.getPermission(
      cResp.filePermissionKey!,
    );
    assert.ok(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
  });

  it("Customized audience should work", async () => {
    const directoryName = recorder.variable("dir", getUniqueName("dir"));
    const directoryClient = shareClient.getDirectoryClient(directoryName);

    const cResp = await directoryClient.create();
    assert.ok(cResp.filePermissionKey);

    const shareClientWithOAuthToken = new ShareClient(shareClient.url, createTestCredential(), {
      audience: getFileServiceAccountAudience(getAccountName()),
      fileRequestIntent: "backup",
    });
    configureStorageClient(recorder, shareClientWithOAuthToken);

    const getPermissionResp = await shareClientWithOAuthToken.getPermission(
      cResp.filePermissionKey!,
    );
    assert.ok(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
  });

  it("Bad audience should work", async () => {
    const directoryName = recorder.variable("dir", getUniqueName("dir"));
    const directoryClient = shareClient.getDirectoryClient(directoryName);

    const cResp = await directoryClient.create();
    assert.ok(cResp.filePermissionKey);

    const token = await createTestCredential().getToken(
      "https://badaudience.file.core.windows.net/.default",
    );

    const shareClientWithSimpleOAuthToken = new ShareClient(
      shareClient.url,
      new SimpleTokenCredential(token!.token, new Date(token!.expiresOnTimestamp)),
      {
        fileRequestIntent: "backup",
      },
    );
    configureStorageClient(recorder, shareClientWithSimpleOAuthToken);

    try {
      await shareClientWithSimpleOAuthToken.getPermission(cResp.filePermissionKey!);
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const shareClientWithOAuthToken = new ShareClient(shareClient.url, createTestCredential(), {
      audience: "https://badaudience.file.core.windows.net/.default",
      fileRequestIntent: "backup",
    });
    configureStorageClient(recorder, shareClientWithOAuthToken);
    const getPermissionResp = await shareClientWithOAuthToken.getPermission(
      cResp.filePermissionKey!,
    );
    assert.ok(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
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

  it("getAccessPolicy", (done) => {
    // create() with default parameters has been tested in setAccessPolicy
    done();
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

  it("can be created with a url and a credential", async () => {
    const credential = shareClient["credential"] as StorageSharedKeyCredential;
    const newClient = new ShareClient(shareClient.url, credential);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const credential = shareClient["credential"] as StorageSharedKeyCredential;
    const newClient = new ShareClient(shareClient.url, credential, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a pipeline", async () => {
    const credential = shareClient["credential"] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new ShareClient(shareClient.url, pipeline);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a connection string and a share name", async () => {
    const newClient = new ShareClient(getConnectionStringFromEnvironment(), shareName);
    configureStorageClient(recorder, newClient);
    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a connection string and a share name and an option bag", async () => {
    const newClient = new ShareClient(getConnectionStringFromEnvironment(), shareName, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureStorageClient(recorder, newClient);
    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });
});

describe("ShareClient Node.js only - OAuth", () => {
  let serviceClient: ShareServiceClient;
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    serviceClient = getTokenBSUWithDefaultCredential(recorder, "", "", {
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
    assert.ok(await shareClient.exists());

    const shareClient2 = serviceClient.getShareClient(
      recorder.variable(shareName, getUniqueName(shareName)),
    );
    assert.ok(!(await shareClient2.exists()));
  });

  it("getProperties", async () => {
    const result = await shareClient.getProperties();
    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("create with default parameters", (done) => {
    // create() with default parameters has been tested in beforeEach
    done();
  });

  it("createIfNotExists", async () => {
    const shareClient2 = serviceClient.getShareClient(
      recorder.variable(shareName, getUniqueName(shareName)),
    );
    const res = await shareClient2.createIfNotExists();
    assert.ok(res.succeeded);

    const res2 = await shareClient2.createIfNotExists();
    assert.ok(!res2.succeeded);
    assert.equal(res2.errorCode, "ShareAlreadyExists");

    await shareClient2.delete();
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("deleteIfExists", async () => {
    const shareClient2 = serviceClient.getShareClient(
      recorder.variable(shareName, getUniqueName(shareName)),
    );
    await shareClient2.create();
    const res = await shareClient2.deleteIfExists();
    assert.ok(res.succeeded);

    const shareClient3 = serviceClient.getShareClient(
      recorder.variable(shareName + "3", getUniqueName(shareName + "3")),
    );
    const res2 = await shareClient3.deleteIfExists();
    assert.ok(!res2.succeeded);
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
    assert.ok(cResp.filePermissionKey);

    const getPermissionResp = await shareClient.getPermission(cResp.filePermissionKey!);
    assert.ok(getPermissionResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
    assert.ok(getPermissionResp.permission && getPermissionResp.permission !== "");
    assert.ok(getPermissionResp.requestId!);
    assert.ok(getPermissionResp.version!);

    const createPermResp = await shareClient.createPermission(getPermissionResp.permission);
    assert.ok(createPermResp.filePermissionKey!);
    assert.ok(createPermResp.date!);
    assert.equal(getPermissionResp.errorCode, undefined);
    assert.ok(createPermResp.requestId!);
    assert.ok(createPermResp.version!);
  });

  it("setProperties", async () => {
    const accessTier = "Hot";
    const quotaInGB = 20;
    await shareClient.setProperties({ accessTier, quotaInGB });
    const getRes = await shareClient.getProperties();

    assert.deepStrictEqual(getRes.accessTier, accessTier);
    assert.ok(getRes.accessTierChangeTime);
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
