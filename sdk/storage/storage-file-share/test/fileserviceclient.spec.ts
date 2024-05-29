// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import {
  configureStorageClient,
  getBSU,
  getGenericBSU,
  getSASConnectionStringFromEnvironment,
  getSoftDeleteBSU,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "./utils";
import { delay, Recorder } from "@azure-tools/test-recorder";
import { ShareServiceClient, ShareItem, ShareRootSquash } from "../src";
import { Context } from "mocha";
import { getYieldedValue } from "@azure-tools/test-utils";

describe("FileServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("ListShares with default parameters", async () => {
    const serviceClient = getBSU(recorder);

    const result = (await serviceClient.listShares().byPage().next()).value;

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(result.shareItems!.length >= 0);

    if (result.shareItems!.length > 0) {
      const share = result.shareItems![0];
      assert.ok(share.name.length > 0);
      assert.ok(share.properties.etag.length > 0);
      assert.ok(share.properties.lastModified);
    }
  });

  it("listShares with default parameters - empty prefix should not cause an error", async () => {
    const serviceClient = getBSU(recorder);

    const result = (await serviceClient.listShares({ prefix: "" }).byPage().next()).value;

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(result.shareItems!.length >= 0);

    if (result.shareItems!.length > 0) {
      const share = result.shareItems![0];
      assert.ok(share.name.length > 0);
      assert.ok(share.properties.etag.length > 0);
      assert.ok(share.properties.lastModified);
    }
  });

  it("ListShares with all parameters configured", async () => {
    const serviceClient = getBSU(recorder);

    const shareNamePrefix = recorder.variable("share", getUniqueName("share"));
    const shareName1 = `${shareNamePrefix}x1`;
    const shareName2 = `${shareNamePrefix}x2`;
    const shareClient1 = serviceClient.getShareClient(shareName1);
    const shareClient2 = serviceClient.getShareClient(shareName2);
    await shareClient1.create({ metadata: { key: "val" } });
    await shareClient2.create({ metadata: { key: "val" } });

    const iter = serviceClient
      .listShares({
        includeMetadata: true,
        includeSnapshots: true,
        prefix: shareNamePrefix,
      })
      .byPage({ maxPageSize: 1 });

    let res = await iter.next();
    let result1 = res.value;
    while (!result1.shareItems && !res.done) {
      res = await iter.next();
      result1 = res.value;
    }
    assert.ok(result1.shareItems);
    assert.ok(result1.continuationToken);
    assert.equal(result1.shareItems!.length, 1);
    assert.ok(result1.shareItems![0].name.startsWith(shareNamePrefix));
    assert.ok(result1.shareItems![0].properties.etag.length > 0);
    assert.ok(result1.shareItems![0].properties.lastModified);
    assert.deepEqual(result1.shareItems![0].metadata!.key, "val");

    const result2 = (
      await serviceClient
        .listShares({
          includeMetadata: true,
          includeSnapshots: true,
          prefix: shareNamePrefix,
        })
        .byPage({ continuationToken: result1.continuationToken, maxPageSize: 1 })
        .next()
    ).value;

    assert.ok(!result2.continuationToken);
    assert.equal(result2.shareItems!.length, 1);
    assert.ok(result2.shareItems![0].name.startsWith(shareNamePrefix));
    assert.ok(result2.shareItems![0].properties.etag.length > 0);
    assert.ok(result2.shareItems![0].properties.lastModified);
    assert.deepEqual(result2.shareItems![0].metadata!.key, "val");

    await shareClient1.delete();
    await shareClient2.delete();
  });

  it("Verify PagedAsyncIterableIterator for listShares", async () => {
    const serviceClient = getBSU(recorder);
    const shareNamePrefix = recorder.variable("share", getUniqueName("share"));
    const shareName1 = `${shareNamePrefix}x1`;
    const shareName2 = `${shareNamePrefix}x2`;
    const shareClient1 = serviceClient.getShareClient(shareName1);
    const shareClient2 = serviceClient.getShareClient(shareName2);
    await shareClient1.create({ metadata: { key: "val" } });
    await shareClient2.create({ metadata: { key: "val" } });

    for await (const item of serviceClient.listShares({
      includeMetadata: true,
      includeSnapshots: true,
      prefix: shareNamePrefix,
    })) {
      assert.ok(item.name.startsWith(shareNamePrefix));
      assert.ok(item.properties.etag.length > 0);
      assert.ok(item.properties.lastModified);
      assert.deepEqual(item.metadata!.key, "val");
    }

    await shareClient1.delete();
    await shareClient2.delete();
  });

  it("Verify PagedAsyncIterableIterator(generator .next() syntax) for listShares", async () => {
    const serviceClient = getBSU(recorder);

    const shareNamePrefix = recorder.variable("share", getUniqueName("share"));
    const shareName1 = `${shareNamePrefix}x1`;
    const shareName2 = `${shareNamePrefix}x2`;
    const shareClient1 = serviceClient.getShareClient(shareName1);
    const shareClient2 = serviceClient.getShareClient(shareName2);
    await shareClient1.create({ metadata: { key: "val" } });
    await shareClient2.create({ metadata: { key: "val" } });

    const iter = serviceClient.listShares({
      includeMetadata: true,
      includeSnapshots: true,
      prefix: shareNamePrefix,
    });
    let shareItem = getYieldedValue(await iter.next());
    assert.ok(shareItem.name.startsWith(shareNamePrefix));
    assert.ok(shareItem.properties.etag.length > 0);
    assert.ok(shareItem.properties.lastModified);
    assert.deepEqual(shareItem.metadata!.key, "val");

    shareItem = getYieldedValue(await iter.next());
    assert.ok(shareItem.name.startsWith(shareNamePrefix));
    assert.ok(shareItem.properties.etag.length > 0);
    assert.ok(shareItem.properties.lastModified);
    assert.deepEqual(shareItem.metadata!.key, "val");

    await shareClient1.delete();
    await shareClient2.delete();
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for listShares", async () => {
    const shareClients = [];
    const serviceClient = getBSU(recorder);
    const shareNamePrefix = recorder.variable("share", getUniqueName("share"));

    for (let i = 0; i < 4; i++) {
      const shareClient = serviceClient.getShareClient(`${shareNamePrefix}x${i}`);
      await shareClient.create({ metadata: { key: "val" } });
      shareClients.push(shareClient);
    }

    for await (const response of serviceClient
      .listShares({
        includeMetadata: true,
        includeSnapshots: true,
        prefix: shareNamePrefix,
      })
      .byPage({ maxPageSize: 2 })) {
      for (const item of response.shareItems!) {
        assert.ok(item.name.startsWith(shareNamePrefix));
        assert.ok(item.properties.etag.length > 0);
        assert.ok(item.properties.lastModified);
        assert.deepEqual(item.metadata!.key, "val");
      }
    }

    for (const shareClient of shareClients) {
      await shareClient.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for listShares", async () => {
    const shareClients = [];
    const serviceClient = getBSU(recorder);
    const shareNamePrefix = recorder.variable("share", getUniqueName("share"));

    for (let i = 0; i < 4; i++) {
      const shareClient = serviceClient.getShareClient(`${shareNamePrefix}x${i}`);
      await shareClient.create({ metadata: { key: "val" } });
      shareClients.push(shareClient);
    }

    let iter = serviceClient
      .listShares({
        includeMetadata: true,
        includeSnapshots: true,
        prefix: shareNamePrefix,
      })
      .byPage({ maxPageSize: 2 });
    let res = await iter.next();
    let response = res.value;
    while (!response.shareItems && !res.done) {
      res = await iter.next();
      response = res.value;
    }
    assert.ok(response.shareItems);
    // Gets 2 shares
    for (const item of response.shareItems!) {
      assert.ok(item.name.startsWith(shareNamePrefix));
      assert.ok(item.properties.etag.length > 0);
      assert.ok(item.properties.lastModified);
      assert.deepEqual(item.metadata!.key, "val");
    }
    // Gets next marker
    const marker = response.continuationToken;
    iter = serviceClient
      .listShares({
        includeMetadata: true,
        includeSnapshots: true,
        prefix: shareNamePrefix,
      })
      .byPage({ continuationToken: marker, maxPageSize: 2 });
    response = (await iter.next()).value;
    // Gets 2 shares
    for (const item of response.shareItems!) {
      assert.ok(item.name.startsWith(shareNamePrefix));
      assert.ok(item.properties.etag.length > 0);
      assert.ok(item.properties.lastModified);
      assert.deepEqual(item.metadata!.key, "val");
    }

    for (const shareClient of shareClients) {
      await shareClient.delete();
    }
  });

  it("GetProperties", async () => {
    const serviceClient = getBSU(recorder);
    const result = await serviceClient.getProperties();

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
    const serviceClient = getBSU(recorder);

    const serviceProperties = await serviceClient.getProperties();

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

    // SMB multi-channel is returned by getProperties() even when the feature is not supproted on the account.
    const newServiceProperties = {
      cors: serviceProperties.cors,
      minuteMetrics: serviceProperties.minuteMetrics,
      hourMetrics: serviceProperties.hourMetrics,
    };

    await serviceClient.setProperties(newServiceProperties);
    await delay(5 * 1000);

    const result = await serviceClient.getProperties();
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
    assert.deepEqual(result.hourMetrics, serviceProperties.hourMetrics);
  });

  it("createShare and deleteShare", async () => {
    const serviceClient = getBSU(recorder);
    const shareName = recorder.variable("share", getUniqueName("share"));
    const metadata = { key: "value" };

    const { shareClient } = await serviceClient.createShare(shareName, { metadata });
    const result = await shareClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await serviceClient.deleteShare(shareName);
    try {
      await shareClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one.",
      );
    } catch (error: any) {
      assert.ok((error.statusCode as number) === 404);
    }
  });

  it("can be created from a sas connection string", async () => {
    const newClient = ShareServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment(recorder),
    );
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("can be created from a sas connection string and an option bag", async () => {
    const newClient = ShareServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment(recorder),
      {
        retryOptions: {
          maxTries: 5,
        },
      },
    );
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });
});
  

