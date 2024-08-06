// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  getBSU,
  getSASConnectionStringFromEnvironment,
  getTokenBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "./utils";
import { ShareClient, ShareServiceClient } from "../src";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { configureStorageClient } from "./utils";

describe("ShareClient", () => {
  let serviceClient: ShareServiceClient;
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    serviceClient = getBSU(recorder);
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

  it("create with all parameters configured", async () => {
    const shareClient2 = serviceClient.getShareClient(
      recorder.variable(shareName, getUniqueName(shareName)),
    );
    const metadata = { key: "value" };
    await shareClient2.create({ metadata });
    const result = await shareClient2.getProperties();
    assert.deepEqual(result.metadata, metadata);
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

  it("createDirectory and deleteDirectory", async () => {
    const dirName = recorder.variable("directory", getUniqueName("directory"));
    const metadata = { key: "value" };

    const { directoryClient } = await shareClient.createDirectory(dirName, { metadata });
    const result = await directoryClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await shareClient.deleteDirectory(dirName);
    try {
      await directoryClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      assert.ok((error.statusCode as number) === 404);
    }
  });

  it("createFile and deleteFile under root directory", async () => {
    const fileName = recorder.variable("file", getUniqueName("file"));
    const metadata = { key: "value" };
    const { fileClient } = await shareClient.createFile(fileName, 256, { metadata });
    const result = await fileClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await shareClient.deleteFile(fileName);
    try {
      await fileClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      assert.ok((error.statusCode as number) === 404);
    }
  });

  it("can get a directory client for root directory", async () => {
    const root = await shareClient.rootDirectoryClient;
    const result = await root.getProperties();
    assert.ok(result, "Expecting valid properties for the root directory.");
  });

  it("can be created with a sas connection string and a share name", async () => {
    const newClient = new ShareClient(getSASConnectionStringFromEnvironment(recorder), shareName);
    configureStorageClient(recorder, newClient);
    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a sas connection string and a share name and an option bag", async () => {
    const newClient = new ShareClient(getSASConnectionStringFromEnvironment(recorder), shareName, {
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

  it("throws error if constructor shareName parameter is empty", async () => {
    try {
      new ShareClient(getSASConnectionStringFromEnvironment(recorder), "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Expecting non-empty strings for name parameter",
        error.message,
        "Error message is different than expected.",
      );
    }
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

  it("create share specifying accessTier and listShare", async () => {
    const newShareName = recorder.variable("newshare", getUniqueName("newshare"));
    const newShareClient = serviceClient.getShareClient(newShareName);
    await newShareClient.create({ accessTier: "Hot" });

    for await (const shareItem of serviceClient.listShares({ prefix: newShareName })) {
      if (shareItem.name === newShareName) {
        assert.deepStrictEqual(shareItem.properties.accessTier, "Hot");
        assert.ok(shareItem.properties.accessTierChangeTime);
        break;
      }
    }

    await newShareClient.delete();
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
});

describe("ShareDirectoryClient - Verify Name Properties", () => {
  const accountName = "myaccount";
  const shareName = "shareName";

  function verifyNameProperties(url: string) {
    const newClient = new ShareClient(url);
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided.",
    );
    assert.equal(newClient.name, shareName, "Share name is not the same as the one provided.");
  }

  it("verify endpoint from the portal", async () => {
    verifyNameProperties(`https://${accountName}.file.core.windows.net/${shareName}`);
  });

  it("verify IPv4 host address as Endpoint", async () => {
    verifyNameProperties(`https://192.0.0.10:1900/${accountName}/${shareName}`);
  });

  it("verify IPv6 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${shareName}`,
    );
  });

  it("verify endpoint without dots", async () => {
    verifyNameProperties(`https://localhost:80/${accountName}/${shareName}`);
  });

  it("verify custom endpoint without valid accountName", async () => {
    const newClient = new ShareClient(`https://customdomain.com/${shareName}`);

    assert.equal(newClient.accountName, "", "Account name is not the same as expected.");
    assert.equal(newClient.name, shareName, "Share name is not the same as the one provided.");
  });
});

describe("ShareClient - OAuth", () => {
  let serviceClient: ShareServiceClient;
  let shareName: string;
  let shareClient: ShareClient;
  let shareClientWithKeyCredential: ShareClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);

    try {
      serviceClient = getTokenBSU(recorder, "", "", { fileRequestIntent: "backup" });
    } catch (err) {
      this.skip();
    }
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
    shareClientWithKeyCredential = getBSU(recorder).getShareClient(shareName);
    await shareClientWithKeyCredential.create();
  });

  afterEach(async function () {
    if (shareClientWithKeyCredential) {
      await shareClientWithKeyCredential.delete();
    }
    await recorder.stop();
  });

  it("create and get permission", async () => {
    const directoryName = recorder.variable("dir", getUniqueName("dir"));
    const directoryClient = shareClient.getDirectoryClient(directoryName);

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

  it("create and delete directory", async () => {
    const directoryName = recorder.variable("dir", getUniqueName("dir"));

    const { directoryClient } = await shareClient.createDirectory(directoryName);
    assert.deepStrictEqual(directoryClient.name, directoryName);
    assert.ok(await directoryClient.exists(), "Directory should have been created.");

    await shareClient.deleteDirectory(directoryName);
    assert.ok(!(await directoryClient.exists()), "Directory should have been deleted.");
  });

  it("create and delete file", async () => {
    const fileName = recorder.variable("file", getUniqueName("file"));

    const { fileClient } = await shareClient.createFile(fileName, 1024);
    assert.deepStrictEqual(fileClient.name, fileName);
    assert.ok(await fileClient.exists(), "File should have been created.");

    await shareClient.deleteFile(fileName);
    assert.ok(!(await fileClient.exists()), "Directory should have been deleted.");
  });
});

describe("ShareClient", () => {
  let serviceClient: ShareServiceClient;
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    serviceClient = getBSU(recorder);
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

  it("create with all parameters configured", async () => {
    const shareClient2 = serviceClient.getShareClient(
      recorder.variable(shareName, getUniqueName(shareName)),
    );
    const metadata = { key: "value" };
    await shareClient2.create({ metadata });
    const result = await shareClient2.getProperties();
    assert.deepEqual(result.metadata, metadata);
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

  it("createDirectory and deleteDirectory", async () => {
    const dirName = recorder.variable("directory", getUniqueName("directory"));
    const metadata = { key: "value" };

    const { directoryClient } = await shareClient.createDirectory(dirName, { metadata });
    const result = await directoryClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await shareClient.deleteDirectory(dirName);
    try {
      await directoryClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      assert.ok((error.statusCode as number) === 404);
    }
  });

  it("createFile and deleteFile under root directory", async () => {
    const fileName = recorder.variable("file", getUniqueName("file"));
    const metadata = { key: "value" };
    const { fileClient } = await shareClient.createFile(fileName, 256, { metadata });
    const result = await fileClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await shareClient.deleteFile(fileName);
    try {
      await fileClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      assert.ok((error.statusCode as number) === 404);
    }
  });

  it("can get a directory client for root directory", async () => {
    const root = shareClient.rootDirectoryClient;
    const result = await root.getProperties();
    assert.ok(result, "Expecting valid properties for the root directory.");
  });

  it("can be created with a sas connection string and a share name", async () => {
    const newClient = new ShareClient(getSASConnectionStringFromEnvironment(recorder), shareName);
    configureStorageClient(recorder, newClient);
    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a sas connection string and a share name and an option bag", async () => {
    const newClient = new ShareClient(getSASConnectionStringFromEnvironment(recorder), shareName, {
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

  it("throws error if constructor shareName parameter is empty", async () => {
    try {
      new ShareClient(getSASConnectionStringFromEnvironment(recorder), "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Expecting non-empty strings for name parameter",
        error.message,
        "Error message is different than expected.",
      );
    }
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

  it("create share specifying accessTier and listShare", async () => {
    const newShareName = recorder.variable("newshare", getUniqueName("newshare"));
    const newShareClient = serviceClient.getShareClient(newShareName);
    await newShareClient.create({ accessTier: "Hot" });

    for await (const shareItem of serviceClient.listShares({ prefix: newShareName })) {
      if (shareItem.name === newShareName) {
        assert.deepStrictEqual(shareItem.properties.accessTier, "Hot");
        assert.ok(shareItem.properties.accessTierChangeTime);
        break;
      }
    }

    await newShareClient.delete();
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
});

describe("ShareDirectoryClient - Verify Name Properties", () => {
  const accountName = "myaccount";
  const shareName = "shareName";

  function verifyNameProperties(url: string) {
    const newClient = new ShareClient(url);
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided.",
    );
    assert.equal(newClient.name, shareName, "Share name is not the same as the one provided.");
  }

  it("verify endpoint from the portal", async () => {
    verifyNameProperties(`https://${accountName}.file.core.windows.net/${shareName}`);
  });

  it("verify IPv4 host address as Endpoint", async () => {
    verifyNameProperties(`https://192.0.0.10:1900/${accountName}/${shareName}`);
  });

  it("verify IPv6 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${shareName}`,
    );
  });

  it("verify endpoint without dots", async () => {
    verifyNameProperties(`https://localhost:80/${accountName}/${shareName}`);
  });

  it("verify custom endpoint without valid accountName", async () => {
    const newClient = new ShareClient(`https://customdomain.com/${shareName}`);

    assert.equal(newClient.accountName, "", "Account name is not the same as expected.");
    assert.equal(newClient.name, shareName, "Share name is not the same as the one provided.");
  });
});
