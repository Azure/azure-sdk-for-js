import * as assert from "assert";
import { getQSU, getSASConnectionStringFromEnvironment } from "./utils";
import { record } from "./utils/recorder";
import * as dotenv from "dotenv";
import { QueueClient } from "../src";
dotenv.config({ path: "../.env" });

describe("QueueClient", () => {
  const queueServiceClient = getQSU();
  let queueName: string;
  let queueClient: QueueClient;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    queueName = recorder.getUniqueName("queue");
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async function() {
    await queueClient.delete();
    recorder.stop();
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

  it("getProperties negative", async () => {
    const queueName2 = recorder.getUniqueName("queue", "queue2");
    const queueClient2 = queueServiceClient.getQueueClient(queueName2);
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
    const qClient = queueServiceClient.getQueueClient(recorder.getUniqueName(queueName));
    const metadata = { key: "value" };
    await qClient.create({ metadata });
    const result = await qClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  // create with invalid queue name
  it("create negative", async () => {
    const qClient = queueServiceClient.getQueueClient("");
    let error;
    try {
      await qClient.create();
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

  it("can be created with a sas connection string and a queue name", async () => {
    const newClient = new QueueClient(getSASConnectionStringFromEnvironment(), queueName);

    const result = await newClient.getProperties();

    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a sas connection string and a queue name and an option bag", async () => {
    const newClient = new QueueClient(getSASConnectionStringFromEnvironment(), queueName);

    const result = await newClient.getProperties();

    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("throws error if constructor queueName parameter is empty", async () => {
    try {
      // tslint:disable-next-line: no-unused-expression
      new QueueClient(getSASConnectionStringFromEnvironment(), "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error) {
      assert.equal(
        "Expecting non-empty strings for queueName parameter",
        error.message,
        "Error message is different than expected."
      );
    }
  });
});
