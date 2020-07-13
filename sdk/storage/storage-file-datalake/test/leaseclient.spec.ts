import { delay, record, Recorder } from "@azure/test-utils-recorder";
import * as assert from "assert";
import * as dotenv from "dotenv";

import { DataLakeFileClient, DataLakeDirectoryClient, DataLakeFileSystemClient } from "../src";
import { getDataLakeServiceClient, recorderEnvSetup } from "./utils";

dotenv.config();

describe("LeaseClient from FileSystem", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
  });

  afterEach(async function() {
    await fileSystemClient.delete();
    await recorder.stop();
  });

  it("acquireLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    const leaseClient = fileSystemClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileSystemClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("acquireLease without specifying a lease id", async () => {
    const duration = 30;
    const leaseClient = fileSystemClient.getDataLakeLeaseClient();
    await leaseClient.acquireLease(duration);

    const result = await fileSystemClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("releaseLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    const leaseClient = fileSystemClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileSystemClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("renewLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = fileSystemClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileSystemClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await delay(16 * 1000);
    const result2 = await fileSystemClient.getProperties();
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "expired");
    assert.equal(result2.leaseStatus, "unlocked");

    await leaseClient.renewLease();
    const result3 = await fileSystemClient.getProperties();
    assert.equal(result3.leaseDuration, "fixed");
    assert.equal(result3.leaseState, "leased");
    assert.equal(result3.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("changeLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = fileSystemClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileSystemClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await leaseClient.changeLease(newGuid);

    await fileSystemClient.getProperties();
    await leaseClient.releaseLease();
  });

  it("breakLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = fileSystemClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileSystemClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.breakLease(3);

    const result2 = await fileSystemClient.getProperties();
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "breaking");
    assert.equal(result2.leaseStatus, "locked");

    await delay(3 * 1000);

    const result3 = await fileSystemClient.getProperties();
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    assert.equal(result3.leaseStatus, "unlocked");
  });
});

describe("LeaseClient from File", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  let recorder: any;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
    fileName = recorder.getUniqueName("file");
    fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
  });

  afterEach(async function() {
    await fileSystemClient.delete();
    await recorder.stop();
  });

  it("acquireLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    const leaseClient = fileClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("releaseLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    const leaseClient = fileClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("renewLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = fileClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await delay(20 * 1000);

    const result2 = await fileClient.getProperties();
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "expired");
    // assert.equal(result2.leaseStatus, "unlocked"); // TODO: Potential bug of server which returns "locked" for "expired" lease

    await leaseClient.renewLease();
    const result3 = await fileClient.getProperties();
    assert.equal(result3.leaseDuration, "fixed");
    assert.equal(result3.leaseState, "leased");
    assert.equal(result3.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("changeLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = fileClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await leaseClient.changeLease(newGuid);

    await fileClient.getProperties();
    await leaseClient.releaseLease();
  });

  it("breakLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = fileClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await fileClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.breakLease(5);

    const result2 = await fileClient.getProperties();
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "breaking");
    assert.equal(result2.leaseStatus, "locked");

    await delay(5 * 1000);

    const result3 = await fileClient.getProperties();
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    // assert.equal(result3.leaseStatus, "unlocked"); // TODO: Potential bug of server which returns "locked" for "broken" lease
  });
});

describe("LeaseClient from Directory", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let directoryName: string;
  let directoryClient: DataLakeDirectoryClient;
  let recorder: any;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
    directoryName = recorder.getUniqueName("dir");
    directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();
  });

  afterEach(async function() {
    await fileSystemClient.delete();
    await recorder.stop();
  });

  it("acquireLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    const leaseClient = directoryClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await directoryClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("releaseLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    const leaseClient = directoryClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await directoryClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("renewLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = directoryClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await directoryClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await delay(20 * 1000);

    const result2 = await directoryClient.getProperties();
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "expired");
    // assert.equal(result2.leaseStatus, "unlocked"); // TODO: Potential bug of server which returns "locked" for "expired" lease

    await leaseClient.renewLease();
    const result3 = await directoryClient.getProperties();
    assert.equal(result3.leaseDuration, "fixed");
    assert.equal(result3.leaseState, "leased");
    assert.equal(result3.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("changeLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = directoryClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await directoryClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await leaseClient.changeLease(newGuid);

    await directoryClient.getProperties();
    await leaseClient.releaseLease();
  });

  it("breakLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = directoryClient.getDataLakeLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await directoryClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.breakLease(5);

    const result2 = await directoryClient.getProperties();
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "breaking");
    assert.equal(result2.leaseStatus, "locked");

    await delay(5 * 1000);

    const result3 = await directoryClient.getProperties();
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    // assert.equal(result3.leaseStatus, "unlocked"); // TODO: Potential bug of server which returns "locked" for "broken" lease
  });
});
