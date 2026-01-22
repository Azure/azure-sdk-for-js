// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay, Recorder } from "@azure-tools/test-recorder";
import type {
  DataLakeServiceProperties,
  ServiceListFileSystemsSegmentResponse,
} from "@azure/storage-file-datalake";
import { DataLakeServiceClient, getDataLakeServiceAccountAudience } from "@azure/storage-file-datalake";
import { configureStorageClient } from "../../utils/recorder.js";
import { createDataLakeServiceClient } from "../../utils/node/clients.js";
import { getDfsStorageConnectionString } from "../../utils/injectables.js";
import { getUniqueName } from "../../utils/testHelpers.js";
import { SimpleTokenCredential } from "../../utils/simpleToken.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("DataLakeServiceClient", () => {
  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    serviceClient = await createDataLakeServiceClient("TokenCredential", { recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("DataLakeServiceClient default audience should work", async () => {
    const datalakeServiceClientWithOAuthToken = new DataLakeServiceClient(
      serviceClient.url,
      createTestCredential(),
    );
    configureStorageClient(recorder, datalakeServiceClientWithOAuthToken);
    await datalakeServiceClientWithOAuthToken.getProperties();
  });

  it("DataLakeServiceClient customized audience should work", async () => {
    const datalakeServiceClientWithOAuthToken = new DataLakeServiceClient(
      serviceClient.url,
      createTestCredential(),
      { audience: getDataLakeServiceAccountAudience(serviceClient.accountName) },
    );
    configureStorageClient(recorder, datalakeServiceClientWithOAuthToken);
    await datalakeServiceClientWithOAuthToken.getProperties();
  });

  it("DataLakeServiceClient bearer token challenge should work", async () => {
    // Validate that bad audience should fail first.
    const authToken = await createTestCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default",
    );

    assert.isNotNull(authToken);
    const datalakeServiceClientWithPlainOAuthToken = new DataLakeServiceClient(
      serviceClient.url,
      new SimpleTokenCredential(authToken!.token),
    );
    configureStorageClient(recorder, datalakeServiceClientWithPlainOAuthToken);

    try {
      await datalakeServiceClientWithPlainOAuthToken.getProperties();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const datalakeServiceClientWithOAuthToken = new DataLakeServiceClient(
      serviceClient.url,
      createTestCredential(),
      { audience: "https://badaudience.dfs.core.windows.net/.default" },
    );
    configureStorageClient(recorder, datalakeServiceClientWithOAuthToken);
    await datalakeServiceClientWithOAuthToken.getProperties();
  });

  it("can be created from AccountConnString", async () => {
    const connectionString = getDfsStorageConnectionString();
    if (!connectionString) {
      console.log("Skipping test: connection string not available");
      return;
    }
    const newClient = DataLakeServiceClient.fromConnectionString(connectionString, {
      retryOptions: {
        maxTries: 1,
      },
    });
    configureStorageClient(recorder, newClient);

    const listIter = newClient.listFileSystems();
    await listIter.next();
    assert.include(newClient.url, "dfs");
  });

  it("SetProperties and GetProperties with CORS", async () => {
    const previousProperties = await serviceClient.getProperties();

    const serviceProperties: DataLakeServiceProperties = {
      blobAnalyticsLogging: {
        deleteProperty: true,
        read: true,
        retentionPolicy: {
          days: 5,
          enabled: true,
        },
        version: "1.0",
        write: true,
      },
      minuteMetrics: {
        enabled: true,
        includeAPIs: true,
        retentionPolicy: {
          days: 4,
          enabled: true,
        },
        version: "1.0",
      },
      hourMetrics: {
        enabled: true,
        includeAPIs: true,
        retentionPolicy: {
          days: 3,
          enabled: true,
        },
        version: "1.0",
      },
      deleteRetentionPolicy: {
        days: 2,
        enabled: true,
      },
      cors: [
        {
          allowedHeaders: "*",
          allowedMethods: "GET",
          allowedOrigins: "example.com",
          exposedHeaders: "*",
          maxAgeInSeconds: 8888,
        },
      ],
    };

    await serviceClient.setProperties(serviceProperties);
    await delay(5 * 1000);

    let properties = await serviceClient.getProperties();
    assert.deepStrictEqual(serviceProperties.cors, properties.cors);
    assert.deepStrictEqual(serviceProperties.blobAnalyticsLogging, properties.blobAnalyticsLogging);
    assert.deepStrictEqual(serviceProperties.hourMetrics, properties.hourMetrics);
    assert.deepStrictEqual(serviceProperties.minuteMetrics, properties.minuteMetrics);
    assert.deepStrictEqual(
      serviceProperties.deleteRetentionPolicy?.days,
      properties.deleteRetentionPolicy?.days,
    );
    assert.deepStrictEqual(
      serviceProperties.deleteRetentionPolicy?.enabled,
      properties.deleteRetentionPolicy?.enabled,
    );

    // Cleanup
    await serviceClient.setProperties(previousProperties);
    await delay(5 * 1000);

    properties = await serviceClient.getProperties();
    assert.deepStrictEqual(previousProperties.cors, properties.cors);
    assert.deepStrictEqual(
      previousProperties.blobAnalyticsLogging,
      properties.blobAnalyticsLogging,
    );
    assert.deepStrictEqual(previousProperties.hourMetrics, properties.hourMetrics);
    assert.deepStrictEqual(previousProperties.minuteMetrics, properties.minuteMetrics);
    assert.deepStrictEqual(
      previousProperties.deleteRetentionPolicy?.days,
      properties.deleteRetentionPolicy?.days,
    );
    assert.deepStrictEqual(
      previousProperties.deleteRetentionPolicy?.enabled,
      properties.deleteRetentionPolicy?.enabled,
    );
  });

  it("ListFileSystems with all parameters configured", async () => {
    const fileSystemNamePrefix = getUniqueName("filesystem1", { recorder });
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
          prefix: fileSystemNamePrefix,
        })
        .byPage({ maxPageSize: 1 })
        .next()
    ).value as ServiceListFileSystemsSegmentResponse;

    assert.isDefined(result1.continuationToken);
    assert.equal(result1.fileSystemItems.length, 1);
    assert.isTrue(result1.fileSystemItems[0].name.startsWith(fileSystemNamePrefix));
    assert.isAbove(result1.fileSystemItems[0].properties.etag.length, 0);
    assert.isDefined(result1.fileSystemItems[0].properties.lastModified);
    assert.isUndefined(result1.fileSystemItems[0].properties.leaseDuration);
    assert.isUndefined(result1.fileSystemItems[0].properties.publicAccess);
    assert.deepEqual(result1.fileSystemItems[0].properties.leaseState, "available");
    assert.deepEqual(result1.fileSystemItems[0].properties.leaseStatus, "unlocked");
    assert.deepEqual(result1.fileSystemItems[0].metadata!.key, "val");

    const result2 = (
      await serviceClient
        .listFileSystems({
          includeMetadata: true,
          prefix: fileSystemNamePrefix,
        })
        .byPage({ continuationToken: result1.continuationToken, maxPageSize: 1 })
        .next()
    ).value as ServiceListFileSystemsSegmentResponse;

    assert.equal(result2.continuationToken, "");
    assert.equal(result2.fileSystemItems.length, 1);
    assert.isTrue(result2.fileSystemItems[0].name.startsWith(fileSystemNamePrefix));
    assert.isAbove(result2.fileSystemItems[0].properties.etag.length, 0);
    assert.isDefined(result2.fileSystemItems[0].properties.lastModified);
    assert.isUndefined(result2.fileSystemItems[0].properties.leaseDuration);
    assert.isUndefined(result2.fileSystemItems[0].properties.publicAccess);
    assert.deepEqual(result2.fileSystemItems[0].properties.leaseState, "available");
    assert.deepEqual(result2.fileSystemItems[0].properties.leaseStatus, "unlocked");
    assert.deepEqual(result2.fileSystemItems[0].metadata!.key, "val");

    await fileSystemClient1.deleteIfExists();
    await fileSystemClient2.deleteIfExists();
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for ListFileSystems", async () => {
    const fileSystemClients = [];

    const fileSystemNamePrefix = getUniqueName("filesystem4", { recorder });

    for (let i = 0; i < 4; i++) {
      const fileSystemName = `${fileSystemNamePrefix}x${i}`;
      const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
      await fileSystemClient.create({ metadata: { key: "val" } });
      fileSystemClients.push(fileSystemClient);
    }

    for await (const response of serviceClient
      .listFileSystems({
        includeMetadata: true,
        prefix: fileSystemNamePrefix,
      })
      .byPage({ maxPageSize: 2 })) {
      for (const filesystem of response.fileSystemItems) {
        assert.isTrue(filesystem.name.startsWith(fileSystemNamePrefix));
        assert.isAbove(filesystem.properties.etag.length, 0);
        assert.isDefined(filesystem.properties.lastModified);
        assert.isUndefined(filesystem.properties.leaseDuration);
        assert.isUndefined(filesystem.properties.publicAccess);
        assert.deepEqual(filesystem.properties.leaseState, "available");
        assert.deepEqual(filesystem.properties.leaseStatus, "unlocked");
        assert.deepEqual(filesystem.metadata!.key, "val");
      }
    }

    for (const client of fileSystemClients) {
      await client.deleteIfExists();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for ListFileSystems", async () => {
    const fileSystemClients = [];

    const fileSystemNamePrefix = getUniqueName("filesystem5", { recorder });

    for (let i = 0; i < 4; i++) {
      const fileSystemName = `${fileSystemNamePrefix}x${i}`;
      const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
      await fileSystemClient.create({ metadata: { key: "val" } });
      fileSystemClients.push(fileSystemClient);
    }

    let iter = serviceClient
      .listFileSystems({
        includeMetadata: true,
        prefix: fileSystemNamePrefix,
      })
      .byPage({ maxPageSize: 2 });
    let response = (await iter.next()).value;
    for (const filesystem of response.fileSystemItems) {
      assert.isTrue(filesystem.name.startsWith(fileSystemNamePrefix));
      assert.isAbove(filesystem.properties.etag.length, 0);
      assert.isDefined(filesystem.properties.lastModified);
      assert.isUndefined(filesystem.properties.leaseDuration);
      assert.isUndefined(filesystem.properties.publicAccess);
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
        prefix: fileSystemNamePrefix,
      })
      .byPage({ continuationToken: marker, maxPageSize: 2 });
    response = (await iter.next()).value;
    // Gets 2 containers
    for (const filesystem of response.fileSystemItems) {
      assert.isTrue(filesystem.name.startsWith(fileSystemNamePrefix));
      assert.isAbove(filesystem.properties.etag.length, 0);
      assert.isDefined(filesystem.properties.lastModified);
      assert.isUndefined(filesystem.properties.leaseDuration);
      assert.isUndefined(filesystem.properties.publicAccess);
      assert.deepEqual(filesystem.properties.leaseState, "available");
      assert.deepEqual(filesystem.properties.leaseStatus, "unlocked");
      assert.deepEqual(filesystem.metadata!.key, "val");
    }

    for (const client of fileSystemClients) {
      await client.deleteIfExists();
    }
  });
});
