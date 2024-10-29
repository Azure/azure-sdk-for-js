// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getQSU,
  getSASConnectionStringFromEnvironment,
  configureStorageClient,
  getUniqueName,
  recorderEnvSetup,
  uriSanitizers,
} from "./utils";
import { QueueClient, QueueServiceClient } from "../src";
import { assert } from "@azure-tools/test-utils";
import { RestError } from "@azure/core-rest-pipeline";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("QueueClient", () => {
  let queueServiceClient: QueueServiceClient;
  let queueName: string;
  let queueClient: QueueClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    queueServiceClient = getQSU(recorder);
    queueName = recorder.variable("queue", getUniqueName("queue"));
    queueClient = queueServiceClient.getQueueClient(queueName);
    await queueClient.create();
  });

  afterEach(async function () {
    await queueClient.delete();
    await recorder.stop();
  });

  it("setMetadata", async () => {
    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
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
    const queueName2 = recorder.variable("queue2", getUniqueName("queue2"));
    const queueClient2 = queueServiceClient.getQueueClient(queueName2);
    let error: RestError | undefined;
    try {
      await queueClient2.getProperties();
    } catch (err: any) {
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
    const qClient = queueServiceClient.getQueueClient(
      recorder.variable(queueName, getUniqueName(queueName)),
    );
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
    } catch (err: any) {
      error = err;
    }
    assert.ok(error);
    assert.equal(
      error.message,
      "Unable to extract queueName with provided information.",
      "Unexpected error caught: " + error,
    );
  });

  it("exists", async () => {
    assert.ok(await queueClient.exists());

    const qClient = queueServiceClient.getQueueClient(
      recorder.variable(queueName, getUniqueName(queueName)),
    );
    assert.ok(!(await qClient.exists()));
  });

  it("createIfNotExists", async () => {
    const res = await queueClient.createIfNotExists();
    assert.ok(!res.succeeded);

    const metadata = { key: "value" };
    const res2 = await queueClient.createIfNotExists({ metadata });
    assert.ok(!res2.succeeded);
    assert.equal(res2.errorCode, "QueueAlreadyExists");

    queueClient = queueServiceClient.getQueueClient(
      recorder.variable("queue2", getUniqueName("queue2")),
    );
    const res3 = await queueClient.createIfNotExists();
    assert.ok(res3.succeeded);
  });

  it("deleteIfExists", async () => {
    const qClient = queueServiceClient.getQueueClient(
      recorder.variable(queueName, getUniqueName(queueName)),
    );
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
          startsOn: new Date("2017-12-31T11:22:33.4567890Z"),
        },
        id: "6D97528B-8412-48AE-9DB1-6BF69C9F83A6",
      },
    ];

    let error;
    try {
      await queueClient.setAccessPolicy(queueAcl);
    } catch (err: any) {
      error = err;
    }
    assert.ok(error); // For browser, permission denied; For node, invalid permission
  });

  it("can be created with a sas connection string and a queue name", async () => {
    const newClient = new QueueClient(getSASConnectionStringFromEnvironment(recorder), queueName);
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("can be created with a sas connection string and a queue name and an option bag", async () => {
    const newClient = new QueueClient(getSASConnectionStringFromEnvironment(recorder), queueName, {
      retryOptions: {
        maxTries: 5,
      },
    });
    configureStorageClient(recorder, newClient);

    const result = await newClient.getProperties();

    assert.ok(result.requestId);
    assert.ok(result.version);
    assert.ok(result.date);
  });

  it("throws error if constructor queueName parameter is empty", async () => {
    try {
      new QueueClient(getSASConnectionStringFromEnvironment(recorder), "");
      assert.fail("Expecting an thrown error but didn't get one.");
    } catch (error: any) {
      assert.equal(
        "Expecting non-empty strings for queueName parameter",
        error.message,
        "Error message is different than expected.",
      );
    }
  });

  it("getProperties with tracing", async () => {
    await assert.supportsTracing(
      async (options) => {
        await queueClient.getProperties(options);
      },
      ["QueueClient-getProperties"],
    );
  });
});

describe("QueueClient - Verify Name Properties", () => {
  const queueName = "queueName";
  const accountName = "myaccount";

  function verifyNameProperties(url: string, inputAccountName: string, inputQueueName: string) {
    const newClient = new QueueClient(url);
    assert.equal(newClient.name, inputQueueName, "Queue name is not the same as the one provided.");
    assert.equal(
      newClient.accountName,
      inputAccountName,
      "Account name is not the same as the one provided.",
    );
  }

  it("verify accountName and queueName passed to the client - Endpoint from the portal", async () => {
    verifyNameProperties(
      `https://${accountName}.queue.core.windows.net/` + queueName,
      accountName,
      queueName,
    );
  });

  it("verify accountName and queueName passed to the client - IPv4 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://192.0.0.10:1900/${accountName}/${queueName}`,
      accountName,
      queueName,
    );
  });

  it("verify accountName and queueName passed to the client - IPv6 host address as Endpoint", async () => {
    verifyNameProperties(
      `https://[2001:db8:85a3:8d3:1319:8a2e:370:7348]:443/${accountName}/${queueName}`,
      accountName,
      queueName,
    );
  });

  it("verify accountName and queueName passed to the client - Endpoint without dots", async () => {
    verifyNameProperties(
      `https://localhost:80/${accountName}/${queueName}`,
      accountName,
      queueName,
    );
  });

  it("verify custom endpoint without valid accountName", async () => {
    const newClient = new QueueClient(`https://customdomain.com/${queueName}`);
    assert.equal(newClient.accountName, "", "Account name is not the same as expected.");
    assert.equal(newClient.name, queueName, "Queue name is not the same as the one provided.");
  });
});
