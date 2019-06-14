import * as assert from "assert";

import * as dotenv from "dotenv";
import { getBSU, getUniqueName, sleep } from "./utils";
dotenv.config({ path: "../.env" });

describe("LeaseClient from Container", () => {
  const blobServiceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = blobServiceClient.createContainerClient(containerName);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = blobServiceClient.createContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async () => {
    await containerClient.delete();
  });

  it("acquireLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    const leaseClient = containerClient.getLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await containerClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("acquireLease without specifying a lease id", async () => {
    const duration = 30;
    const leaseClient = containerClient.getLeaseClient();
    const l = await leaseClient.acquireLease(duration);
    console.log(l);

    const result = await containerClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("releaseLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    const leaseClient = containerClient.getLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await containerClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("renewLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = containerClient.getLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await containerClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await sleep(16 * 1000);
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

  it("changeLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = containerClient.getLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await containerClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await leaseClient.chanageLease(newGuid);

    await containerClient.getProperties();
    await leaseClient.releaseLease();
  });

  it("breakLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = containerClient.getLeaseClient(guid);
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

    await sleep(3 * 1000);

    const result3 = await containerClient.getProperties();
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    assert.equal(result3.leaseStatus, "unlocked");
  });
});

describe("LeaseClient from Blob", () => {
  const blobServiceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = blobServiceClient.createContainerClient(containerName);
  let blobName: string = getUniqueName("blob");
  let blobClient = containerClient.createBlobClient(blobName);
  let blockBlobClient = blobClient.createBlockBlobClient();
  const content = "Hello World";

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = blobServiceClient.createContainerClient(containerName);
    await containerClient.create();
    blobName = getUniqueName("blob");
    blobClient = containerClient.createBlobClient(blobName);
    blockBlobClient = blobClient.createBlockBlobClient();
    await blockBlobClient.upload(content, content.length);
  });

  afterEach(async () => {
    await containerClient.delete();
  });

  it("acquireLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    const leaseClient = blobClient.getLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await blobClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("releaseLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    const leaseClient = blobClient.getLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await blobClient.getProperties();
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await leaseClient.releaseLease();
  });

  it("renewLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = blobClient.getLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await blobClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await sleep(20 * 1000);

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

  it("changeLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = blobClient.getLeaseClient(guid);
    await leaseClient.acquireLease(duration);

    const result = await blobClient.getProperties();
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await leaseClient.chanageLease(newGuid);

    await blobClient.getProperties();
    await leaseClient.releaseLease();
  });

  it("breakLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    const leaseClient = blobClient.getLeaseClient(guid);
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

    await sleep(5 * 1000);

    const result3 = await blobClient.getProperties();
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    assert.equal(result3.leaseStatus, "unlocked");
  });
});
