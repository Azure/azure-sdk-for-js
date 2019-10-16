import * as assert from "assert";

import { getBSU, getSASConnectionStringFromEnvironment } from "./utils";
import { record, delay } from "./utils/recorder";
import * as dotenv from "dotenv";
import { FileServiceClient } from "../src";
dotenv.config({ path: "../.env" });

describe("FileServiceClient", () => {
  let recorder: any;

  beforeEach(function() {
    recorder = record(this);
  });

  afterEach(function() {
    recorder.stop();
  });

  it("ListShares with default parameters", async () => {
    const serviceClient = getBSU();

    const result = (await serviceClient
      .listShares()
      .byPage()
      .next()).value;

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
    const serviceClient = getBSU();

    const shareNamePrefix = recorder.getUniqueName("share");
    const shareName1 = `${shareNamePrefix}x1`;
    const shareName2 = `${shareNamePrefix}x2`;
    const shareClient1 = serviceClient.getShareClient(shareName1);
    const shareClient2 = serviceClient.getShareClient(shareName2);
    await shareClient1.create({ metadata: { key: "val" } });
    await shareClient2.create({ metadata: { key: "val" } });

    const result1 = (await serviceClient
      .listShares({
        includeMetadata: true,
        includeSnapshots: true,
        prefix: shareNamePrefix
      })
      .byPage({ maxPageSize: 1 })
      .next()).value;

    assert.ok(result1.nextMarker);
    assert.equal(result1.shareItems!.length, 1);
    assert.ok(result1.shareItems![0].name.startsWith(shareNamePrefix));
    assert.ok(result1.shareItems![0].properties.etag.length > 0);
    assert.ok(result1.shareItems![0].properties.lastModified);
    assert.deepEqual(result1.shareItems![0].metadata!.key, "val");

    const result2 = (await serviceClient
      .listShares({
        includeMetadata: true,
        includeSnapshots: true,
        prefix: shareNamePrefix
      })
      .byPage({ continuationToken: result1.nextMarker, maxPageSize: 1 })
      .next()).value;

    assert.ok(!result2.nextMarker);
    assert.equal(result2.shareItems!.length, 1);
    assert.ok(result2.shareItems![0].name.startsWith(shareNamePrefix));
    assert.ok(result2.shareItems![0].properties.etag.length > 0);
    assert.ok(result2.shareItems![0].properties.lastModified);
    assert.deepEqual(result2.shareItems![0].metadata!.key, "val");

    await shareClient1.delete();
    await shareClient2.delete();
  });

  it("Verify PagedAsyncIterableIterator for listShares", async () => {
    const serviceClient = getBSU();
    const shareNamePrefix = recorder.getUniqueName("share");
    const shareName1 = `${shareNamePrefix}x1`;
    const shareName2 = `${shareNamePrefix}x2`;
    const shareClient1 = serviceClient.getShareClient(shareName1);
    const shareClient2 = serviceClient.getShareClient(shareName2);
    await shareClient1.create({ metadata: { key: "val" } });
    await shareClient2.create({ metadata: { key: "val" } });

    for await (const item of serviceClient.listShares({
      includeMetadata: true,
      includeSnapshots: true,
      prefix: shareNamePrefix
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
    const serviceClient = getBSU();

    const shareNamePrefix = recorder.getUniqueName("share");
    const shareName1 = `${shareNamePrefix}x1`;
    const shareName2 = `${shareNamePrefix}x2`;
    const shareClient1 = serviceClient.getShareClient(shareName1);
    const shareClient2 = serviceClient.getShareClient(shareName2);
    await shareClient1.create({ metadata: { key: "val" } });
    await shareClient2.create({ metadata: { key: "val" } });

    const iter = await serviceClient.listShares({
      includeMetadata: true,
      includeSnapshots: true,
      prefix: shareNamePrefix
    });
    let shareItem = await iter.next();
    assert.ok(shareItem.value.name.startsWith(shareNamePrefix));
    assert.ok(shareItem.value.properties.etag.length > 0);
    assert.ok(shareItem.value.properties.lastModified);
    assert.deepEqual(shareItem.value.metadata!.key, "val");

    shareItem = await iter.next();
    assert.ok(shareItem.value.name.startsWith(shareNamePrefix));
    assert.ok(shareItem.value.properties.etag.length > 0);
    assert.ok(shareItem.value.properties.lastModified);
    assert.deepEqual(shareItem.value.metadata!.key, "val");

    await shareClient1.delete();
    await shareClient2.delete();
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for listShares", async () => {
    const shareClients = [];
    const serviceClient = getBSU();
    const shareNamePrefix = recorder.getUniqueName("share");

    for (let i = 0; i < 4; i++) {
      const shareClient = serviceClient.getShareClient(`${shareNamePrefix}x${i}`);
      await shareClient.create({ metadata: { key: "val" } });
      shareClients.push(shareClient);
    }

    for await (const response of serviceClient
      .listShares({
        includeMetadata: true,
        includeSnapshots: true,
        prefix: shareNamePrefix
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
    const serviceClient = getBSU();
    const shareNamePrefix = recorder.getUniqueName("share");

    for (let i = 0; i < 4; i++) {
      const shareClient = serviceClient.getShareClient(`${shareNamePrefix}x${i}`);
      await shareClient.create({ metadata: { key: "val" } });
      shareClients.push(shareClient);
    }

    let iter = serviceClient
      .listShares({
        includeMetadata: true,
        includeSnapshots: true,
        prefix: shareNamePrefix
      })
      .byPage({ maxPageSize: 2 });
    let response = (await iter.next()).value;
    // Gets 2 shares
    for (const item of response.shareItems!) {
      assert.ok(item.name.startsWith(shareNamePrefix));
      assert.ok(item.properties.etag.length > 0);
      assert.ok(item.properties.lastModified);
      assert.deepEqual(item.metadata!.key, "val");
    }
    // Gets next marker
    const marker = response.nextMarker;
    iter = serviceClient
      .listShares({
        includeMetadata: true,
        includeSnapshots: true,
        prefix: shareNamePrefix
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
    const serviceClient = getBSU();
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
    const serviceClient = getBSU();

    const serviceProperties = await serviceClient.getProperties();

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

    await serviceClient.setProperties(serviceProperties);
    await delay(5 * 1000);

    const result = await serviceClient.getProperties();
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
    assert.deepEqual(result.hourMetrics, serviceProperties.hourMetrics);
  });

  it("createShare and deleteShare", async () => {
    const serviceClient = getBSU();
    const shareName = recorder.getUniqueName("share");
    const metadata = { key: "value" };

    const { shareClient } = await serviceClient.createShare(shareName, { metadata });
    const result = await shareClient.getProperties();
    assert.deepEqual(result.metadata, metadata);

    await serviceClient.deleteShare(shareName);
    try {
      await shareClient.getProperties();
      assert.fail(
        "Expecting an error in getting properties from a deleted block blob but didn't get one."
      );
    } catch (error) {
      assert.ok((error.statusCode as number) === 404);
    }
  });

  it("can be created from a sas connection string", async () => {
    const newClient = FileServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment()
    );

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("can be created from a sas connection string and an option bag", async () => {
    const newClient = FileServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment(),
      {
        retryOptions: {
          maxTries: 5
        }
      }
    );

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });
});
