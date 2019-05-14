import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { BlobClient } from "../src/BlobClient";
import { BlockBlobClient } from "../src/BlockBlobClient";
import { ContainerClient } from "../src/ContainerClient";
import { getBSU, getUniqueName, sleep } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("ContainerClient", () => {
  const serviceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
    await containerClient.create(Aborter.none);
  });

  afterEach(async () => {
    await containerClient.delete(Aborter.none);
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await containerClient.setMetadata(Aborter.none, metadata);

    const result = await containerClient.getProperties(Aborter.none);
    assert.deepEqual(result.metadata, metadata);
  });

  it("getProperties", async () => {
    const result = await containerClient.getProperties(Aborter.none);
    assert.ok(result.eTag!.length > 0);
    assert.ok(result.lastModified);
    assert.ok(!result.leaseDuration);
    assert.equal(result.leaseState, "available");
    assert.equal(result.leaseStatus, "unlocked");
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
    assert.ok(!result.blobPublicAccess);
  });

  it("create with default parameters", (done) => {
    // create() with default parameters has been tested in beforeEach
    done();
  });

  it("create with all parameters configured", async () => {
    const cClient = ContainerClient.fromServiceClient(serviceClient, getUniqueName(containerName));
    const metadata = { key: "value" };
    const access = "container";
    await cClient.create(Aborter.none, { metadata, access });
    const result = await cClient.getProperties(Aborter.none);
    assert.deepEqual(result.blobPublicAccess, access);
    assert.deepEqual(result.metadata, metadata);
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  it("acquireLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 30;
    await containerClient.acquireLease(Aborter.none, guid, duration);

    const result = await containerClient.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await containerClient.releaseLease(Aborter.none, guid);
  });

  it("releaseLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = -1;
    await containerClient.acquireLease(Aborter.none, guid, duration);

    const result = await containerClient.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "infinite");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await containerClient.releaseLease(Aborter.none, guid);
  });

  it("renewLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    await containerClient.acquireLease(Aborter.none, guid, duration);

    const result = await containerClient.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await sleep(16 * 1000);
    const result2 = await containerClient.getProperties(Aborter.none);
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "expired");
    assert.equal(result2.leaseStatus, "unlocked");

    await containerClient.renewLease(Aborter.none, guid);
    const result3 = await containerClient.getProperties(Aborter.none);
    assert.equal(result3.leaseDuration, "fixed");
    assert.equal(result3.leaseState, "leased");
    assert.equal(result3.leaseStatus, "locked");

    await containerClient.releaseLease(Aborter.none, guid);
  });

  it("changeLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    await containerClient.acquireLease(Aborter.none, guid, duration);

    const result = await containerClient.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    const newGuid = "3c7e72ebb4304526bc53d8ecef03798f";
    await containerClient.changeLease(Aborter.none, guid, newGuid);

    await containerClient.getProperties(Aborter.none);
    await containerClient.releaseLease(Aborter.none, newGuid);
  });

  it("breakLease", async () => {
    const guid = "ca761232ed4211cebacd00aa0057b223";
    const duration = 15;
    await containerClient.acquireLease(Aborter.none, guid, duration);

    const result = await containerClient.getProperties(Aborter.none);
    assert.equal(result.leaseDuration, "fixed");
    assert.equal(result.leaseState, "leased");
    assert.equal(result.leaseStatus, "locked");

    await containerClient.breakLease(Aborter.none, 3);

    const result2 = await containerClient.getProperties(Aborter.none);
    assert.ok(!result2.leaseDuration);
    assert.equal(result2.leaseState, "breaking");
    assert.equal(result2.leaseStatus, "locked");

    await sleep(3 * 1000);

    const result3 = await containerClient.getProperties(Aborter.none);
    assert.ok(!result3.leaseDuration);
    assert.equal(result3.leaseState, "broken");
    assert.equal(result3.leaseStatus, "unlocked");
  });

  it("listBlobFlatSegment with default parameters", async () => {
    const blobClients = [];
    for (let i = 0; i < 3; i++) {
      const blobClient = BlobClient.fromContainerClient(
        containerClient,
        getUniqueName(`blockblob/${i}`)
      );
      const blockBlobClient = BlockBlobClient.fromBlobClient(blobClient);
      await blockBlobClient.upload(Aborter.none, "", 0);
      blobClients.push(blobClient);
    }

    const result = await containerClient.listBlobFlatSegment(Aborter.none);
    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(containerClient.url.indexOf(result.containerName));
    assert.deepStrictEqual(result.nextMarker, "");
    assert.deepStrictEqual(result.segment.blobItems!.length, blobClients.length);
    assert.ok(blobClients[0].url.indexOf(result.segment.blobItems![0].name));

    for (const blob of blobClients) {
      await blob.delete(Aborter.none);
    }
  });

  it("listBlobFlatSegment with all parameters configured", async () => {
    const blobClients = [];
    const prefix = "blockblob";
    const metadata = {
      keya: "a",
      keyb: "c"
    };
    for (let i = 0; i < 2; i++) {
      const blobClient = BlobClient.fromContainerClient(
        containerClient,
        getUniqueName(`${prefix}/${i}`)
      );
      const blockBlobClient = BlockBlobClient.fromBlobClient(blobClient);
      await blockBlobClient.upload(Aborter.none, "", 0, {
        metadata
      });
      blobClients.push(blobClient);
    }

    const result = await containerClient.listBlobFlatSegment(Aborter.none, undefined, {
      include: ["snapshots", "metadata", "uncommittedblobs", "copy", "deleted"],
      maxresults: 1,
      prefix
    });
    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(containerClient.url.indexOf(result.containerName));
    assert.deepStrictEqual(result.segment.blobItems!.length, 1);
    assert.ok(blobClients[0].url.indexOf(result.segment.blobItems![0].name));
    assert.deepStrictEqual(result.segment.blobItems![0].metadata, metadata);

    const result2 = await containerClient.listBlobFlatSegment(Aborter.none, result.nextMarker, {
      include: ["snapshots", "metadata", "uncommittedblobs", "copy", "deleted"],
      maxresults: 2,
      prefix
    });

    assert.ok(result2.serviceEndpoint.length > 0);
    assert.ok(containerClient.url.indexOf(result2.containerName));
    assert.deepStrictEqual(result2.segment.blobItems!.length, 1);
    assert.ok(blobClients[0].url.indexOf(result2.segment.blobItems![0].name));
    assert.deepStrictEqual(result2.segment.blobItems![0].metadata, metadata);

    for (const blob of blobClients) {
      await blob.delete(Aborter.none);
    }
  });

  it("listBlobHierarchySegment with default parameters", async () => {
    const blobClients = [];
    for (let i = 0; i < 3; i++) {
      const blobClient = BlobClient.fromContainerClient(
        containerClient,
        getUniqueName(`blockblob${i}/${i}`)
      );
      const blockBlobClient = BlockBlobClient.fromBlobClient(blobClient);
      await blockBlobClient.upload(Aborter.none, "", 0);
      blobClients.push(blobClient);
    }

    const delimiter = "/";
    const result = await containerClient.listBlobHierarchySegment(Aborter.none, delimiter);
    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(containerClient.url.indexOf(result.containerName));
    assert.deepStrictEqual(result.nextMarker, "");
    assert.deepStrictEqual(result.delimiter, delimiter);
    assert.deepStrictEqual(result.segment.blobPrefixes!.length, blobClients.length);

    for (const blob of blobClients) {
      let i = 0;
      assert.ok(blob.url.indexOf(result.segment.blobPrefixes![i++].name));
    }

    for (const blob of blobClients) {
      await blob.delete(Aborter.none);
    }
  });

  it("listBlobHierarchySegment with all parameters configured", async () => {
    const blobClients = [];
    const prefix = "blockblob";
    const metadata = {
      keya: "a",
      keyb: "c"
    };
    const delimiter = "/";
    for (let i = 0; i < 2; i++) {
      const blobClient = BlobClient.fromContainerClient(
        containerClient,
        getUniqueName(`${prefix}${i}${delimiter}${i}`)
      );
      const blockBlobClient = BlockBlobClient.fromBlobClient(blobClient);
      await blockBlobClient.upload(Aborter.none, "", 0, {
        metadata
      });
      blobClients.push(blobClient);
    }

    const result = await containerClient.listBlobHierarchySegment(
      Aborter.none,
      delimiter,
      undefined,
      {
        include: ["metadata", "uncommittedblobs", "copy", "deleted"],
        maxresults: 1,
        prefix
      }
    );
    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(containerClient.url.indexOf(result.containerName));
    assert.deepStrictEqual(result.segment.blobPrefixes!.length, 1);
    assert.deepStrictEqual(result.segment.blobItems!.length, 0);
    assert.ok(blobClients[0].url.indexOf(result.segment.blobPrefixes![0].name));

    const result2 = await containerClient.listBlobHierarchySegment(
      Aborter.none,
      delimiter,
      result.nextMarker,
      {
        include: ["metadata", "uncommittedblobs", "copy", "deleted"],
        maxresults: 2,
        prefix
      }
    );
    assert.ok(result2.serviceEndpoint.length > 0);
    assert.ok(containerClient.url.indexOf(result2.containerName));
    assert.deepStrictEqual(result2.segment.blobPrefixes!.length, 1);
    assert.deepStrictEqual(result2.segment.blobItems!.length, 0);
    assert.ok(blobClients[0].url.indexOf(result2.segment.blobPrefixes![0].name));

    const result3 = await containerClient.listBlobHierarchySegment(
      Aborter.none,
      delimiter,
      undefined,
      {
        include: ["metadata", "uncommittedblobs", "copy", "deleted"],
        maxresults: 2,
        prefix: `${prefix}0${delimiter}`
      }
    );
    assert.ok(result3.serviceEndpoint.length > 0);
    assert.ok(containerClient.url.indexOf(result3.containerName));
    assert.deepStrictEqual(result3.nextMarker, "");
    assert.deepStrictEqual(result3.delimiter, delimiter);
    assert.deepStrictEqual(result3.segment.blobItems!.length, 1);
    assert.deepStrictEqual(result3.segment.blobItems![0].metadata, metadata);
    assert.ok(blobClients[0].url.indexOf(result3.segment.blobItems![0].name));

    for (const blob of blobClients) {
      await blob.delete(Aborter.none);
    }
  });
});
