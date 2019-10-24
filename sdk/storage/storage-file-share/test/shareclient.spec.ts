import * as assert from "assert";
import * as dotenv from "dotenv";
import { getBSU, getSASConnectionStringFromEnvironment } from "./utils";
import { ShareClient } from "../src";
import { record } from "./utils/recorder";
dotenv.config({ path: "../.env" });

describe("ShareClient", () => {
  const serviceClient = getBSU();
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async function() {
    await shareClient.delete();
    recorder.stop();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await shareClient.setMetadata(metadata);

    const result = await shareClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
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
    const shareClient2 = serviceClient.getShareClient(recorder.getUniqueName(shareName));
    const metadata = { key: "value" };
    await shareClient2.create({ metadata });
    const result = await shareClient2.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
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
      metadata
    });

    assert.notEqual(createSnapshotResponse.snapshot, undefined);
    const sanpshot = createSnapshotResponse.snapshot!;
    const snapshotShareClient = shareClient.withSnapshot(sanpshot);

    const snapshotProperties = await snapshotShareClient.getProperties();
    assert.deepStrictEqual(snapshotProperties.metadata, metadata);

    const originProperties = await shareClient.getProperties();
    assert.notDeepStrictEqual(originProperties.metadata, metadata);

    await snapshotShareClient.delete({});
  });

  it("createDirectory and deleteDirectory", async () => {
    const dirName = recorder.getUniqueName("directory");
    const metadata = { key: "value" };

    const { directoryClient } = await shareClient.createDirectory(dirName, { metadata });
    const result = await directoryClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await shareClient.deleteDirectory(dirName);
    try {
      await directoryClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one."
      );
    } catch (error) {
      assert.ok((error.statusCode as number) === 404);
    }
  });

  it("createFile and deleteFile under root directory", async () => {
    const fileName = recorder.getUniqueName("file");
    const metadata = { key: "value" };
    const { fileClient } = await shareClient.createFile(fileName, 256, { metadata });
    const result = await fileClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await shareClient.deleteFile(fileName);
    try {
      await fileClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one."
      );
    } catch (error) {
      assert.ok((error.statusCode as number) === 404);
    }
  });

  it("can get a directory client for root directory", async () => {
    const root = await shareClient.rootDirectoryClient;
    const result = await root.getProperties();
    assert.ok(result, "Expecting valid properties for the root directory.");
  });

  it("can be created with a sas connection string and a share name", async () => {
    const newClient = new ShareClient(getSASConnectionStringFromEnvironment(), shareName);
    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a sas connection string and a share name and an option bag", async () => {
    const newClient = new ShareClient(getSASConnectionStringFromEnvironment(), shareName, {
      retryOptions: {
        maxTries: 5
      }
    });
    const result = await newClient.getProperties();

    assert.ok(result.etag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("throws error if constructor shareName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new ShareClient(getSASConnectionStringFromEnvironment(), "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for shareName parameter",
        error.message,
        "Error message is different than expected."
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

  it("verify accountName and shareName passed to the client", async () => {
    const accountName = "myaccount";
    const newClient = new ShareClient(`https://${accountName}.file.core.windows.net/` + shareName);
    assert.equal(newClient.shareName, shareName, "Queue name is not the same as the one provided.");
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided."
    );
  });
});
