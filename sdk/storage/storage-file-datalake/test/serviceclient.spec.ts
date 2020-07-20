import { record, Recorder } from "@azure/test-utils-recorder";
import * as assert from "assert";
import * as dotenv from "dotenv";

import { DataLakeServiceClient, ServiceListFileSystemsSegmentResponse } from "../src";
import { getDataLakeServiceClient, getTokenDataLakeServiceClient, recorderEnvSetup } from "./utils";

dotenv.config();

describe("DataLakeServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
  });

  afterEach(async function() {
    await recorder.stop();
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
});
