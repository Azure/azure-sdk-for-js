// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { getBSU, getUniqueName, recorderEnvSetup, uriSanitizers } from "./utils";
import { delay, Recorder } from "@azure-tools/test-recorder";
import { ContainerClient, BlobClient, BlockBlobClient, BlobServiceClient } from "../src";
import { Context } from "mocha";

describe("LeaseClient from Container", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;

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
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async function () {
    await containerClient.delete();
    await recorder.stop();
  });

  it("acquireLease", async function () {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    const leaseClient = containerClient.getBlobLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await containerClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("acquireLease without specifying a lease id", async function () {
    const duration = 30;
    const leaseClient = containerClient.getBlobLeaseClient();
    await leaseClient.acquireLease(duration);

    const result = await containerClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("releaseLease", async function () {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    const leaseClient = containerClient.getBlobLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await containerClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("renewLease", async function () {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = containerClient.getBlobLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await containerClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await delay(16 * 1000);
    const result2 = await containerClient.getProperties();
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "expired");
    assert.equal(result2.leaseStatus, "unlocked");

    await leaseClient.renewLease();
    const result3 = await containerClient.getProperties();
    assert.equal(result3.leaseDuration, "fixed");
    assert.equal(result3.leaseState, "leased");
    assert.equal(result3.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("changeLease", async function () {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = containerClient.getBlobLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await containerClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await leaseClient.changeLease(newGuid);

    await containerClient.getProperties();
    await leaseClient.releaseLease();
  });

  it("breakLease", async function () {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = containerClient.getBlobLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await containerClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.breakLease(3);

    const result2 = await containerClient.getProperties();
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "breaking");
    assert.equal(result2.leaseStatus, "locked");

    await delay(3 * 1000);

    const result3 = await containerClient.getProperties();
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    assert.equal(result3.leaseStatus, "unlocked");
  });
});

describe("LeaseClient from Blob", () => {
  let containerName: string;
  let containerClient: ContainerClient;
  let blobName: string;
  let blobClient: BlobClient;
  let blockBlobClient: BlockBlobClient;
  const content = "Hello World";
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["playback", "record"]);
    const blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
    blobName = recorder.variable("blob", getUniqueName("blob"));
    blobClient = containerClient.getBlobClient(blobName);
    blockBlobClient = blobClient.getBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
  });

  afterEach(async function () {
    await containerClient.delete();
    await recorder.stop();
  });

  it("acquireLease", async function () {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    const leaseClient = blobClient.getBlobLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await blobClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("releaseLease", async function () {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    const leaseClient = blobClient.getBlobLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await blobClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("renewLease", async function () {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = blobClient.getBlobLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await blobClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await delay(20 * 1000);

    const result2 = await blobClient.getProperties();
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "expired");
    assert.equal(result2.leaseStatus, "unlocked");

    await leaseClient.renewLease();
    const result3 = await blobClient.getProperties();
    assert.equal(result3.leaseDuration, "fixed");
    assert.equal(result3.leaseState, "leased");
    assert.equal(result3.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("changeLease", async function () {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = blobClient.getBlobLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await blobClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await leaseClient.changeLease(newGuid);

    await blobClient.getProperties();
    await leaseClient.releaseLease();
  });

  it("breakLease", async function () {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = blobClient.getBlobLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await blobClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.breakLease(5);

    const result2 = await blobClient.getProperties();
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "breaking");
    assert.equal(result2.leaseStatus, "locked");

    await delay(5 * 1000);

    const result3 = await blobClient.getProperties();
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    assert.equal(result3.leaseStatus, "unlocked");
  });
});
