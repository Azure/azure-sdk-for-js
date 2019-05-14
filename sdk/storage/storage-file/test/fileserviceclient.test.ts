import * as assert from "assert";

import { Aborter } from "../src/Aborter";
import { ShareClient } from "../src/ShareClient";
import { getBSU, getUniqueName, wait } from "./utils";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("FileServiceClient", () => {
  it("ListShares with default parameters", async () => {
    const serviceClient = getBSU();
    const result = await serviceClient.listSharesSegment(Aborter.none);

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

    const shareNamePrefix = getUniqueName("share");
    const shareName1 = `${shareNamePrefix}x1`;
    const shareName2 = `${shareNamePrefix}x2`;
    const shareClient1 = ShareClient.fromFileServiceClient(serviceClient, shareName1);
    const shareClient2 = ShareClient.fromFileServiceClient(serviceClient, shareName2);
    await shareClient1.create(Aborter.none, { metadata: { key: "val" } });
    await shareClient2.create(Aborter.none, { metadata: { key: "val" } });

    const result1 = await serviceClient.listSharesSegment(Aborter.none, undefined, {
      include: ["metadata", "snapshots"],
      maxresults: 1,
      prefix: shareNamePrefix
    });

    assert.ok(result1.nextMarker);
    assert.equal(result1.shareItems!.length, 1);
    assert.ok(result1.shareItems![0].name.startsWith(shareNamePrefix));
    assert.ok(result1.shareItems![0].properties.etag.length > 0);
    assert.ok(result1.shareItems![0].properties.lastModified);
    assert.deepEqual(result1.shareItems![0].metadata!.key, "val");

    const result2 = await serviceClient.listSharesSegment(Aborter.none, result1.nextMarker, {
      include: ["metadata", "snapshots"],
      maxresults: 1,
      prefix: shareNamePrefix
    });

    assert.ok(!result2.nextMarker);
    assert.equal(result2.shareItems!.length, 1);
    assert.ok(result2.shareItems![0].name.startsWith(shareNamePrefix));
    assert.ok(result2.shareItems![0].properties.etag.length > 0);
    assert.ok(result2.shareItems![0].properties.lastModified);
    assert.deepEqual(result2.shareItems![0].metadata!.key, "val");

    await shareClient1.delete(Aborter.none);
    await shareClient2.delete(Aborter.none);
  });

  it("GetProperties", async () => {
    const serviceClient = getBSU();
    const result = await serviceClient.getProperties(Aborter.none);

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

    const serviceProperties = await serviceClient.getProperties(Aborter.none);

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

    await serviceClient.setProperties(Aborter.none, serviceProperties);
    await wait(5 * 1000);

    const result = await serviceClient.getProperties(Aborter.none);
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
    assert.deepEqual(result.hourMetrics, serviceProperties.hourMetrics);
  });
});