describe("FileServiceClient - soft delete", () => {
  let recorder: Recorder;
  let serviceClient: ShareServiceClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);

    try {
      serviceClient = getSoftDeleteBSU(recorder);
    } catch (error: any) {
      this.skip();
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("ListShares with deleted share", async function () {
    const shareClient = serviceClient.getShareClient(
      recorder.variable("share", getUniqueName("share")),
    );
    await shareClient.create();
    await shareClient.delete();

    let found = false;
    for await (const share of serviceClient.listShares({ includeDeleted: true })) {
      if (share.name === shareClient.name) {
        found = true;
        assert.ok(share.version);
        assert.ok(share.deleted);
      }
    }
    assert.ok(found);
  });

  it("Undelete share positive", async function () {
    const shareClient = serviceClient.getShareClient(
      recorder.variable("share", getUniqueName("share")),
    );
    await shareClient.create();
    await shareClient.delete();

    let found = false;
    let shareDeleted: ShareItem | undefined;
    for await (const share of serviceClient.listShares({ includeDeleted: true })) {
      if (share.name === shareClient.name) {
        found = true;
        assert.ok(share.version);
        assert.ok(share.deleted);
        assert.ok(share.properties.deletedTime);
        assert.ok(share.properties.remainingRetentionDays);

        shareDeleted = share;
      }
    }
    assert.ok(found);
    assert.ok(shareDeleted);

    // Await share to be deleted.
    await delay(30 * 1000);

    const restoredShareClient = await serviceClient.undeleteShare(
      shareDeleted!.name,
      shareDeleted!.version!,
    );
    await restoredShareClient.getProperties();

    await restoredShareClient.delete();
  });

  it("Undelete share negative", async function () {
    const shareClient = serviceClient.getShareClient(
      recorder.variable("share", getUniqueName("share")),
    );
    const invalidVersion = "01D60F8BB59A4652";

    try {
      await serviceClient.undeleteShare(shareClient.name, invalidVersion);
      assert.fail("Expecting an error in undelete share with invalid version.");
    } catch (error: any) {
      assert.ok((error.statusCode as number) === 404);
    }
  });
});

