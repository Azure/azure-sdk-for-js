import * as assert from "assert";

import { ContainerClient } from "../src/ContainerClient";
import { BlobServiceClient } from "../src/BlobServiceClient";
import { getAlternateBSU, getBSU, getUniqueName, wait } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("BlobServiceClient", () => {
  it("ListContainers with default parameters", async () => {
    const blobServiceClient = getBSU();
    const result = await blobServiceClient.listContainersSegment();
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(result.containerItems!.length >= 0);

    if (result.containerItems!.length > 0) {
      const container = result.containerItems![0];
      assert.ok(container.name.length > 0);
      assert.ok(container.properties.etag.length > 0);
      assert.ok(container.properties.lastModified);
    }
  });

  it("ListContainers with all parameters configured", async () => {
    const blobServiceClient = getBSU();

    const containerNamePrefix = getUniqueName("container");
    const containerName1 = `${containerNamePrefix}x1`;
    const containerName2 = `${containerNamePrefix}x2`;
    const containerClient1 = ContainerClient.fromBlobServiceClient(blobServiceClient, containerName1);
    const containerClient2 = ContainerClient.fromBlobServiceClient(blobServiceClient, containerName2);
    await containerClient1.create({ metadata: { key: "val" } });
    await containerClient2.create({ metadata: { key: "val" } });

    const result1 = await blobServiceClient.listContainersSegment(undefined, {
      include: "metadata",
      maxresults: 1,
      prefix: containerNamePrefix
    });

    assert.ok(result1.nextMarker);
    assert.equal(result1.containerItems!.length, 1);
    assert.ok(result1.containerItems![0].name.startsWith(containerNamePrefix));
    assert.ok(result1.containerItems![0].properties.etag.length > 0);
    assert.ok(result1.containerItems![0].properties.lastModified);
    assert.ok(!result1.containerItems![0].properties.leaseDuration);
    assert.ok(!result1.containerItems![0].properties.publicAccess);
    assert.deepEqual(result1.containerItems![0].properties.leaseState, "available");
    assert.deepEqual(result1.containerItems![0].properties.leaseStatus, "unlocked");
    assert.deepEqual(result1.containerItems![0].metadata!.key, "val");

    const result2 = await blobServiceClient.listContainersSegment(result1.nextMarker, {
      include: "metadata",
      maxresults: 1,
      prefix: containerNamePrefix
    });

    assert.ok(!result2.nextMarker);
    assert.equal(result2.containerItems!.length, 1);
    assert.ok(result2.containerItems![0].name.startsWith(containerNamePrefix));
    assert.ok(result2.containerItems![0].properties.etag.length > 0);
    assert.ok(result2.containerItems![0].properties.lastModified);
    assert.ok(!result2.containerItems![0].properties.leaseDuration);
    assert.ok(!result2.containerItems![0].properties.publicAccess);
    assert.deepEqual(result2.containerItems![0].properties.leaseState, "available");
    assert.deepEqual(result2.containerItems![0].properties.leaseStatus, "unlocked");
    assert.deepEqual(result2.containerItems![0].metadata!.key, "val");

    await containerClient1.delete();
    await containerClient2.delete();
  });

  it("GetProperties", async () => {
    const blobServiceClient = getBSU();
    const result = await blobServiceClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);

    if (result.cors && result.cors!.length > 0) {
      assert.ok(result.cors![0].allowedHeaders.length > 0);
      assert.ok(result.cors![0].allowedMethods.length > 0);
      assert.ok(result.cors![0].allowedOrigins.length > 0);
      assert.ok(result.cors![0].exposedHeaders.length > 0);
      assert.ok(result.cors![0].maxAgeInSeconds >= 0);
    }
  });

  it("SetProperties", async () => {
    const blobServiceClient = getBSU();

    const serviceProperties = await blobServiceClient.getProperties();

    serviceProperties.logging = {
      deleteProperty: true,
      read: true,
      retentionPolicy: {
        days: 5,
        enabled: true
      },
      version: "1.0",
      write: true
    };

    serviceProperties.minuteMetrics = {
      enabled: true,
      includeAPIs: true,
      retentionPolicy: {
        days: 4,
        enabled: true
      },
      version: "1.0"
    };

    serviceProperties.hourMetrics = {
      enabled: true,
      includeAPIs: true,
      retentionPolicy: {
        days: 3,
        enabled: true
      },
      version: "1.0"
    };

    const newCORS = {
      allowedHeaders: "*",
      allowedMethods: "GET",
      allowedOrigins: "example.com",
      exposedHeaders: "*",
      maxAgeInSeconds: 8888
    };
    if (!serviceProperties.cors) {
      serviceProperties.cors = [newCORS];
    } else if (serviceProperties.cors!.length < 5) {
      serviceProperties.cors.push(newCORS);
    }

    if (!serviceProperties.deleteRetentionPolicy) {
      serviceProperties.deleteRetentionPolicy = {
        days: 2,
        enabled: false
      };
    }

    await blobServiceClient.setProperties(serviceProperties);
    await wait(5 * 1000);

    const result = await blobServiceClient.getProperties();
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
    assert.deepEqual(result.hourMetrics, serviceProperties.hourMetrics);
  });

  it("getStatistics", (done) => {
    let blobServiceClient: BlobServiceClient | undefined;
    try {
      blobServiceClient = getAlternateBSU();
    } catch (err) {
      done();
      return;
    }

    blobServiceClient!
      .getStatistics()
      .then((result) => {
        assert.ok(result.geoReplication!.lastSyncTime);
        done();
      })
      .catch(done);
  });

  it("getAccountInfo", async () => {
    const blobServiceClient = getBSU();

    const accountInfo = await blobServiceClient.getAccountInfo();
    assert.ok(accountInfo.accountKind);
    assert.ok(accountInfo.skuName);
  });
});
