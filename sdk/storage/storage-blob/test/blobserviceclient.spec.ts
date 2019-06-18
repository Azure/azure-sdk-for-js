import * as assert from "assert";

import * as dotenv from "dotenv";
import { newPipeline, SharedKeyCredential } from "../src";
import { BlobServiceClient } from "../src/BlobServiceClient";
import {
  getAlternateBSU,
  getBSU,
  getConnectionStringFromEnvironment,
  getUniqueName,
  wait
} from "./utils";
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
    const containerClient1 = blobServiceClient.createContainerClient(containerName1);
    const containerClient2 = blobServiceClient.createContainerClient(containerName2);
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

  it("Verify AsyncIterator(generator .next() syntax) for ListContainers", async () => {
    const blobServiceClient = getBSU();

    const containerNamePrefix = getUniqueName("container");
    const containerName1 = `${containerNamePrefix}x1`;
    const containerName2 = `${containerNamePrefix}x2`;
    const containerClient1 = blobServiceClient.createContainerClient(containerName1);
    const containerClient2 = blobServiceClient.createContainerClient(containerName2);
    await containerClient1.create({ metadata: { key: "val" } });
    await containerClient2.create({ metadata: { key: "val" } });

    const iterator = await blobServiceClient.listContainers({
      include: "metadata",
      prefix: containerNamePrefix
    });

    let containerItem = await iterator.next();
    assert.ok(containerItem.value.name.startsWith(containerNamePrefix));
    assert.ok(containerItem.value.properties.etag.length > 0);
    assert.ok(containerItem.value.properties.lastModified);
    assert.ok(!containerItem.value.properties.leaseDuration);
    assert.ok(!containerItem.value.properties.publicAccess);
    assert.deepEqual(containerItem.value.properties.leaseState, "available");
    assert.deepEqual(containerItem.value.properties.leaseStatus, "unlocked");
    assert.deepEqual(containerItem.value.metadata!.key, "val");

    containerItem = await iterator.next();
    assert.ok(containerItem.value.name.startsWith(containerNamePrefix));
    assert.ok(containerItem.value.properties.etag.length > 0);
    assert.ok(containerItem.value.properties.lastModified);
    assert.ok(!containerItem.value.properties.leaseDuration);
    assert.ok(!containerItem.value.properties.publicAccess);
    assert.deepEqual(containerItem.value.properties.leaseState, "available");
    assert.deepEqual(containerItem.value.properties.leaseStatus, "unlocked");
    assert.deepEqual(containerItem.value.metadata!.key, "val");

    await containerClient1.delete();
    await containerClient2.delete();
  });

  it("Verify AsyncIterator(for-loop syntax) for ListContainers", async () => {
    const containerClients = [];
    const blobServiceClient = getBSU();

    const containerNamePrefix = getUniqueName("container");

    for (let i = 0; i < 4; i++) {
      const containerName = `${containerNamePrefix}x${i}`;
      const containerClient = blobServiceClient.createContainerClient(containerName);
      await containerClient.create({ metadata: { key: "val" } });
      containerClients.push(containerClient);
    }

    for await (const container of blobServiceClient.listContainers({
      include: "metadata",
      prefix: containerNamePrefix,
      maxresults: 2
    })) {
      assert.ok(container.name.startsWith(containerNamePrefix));
      assert.ok(container.properties.etag.length > 0);
      assert.ok(container.properties.lastModified);
      assert.ok(!container.properties.leaseDuration);
      assert.ok(!container.properties.publicAccess);
      assert.deepEqual(container.properties.leaseState, "available");
      assert.deepEqual(container.properties.leaseStatus, "unlocked");
      assert.deepEqual(container.metadata!.key, "val");
    }

    for (const client of containerClients) {
      await client.delete();
    }
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

  it("createContainer and deleteContainer", async () => {
    const blobServiceClient = getBSU();
    const containerName = getUniqueName("container");
    const access = "container";
    const metadata = { key: "value" };

    const { containerClient } = await blobServiceClient.createContainer(containerName, {
      access,
      metadata
    });
    const result = await containerClient.getProperties();
    assert.deepEqual(result.blobPublicAccess, access);
    assert.deepEqual(result.metadata, metadata);

    await blobServiceClient.deleteContainer(containerName);
    try {
      await containerClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one."
      );
    } catch (error) {
      assert.ok((error.statusCode as number) === 404);
    }
  });

  it("can be created with a url and a credential", async () => {
    const serviceClient = getBSU();
    const factories = serviceClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new BlobServiceClient(serviceClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const serviceClient = getBSU();
    const factories = serviceClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new BlobServiceClient(serviceClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a pipeline", async () => {
    const serviceClient = getBSU();
    const factories = serviceClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new BlobServiceClient(serviceClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created from a connection string", async () => {
    const newClient = BlobServiceClient.fromConnectionString(getConnectionStringFromEnvironment());

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });
});
