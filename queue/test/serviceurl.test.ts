import * as assert from "assert";

import { Aborter } from "../lib/Aborter";
import { QueueURL } from "../lib/QueueURL";
import {
  ListQueuesIncludeType
} from "../lib/generated/models";
import { ServiceURL } from "../lib/ServiceURL";
import { getAlternateQSU, getQSU, getUniqueName, wait } from "./utils";

describe("ServiceURL", () => {
  it("listQueuesSegment with default parameters", async () => {
    const serviceURL = getQSU();
    const result = await serviceURL.listQueuesSegment(Aborter.none);
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(result.queueItems!.length >= 0);

    if (result.queueItems!.length > 0) {
      const queue = result.queueItems![0];
      assert.ok(queue.name.length > 0);
    }
  });

  it("listQueuesSegment with all parameters", async () => {
    const serviceURL = getQSU();

    const queueNamePrefix = getUniqueName("queue");
    const queueName1 = `${queueNamePrefix}x1`;
    const queueName2 = `${queueNamePrefix}x2`;
    const queueURL1 = QueueURL.fromServiceURL(
      serviceURL,
      queueName1
    );
    const queueURL2 = QueueURL.fromServiceURL(
      serviceURL,
      queueName2
    );
    await queueURL1.create(Aborter.none, { metadata: { key: "val" } });
    await queueURL2.create(Aborter.none, { metadata: { key: "val" } });

    const result1 = await serviceURL.listQueuesSegment(
      Aborter.none,
      undefined,
      {
        include: ListQueuesIncludeType.Metadata,
        maxresults: 1,
        prefix: queueNamePrefix
      }
    );

    assert.ok(result1.nextMarker);
    assert.equal(result1.queueItems!.length, 1);
    assert.ok(result1.queueItems![0].name.startsWith(queueNamePrefix));
    assert.deepEqual(result1.queueItems![0].metadata!.key, "val");

    const result2 = await serviceURL.listQueuesSegment(
      Aborter.none,
      result1.nextMarker,
      {
        include: ListQueuesIncludeType.Metadata,
        maxresults: 1,
        prefix: queueNamePrefix
      }
    );

    assert.ok(!result2.nextMarker);
    assert.equal(result2.queueItems!.length, 1);
    assert.ok(result2.queueItems![0].name.startsWith(queueNamePrefix));
    assert.deepEqual(result2.queueItems![0].metadata!.key, "val");

    await queueURL1.delete(Aborter.none);
    await queueURL2.delete(Aborter.none);
  });

  it("getProperties with default/all parameters", async () => {
    const serviceURL = getQSU();
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

  it("setProperties with all parameters", async () => {
    const serviceURL = getQSU();

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

    await serviceURL.setProperties(Aborter.none, serviceProperties);
    await wait(5 * 1000);

    const result = await serviceURL.getProperties(Aborter.none);
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
    assert.deepEqual(result.hourMetrics, serviceProperties.hourMetrics);
  });

  it("getStatistics with default/all parameters", done => {
    let serviceURL: ServiceURL | undefined;
    try {
      serviceURL = getAlternateQSU();
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
});
