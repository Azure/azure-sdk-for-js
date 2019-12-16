import * as assert from "assert";
import { getQSU, getSASConnectionStringFromEnvironment } from "./utils";
import { record, Recorder } from "@azure/test-utils-recorder";
import * as dotenv from "dotenv";
import { QueueClient } from "../src";
import { TestTracer, setTracer, SpanGraph } from "@azure/core-tracing";
import { setupEnvironment } from "./utils/testutils.common";
import { URLBuilder } from "@azure/core-http";
dotenv.config({ path: "../.env" });

describe("QueueClient", () => {
  setupEnvironment();
  const queueServiceClient = getQSU();
  let queueName: string;
  let queueClient: QueueClient;

  let recorder: Recorder;

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
    assert.ok(result.clientRequestId);
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
    let error;
    try {
      const qClient = queueServiceClient.getQueueClient("");
      await qClient.create();
    } catch (err) {
      error = err;
    }
    assert.ok(error);
    assert.equal(
      error.message,
      "Unable to extract queueName with provided information.",
      "Unexpected error caught: " + error
    );
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
          expiresOn: new Date("2018-12-31T11:22:33.4567890Z"),
          permissions: "rwdl",
          startsOn: new Date("2017-12-31T11:22:33.4567890Z")
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
    const newClient = new QueueClient(getSASConnectionStringFromEnvironment(), queueName, {
      retryOptions: {
        maxTries: 5
      }
    });

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

  it("verify accountName and queueName passed to the client", async () => {
    const accountName = "myaccount";
    const newClient = new QueueClient(`https://${accountName}.queue.core.windows.net/` + queueName);
    assert.equal(newClient.name, queueName, "Queue name is not the same as the one provided.");
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided."
    );
  });

  it("getProperties with tracing", async () => {
    const tracer = new TestTracer();
    setTracer(tracer);
    const rootSpan = tracer.startSpan("root");
    await queueClient.getProperties({ tracingOptions: { spanOptions: { parent: rootSpan } } });
    rootSpan.end();

    const rootSpans = tracer.getRootSpans();
    assert.strictEqual(rootSpans.length, 1, "Should only have one root span.");
    assert.strictEqual(rootSpan, rootSpans[0], "The root span should match what was passed in.");

    const urlPath = URLBuilder.parse(queueClient.url).getPath() || "";

    const expectedGraph: SpanGraph = {
      roots: [
        {
          name: rootSpan.name,
          children: [
            {
              name: "Azure.Storage.Queue.QueueClient-getProperties",
              children: [
                {
                  name: urlPath,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    };

    assert.deepStrictEqual(tracer.getSpanGraph(rootSpan.context().traceId), expectedGraph);
    assert.strictEqual(tracer.getActiveSpans().length, 0, "All spans should have had end called");
  });
});
