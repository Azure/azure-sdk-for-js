// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay, Recorder } from "@azure-tools/test-recorder";
import { getYieldedValue } from "@azure-tools/test-utils-vitest";
import type {
  DataLakeServiceProperties,
  FileSystemItem,
  ServiceListFileSystemsSegmentResponse,
} from "../../src/index.js";
import type { DataLakeServiceClient } from "../../src/index.js";
import { createDataLakeServiceClient } from "./utils/clients.js";
import { getUniqueName } from "./utils/utils.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getEncryptionScope1 } from "../utils/injectables.js";

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

  it("SetProperties and GetProperties", async () => {
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
    };

    await serviceClient.setProperties(serviceProperties);
    await delay(5 * 1000);

    let properties = await serviceClient.getProperties();
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

  it("ListFileSystems with default parameters", async () => {
    const result = (await serviceClient.listFileSystems().byPage().next())
      .value as ServiceListFileSystemsSegmentResponse;
    assert.isDefined(result.requestId);
    assert.isAbove(result.requestId!.length, 0);
    assert.isDefined(result.version);
    assert.isAbove(result.version!.length, 0);
    assert.isDefined(result.clientRequestId);
    assert.isAbove(result.clientRequestId!.length, 0);

    assert.isAbove(result.serviceEndpoint.length, 0);
    assert.isAtLeast(result.fileSystemItems.length, 0);

    if (result.fileSystemItems.length > 0) {
      const filesystem = result.fileSystemItems[0];
      assert.isAbove(filesystem.name.length, 0);
      assert.isAbove(filesystem.properties.etag.length, 0);
      assert.isDefined(filesystem.properties.lastModified);
    }
  });

  it("ListFileSystems - returns file system encryption scope info", async () => {
    const defaultEncryptionScope = getEncryptionScope1();
    const fileSystemName = getUniqueName("filesystem", { recorder });
    const cClient = serviceClient.getFileSystemClient(fileSystemName);
    await cClient.create({
      fileSystemEncryptionScope: {
        defaultEncryptionScope,
        preventEncryptionScopeOverride: true,
      },
    });

    const result = (await serviceClient.listFileSystems().byPage().next()).value;
    assert.isAtLeast(result.fileSystemItems.length, 0);

    let foundTheOne = false;
    result.fileSystemItems.forEach((element: FileSystemItem) => {
      if (element.name === fileSystemName) {
        foundTheOne = true;
        assert.equal(element.properties.defaultEncryptionScope, defaultEncryptionScope);
      }
    });

    assert.isTrue(foundTheOne, "Should have found the created file system");
    await cClient.delete();
  });

  it("ListFileSystems - PagedAsyncIterableIterator returns file system encryption scope info", async () => {
    const defaultEncryptionScope = getEncryptionScope1();
    const fileSystemName = getUniqueName("filesystem", { recorder });
    const cClient = serviceClient.getFileSystemClient(fileSystemName);
    await cClient.create({
      fileSystemEncryptionScope: {
        defaultEncryptionScope,
        preventEncryptionScopeOverride: true,
      },
    });

    let foundTheOne = false;

    for await (const filesystem of serviceClient.listFileSystems()) {
      if (filesystem.name === fileSystemName) {
        foundTheOne = true;
        assert.equal(filesystem.properties.defaultEncryptionScope, defaultEncryptionScope);
      }
    }

    assert.isTrue(foundTheOne, "Should have found the created file system");
    await cClient.delete();
  });

  it("ListFileSystems with default parameters - null prefix shouldn't throw error", async () => {
    const result = (await serviceClient.listFileSystems({ prefix: "" }).byPage().next()).value;

    assert.isAtLeast(result.fileSystemItems.length, 0);

    if (result.fileSystemItems.length > 0) {
      const filesystem = result.fileSystemItems[0];
      assert.isAbove(filesystem.name.length, 0);
      assert.isAbove(filesystem.properties.etag.length, 0);
      assert.isDefined(filesystem.properties.lastModified);
    }
  });

  it("Verify PagedAsyncIterableIterator for ListFileSystems", async () => {
    const fileSystemClients = [];

    const fileSystemNamePrefix = getUniqueName("filesystem2", { recorder });

    for (let i = 0; i < 4; i++) {
      const fileSystemName = `${fileSystemNamePrefix}x${i}`;
      const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
      await fileSystemClient.create({ metadata: { key: "val" } });
      fileSystemClients.push(fileSystemClient);
    }

    for await (const filesystem of serviceClient.listFileSystems({
      includeMetadata: true,
      prefix: fileSystemNamePrefix,
    })) {
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

  it("Verify PagedAsyncIterableIterator(generator .next() syntax) for ListFileSystems", async () => {
    const fileSystemNamePrefix = getUniqueName("filesystem3", { recorder });
    const fileSystemName1 = `${fileSystemNamePrefix}x1`;
    const fileSystemName2 = `${fileSystemNamePrefix}x2`;
    const fileSystemClient1 = serviceClient.getFileSystemClient(fileSystemName1);
    const fileSystemClient2 = serviceClient.getFileSystemClient(fileSystemName2);
    await fileSystemClient1.create({ metadata: { key: "val" } });
    await fileSystemClient2.create({ metadata: { key: "val" } });

    const iterator = serviceClient.listFileSystems({
      includeMetadata: true,
      prefix: fileSystemNamePrefix,
    });

    let fileSystemItem = getYieldedValue(await iterator.next());
    assert.isTrue(fileSystemItem.name.startsWith(fileSystemNamePrefix));
    assert.isAbove(fileSystemItem.properties.etag.length, 0);
    assert.isDefined(fileSystemItem.properties.lastModified);
    assert.isUndefined(fileSystemItem.properties.leaseDuration);
    assert.isUndefined(fileSystemItem.properties.publicAccess);
    assert.deepEqual(fileSystemItem.properties.leaseState, "available");
    assert.deepEqual(fileSystemItem.properties.leaseStatus, "unlocked");
    assert.deepEqual(fileSystemItem.metadata!.key, "val");

    fileSystemItem = getYieldedValue(await iterator.next());
    assert.isTrue(fileSystemItem.name.startsWith(fileSystemNamePrefix));
    assert.isAbove(fileSystemItem.properties.etag.length, 0);
    assert.isDefined(fileSystemItem.properties.lastModified);
    assert.isUndefined(fileSystemItem.properties.leaseDuration);
    assert.isUndefined(fileSystemItem.properties.publicAccess);
    assert.deepEqual(fileSystemItem.properties.leaseState, "available");
    assert.deepEqual(fileSystemItem.properties.leaseStatus, "unlocked");
    assert.deepEqual(fileSystemItem.metadata!.key, "val");

    await fileSystemClient1.deleteIfExists();
    await fileSystemClient2.deleteIfExists();
  });

  // it("createFileSystem and deleteFileSystem", async () => {
  //   const serviceClient = getDataLakeServiceClient(recorder);
  //   const fileSystemName = recorder.variable("filesystem6", getUniqueName("filesystem6"));;
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
  //     assert.strictEqual(error.statusCode as number, 404);
  //   }
  // });

  it("getUserDelegationKey should work", async () => {
    // serviceClient is already using token credential from beforeEach
    const now = new Date(recorder.variable("now", new Date().toISOString()));
    now.setHours(now.getHours() + 1);
    const tmr = new Date(recorder.variable("tmr", new Date().toISOString()));
    tmr.setDate(tmr.getDate() + 1);
    const response = await serviceClient.getUserDelegationKey(now, tmr);
    assert.notDeepEqual(response.value, undefined);
    assert.notDeepEqual(response.signedVersion, undefined);
    assert.notDeepEqual(response.signedTenantId, undefined);
    assert.notDeepEqual(response.signedStartsOn, undefined);
    assert.notDeepEqual(response.signedService, undefined);
    assert.notDeepEqual(response.signedObjectId, undefined);
    assert.notDeepEqual(response.signedExpiresOn, undefined);
  });

  // Turn on this case when the Container Rename feature is ready in the service side.
  it.skip("renameFileSystem should work", async () => {
    const fileSystemName = getUniqueName("filesystem", { recorder });
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const newFileSystemName = getUniqueName("newfilesystem", { recorder });
    // const renameRes = await serviceClient.renameFileSystem(fileSystemName, newFileSystemName);
    // @ts-expect-error does not exist
    const renameRes = await serviceClient["renameFileSystem"](fileSystemName, newFileSystemName);

    const newFileSystemClient = serviceClient.getFileSystemClient(newFileSystemName);
    assert.deepStrictEqual(newFileSystemClient, renameRes.fileSystemClient);
    await newFileSystemClient.getProperties();

    await newFileSystemClient.delete();
  });

  // Turn on this case when the Container Rename feature is ready in the service side.
  it.skip("renameFileSystem should work with source lease", async () => {
    const fileSystemName = getUniqueName("filesystem", { recorder });
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const leaseClient = fileSystemClient.getDataLakeLeaseClient();
    await leaseClient.acquireLease(-1);

    const newFileSystemName = getUniqueName("newfilesystem", { recorder });
    // const renameRes = await serviceClient.renameFileSystem(fileSystemName, newFileSystemName, {
    // @ts-expect-error does not exist
    const renameRes = await serviceClient["renameFileSystem"](fileSystemName, newFileSystemName, {
      sourceCondition: { leaseId: leaseClient.leaseId },
    });

    const newFileSystemClient = serviceClient.getFileSystemClient(newFileSystemName);
    assert.deepStrictEqual(newFileSystemClient, renameRes.fileSystemClient);
    await newFileSystemClient.getProperties();

    await newFileSystemClient.deleteIfExists();
  });

  it("undelete and list deleted file system should work", async () => {
    const softDeleteServiceClient = await createDataLakeServiceClient("TokenCredential", {
      recorder,
      account: "softDelete",
    });

    const fileSystemName = getUniqueName("filesystem", { recorder });
    const fileSystemClient = softDeleteServiceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const metadata = { a: "a" };
    await fileSystemClient.setMetadata(metadata);

    await fileSystemClient.delete();
    // Wait 60 seconds for deletion to complete before attempting undelete
    // (matching storage-blob pattern - container deletion is async)
    await delay(60 * 1000);

    let listed = false;
    for await (const fileSystemItem of softDeleteServiceClient.listFileSystems({
      includeDeleted: true,
      includeMetadata: true,
    })) {
      if (fileSystemItem.deleted && fileSystemItem.name === fileSystemName) {
        listed = true;
        // verify list container response
        assert.isDefined(fileSystemItem.versionId);
        assert.isDefined(fileSystemItem.deleted);
        assert.isDefined(fileSystemItem.properties.deletedOn);
        assert.isDefined(fileSystemItem.properties.remainingRetentionDays);
        assert.deepStrictEqual(fileSystemItem.metadata, metadata);

        const restoreRes = await softDeleteServiceClient.undeleteFileSystem(
          fileSystemName,
          fileSystemItem.versionId!,
        );
        assert.equal(restoreRes.fileSystemClient.name, fileSystemName);
        await restoreRes.fileSystemClient.delete();
        break;
      }
    }
    assert.isTrue(listed);
  });
});
