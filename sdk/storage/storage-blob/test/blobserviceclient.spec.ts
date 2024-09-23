// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";

import { BlobServiceClient } from "../src";
import {
  configureBlobStorageClient,
  getAlternateBSU,
  getBSU,
  getGenericBSU,
  getSASConnectionStringFromEnvironment,
  getTokenBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "./utils";
import { delay, Recorder, isLiveMode } from "@azure-tools/test-recorder";
import { getYieldedValue } from "@azure-tools/test-utils";
import { Tags } from "../src/models";
import { Context } from "mocha";

describe("BlobServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("ListContainers with default parameters", async function () {
    const blobServiceClient = getBSU(recorder);
    const result = (await blobServiceClient.listContainers().byPage().next()).value;
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

  // needs feature enabled to record test
  it.skip("ListContainers including system containers", async function (this: Context) {
    if (isLiveMode()) {
      // Skip the test case until the feature is enabled in production.
      this.skip();
    }
    const blobServiceClient = getBSU(recorder);
    const result = (await blobServiceClient.listContainers({ includeSystem: true }).byPage().next())
      .value;
    assert.ok(result.containerItems!.length > 0);

    let foundSystemContainer = false;
    for (const containerItem of result.containerItems) {
      if (containerItem.name === "$root") {
        foundSystemContainer = true;
        break;
      }
    }

    assert.ok(foundSystemContainer, "System containers should be included in listing result");
  });

  it("ListContainers with default parameters - null prefix shouldn't throw error", async () => {
    const blobServiceClient = getBSU(recorder);
    const result = (await blobServiceClient.listContainers({ prefix: "" }).byPage().next()).value;

    assert.ok(result.containerItems!.length >= 0);

    if (result.containerItems!.length > 0) {
      const container = result.containerItems![0];
      assert.ok(container.name.length > 0);
      assert.ok(container.properties.etag.length > 0);
      assert.ok(container.properties.lastModified);
    }
  });

  it("ListContainers with all parameters configured", async function () {
    const blobServiceClient = getBSU(recorder);

    const containerNamePrefix = recorder.variable("container", getUniqueName("container"));
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
          prefix: containerNamePrefix,
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
          prefix: containerNamePrefix,
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

  it("Verify PagedAsyncIterableIterator for ListContainers", async function () {
    const containerClients = [];
    const blobServiceClient = getBSU(recorder);

    const containerNamePrefix = recorder.variable("container", getUniqueName("container"));

    for (let i = 0; i < 4; i++) {
      const containerName = `${containerNamePrefix}x${i}`;
      const containerClient = blobServiceClient.getContainerClient(containerName);
      await containerClient.create({ metadata: { key: "val" } });
      containerClients.push(containerClient);
    }

    for await (const container of blobServiceClient.listContainers({
      includeMetadata: true,
      prefix: containerNamePrefix,
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
    const blobServiceClient = getBSU(recorder);

    const containerNamePrefix = recorder.variable("container", getUniqueName("container"));
    const containerName1 = `${containerNamePrefix}x1`;
    const containerName2 = `${containerNamePrefix}x2`;
    const containerClient1 = blobServiceClient.getContainerClient(containerName1);
    const containerClient2 = blobServiceClient.getContainerClient(containerName2);
    await containerClient1.create({ metadata: { key: "val" } });
    await containerClient2.create({ metadata: { key: "val" } });

    const iterator = blobServiceClient.listContainers({
      includeMetadata: true,
      prefix: containerNamePrefix,
    });

    let containerItem = getYieldedValue(await iterator.next());
    assert.ok(containerItem.name.startsWith(containerNamePrefix));
    assert.ok(containerItem.properties.etag.length > 0);
    assert.ok(containerItem.properties.lastModified);
    assert.ok(!containerItem.properties.leaseDuration);
    assert.ok(!containerItem.properties.publicAccess);
    assert.deepEqual(containerItem.properties.leaseState, "available");
    assert.deepEqual(containerItem.properties.leaseStatus, "unlocked");
    assert.deepEqual(containerItem.metadata!.key, "val");

    containerItem = getYieldedValue(await iterator.next());
    assert.ok(containerItem.name.startsWith(containerNamePrefix));
    assert.ok(containerItem.properties.etag.length > 0);
    assert.ok(containerItem.properties.lastModified);
    assert.ok(!containerItem.properties.leaseDuration);
    assert.ok(!containerItem.properties.publicAccess);
    assert.deepEqual(containerItem.properties.leaseState, "available");
    assert.deepEqual(containerItem.properties.leaseStatus, "unlocked");
    assert.deepEqual(containerItem.metadata!.key, "val");

    await containerClient1.delete();
    await containerClient2.delete();
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for ListContainers", async () => {
    const containerClients = [];
    const blobServiceClient = getBSU(recorder);

    const containerNamePrefix = recorder.variable("container", getUniqueName("container"));

    for (let i = 0; i < 4; i++) {
      const containerName = `${containerNamePrefix}x${i}`;
      const containerClient = blobServiceClient.getContainerClient(containerName);
      await containerClient.create({ metadata: { key: "val" } });
      containerClients.push(containerClient);
    }

    for await (const response of blobServiceClient
      .listContainers({
        includeMetadata: true,
        prefix: containerNamePrefix,
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
    const blobServiceClient = getBSU(recorder);

    const containerNamePrefix = recorder.variable("container", getUniqueName("container"));

    for (let i = 0; i < 4; i++) {
      const containerName = `${containerNamePrefix}x${i}`;
      const containerClient = blobServiceClient.getContainerClient(containerName);
      await containerClient.create({ metadata: { key: "val" } });
      containerClients.push(containerClient);
    }

    let iter = blobServiceClient
      .listContainers({
        includeMetadata: true,
        prefix: containerNamePrefix,
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
        prefix: containerNamePrefix,
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

  it("GetProperties", async function () {
    const blobServiceClient = getBSU(recorder);
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

  it("SetProperties", async function () {
    const blobServiceClient = getBSU(recorder);

    const serviceProperties = await blobServiceClient.getProperties();

    serviceProperties.blobAnalyticsLogging = {
      deleteProperty: true,
      read: true,
      retentionPolicy: {
        days: 5,
        enabled: true,
      },
      version: "1.0",
      write: true,
    };

    serviceProperties.minuteMetrics = {
      enabled: true,
      includeAPIs: true,
      retentionPolicy: {
        days: 4,
        enabled: true,
      },
      version: "1.0",
    };

    serviceProperties.hourMetrics = {
      enabled: true,
      includeAPIs: true,
      retentionPolicy: {
        days: 3,
        enabled: true,
      },
      version: "1.0",
    };

    const newCORS = {
      allowedHeaders: "*",
      allowedMethods: "GET",
      allowedOrigins: "example.com",
      exposedHeaders: "*",
      maxAgeInSeconds: 8888,
    };
    if (!serviceProperties.cors) {
      serviceProperties.cors = [newCORS];
    } else if (serviceProperties.cors!.length < 5) {
      serviceProperties.cors.push(newCORS);
    }

    if (!serviceProperties.deleteRetentionPolicy) {
      serviceProperties.deleteRetentionPolicy = {
        days: 2,
        enabled: false,
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
      blobServiceClient = getAlternateBSU(recorder);
    } catch (err: any) {
      done();
      return;
    }

    blobServiceClient!
      .getStatistics()
      .then((result) => {
        assert.ok(result.geoReplication!.lastSyncOn);
        done();
        return;
      })
      .catch(done);
  });

  it("getAccountInfo", async function () {
    const blobServiceClient = getBSU(recorder);

    const accountInfo = await blobServiceClient.getAccountInfo();
    assert.ok(accountInfo.accountKind);
    assert.ok(accountInfo.skuName);
    assert.deepStrictEqual(accountInfo.isHierarchicalNamespaceEnabled, false);
  });

  it("createContainer and deleteContainer", async function () {
    const blobServiceClient = getBSU(recorder);
    const containerName = recorder.variable("container", getUniqueName("container"));
    const access = "container";
    const metadata = { key: "value" };

    const { containerClient } = await blobServiceClient.createContainer(containerName, {
      access,
      metadata,
    });
    const result = await containerClient.getProperties();
    assert.deepEqual(result.blobPublicAccess, access);
    assert.deepEqual(result.metadata, metadata);

    await blobServiceClient.deleteContainer(containerName);
    try {
      await containerClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      assert.ok((error.statusCode as number) === 404);
    }
  });

  it("can be created from a sas connection string", async function () {
    const newClient = BlobServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment(recorder),
    );
    configureBlobStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("getUserDelegationKey should work", async function (this: Context) {
    // Try to get serviceURL object with TokenCredential
    // when ACCOUNT_TOKEN environment variable is set
    let serviceURLWithToken: BlobServiceClient;
    try {
      serviceURLWithToken = getTokenBSU(recorder);
    } catch {
      // Requires bearer token for this case which cannot be generated in the runtime
      // Make sure this case passed in sanity test
      this.skip();
    }
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() + 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const response = await serviceURLWithToken.getUserDelegationKey(now, tmr);
    assert.notDeepEqual(response.value, undefined);
    assert.notDeepEqual(response.signedVersion, undefined);
    assert.notDeepEqual(response.signedTenantId, undefined);
    assert.notDeepEqual(response.signedStartsOn, undefined);
    assert.notDeepEqual(response.signedService, undefined);
    assert.notDeepEqual(response.signedObjectId, undefined);
    assert.notDeepEqual(response.signedExpiresOn, undefined);
  });

  it("Find blob by tags should work", async function () {
    const blobServiceClient = getBSU(recorder);

    const containerName = recorder.variable("container1", getUniqueName("container1"));
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const key1 = recorder.variable("key", getUniqueName("key"));
    const key2 = recorder.variable("key2", getUniqueName("key2"));

    const blobName1 = recorder.variable("blobname1", getUniqueName("blobname1"));
    const appendBlobClient1 = containerClient.getAppendBlobClient(blobName1);
    const tags1: Tags = {};
    tags1[key1] = recorder.variable("val1", getUniqueName("val1"));
    tags1[key2] = "default";
    await appendBlobClient1.create({ tags: tags1 });

    const blobName2 = recorder.variable("blobname2", getUniqueName("blobname2"));
    const appendBlobClient2 = containerClient.getAppendBlobClient(blobName2);
    const tags2: Tags = {};
    tags2[key1] = recorder.variable("val2", getUniqueName("val2"));
    tags2[key2] = "default";
    await appendBlobClient2.create({ tags: tags2 });

    const blobName3 = recorder.variable("blobname3", getUniqueName("blobname3"));
    const appendBlobClient3 = containerClient.getAppendBlobClient(blobName3);
    const tags3: Tags = {};
    tags3[key1] = recorder.variable("val3", getUniqueName("val3"));
    tags3[key2] = "default";
    await appendBlobClient3.create({ tags: tags3 });

    // Wait for indexing tags
    await delay(2 * 1000);

    const expectedTags1: Tags = {};
    expectedTags1[key1] = tags1[key1];
    for await (const blob of blobServiceClient.findBlobsByTags(`${key1}='${tags1[key1]}'`)) {
      assert.deepStrictEqual(blob.containerName, containerName);
      assert.deepStrictEqual(blob.name, blobName1);
      assert.deepStrictEqual(blob.tags, expectedTags1);
      assert.deepStrictEqual(blob.tagValue, tags1[key1]);
    }

    const expectedTags2: Tags = {};
    expectedTags2[key1] = tags2[key1];
    const blobs = [];
    for await (const blob of blobServiceClient.findBlobsByTags(`${key1}='${tags2[key1]}'`)) {
      blobs.push(blob);
    }
    assert.deepStrictEqual(blobs.length, 1);
    assert.deepStrictEqual(blobs[0].containerName, containerName);
    assert.deepStrictEqual(blobs[0].name, blobName2);
    assert.deepStrictEqual(blobs[0].tags, expectedTags2);
    assert.deepStrictEqual(blobs[0].tagValue, tags2[key1]);

    const blobsWithTag2 = [];
    for await (const segment of blobServiceClient.findBlobsByTags(`${key2}='default'`).byPage({
      maxPageSize: 1,
    })) {
      assert.ok(segment.blobs.length <= 1);
      for (const blob of segment.blobs) {
        blobsWithTag2.push(blob);
      }
    }
    assert.deepStrictEqual(blobsWithTag2.length, 3);

    for await (const blob of blobServiceClient.findBlobsByTags(
      `@container='${containerName}' AND ${key1}='${tags1[key1]}' AND ${key2}='default'`,
    )) {
      assert.deepStrictEqual(blob.containerName, containerName);
      assert.deepStrictEqual(blob.name, blobName1);
      assert.deepStrictEqual(blob.tags, tags1);
      assert.deepStrictEqual(blob.tagValue, "");
    }

    await containerClient.delete();
  });

  it("verify custom endpoint without valid accountName", async function () {
    const newClient = new BlobServiceClient(`https://customdomain.com`);
    assert.equal(newClient.accountName, "", "Account name is not the same as expected.");
  });

  it("setProperties for static website", async function () {
    const errorDocument404Path = "error/404.html";
    const defaultIndexDocumentPath = "index.html";

    const blobServiceClient = getBSU(recorder);
    await blobServiceClient.setProperties({
      staticWebsite: {
        enabled: true,
        errorDocument404Path,
        defaultIndexDocumentPath,
      },
    });

    const staticWebsite = (await blobServiceClient.getProperties()).staticWebsite;
    assert.ok(staticWebsite?.enabled);
    assert.equal(staticWebsite?.errorDocument404Path, errorDocument404Path);
    assert.equal(staticWebsite?.defaultIndexDocumentPath, defaultIndexDocumentPath);
  });

  it("restore container", async function (this: Context) {
    let blobServiceClient: BlobServiceClient;
    try {
      blobServiceClient = getGenericBSU(recorder, "SOFT_DELETE_");
    } catch (err: any) {
      this.skip();
    }

    const containerName = recorder.variable("container", getUniqueName("container"));
    const containerClient = blobServiceClient.getContainerClient(containerName);

    await containerClient.create();
    await containerClient.delete();

    await delay(30 * 1000);

    let listed = false;
    for await (const containerItem of blobServiceClient.listContainers({ includeDeleted: true })) {
      if (containerItem.deleted && containerItem.name === containerName) {
        listed = true;
        // check list container response
        assert.ok(containerItem.version);
        assert.ok(containerItem.properties.deletedOn);
        assert.ok(containerItem.properties.remainingRetentionDays);

        const restoreRes = await blobServiceClient.undeleteContainer(
          containerName,
          containerItem.version!,
        );
        assert.equal(restoreRes.containerClient.containerName, containerName);
        await restoreRes.containerClient.delete();
        break;
      }
    }
    assert.ok(listed);
  });

  // need feature to record test
  it.skip("rename container", async function (this: Context) {
    if (isLiveMode()) {
      // Turn on this case when the Container Rename feature is ready in the service side.
      this.skip();
    }

    const blobServiceClient = getBSU(recorder);

    const containerName = recorder.variable("container", getUniqueName("container"));
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const newContainerName = recorder.variable("newcontainer", getUniqueName("newcontainer"));
    // const renameRes = await blobServiceClient.renameContainer(containerName, newContainerName);
    const renameRes = await blobServiceClient["renameContainer"](containerName, newContainerName);

    const newContainerClient = blobServiceClient.getContainerClient(newContainerName);
    assert.deepStrictEqual(renameRes.containerClient, newContainerClient);
    await newContainerClient.getProperties();

    // clean up
    await newContainerClient.delete();
  });

  // need feature to record test
  it.skip("rename container should work with source lease", async function (this: Context) {
    if (isLiveMode()) {
      // Turn on this case when the Container Rename feature is ready in the service side.
      this.skip();
    }

    const blobServiceClient = getBSU(recorder);

    const containerName = recorder.variable("container", getUniqueName("container"));
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();

    const leaseClient = containerClient.getBlobLeaseClient();
    await leaseClient.acquireLease(-1);

    const newContainerName = recorder.variable("newcontainer", getUniqueName("newcontainer"));

    // const renameRes = await blobServiceClient.renameContainer(containerName, newContainerName, {
    const renameRes = await blobServiceClient["renameContainer"](containerName, newContainerName, {
      sourceCondition: { leaseId: leaseClient.leaseId },
    });

    const newContainerClient = blobServiceClient.getContainerClient(newContainerName);
    assert.deepStrictEqual(renameRes.containerClient, newContainerClient);
    await newContainerClient.getProperties();

    // clean up
    await newContainerClient.delete();
  });
});
