import * as assert from "assert";

import { QueueServiceClient } from "../src/QueueServiceClient";
import { getAlternateQSU, getQSU, getUniqueName, wait } from "./utils";
import * as dotenv from "dotenv";
import { SharedKeyCredential, StorageClient } from "../src";
dotenv.config({ path: "../.env" });

describe("QueueServiceClient", () => {
  it("listQueuesSegment with default parameters", async () => {
    const queueServiceClient = getQSU();
    const result = await queueServiceClient.listQueuesSegment();
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
    const queueServiceClient = getQSU();

    const queueNamePrefix = getUniqueName("queue");
    const queueName1 = `${queueNamePrefix}x1`;
    const queueName2 = `${queueNamePrefix}x2`;
    const queueClient1 = queueServiceClient.createQueueClient(queueName1);
    const queueClient2 = queueServiceClient.createQueueClient(queueName2);
    await queueClient1.create({ metadata: { key: "val" } });
    await queueClient2.create({ metadata: { key: "val" } });

    const result1 = await queueServiceClient.listQueuesSegment(undefined, {
      include: "metadata",
      maxresults: 1,
      prefix: queueNamePrefix
    });

    assert.ok(result1.nextMarker);
    assert.equal(result1.queueItems!.length, 1);
    assert.ok(result1.queueItems![0].name.startsWith(queueNamePrefix));
    assert.deepEqual(result1.queueItems![0].metadata!.key, "val");

    const result2 = await queueServiceClient.listQueuesSegment(result1.nextMarker, {
      include: "metadata",
      maxresults: 1,
      prefix: queueNamePrefix
    });

    assert.ok(!result2.nextMarker);
    assert.equal(result2.queueItems!.length, 1);
    assert.ok(result2.queueItems![0].name.startsWith(queueNamePrefix));
    assert.deepEqual(result2.queueItems![0].metadata!.key, "val");

    await queueClient1.delete();
    await queueClient2.delete();
  });

  it("getProperties with default/all parameters", async () => {
    const queueServiceClient = getQSU();
    const result = await queueServiceClient.getProperties();

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
    const queueServiceClient = getQSU();

    const serviceProperties = await queueServiceClient.getProperties();

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

    await queueServiceClient.setProperties(serviceProperties);
    await wait(5 * 1000);

    const result = await queueServiceClient.getProperties();
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
    assert.deepEqual(result.hourMetrics, serviceProperties.hourMetrics);
  });

  it("getStatistics with default/all parameters secondary", (done) => {
    let queueServiceClient: QueueServiceClient | undefined;
    try {
      queueServiceClient = getAlternateQSU();
    } catch (err) {
      done();
      return;
    }

    queueServiceClient!
      .getStatistics()
      .then((result) => {
        assert.ok(result.geoReplication!.lastSyncTime);
        done();
      })
      .catch(done);
  });

  it("can be created with a url and a credential", async () => {
    const queueServiceClient = getQSU();
    const factories = queueServiceClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new QueueServiceClient(queueServiceClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const queueServiceClient = getQSU();
    const factories = queueServiceClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new QueueServiceClient(queueServiceClient.url, credential, {
      retryOptions: {
        maxTries: 5
      }
    });

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a pipeline", async () => {
    const queueServiceClient = getQSU();
    const factories = queueServiceClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const pipeline = StorageClient.newPipeline(credential);
    const newClient = new QueueServiceClient(queueServiceClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });
});
