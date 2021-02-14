import * as assert from "assert";
import { getQSU, getSASConnectionStringFromEnvironment } from "./utils";
import * as dotenv from "dotenv";
import { QueueClient, QueueServiceClient } from "../src";
import { TestTracer, setTracer, SpanGraph } from "@azure/core-tracing";
import { URLBuilder, RestError } from "@azure/core-http";
import { Recorder, record } from "@azure/test-utils-recorder";
import { recorderEnvSetup } from "./utils/testutils.common";
dotenv.config();

describe("QueueClient", () => {
  let queueServiceClient: QueueServiceClient;
  let queueName: string;
  let queueClient: QueueClient;

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    queueServiceClient = getQSU();
    queueName = recorder.getUniqueName("queue");
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async function() {
    await queueClient.delete();
    await recorder.stop();
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
    let error: RestError | undefined;
    try {
      await queueClient2.getProperties();
    } catch (err) {
      error = err;
    }
    assert.ok(error);
    assert.ok(error!.statusCode);
    assert.deepEqual(error!.statusCode, 404);
    assert.ok(error!.response);
    assert.ok(error!.response!.bodyAsText);
    assert.ok(error!.response!.bodyAsText!.includes("QueueNotFound"));
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

  it("exists", async () => {
    assert.ok(await queueClient.exists());

    const qClient = queueServiceClient.getQueueClient(recorder.getUniqueName(queueName));
    assert.ok(!(await qClient.exists()));
  });

  it("createIfNotExists", async () => {
    const res = await queueClient.createIfNotExists();
    assert.ok(!res.succeeded);

    const metadata = { key: "value" };
    const res2 = await queueClient.createIfNotExists({ metadata });
    assert.ok(!res2.succeeded);
    assert.equal(res2.errorCode, "QueueAlreadyExists");

    queueClient = queueServiceClient.getQueueClient(recorder.getUniqueName("queue2"));
    const res3 = await queueClient.createIfNotExists();
    assert.ok(res3.succeeded);
  });

  it("deleteIfExists", async () => {
    const qClient = queueServiceClient.getQueueClient(recorder.getUniqueName(queueName));
    const res = await qClient.deleteIfExists();
    assert.ok(!res.succeeded);
    assert.equal(res.errorCode, "QueueNotFound");

    await qClient.create();
    const res2 = await qClient.deleteIfExists();
    assert.ok(res2.succeeded);
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

  it("getProperties with tracing", async () => {
    const tracer = new TestTracer();
    setTracer(tracer);
    const rootSpan = tracer.startSpan("root");
    await queueClient.getProperties({
      tracingOptions: { spanOptions: { parent: rootSpan.context() } }
    });
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

describe("QueueClient - Verify Name Properties", () => {
  let queueName = "queueName";
  let accountName = "myAccount";

  function verifyNameProperties(url: string, accountName: string, queueName: string) {
    const newClient = new QueueClient(url);
    assert.equal(newClient.name, queueName, "Queue name is not the same as the one provided.");
    assert.equal(
      newClient.accountName,
      accountName,
      "Account name is not the same as the one provided."
    );
  }

  it("verify accountName and queueName passed to the client - Endpoint from the portal", async () => {
    verifyNameProperties(
      `https://${accountName}.queue.core.windows.net/` + queueName,
      accountName,
      queueName
    );
  });

  it("verify accountName and queueName passed to the client - IPv4 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://192.0.0.10:1900/${accountName}/${queueName}`,
      accountName,
      queueName
    );
  });

  it("verify accountName and queueName passed to the client - IPv6 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${queueName}`,
      accountName,
      queueName
    );
  });

  it("verify accountName and queueName passed to the client - Endpoint without dots", async () => {
    verifyNameProperties(
      `https://localhost:80/${accountName}/${queueName}`,
      accountName,
      queueName
    );
  });

  it("verify custom endpoint without valid accountName", async () => {
    const newClient = new QueueClient(`https://customdomain.com/${queueName}`);
    assert.equal(newClient.accountName, "", "Account name is not the same as expected.");
    assert.equal(newClient.name, queueName, "Queue name is not the same as the one provided.");
  });
});
