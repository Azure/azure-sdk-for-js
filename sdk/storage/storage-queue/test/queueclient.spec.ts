import * as assert from "assert";

import { getQSU, getUniqueName } from "./utils";
import * as dotenv from "dotenv";
import { SharedKeyCredential, QueueClient, StorageClient } from '../src';
dotenv.config({ path: "../.env" });

describe("QueueClient", () => {
  const queueServiceClient = getQSU();
  let queueName = getUniqueName("queue");
  let queueClient = queueServiceClient.createQueueClient(queueName);

  beforeEach(async () => {
    queueName = getUniqueName("queue");
    queueClient = queueServiceClient.createQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async () => {
    await queueClient.delete();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await queueClient.setMetadata(metadata);

    const result = await queueClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("getProperties with default/all parameters", async () => {
    const result = await queueClient.getProperties();
    assert.ok(result.approximateMessagesCount! >= 0);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("getPropertis negative", async () => {
    const queueName2 = getUniqueName("queue");
    const queueClient2 = queueServiceClient.createQueueClient(queueName2);
    let error;
    try {
      await queueClient2.getProperties();
    } catch (err) {
      error = err;
    }
    assert.ok(error);
    assert.ok(error.statusCode);
    assert.deepEqual(error.statusCode, 404);
    assert.ok(error.response);
    assert.ok(error.response.body);
    assert.ok(error.response.body.includes("QueueNotFound"));
  });

  it("create with default parameters", (done) => {
    // create() with default parameters has been tested in beforeEach
    done();
  });

  it("create with all parameters", async () => {
    const qURL = queueServiceClient.createQueueClient(getUniqueName(queueName));
    const metadata = { key: "value" };
    await qURL.create({ metadata });
    const result = await qURL.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  // create with invalid queue name
  it("create negative", async () => {
    const qURL = queueServiceClient.createQueueClient("");
    let error;
    try {
      await qURL.create();
    } catch (err) {
      error = err;
    }
    assert.ok(error);
    assert.ok(error.statusCode);
    assert.deepEqual(error.statusCode, 400);
    assert.ok(error.response);
    assert.ok(error.response.body);
    assert.ok(error.response.body.includes("InvalidResourceName"));
  });

  it("delete", (done) => {
    // delete() with default parameters has been tested in afterEach
    done();
  });

  // getAccessPolicy and setAccessPolicy is in node's cases.
  it("setAccessPolicy negative", async () => {
    const queueAcl = [
      {
        accessPolicy: {
          expiry: new Date("2018-12-31T11:22:33.4567890Z"),
          permission: "rwdl",
          start: new Date("2017-12-31T11:22:33.4567890Z")
        },
        id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI="
      }
    ];

    let error;
    try {
      await queueClient.setAccessPolicy(queueAcl);
    } catch (err) {
      error = err;
    }
    assert.ok(error); // For browser, permission denied; For node, invalid permission
  });

  it("can be created with a url and a credential", async () => {
    const factories = queueClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const newClient = new QueueClient(queueClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(result.approximateMessagesCount! >= 0);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a url and a pipeline", async () => {
    const factories = queueClient.pipeline.factories;
    const credential = factories[factories.length - 1] as SharedKeyCredential;
    const pipeline = StorageClient.newPipeline(credential);
    const newClient = new QueueClient(queueClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(result.approximateMessagesCount! >= 0);
    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });
});
