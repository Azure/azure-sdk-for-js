import * as assert from "assert";
import { getQSU, getConnectionStringFromEnvironment } from "../utils";
import { record, Recorder } from "@azure/test-utils-recorder";
import { QueueServiceClient } from "../../src/QueueServiceClient";
import { StorageSharedKeyCredential } from "../../src/credentials/StorageSharedKeyCredential";
import { newPipeline } from "../../src";
import { TokenCredential } from "@azure/core-http";
import { assertClientUsesTokenCredential } from "../utils/assert";
import { recorderEnvSetup } from "../utils/testutils.common";

describe("QueueServiceClient Node.js only", () => {
  let recorder: Recorder;

  beforeEach(function() {
    recorder = record(this, recorderEnvSetup);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("can be created with a url and a credential", async () => {
    const queueServiceClient = getQSU();
    const factories = (queueServiceClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const newClient = new QueueServiceClient(queueServiceClient.url, credential);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created with a url and a credential and an option bag", async () => {
    const queueServiceClient = getQSU();
    const factories = (queueServiceClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
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
    const factories = (queueServiceClient as any).pipeline.factories;
    const credential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const pipeline = newPipeline(credential);
    const newClient = new QueueServiceClient(queueServiceClient.url, pipeline);

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
    assert.ok(typeof result.version);
    assert.ok(result.version!.length > 0);
  });

  it("can be created from a connection string", async () => {
    const newClient = QueueServiceClient.fromConnectionString(getConnectionStringFromEnvironment());

    const result = await newClient.getProperties();

    assert.ok(typeof result.requestId);
    assert.ok(result.requestId!.length > 0);
  });

  it("can be created with a url and a TokenCredential", async () => {
    const tokenCredential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "token",
          expiresOnTimestamp: 12345
        })
    };
    const newClient = new QueueServiceClient(
      "https://accountname.queue.core.windows.net",
      tokenCredential
    );
    assertClientUsesTokenCredential(newClient);
  });
});
