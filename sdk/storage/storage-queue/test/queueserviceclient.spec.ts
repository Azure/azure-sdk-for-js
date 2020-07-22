import * as assert from "assert";
import * as dotenv from "dotenv";
import { QueueServiceClient } from "../src/QueueServiceClient";
import { getAlternateQSU, getQSU, getSASConnectionStringFromEnvironment } from "./utils";
import { record, delay, Recorder } from "@azure/test-utils-recorder";
import { recorderEnvSetup } from "./utils/index.browser";
dotenv.config();

describe("QueueServiceClient", () => {
  let recorder: Recorder;

  beforeEach(function() {
    recorder = record(this, recorderEnvSetup);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("listQueues with default parameters", async () => {
    const queueServiceClient = getQSU();
    const result = (
      await queueServiceClient
        .listQueues()
        .byPage()
        .next()
    ).value;
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(result.clientRequestId);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(result.queueItems!.length >= 0);

    if (result.queueItems!.length > 0) {
      const queue = result.queueItems![0];
      assert.ok(queue.name.length > 0);
    }
  });

  it("listQueues with default parameters - empty prefix should not cause an error", async () => {
    const queueServiceClient = getQSU();
    const result = (
      await queueServiceClient
        .listQueues({ prefix: "" })
        .byPage()
        .next()
    ).value;
    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(result.clientRequestId);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);

    assert.ok(result.serviceEndpoint.length > 0);
    assert.ok(result.queueItems!.length >= 0);

    if (result.queueItems!.length > 0) {
      const queue = result.queueItems![0];
      assert.ok(queue.name.length > 0);
    }
  });

  it("listQueues with all parameters", async () => {
    const queueServiceClient = getQSU();

    const queueNamePrefix = recorder.getUniqueName("queue");
    const queueName1 = `${queueNamePrefix}x1`;
    const queueName2 = `${queueNamePrefix}x2`;
    const queueClient1 = queueServiceClient.getQueueClient(queueName1);
    const queueClient2 = queueServiceClient.getQueueClient(queueName2);
    await queueClient1.create({ metadata: { key: "val" } });
    await queueClient2.create({ metadata: { key: "val" } });

    const result1 = (
      await queueServiceClient
        .listQueues({
          includeMetadata: true,
          prefix: queueNamePrefix
        })
        .byPage({ maxPageSize: 1 })
        .next()
    ).value;

    assert.ok(result1.continuationToken);
    assert.equal(result1.queueItems!.length, 1);
    assert.ok(result1.queueItems![0].name.startsWith(queueNamePrefix));
    assert.deepEqual(result1.queueItems![0].metadata!.key, "val");

    const result2 = (
      await queueServiceClient
        .listQueues({
          includeMetadata: true,
          prefix: queueNamePrefix
        })
        .byPage({ continuationToken: result1.continuationToken, maxPageSize: 1 })
        .next()
    ).value;

    assert.ok(!result2.continuationToken);
    assert.equal(result2.queueItems!.length, 1);
    assert.ok(result2.queueItems![0].name.startsWith(queueNamePrefix));
    assert.deepEqual(result2.queueItems![0].metadata!.key, "val");

    await queueClient1.delete();
    await queueClient2.delete();
  });

  it("Verify PagedAsyncIterableIterator for listQueues", async () => {
    const queueServiceClient = getQSU();

    const queueNamePrefix = recorder.getUniqueName("queue");
    const queueName1 = `${queueNamePrefix}x1`;
    const queueName2 = `${queueNamePrefix}x2`;

    const queueClient1 = queueServiceClient.getQueueClient(queueName1);
    const queueClient2 = queueServiceClient.getQueueClient(queueName2);
    await queueClient1.create({ metadata: { key: "val" } });
    await queueClient2.create({ metadata: { key: "val" } });

    for await (const item of queueServiceClient.listQueues({
      includeMetadata: true,
      prefix: queueNamePrefix
    })) {
      assert.ok(item.name.startsWith(queueNamePrefix));
      assert.deepEqual(item.metadata!.key, "val");
    }

    await queueClient1.delete();
    await queueClient2.delete();
  });

  it("Verify PagedAsyncIterableIterator(generator .next() syntax) for listQueues", async () => {
    const queueServiceClient = getQSU();

    const queueNamePrefix = recorder.getUniqueName("queue");
    const queueName1 = `${queueNamePrefix}x1`;
    const queueName2 = `${queueNamePrefix}x2`;

    const queueClient1 = queueServiceClient.getQueueClient(queueName1);
    const queueClient2 = queueServiceClient.getQueueClient(queueName2);
    await queueClient1.create({ metadata: { key: "val" } });
    await queueClient2.create({ metadata: { key: "val" } });

    let iter1 = queueServiceClient.listQueues({
      includeMetadata: true,
      prefix: queueNamePrefix
    });
    let queueItem = await iter1.next();
    assert.ok(queueItem.value.name.startsWith(queueNamePrefix));
    assert.deepEqual(queueItem.value.metadata!.key, "val");

    queueItem = await iter1.next();
    assert.ok(queueItem.value.name.startsWith(queueNamePrefix));
    assert.deepEqual(queueItem.value.metadata!.key, "val");

    await queueClient1.delete();
    await queueClient2.delete();
  });

  it("Verify PagedAsyncIterableIterator(byPage()) for listQueues", async () => {
    const queueClients = [];
    const queueServiceClient = getQSU();
    const queueNamePrefix = recorder.getUniqueName("queue");

    for (let i = 0; i < 4; i++) {
      const queueClient = queueServiceClient.getQueueClient(`${queueNamePrefix}x${i}`);
      await queueClient.create({ metadata: { key: "val" } });
      queueClients.push(queueClient);
    }

    for await (const response of queueServiceClient
      .listQueues({
        includeMetadata: true,
        prefix: queueNamePrefix
      })
      .byPage({ maxPageSize: 2 })) {
      for (const queueItem of response.queueItems!) {
        assert.ok(queueItem.name.startsWith(queueNamePrefix));
        assert.deepEqual(queueItem.metadata!.key, "val");
      }
    }

    for (const queueClient of queueClients) {
      await queueClient.delete();
    }
  });

  it("Verify PagedAsyncIterableIterator(byPage() - continuationToken) for listQueues", async () => {
    const queueClients = [];
    const queueServiceClient = getQSU();
    const queueNamePrefix = recorder.getUniqueName("queue");

    for (let i = 0; i < 4; i++) {
      const queueClient = queueServiceClient.getQueueClient(`${queueNamePrefix}x${i}`);
      await queueClient.create({ metadata: { key: "val" } });
      queueClients.push(queueClient);
    }

    let iter = queueServiceClient
      .listQueues({
        includeMetadata: true,
        prefix: queueNamePrefix
      })
      .byPage({ maxPageSize: 2 });
    let item = (await iter.next()).value;
    // Gets 2 queues
    if (item.queueItems) {
      for (const queueItem of item.queueItems) {
        assert.ok(queueItem.name.startsWith(queueNamePrefix));
        assert.deepEqual(queueItem.metadata!.key, "val");
      }
    }
    // Gets next marker
    let marker = item.continuationToken;
    // Passing next marker as continuationToken
    iter = queueServiceClient
      .listQueues({
        includeMetadata: true,
        prefix: queueNamePrefix
      })
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    item = (await iter.next()).value;
    // Gets 2 queues
    for (const queueItem of item.queueItems!) {
      assert.ok(queueItem.name.startsWith(queueNamePrefix));
      assert.deepEqual(queueItem.metadata!.key, "val");
    }

    for (const queueClient of queueClients) {
      await queueClient.delete();
    }
  });

  it("getProperties with default/all parameters", async () => {
    const queueServiceClient = getQSU();
    const result = await queueServiceClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(result.clientRequestId);
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

    serviceProperties.queueAnalyticsLogging = {
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
    await delay(5 * 1000);

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
        assert.ok(result.geoReplication!.lastSyncOn);
        done();
      })
      .catch(done);
  });

  it("can be created from a sas connection string", async () => {
    const newClient = QueueServiceClient.fromConnectionString(
      getSASConnectionStringFromEnvironment()
    );

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("can create and delete a queue", async () => {
    const queueServiceClient = getQSU();
    const queueName = recorder.getUniqueName("queue");

    // creates a queue
    await queueServiceClient.createQueue(queueName);
    const metadata = {
      key0: "val0",
      keya: "vala"
    };
    await queueServiceClient.getQueueClient(queueName).setMetadata(metadata);

    const result = await getQSU()
      .getQueueClient(queueName)
      .getProperties();
    assert.deepEqual(result.metadata, metadata);

    // deletes the queue
    await queueServiceClient.deleteQueue(queueName);

    let err;
    try {
      await queueServiceClient.getQueueClient(queueName).getProperties();
    } catch (error) {
      err = error;
    }
    assert.equal(err.details.errorCode, "QueueNotFound", "Error does not contain details property");
    assert.ok(err.message.includes("QueueNotFound"), "Error doesn't say `QueueNotFound`");
  });
});
