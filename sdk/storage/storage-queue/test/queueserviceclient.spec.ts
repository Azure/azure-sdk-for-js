import * as assert from "assert";
import * as dotenv from "dotenv";
import { QueueServiceClient } from "../src/QueueServiceClient";
import { getAlternateQSU, getQSU, wait } from "./utils";
import { TokenCredential } from '@azure/core-http';
import { assertClientUsesTokenCredential } from './utils/assert';
import { record } from "./utils/recorder";
dotenv.config({ path: "../.env" });

describe("QueueServiceClient", () => {
  let recorder: any;

  beforeEach(function () {
    recorder = record(this);
  });

  afterEach(() => {
    recorder.stop();
  });

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

    const queueNamePrefix = recorder.getUniqueName("queue");
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

  it("Verify PagedAsyncIterableIterator for listQueues", async () => {
    const queueServiceClient = getQSU();

    const queueNamePrefix = recorder.getUniqueName("queue");
    const queueName1 = `${queueNamePrefix}x1`;
    const queueName2 = `${queueNamePrefix}x2`;

    const queueClient1 = queueServiceClient.createQueueClient(queueName1);
    const queueClient2 = queueServiceClient.createQueueClient(queueName2);
    await queueClient1.create({ metadata: { key: "val" } });
    await queueClient2.create({ metadata: { key: "val" } });

    for await (const item of queueServiceClient.listQueues({
      include: "metadata",
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

    const queueClient1 = queueServiceClient.createQueueClient(queueName1);
    const queueClient2 = queueServiceClient.createQueueClient(queueName2);
    await queueClient1.create({ metadata: { key: "val" } });
    await queueClient2.create({ metadata: { key: "val" } });

    let iter1 = await queueServiceClient.listQueues({
      include: "metadata",
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
      const queueClient = queueServiceClient.createQueueClient(`${queueNamePrefix}x${i}`);
      await queueClient.create({ metadata: { key: "val" } });
      queueClients.push(queueClient);
    }

    for await (const response of queueServiceClient
      .listQueues({
        include: "metadata",
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
      const queueClient = queueServiceClient.createQueueClient(`${queueNamePrefix}x${i}`);
      await queueClient.create({ metadata: { key: "val" } });
      queueClients.push(queueClient);
    }

    let iter = queueServiceClient
      .listQueues({
        include: "metadata",
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
    let marker = item.nextMarker;
    // Passing next marker as continuationToken
    iter = queueServiceClient
      .listQueues({
        include: "metadata",
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

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () => Promise.resolve({
        token: 'token',
        expiresOnTimestamp: 12345
      })
    }
    const newClient = new QueueServiceClient("https://queue", tokenCredential);
    assertClientUsesTokenCredential(newClient);
  });
});
