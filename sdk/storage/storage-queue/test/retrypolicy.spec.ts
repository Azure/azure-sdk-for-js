import { URLBuilder } from "@azure/core-http";
import * as assert from "assert";
import { QueueClient, RestError, newPipeline, QueueServiceClient } from "../src";
import * as dotenv from "dotenv";
import { AbortController } from "@azure/abort-controller";
import { Pipeline } from "../src/Pipeline";
import { getQSU } from "./utils";
import { InjectorPolicyFactory } from "./utils/InjectorPolicyFactory";
import { record, Recorder } from "@azure/test-utils-recorder";
import { recorderEnvSetup } from "./utils/index.browser";

dotenv.config();

describe("RetryPolicy", () => {
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

  it("Retry policy should work when first request fails with 500", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter === 0) {
        injectCounter++;
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
    });
    const factories = (queueClient as any).pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectqueueClient = new QueueClient(queueClient.url, pipeline);

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await injectqueueClient.setMetadata(metadata);

    const result = await queueClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("Retry Policy should abort when abort event trigger during retry interval", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter < 2) {
        injectCounter++;
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
    });

    const factories = (queueClient as any).pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectqueueClient = new QueueClient(queueClient.url, pipeline);

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };

    let hasError = false;
    try {
      // Default exponential retry delay is 4000ms. Wait for 2000ms to abort which makes sure the aborter
      // happens between 2 requests
      await injectqueueClient.setMetadata(metadata, {
        abortSignal: AbortController.timeout(2 * 1000)
      });
    } catch (err) {
      hasError = true;
    }
    assert.ok(hasError);
  });

  it("Retry policy should failed when requests always fail with 500", async () => {
    const injector = new InjectorPolicyFactory(() => {
      return new RestError("Server Internal Error", "ServerInternalError", 500);
    });

    const credential = (queueClient as any).pipeline.factories[
      (queueClient as any).pipeline.factories.length - 1
    ];
    const factories = newPipeline(credential, {
      retryOptions: { maxTries: 3 }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectqueueClient = new QueueClient(queueClient.url, pipeline);

    let hasError = false;
    try {
      const metadata = {
        key0: "val0",
        keya: "vala",
        keyb: "valb"
      };
      await injectqueueClient.setMetadata(metadata);
    } catch (err) {
      hasError = true;
    }
    assert.ok(hasError);
  });

  it("Retry policy should work for secondary endpoint", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter++ < 1) {
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
    });

    const url = queueServiceClient.url;
    const urlParsed = URLBuilder.parse(url);
    const host = urlParsed.getHost()!;
    const hostParts = host.split(".");
    const account = hostParts.shift();
    const secondaryAccount = `${account}-secondary`;
    hostParts.unshift(secondaryAccount);
    const secondaryHost = hostParts.join(".");

    const credential = (queueClient as any).pipeline.factories[
      (queueClient as any).pipeline.factories.length - 1
    ];
    const factories = newPipeline(credential, {
      retryOptions: { maxTries: 2, secondaryHost }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectqueueClient = new QueueClient(queueClient.url, pipeline);

    let finalRequestURL = "";
    try {
      const response = await injectqueueClient.getProperties();
      finalRequestURL = response._response.request.url;
    } catch (err) {
      finalRequestURL = err.request ? err.request.url : "";
    }

    assert.deepStrictEqual(URLBuilder.parse(finalRequestURL).getHost(), secondaryHost);
  });
});
