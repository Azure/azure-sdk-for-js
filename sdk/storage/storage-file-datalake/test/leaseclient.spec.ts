// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";

import { DataLakeFileClient, DataLakeDirectoryClient, DataLakeFileSystemClient } from "../src";
import { getDataLakeServiceClient, getUniqueName, recorderEnvSetup, uriSanitizers } from "./utils";

describe("LeaseClient from FileSystem", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers(
      {
        uriSanitizers,
        removeHeaderSanitizer: { headersForRemoval: ["x-ms-proposed-lease-id", "x-ms-lease-id"] },
      },
      ["record", "playback"]
    );
    const serviceClient = getDataLakeServiceClient(recorder);
    fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
  });

  afterEach(async function () {
    await fileSystemClient.deleteIfExists();
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
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const serviceClient = getDataLakeServiceClient(recorder);
    fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
    fileName = recorder.variable("file", getUniqueName("file"));
    fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
  });

  afterEach(async function () {
    await fileSystemClient.deleteIfExists();
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
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const serviceClient = getDataLakeServiceClient(recorder);
    fileSystemName = recorder.variable("filesystem", getUniqueName("filesystem"));
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.createIfNotExists();
    directoryName = recorder.variable("dir", getUniqueName("dir"));
    directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();
  });

  afterEach(async function () {
    await fileSystemClient.deleteIfExists();
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

    await leaseClient.breakLease(15);

    const result2 = await directoryClient.getProperties();
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "breaking");
    assert.equal(result2.leaseStatus, "locked");

    await delay(15 * 1000);

    const result3 = await directoryClient.getProperties();
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    // assert.equal(result3.leaseStatus, "unlocked"); // TODO: Potential bug of server which returns "locked" for "broken" lease
  });
});