describe("FileServiceClient Premium", () => {
  let recorder: Recorder;
  let serviceClient: ShareServiceClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    try {
      serviceClient = getGenericBSU(recorder, "PREMIUM_FILE_");
    } catch (error: any) {
      console.log(error);
      this.skip();
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // Skipped for now as it needs be enabled on the account.
  it.skip("SMB Multichannel", async function (this: Context) {
    await serviceClient.setProperties({
      protocol: { smb: { multichannel: { enabled: true } } },
    });
    const propertiesSet = await serviceClient.getProperties();
    assert.ok(propertiesSet.protocol?.smb?.multichannel);
  });

  it("Share Enable Protocol & Share Squash Root", async function (this: Context) {
    const shareName = recorder.variable("share", getUniqueName("share"));
    const shareClient = serviceClient.getShareClient(shareName);

    // create share
    let rootSquash: ShareRootSquash = "RootSquash";
    await shareClient.create({
      protocols: {
        smbEnabled: true,
        nfsEnabled: true,
      },
      rootSquash,
      enableSnapshotVirtualDirectoryAccess: true
    });

    // get properties
    const expectedProtocols = { nfsEnabled: true };
    const getRes = await shareClient.getProperties();
    assert.deepStrictEqual(getRes.protocols, expectedProtocols);
    assert.deepStrictEqual(getRes.rootSquash, rootSquash);
    assert.ok(getRes.enableSnapshotVirtualDirectoryAccess);

    // set properties
    rootSquash = "AllSquash";
    await shareClient.setProperties({ rootSquash });

    // list share
    const shareName1 = recorder.variable("share1", getUniqueName("share1"));
    const protocols = { smbEnabled: true };
    await serviceClient.createShare(shareName1, {
      protocols,
    });

    for await (const share of serviceClient.listShares()) {
      if (share.name === shareName) {
        assert.deepStrictEqual(share.properties.protocols, expectedProtocols);
        assert.deepStrictEqual(share.properties.rootSquash, rootSquash);
        assert.ok(share.properties.enableSnapshotVirtualDirectoryAccess);
      } else if (share.name === shareName1) {
        assert.deepStrictEqual(share.properties.protocols, protocols);
      }
    }
  });

  // Skip this case until the feature is enabled in production.
  it.skip("Premium Share getProperties", async function (this: Context) {
    const shareName = recorder.variable("share", getUniqueName("share"));
    const shareClient = serviceClient.getShareClient(shareName);

    // create share
    await shareClient.create();

    const getRes = await shareClient.getProperties();
    assert.ok(getRes.provisionedBandwidthMibps);
    assert.ok(getRes.quota);
  });
});
