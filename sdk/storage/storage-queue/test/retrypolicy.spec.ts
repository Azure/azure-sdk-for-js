import { URLBuilder } from "@azure/ms-rest-js";
import * as assert from "assert";

import { RestError, StorageClient } from "../src";
import { QueueClient } from "../src/QueueClient";
import { Pipeline } from "../src/Pipeline";
import { getQSU, getUniqueName } from "./utils";
import { InjectorPolicyFactory } from "./utils/InjectorPolicyFactory";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("RetryPolicy", () => {
  const queueServiceClient = getQSU();
  let queueName: string = getUniqueName("queue");
  let queueClient = QueueClient.fromQueueServiceClient(queueServiceClient, queueName);

  beforeEach(async () => {
    queueName = getUniqueName("queue");
    queueClient = QueueClient.fromQueueServiceClient(queueServiceClient, queueName);
    await queueClient.create();
  });

  afterEach(async () => {
    await queueClient.delete();
  });

  it("Retry policy should work when first request fails with 500", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter === 0) {
        injectCounter++;
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
    });
    const factories = queueClient.pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectqueueClient = queueClient.withPipeline(pipeline);

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await injectqueueClient.setMetadata(metadata);

    const result = await queueClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("Retry policy should failed when requests always fail with 500", async () => {
    const injector = new InjectorPolicyFactory(() => {
      return new RestError("Server Internal Error", "ServerInternalError", 500);
    });

    const credential = queueClient.pipeline.factories[queueClient.pipeline.factories.length - 1];
    const factories = StorageClient.newPipeline(credential, {
      retryOptions: { maxTries: 3 }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectqueueClient = queueClient.withPipeline(pipeline);

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

    const credential = queueClient.pipeline.factories[queueClient.pipeline.factories.length - 1];
    const factories = StorageClient.newPipeline(credential, {
      retryOptions: { maxTries: 2, secondaryHost }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectqueueClient = queueClient.withPipeline(pipeline);

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
