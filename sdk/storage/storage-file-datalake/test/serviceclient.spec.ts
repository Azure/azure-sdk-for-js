// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, isLiveMode, record, Recorder } from "@azure-tools/test-recorder";
import * as assert from "assert";
import * as dotenv from "dotenv";

import {
  DataLakeServiceClient,
  DataLakeServiceProperties,
  ServiceListFileSystemsSegmentResponse
} from "../src";
import {
  getDataLakeServiceClient,
  getSASConnectionStringFromEnvironment,
  getTokenDataLakeServiceClient,
  recorderEnvSetup,
  getGenericDataLakeServiceClient,
  isBrowser
} from "./utils";

dotenv.config();

describe("DataLakeServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("SetProperties and GetProperties", async () => {
    const serviceClient = getDataLakeServiceClient();
    const previousProperties = await serviceClient.getProperties();

    let serviceProperties: DataLakeServiceProperties;

    serviceProperties = {
      blobAnalyticsLogging: {
        deleteProperty: true,
        read: true,
        retentionPolicy: {
          days: 5,
          enabled: true
        },
        version: "1.0",
        write: true
      },
      minuteMetrics: {
        enabled: true,
        includeAPIs: true,
        retentionPolicy: {
          days: 4,
          enabled: true
        },
        version: "1.0"
      },
      hourMetrics: {
        enabled: true,
        includeAPIs: true,
        retentionPolicy: {
          days: 3,
          enabled: true
        },
        version: "1.0"
      },
      deleteRetentionPolicy: {
        days: 2,
        enabled: true
      }
    };

    if (!isBrowser()) {
      serviceProperties.cors = [
        {
          allowedHeaders: "*",
          allowedMethods: "GET",
          allowedOrigins: "example.com",
          exposedHeaders: "*",
          maxAgeInSeconds: 8888
        }
      ];
    }

    await serviceClient.setProperties(serviceProperties);
    await delay(5 * 1000);

    let properties = await serviceClient.getProperties();
    if (!isBrowser()) {
      assert.deepStrictEqual(serviceProperties.cors, properties.cors);
    }
    assert.deepStrictEqual(serviceProperties.blobAnalyticsLogging, properties.blobAnalyticsLogging);
    assert.deepStrictEqual(serviceProperties.hourMetrics, properties.hourMetrics);
    assert.deepStrictEqual(serviceProperties.minuteMetrics, properties.minuteMetrics);
    assert.deepStrictEqual(
      serviceProperties.deleteRetentionPolicy?.days,
      properties.deleteRetentionPolicy?.days
    );
    assert.deepStrictEqual(
      serviceProperties.deleteRetentionPolicy?.enabled,
      properties.deleteRetentionPolicy?.enabled
    );

    // Cleanup
    await serviceClient.setProperties(previousProperties);
    await delay(5 * 1000);

    properties = await serviceClient.getProperties();
    assert.deepStrictEqual(previousProperties.cors, properties.cors);
    assert.deepStrictEqual(
      previousProperties.blobAnalyticsLogging,
      properties.blobAnalyticsLogging
    );
    assert.deepStrictEqual(previousProperties.hourMetrics, properties.hourMetrics);
    assert.deepStrictEqual(previousProperties.minuteMetrics, properties.minuteMetrics);
    assert.deepStrictEqual(
      previousProperties.deleteRetentionPolicy?.days,
      properties.deleteRetentionPolicy?.days
    );
    assert.deepStrictEqual(
      previousProperties.deleteRetentionPolicy?.enabled,
      properties.deleteRetentionPolicy?.enabled
    );
  });

  it("ListFileSystems with default parameters", async () => {
    const serviceClient = getDataLakeServiceClient();
    const result = (
      await serviceClient
        .listFileSystems()
        .byPage()
        .next()
    ).value as ServiceListFileSystemsSegmentResponse;
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
    assert.ok(typeof result.clientRequestId);
    assert.ok(result.clientRequestId!.length > 0);

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(result.fileSystemItems.length >= 0);

    if (result.fileSystemItems.length > 0) {
      const filesystem = result.fileSystemItems[0];
      assert.ok(filesystem.name.length > 0);
      assert.ok(filesystem.properties.etag.length > 0);
      assert.ok(filesystem.properties.lastModified);
    }
  });

  it("ListFileSystems with default parameters - null prefix shouldn't throw error", async () => {
    const serviceClient = getDataLakeServiceClient();
    const result = (
      await serviceClient
        .listFileSystems({ prefix: "" })
        .byPage()
        .next()
    ).value;

    assert.ok(result.fileSystemItems.length >= 0);

    if (result.fileSystemItems.length > 0) {
      const filesystem = result.fileSystemItems[0];
      assert.ok(filesystem.name.length > 0);
      assert.ok(filesystem.properties.etag.length > 0);
      assert.ok(filesystem.properties.lastModified);
    }
  });

  it("ListFileSystems with all parameters configured", async () => {
    // Skip browser mock test because of account name replacement issue with recorded requests
    recorder.skip("browser");

    const serviceClient = getDataLakeServiceClient();

    const fileSystemNamePrefix = recorder.getUniqueName("filesystem1");
    const fileSystemName1 = `${fileSystemNamePrefix}x1`;
    const fileSystemName2 = `${fileSystemNamePrefix}x2`;
    const fileSystemClient1 = serviceClient.getFileSystemClient(fileSystemName1);
    const fileSystemClient2 = serviceClient.getFileSystemClient(fileSystemName2);
    await fileSystemClient1.create({ metadata: { key: "val" } });
    await fileSystemClient2.create({ metadata: { key: "val" } });

    const result1 = (
      await serviceClient
        .listFileSystems({
          includeMetadata: true,
          prefix: fileSystemNamePrefix
        })
        .byPage({ maxPageSize: 1 })
        .next()
    ).value as ServiceListFileSystemsSegmentResponse; // TODO: Why no intelligence?

    assert.ok(result1.continuationToken);
    assert.equal(result1.fileSystemItems.length, 1);
    assert.ok(result1.fileSystemItems[0].name.startsWith(fileSystemNamePrefix));
    assert.ok(result1.fileSystemItems[0].properties.etag.length > 0);
    assert.ok(result1.fileSystemItems[0].properties.lastModified);
    assert.ok(!result1.fileSystemItems[0].properties.leaseDuration);
    assert.ok(!result1.fileSystemItems[0].properties.publicAccess);
    assert.deepEqual(result1.fileSystemItems[0].properties.leaseState, "available");
    assert.deepEqual(result1.fileSystemItems[0].properties.leaseStatus, "unlocked");
    assert.deepEqual(result1.fileSystemItems[0].metadata!.key, "val");

    const result2 = (
      await serviceClient
        .listFileSystems({
          includeMetadata: true,
          prefix: fileSystemNamePrefix
        })
        .byPage({ continuationToken: result1.continuationToken, maxPageSize: 1 })
        .next()
    ).value as ServiceListFileSystemsSegmentResponse;

    assert.ok(!result2.continuationToken);
    assert.equal(result2.fileSystemItems.length, 1);
    assert.ok(result2.fileSystemItems[0].name.startsWith(fileSystemNamePrefix));
    assert.ok(result2.fileSystemItems[0].properties.etag.length > 0);
    assert.ok(result2.fileSystemItems[0].properties.lastModified);
    assert.ok(!result2.fileSystemItems[0].properties.leaseDuration);
    assert.ok(!result2.fileSystemItems[0].properties.publicAccess);
    assert.deepEqual(result2.fileSystemItems[0].properties.leaseState, "available");
    assert.deepEqual(result2.fileSystemItems[0].properties.leaseStatus, "unlocked");
    assert.deepEqual(result2.fileSystemItems[0].metadata!.key, "val");

    await fileSystemClient1.delete();
    await fileSystemClient2.delete();
  });

  it("Verify PagedAsyncIterableIterator for ListFileSystems", async () => {
    const fileSystemClients = [];
    const serviceClient = getDataLakeServiceClient();

    const fileSystemNamePrefix = recorder.getUniqueName("filesystem2");

    for (let i = 0; i < 4; i++) {
      const fileSystemName = `${fileSystemNamePrefix}x${i}`;
      const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
      await fileSystemClient.create({ metadata: { key: "val" } });
      fileSystemClients.push(fileSystemClient);
    }

    for await (const filesystem of serviceClient.listFileSystems({
      includeMetadata: true,
      prefix: fileSystemNamePrefix
    })) {
      assert.ok(filesystem.name.startsWith(fileSystemNamePrefix));
      assert.ok(filesystem.properties.etag.length > 0);
      assert.ok(filesystem.properties.lastModified);
      assert.ok(!filesystem.properties.leaseDuration);
      assert.ok(!filesystem.properties.publicAccess);
      assert.deepEqual(filesystem.properties.leaseState, "available");
      assert.deepEqual(filesystem.properties.leaseStatus, "unlocked");
      assert.deepEqual(filesystem.metadata!.key, "val");
    }

    for (const client of fileSystemClients) {
      await client.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(generator .next() syntax) for ListFileSystems", async () => {
    const serviceClient = getDataLakeServiceClient();

    const fileSystemNamePrefix = recorder.getUniqueName("filesystem3");
    const fileSystemName1 = `${fileSystemNamePrefix}x1`;
    const fileSystemName2 = `${fileSystemNamePrefix}x2`;
    const fileSystemClient1 = serviceClient.getFileSystemClient(fileSystemName1);
    const fileSystemClient2 = serviceClient.getFileSystemClient(fileSystemName2);
    await fileSystemClient1.create({ metadata: { key: "val" } });
    await fileSystemClient2.create({ metadata: { key: "val" } });

    const iterator = serviceClient.listFileSystems({
      includeMetadata: true,
      prefix: fileSystemNamePrefix
    });

    let fileSystemItem = await iterator.next();
    assert.ok(fileSystemItem.value.name.startsWith(fileSystemNamePrefix));
    assert.ok(fileSystemItem.value.properties.etag.length > 0);
    assert.ok(fileSystemItem.value.properties.lastModified);
    assert.ok(!fileSystemItem.value.properties.leaseDuration);
    assert.ok(!fileSystemItem.value.properties.publicAccess);
    assert.deepEqual(fileSystemItem.value.properties.leaseState, "available");
    assert.deepEqual(fileSystemItem.value.properties.leaseStatus, "unlocked");
    assert.deepEqual(fileSystemItem.value.metadata!.key, "val");

    fileSystemItem = await iterator.next();
    assert.ok(fileSystemItem.value.name.startsWith(fileSystemNamePrefix));
    assert.ok(fileSystemItem.value.properties.etag.length > 0);
    assert.ok(fileSystemItem.value.properties.lastModified);
    assert.ok(!fileSystemItem.value.properties.leaseDuration);
    assert.ok(!fileSystemItem.value.properties.publicAccess);
    assert.deepEqual(fileSystemItem.value.properties.leaseState, "available");
    assert.deepEqual(fileSystemItem.value.properties.leaseStatus, "unlocked");
    assert.deepEqual(fileSystemItem.value.metadata!.key, "val");

    await fileSystemClient1.delete();
    await fileSystemClient2.delete();
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for ListFileSystems", async () => {
    // Skip browser mock test because of account name replacement issue with recorded requests
    recorder.skip("browser");

    const fileSystemClients = [];
    const serviceClient = getDataLakeServiceClient();

    const fileSystemNamePrefix = recorder.getUniqueName("filesystem4");

    for (let i = 0; i < 4; i++) {
      const fileSystemName = `${fileSystemNamePrefix}x${i}`;
      const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
      await fileSystemClient.create({ metadata: { key: "val" } });
      fileSystemClients.push(fileSystemClient);
    }

    for await (const response of serviceClient
      .listFileSystems({
        includeMetadata: true,
        prefix: fileSystemNamePrefix
      })
      .byPage({ maxPageSize: 2 })) {
      for (const filesystem of response.fileSystemItems) {
        assert.ok(filesystem.name.startsWith(fileSystemNamePrefix));
        assert.ok(filesystem.properties.etag.length > 0);
        assert.ok(filesystem.properties.lastModified);
        assert.ok(!filesystem.properties.leaseDuration);
        assert.ok(!filesystem.properties.publicAccess);
        assert.deepEqual(filesystem.properties.leaseState, "available");
        assert.deepEqual(filesystem.properties.leaseStatus, "unlocked");
        assert.deepEqual(filesystem.metadata!.key, "val");
      }
    }

    for (const client of fileSystemClients) {
      await client.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for ListFileSystems", async () => {
    // Skip browser mock test because of account name replacement issue with recorded requests
    recorder.skip("browser");

    const fileSystemClients = [];
    const serviceClient = getDataLakeServiceClient();

    const fileSystemNamePrefix = recorder.getUniqueName("filesystem5");

    for (let i = 0; i < 4; i++) {
      const fileSystemName = `${fileSystemNamePrefix}x${i}`;
      const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
      await fileSystemClient.create({ metadata: { key: "val" } });
      fileSystemClients.push(fileSystemClient);
    }

    let iter = serviceClient
      .listFileSystems({
        includeMetadata: true,
        prefix: fileSystemNamePrefix
      })
      .byPage({ maxPageSize: 2 });
    let response = (await iter.next()).value;
    for (const filesystem of response.fileSystemItems) {
      assert.ok(filesystem.name.startsWith(fileSystemNamePrefix));
      assert.ok(filesystem.properties.etag.length > 0);
      assert.ok(filesystem.properties.lastModified);
      assert.ok(!filesystem.properties.leaseDuration);
      assert.ok(!filesystem.properties.publicAccess);
      assert.deepEqual(filesystem.properties.leaseState, "available");
      assert.deepEqual(filesystem.properties.leaseStatus, "unlocked");
      assert.deepEqual(filesystem.metadata!.key, "val");
    }
    // Gets next marker
    const marker = response.continuationToken;
    // Passing next marker as continuationToken
    iter = serviceClient
      .listFileSystems({
        includeMetadata: true,
        prefix: fileSystemNamePrefix
      })
      .byPage({ continuationToken: marker, maxPageSize: 2 });
    response = (await iter.next()).value;
    // Gets 2 containers
    for (const filesystem of response.fileSystemItems) {
      assert.ok(filesystem.name.startsWith(fileSystemNamePrefix));
      assert.ok(filesystem.properties.etag.length > 0);
      assert.ok(filesystem.properties.lastModified);
      assert.ok(!filesystem.properties.leaseDuration);
      assert.ok(!filesystem.properties.publicAccess);
      assert.deepEqual(filesystem.properties.leaseState, "available");
      assert.deepEqual(filesystem.properties.leaseStatus, "unlocked");
      assert.deepEqual(filesystem.metadata!.key, "val");
    }

    for (const client of fileSystemClients) {
      await client.delete();
    }
  });

  // it("createFileSystem and deleteFileSystem", async () => {
  //   const serviceClient = getDataLakeServiceClient();
  //   const fileSystemName = recorder.getUniqueName("filesystem6");
  //   const access = "filesystem";
  //   const metadata = { key: "value" };

  //   const { fileSystemClient } = await serviceClient.createFileSystem(fileSystemName, {
  //     access,
  //     metadata
  //   });
  //   const result = await fileSystemClient.getProperties();
  //   assert.deepEqual(result.blobPublicAccess, access);
  //   assert.deepEqual(result.metadata, metadata);

  //   await serviceClient.deleteFileSystem(fileSystemName);
  //   try {
  //     await fileSystemClient.getProperties();
  //     assert.fail(
  //       "Expecting an error in getting properties from a deleted block blob but didn't get one."
  //     );
  //   } catch (error) {
  //     assert.ok((error.statusCode as number) === 404);
  //   }
  // });

  it("getUserDelegationKey should work", async function() {
    // Try to get serviceURL object with TokenCredential
    // when DFS_ACCOUNT_TOKEN environment variable is set
    let serviceURLWithToken: DataLakeServiceClient | undefined;
    try {
      serviceURLWithToken = getTokenDataLakeServiceClient();
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

  it("can be created from SASConnString", async () => {
    const newClient = DataLakeServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment(),
      {
        retryOptions: {
          maxTries: 1
        }
      }
    );

    const listIter = newClient.listFileSystems();
    await listIter.next();
    assert.ok(newClient.url.includes("dfs"));
  });

  it("renameFileSystem should work", async function() {
    if (isLiveMode()) {
      // Turn on this case when the Container Rename feature is ready in the service side.
      this.skip();
    }

    const serviceClient = getDataLakeServiceClient();
    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const newFileSystemName = recorder.getUniqueName("newfilesystem");
    // const renameRes = await serviceClient.renameFileSystem(fileSystemName, newFileSystemName);
    const renameRes = await serviceClient["renameFileSystem"](fileSystemName, newFileSystemName);

    const newFileSystemClient = serviceClient.getFileSystemClient(newFileSystemName);
    assert.deepStrictEqual(newFileSystemClient, renameRes.fileSystemClient);
    await newFileSystemClient.getProperties();

    await newFileSystemClient.delete();
  });

  it("renameFileSystem should work with source lease", async function() {
    if (isLiveMode()) {
      // Turn on this case when the Container Rename feature is ready in the service side.
      this.skip();
    }

    const serviceClient = getDataLakeServiceClient();
    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const leaseClient = fileSystemClient.getDataLakeLeaseClient();
    await leaseClient.acquireLease(-1);

    const newFileSystemName = recorder.getUniqueName("newfilesystem");
    // const renameRes = await serviceClient.renameFileSystem(fileSystemName, newFileSystemName, {
    const renameRes = await serviceClient["renameFileSystem"](fileSystemName, newFileSystemName, {
      sourceCondition: { leaseId: leaseClient.leaseId }
    });

    const newFileSystemClient = serviceClient.getFileSystemClient(newFileSystemName);
    assert.deepStrictEqual(newFileSystemClient, renameRes.fileSystemClient);
    await newFileSystemClient.getProperties();

    await newFileSystemClient.delete();
  });

  it("undelete and list deleted file system should work", async function() {
    let serviceClient: DataLakeServiceClient;
    try {
      serviceClient = getGenericDataLakeServiceClient("DFS_SOFT_DELETE_");
    } catch (err) {
      this.skip();
    }

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const metadata = { a: "a" };
    await fileSystemClient.setMetadata(metadata);

    await fileSystemClient.delete();
    await delay(30 * 1000);

    let listed = false;
    for await (const fileSystemItem of serviceClient.listFileSystems({
      includeDeleted: true,
      includeMetadata: true
    })) {
      if (fileSystemItem.deleted && fileSystemItem.name === fileSystemName) {
        listed = true;
        // verify list container response
        assert.ok(fileSystemItem.versionId);
        assert.ok(fileSystemItem.deleted);
        assert.ok(fileSystemItem.properties.deletedOn);
        assert.ok(fileSystemItem.properties.remainingRetentionDays);
        assert.deepStrictEqual(fileSystemItem.metadata, metadata);

        const restoreRes = await serviceClient.undeleteFileSystem(
          fileSystemName,
          fileSystemItem.versionId!
        );
        assert.equal(restoreRes.fileSystemClient.name, fileSystemName);
        await restoreRes.fileSystemClient.delete();
        break;
      }
    }
    assert.ok(listed);
  });
});
