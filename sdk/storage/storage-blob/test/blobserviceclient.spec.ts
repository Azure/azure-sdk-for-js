import * as assert from "assert";

import * as dotenv from "dotenv";
import { BlobServiceClient } from "../src";
import {
  getAlternateBSU,
  getBSU,
  getSASConnectionStringFromEnvironment,
  getTokenBSU,
  recorderEnvSetup,
  sleep
} from "./utils";
import { record, delay, Recorder } from "@azure/test-utils-recorder";
dotenv.config();

describe("BlobServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
  });

  afterEach(async function() {
    recorder.stop();
  });

  it("ListContainers with default parameters", async () => {
    const blobServiceClient = getBSU();
    const result = (
      await blobServiceClient
        .listContainers()
        .byPage()
        .next()
    ).value;
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
    assert.ok(typeof result.clientRequestId);
    assert.ok(result.clientRequestId!.length > 0);

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(result.containerItems!.length >= 0);

    if (result.containerItems!.length > 0) {
      const container = result.containerItems![0];
      assert.ok(container.name.length > 0);
      assert.ok(container.properties.etag.length > 0);
      assert.ok(container.properties.lastModified);
    }
  });

  it("ListContainers with default parameters - null prefix shouldn't throw error", async () => {
    const blobServiceClient = getBSU();
    const result = (
      await blobServiceClient
        .listContainers({ prefix: "" })
        .byPage()
        .next()
    ).value;

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

    const containerNamePrefix = recorder.getUniqueName("container");
    const containerName1 = `${containerNamePrefix}x1`;
    const containerName2 = `${containerNamePrefix}x2`;
    const containerClient1 = blobServiceClient.getContainerClient(containerName1);
    const containerClient2 = blobServiceClient.getContainerClient(containerName2);
    await containerClient1.create({ metadata: { key: "val" } });
    await containerClient2.create({ metadata: { key: "val" } });

    const result1 = (
      await blobServiceClient
        .listContainers({
          includeMetadata: true,
          prefix: containerNamePrefix
        })
        .byPage({ maxPageSize: 1 })
        .next()
    ).value;

    assert.ok(result1.continuationToken);
    assert.equal(result1.containerItems!.length, 1);
    assert.ok(result1.containerItems![0].name.startsWith(containerNamePrefix));
    assert.ok(result1.containerItems![0].properties.etag.length > 0);
    assert.ok(result1.containerItems![0].properties.lastModified);
    assert.ok(!result1.containerItems![0].properties.leaseDuration);
    assert.ok(!result1.containerItems![0].properties.publicAccess);
    assert.deepEqual(result1.containerItems![0].properties.leaseState, "available");
    assert.deepEqual(result1.containerItems![0].properties.leaseStatus, "unlocked");
    assert.deepEqual(result1.containerItems![0].metadata!.key, "val");

    const result2 = (
      await blobServiceClient
        .listContainers({
          includeMetadata: true,
          prefix: containerNamePrefix
        })
        .byPage({ continuationToken: result1.continuationToken, maxPageSize: 1 })
        .next()
    ).value;

    assert.ok(!result2.continuationToken);
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

  it("Verify PagedAsyncIterableIterator for ListContainers", async () => {
    const containerClients = [];
    const blobServiceClient = getBSU();

    const containerNamePrefix = recorder.getUniqueName("container");

    for (let i = 0; i < 4; i++) {
      const containerName = `${containerNamePrefix}x${i}`;
      const containerClient = blobServiceClient.getContainerClient(containerName);
      await containerClient.create({ metadata: { key: "val" } });
      containerClients.push(containerClient);
    }

    for await (const container of blobServiceClient.listContainers({
      includeMetadata: true,
      prefix: containerNamePrefix
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

  it("Verify PagedAsyncIterableIterator(generator .next() syntax) for ListContainers", async () => {
    const blobServiceClient = getBSU();

    const containerNamePrefix = recorder.getUniqueName("container");
    const containerName1 = `${containerNamePrefix}x1`;
    const containerName2 = `${containerNamePrefix}x2`;
    const containerClient1 = blobServiceClient.getContainerClient(containerName1);
    const containerClient2 = blobServiceClient.getContainerClient(containerName2);
    await containerClient1.create({ metadata: { key: "val" } });
    await containerClient2.create({ metadata: { key: "val" } });

    const iterator = await blobServiceClient.listContainers({
      includeMetadata: true,
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

  it("Verify PagedAsyncIterableIterator(byPage()) for ListContainers", async () => {
    const containerClients = [];
    const blobServiceClient = getBSU();

    const containerNamePrefix = recorder.getUniqueName("container");

    for (let i = 0; i < 4; i++) {
      const containerName = `${containerNamePrefix}x${i}`;
      const containerClient = blobServiceClient.getContainerClient(containerName);
      await containerClient.create({ metadata: { key: "val" } });
      containerClients.push(containerClient);
    }

    for await (const response of blobServiceClient
      .listContainers({
        includeMetadata: true,
        prefix: containerNamePrefix
      })
      .byPage({ maxPageSize: 2 })) {
      for (const container of response.containerItems) {
        assert.ok(container.name.startsWith(containerNamePrefix));
        assert.ok(container.properties.etag.length > 0);
        assert.ok(container.properties.lastModified);
        assert.ok(!container.properties.leaseDuration);
        assert.ok(!container.properties.publicAccess);
        assert.deepEqual(container.properties.leaseState, "available");
        assert.deepEqual(container.properties.leaseStatus, "unlocked");
        assert.deepEqual(container.metadata!.key, "val");
      }
    }

    for (const client of containerClients) {
      await client.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for ListContainers", async () => {
    const containerClients = [];
    const blobServiceClient = getBSU();

    const containerNamePrefix = recorder.getUniqueName("container");

    for (let i = 0; i < 4; i++) {
      const containerName = `${containerNamePrefix}x${i}`;
      const containerClient = blobServiceClient.getContainerClient(containerName);
      await containerClient.create({ metadata: { key: "val" } });
      containerClients.push(containerClient);
    }

    let iter = blobServiceClient
      .listContainers({
        includeMetadata: true,
        prefix: containerNamePrefix
      })
      .byPage({ maxPageSize: 2 });
    let response = (await iter.next()).value;
    for (const container of response.containerItems) {
      assert.ok(container.name.startsWith(containerNamePrefix));
      assert.ok(container.properties.etag.length > 0);
      assert.ok(container.properties.lastModified);
      assert.ok(!container.properties.leaseDuration);
      assert.ok(!container.properties.publicAccess);
      assert.deepEqual(container.properties.leaseState, "available");
      assert.deepEqual(container.properties.leaseStatus, "unlocked");
      assert.deepEqual(container.metadata!.key, "val");
    }
    // Gets next marker
    const marker = response.continuationToken;
    // Passing next marker as continuationToken
    iter = blobServiceClient
      .listContainers({
        includeMetadata: true,
        prefix: containerNamePrefix
      })
      .byPage({ continuationToken: marker, maxPageSize: 2 });
    response = (await iter.next()).value;
    // Gets 2 containers
    for (const container of response.containerItems) {
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
    assert.ok(typeof result.clientRequestId);
    assert.ok(result.clientRequestId!.length > 0);

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

    serviceProperties.blobAnalyticsLogging = {
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
    await delay(5 * 1000);

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
        assert.ok(result.geoReplication!.lastSyncOn);
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
    const containerName = recorder.getUniqueName("container");
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

  it("can be created from a sas connection string", async () => {
    const newClient = BlobServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment()
    );

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("getUserDelegationKey should work", async function() {
    // Try to get serviceURL object with TokenCredential
    // when ACCOUNT_TOKEN environment variable is set
    let serviceURLWithToken: BlobServiceClient | undefined;
    try {
      serviceURLWithToken = getTokenBSU();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (serviceURLWithToken === undefined) {
      this.skip();
    }

    const now = recorder.newDate("now");
    now.setHours(now.getHours() + 1);
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 1);
    const response = await serviceURLWithToken!.getUserDelegationKey(now, tmr);
    assert.notDeepStrictEqual(response.value, undefined);
    assert.notDeepStrictEqual(response.signedVersion, undefined);
    assert.notDeepStrictEqual(response.signedTenantId, undefined);
    assert.notDeepStrictEqual(response.signedStartsOn, undefined);
    assert.notDeepStrictEqual(response.signedService, undefined);
    assert.notDeepStrictEqual(response.signedObjectId, undefined);
    assert.notDeepStrictEqual(response.signedExpiresOn, undefined);
  });

  it.only("Find blob by tags should work", async () => {
    const blobServiceClient = getBSU();

    const containerName = recorder.getUniqueName("container1");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const key1 = recorder.getUniqueName("key");
    const key2 = recorder.getUniqueName("key2");

    const blobName1 = recorder.getUniqueName("blobname1");
    const appendBlobClient1 = containerClient.getAppendBlobClient(blobName1);
    const tags1 = {
      blobTagSet: [
        { key: key1, value: recorder.getUniqueName("val1") },
        { key: key2, value: "default" }
      ]
    };
    await appendBlobClient1.create({ tags: tags1 });

    const blobName2 = recorder.getUniqueName("blobname2");
    const appendBlobClient2 = containerClient.getAppendBlobClient(blobName2);
    const tags2 = {
      blobTagSet: [
        { key: key1, value: recorder.getUniqueName("val2") },
        { key: key2, value: "default" }
      ]
    };
    await appendBlobClient2.create({ tags: tags2 });

    const blobName3 = recorder.getUniqueName("blobname3");
    const appendBlobClient3 = containerClient.getAppendBlobClient(blobName3);
    const tags3 = {
      blobTagSet: [
        { key: key1, value: recorder.getUniqueName("val3") },
        { key: key2, value: "default" }
      ]
    };
    await appendBlobClient3.create({ tags: tags3 });

    // Wait for indexing tags
    await sleep(2);

    for await (const blob of blobServiceClient.findBlobsByTags(
      `${tags1.blobTagSet[0].key}='${tags1.blobTagSet[0].value}'`
    )) {
      assert.deepStrictEqual(blob.containerName, containerName);
      assert.deepStrictEqual(blob.name, blobName1);
      assert.deepStrictEqual(blob.tagValue, tags1.blobTagSet[0].value);
    }

    const blobs = [];
    for await (const segment of blobServiceClient
      .findBlobsByTags(`${tags2.blobTagSet[0].key}='${tags2.blobTagSet[0].value}'`)
      .byPage()) {
      for (const blob of segment.blobs) {
        blobs.push(blob);
      }
    }
    assert.deepStrictEqual(blobs.length, 1);
    assert.deepStrictEqual(blobs[0].containerName, containerName);
    assert.deepStrictEqual(blobs[0].name, blobName2);
    assert.deepStrictEqual(blobs[0].tagValue, tags2.blobTagSet[0].value);

    const blobsWithTag2 = [];
    for await (const segment of blobServiceClient.findBlobsByTags(`${key2}='default'`).byPage({
      maxPageSize: 1
    })) {
      assert.ok(segment.blobs.length <= 1);
      for (const blob of segment.blobs) {
        blobsWithTag2.push(blob);
      }
    }
    assert.deepStrictEqual(blobsWithTag2.length, 3);

    await containerClient.delete();
  });
});
