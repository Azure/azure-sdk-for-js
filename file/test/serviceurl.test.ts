import * as assert from "assert";

import { Aborter } from "../lib/Aborter";
import { ListSharesIncludeType } from "../lib/generated/models";
import { ShareURL } from "../lib/ShareURL";
import { getBSU, getUniqueName, wait } from "./utils";

describe("ServiceURL", () => {
  it("ListShares with default parameters", async () => {
    const serviceURL = getBSU();
    const result = await serviceURL.listSharesSegment(Aborter.none);

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
    const serviceURL = getBSU();

    const shareNamePrefix = getUniqueName("share");
    const shareName1 = `${shareNamePrefix}x1`;
    const shareName2 = `${shareNamePrefix}x2`;
    const shareURL1 = ShareURL.fromServiceURL(serviceURL, shareName1);
    const shareURL2 = ShareURL.fromServiceURL(serviceURL, shareName2);
    await shareURL1.create(Aborter.none, { metadata: { key: "val" } });
    await shareURL2.create(Aborter.none, { metadata: { key: "val" } });

    const result1 = await serviceURL.listSharesSegment(
      Aborter.none,
      undefined,
      {
        include: [
          ListSharesIncludeType.Metadata,
          ListSharesIncludeType.Snapshots
        ],
        maxresults: 1,
        prefix: shareNamePrefix
      }
    );

    assert.ok(result1.nextMarker);
    assert.equal(result1.shareItems!.length, 1);
    assert.ok(result1.shareItems![0].name.startsWith(shareNamePrefix));
    assert.ok(result1.shareItems![0].properties.etag.length > 0);
    assert.ok(result1.shareItems![0].properties.lastModified);
    assert.deepEqual(result1.shareItems![0].metadata!.key, "val");

    const result2 = await serviceURL.listSharesSegment(
      Aborter.none,
      result1.nextMarker,
      {
        include: [
          ListSharesIncludeType.Metadata,
          ListSharesIncludeType.Snapshots
        ],
        maxresults: 1,
        prefix: shareNamePrefix
      }
    );

    assert.ok(!result2.nextMarker);
    assert.equal(result2.shareItems!.length, 1);
    assert.ok(result2.shareItems![0].name.startsWith(shareNamePrefix));
    assert.ok(result2.shareItems![0].properties.etag.length > 0);
    assert.ok(result2.shareItems![0].properties.lastModified);
    assert.deepEqual(result2.shareItems![0].metadata!.key, "val");

    await shareURL1.delete(Aborter.none);
    await shareURL2.delete(Aborter.none);
  });

  it("GetProperties", async () => {
    const serviceURL = getBSU();
    const result = await serviceURL.getProperties(Aborter.none);

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
    const serviceURL = getBSU();

    const serviceProperties = await serviceURL.getProperties(Aborter.none);

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

    await serviceURL.setProperties(Aborter.none, serviceProperties);
    await wait(5 * 1000);

    const result = await serviceURL.getProperties(Aborter.none);
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
    assert.deepEqual(result.hourMetrics, serviceProperties.hourMetrics);
  });
});
