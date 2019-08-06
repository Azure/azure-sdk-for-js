import * as assert from "assert";
import * as dotenv from "dotenv";

import { Aborter } from "../src/Aborter";
import { ContainerURL } from "../src/ContainerURL";
import { ServiceURL } from "../src/ServiceURL";
import { getAlternateBSU, getBSU, getTokenBSU } from "./utils";
import { delay, record } from "./utils/recorder";

dotenv.config({ path: "../.env" });

describe("ServiceURL", () => {
  let recorder: any;

  beforeEach(function() {
    recorder = record(this);
  });

  afterEach(() => {
    recorder.stop();
  });

  it("ListContainers with default parameters", async () => {
    const serviceURL = getBSU();
    const result = await serviceURL.listContainersSegment(Aborter.none);
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(result.containerItems!.length >= 0);

    if (result.containerItems!.length > 0) {
      const container = result.containerItems![0];
      assert.ok(container.name.length > 0);
      assert.ok(container.properties.etag.length > 0);
      assert.ok(container.properties.lastModified);
    }
  });

  it("ListContainers with all parameters configured", async () => {
    const serviceURL = getBSU();

    const containerNamePrefix = recorder.getUniqueName("container");
    const containerName1 = `${containerNamePrefix}x1`;
    const containerName2 = `${containerNamePrefix}x2`;
    const containerURL1 = ContainerURL.fromServiceURL(serviceURL, containerName1);
    const containerURL2 = ContainerURL.fromServiceURL(serviceURL, containerName2);
    await containerURL1.create(Aborter.none, { metadata: { key: "val" } });
    await containerURL2.create(Aborter.none, { metadata: { key: "val" } });

    const result1 = await serviceURL.listContainersSegment(Aborter.none, undefined, {
      include: "metadata",
      maxresults: 1,
      prefix: containerNamePrefix
    });

    assert.ok(result1.nextMarker);
    assert.equal(result1.containerItems!.length, 1);
    assert.ok(result1.containerItems![0].name.startsWith(containerNamePrefix));
    assert.ok(result1.containerItems![0].properties.etag.length > 0);
    assert.ok(result1.containerItems![0].properties.lastModified);
    assert.ok(!result1.containerItems![0].properties.leaseDuration);
    assert.ok(!result1.containerItems![0].properties.publicAccess);
    assert.deepEqual(result1.containerItems![0].properties.leaseState, "available");
    assert.deepEqual(result1.containerItems![0].properties.leaseStatus, "unlocked");
    assert.deepEqual(result1.containerItems![0].metadata!.key, "val");

    const result2 = await serviceURL.listContainersSegment(Aborter.none, result1.nextMarker, {
      include: "metadata",
      maxresults: 1,
      prefix: containerNamePrefix
    });

    assert.ok(!result2.nextMarker);
    assert.equal(result2.containerItems!.length, 1);
    assert.ok(result2.containerItems![0].name.startsWith(containerNamePrefix));
    assert.ok(result2.containerItems![0].properties.etag.length > 0);
    assert.ok(result2.containerItems![0].properties.lastModified);
    assert.ok(!result2.containerItems![0].properties.leaseDuration);
    assert.ok(!result2.containerItems![0].properties.publicAccess);
    assert.deepEqual(result2.containerItems![0].properties.leaseState, "available");
    assert.deepEqual(result2.containerItems![0].properties.leaseStatus, "unlocked");
    assert.deepEqual(result2.containerItems![0].metadata!.key, "val");

    await containerURL1.delete(Aborter.none);
    await containerURL2.delete(Aborter.none);
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

    serviceProperties.logging = {
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

    await serviceURL.setProperties(Aborter.none, serviceProperties);
    await delay(5 * 1000);

    const result = await serviceURL.getProperties(Aborter.none);
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
    assert.deepEqual(result.hourMetrics, serviceProperties.hourMetrics);
  });

  it("getStatistics", (done) => {
    let serviceURL: ServiceURL | undefined;
    try {
      serviceURL = getAlternateBSU();
    } catch (err) {
      done();
      return;
    }

    serviceURL!
      .getStatistics(Aborter.none)
      .then((result) => {
        assert.ok(result.geoReplication!.lastSyncTime);
        done();
      })
      .catch(done);
  });

  it("getAccountInfo", async () => {
    const serviceURL = getBSU();

    const accountInfo = await serviceURL.getAccountInfo(Aborter.none);
    assert.ok(accountInfo.accountKind);
    assert.ok(accountInfo.skuName);
  });

  it("getUserDelegationKey should work", async () => {
    // Try to get serviceURL object with TokenCredential
    // when ACCOUNT_TOKEN environment variable is set
    let serviceURLWithToken;
    try {
      serviceURLWithToken = getTokenBSU();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (serviceURLWithToken === undefined) {
      return;
    }

    const now = new Date();
    now.setHours(now.getHours() + 1);
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    const response = await serviceURLWithToken.getUserDelegationKey(Aborter.none, now, tmr);
    assert.notDeepStrictEqual(response.value, undefined);
    assert.notDeepStrictEqual(response.signedVersion, undefined);
    assert.notDeepStrictEqual(response.signedTid, undefined);
    assert.notDeepStrictEqual(response.signedStart, undefined);
    assert.notDeepStrictEqual(response.signedService, undefined);
    assert.notDeepStrictEqual(response.signedOid, undefined);
    assert.notDeepStrictEqual(response.signedExpiry, undefined);
  });
});
