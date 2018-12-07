import * as assert from "assert";

import { Aborter } from "../lib/Aborter";
import { ContainerURL } from "../lib/ContainerURL";
import {
  LeaseStateType,
  LeaseStatusType,
  ListContainersIncludeType
} from "../lib/generated/models";
import { ServiceURL } from "../lib/ServiceURL";
import { getAlternateBSU, getBSU, getUniqueName, wait } from "./utils";

describe("ServiceURL", () => {
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

    const containerNamePrefix = getUniqueName("container");
    const containerName1 = `${containerNamePrefix}x1`;
    const containerName2 = `${containerNamePrefix}x2`;
    const containerURL1 = ContainerURL.fromServiceURL(
      serviceURL,
      containerName1
    );
    const containerURL2 = ContainerURL.fromServiceURL(
      serviceURL,
      containerName2
    );
    await containerURL1.create(Aborter.none, { metadata: { key: "val" } });
    await containerURL2.create(Aborter.none, { metadata: { key: "val" } });

    const result1 = await serviceURL.listContainersSegment(
      Aborter.none,
      undefined,
      {
        include: ListContainersIncludeType.Metadata,
        maxresults: 1,
        prefix: containerNamePrefix
      }
    );

    assert.ok(result1.nextMarker);
    assert.equal(result1.containerItems!.length, 1);
    assert.ok(result1.containerItems![0].name.startsWith(containerNamePrefix));
    assert.ok(result1.containerItems![0].properties.etag.length > 0);
    assert.ok(result1.containerItems![0].properties.lastModified);
    assert.ok(!result1.containerItems![0].properties.leaseDuration);
    assert.ok(!result1.containerItems![0].properties.publicAccess);
    assert.deepEqual(
      result1.containerItems![0].properties.leaseState,
      LeaseStateType.Available
    );
    assert.deepEqual(
      result1.containerItems![0].properties.leaseStatus,
      LeaseStatusType.Unlocked
    );
    assert.deepEqual(result1.containerItems![0].metadata!.key, "val");

    const result2 = await serviceURL.listContainersSegment(
      Aborter.none,
      result1.nextMarker,
      {
        include: ListContainersIncludeType.Metadata,
        maxresults: 1,
        prefix: containerNamePrefix
      }
    );

    assert.ok(!result2.nextMarker);
    assert.equal(result2.containerItems!.length, 1);
    assert.ok(result2.containerItems![0].name.startsWith(containerNamePrefix));
    assert.ok(result2.containerItems![0].properties.etag.length > 0);
    assert.ok(result2.containerItems![0].properties.lastModified);
    assert.ok(!result2.containerItems![0].properties.leaseDuration);
    assert.ok(!result2.containerItems![0].properties.publicAccess);
    assert.deepEqual(
      result2.containerItems![0].properties.leaseState,
      LeaseStateType.Available
    );
    assert.deepEqual(
      result2.containerItems![0].properties.leaseStatus,
      LeaseStatusType.Unlocked
    );
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
    await wait(5 * 1000);

    const result = await serviceURL.getProperties(Aborter.none);
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
    assert.deepEqual(result.hourMetrics, serviceProperties.hourMetrics);
  });

  it("getStatistics", done => {
    let serviceURL: ServiceURL | undefined;
    try {
      serviceURL = getAlternateBSU();
    } catch (err) {
      done();
      return;
    }

    serviceURL!
      .getStatistics(Aborter.none)
      .then(result => {
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
});
