import { URLBuilder } from "@azure/ms-rest-js";
import * as assert from "assert";

import { RestError, StorageURL } from "../lib";
import { Aborter } from "../lib/Aborter";
import { QueueURL } from "../lib/QueueURL";
import { Pipeline } from "../lib/Pipeline";
import { getQSU, getUniqueName } from "./utils";
import { InjectorPolicyFactory } from "./utils/InjectorPolicyFactory";

describe("RetryPolicy", () => {
  const serviceURL = getQSU();
  let queueName: string = getUniqueName("queue");
  let queueURL = QueueURL.fromServiceURL(serviceURL, queueName);

  beforeEach(async () => {
    queueName = getUniqueName("queue");
    queueURL = QueueURL.fromServiceURL(serviceURL, queueName);
    await queueURL.create(Aborter.none);
  });

  afterEach(async () => {
    await queueURL.delete(Aborter.none);
  });

  it("Retry policy should work when first request fails with 500", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter === 0) {
        injectCounter++;
        return new RestError(
          "Server Internal Error",
          "ServerInternalError",
          500
        );
      }
    });
    const factories = queueURL.pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectqueueURL = queueURL.withPipeline(pipeline);

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await injectqueueURL.setMetadata(Aborter.none, metadata);

    const result = await queueURL.getProperties(Aborter.none);
    assert.deepEqual(result.metadata, metadata);
  });

  it("Retry policy should failed when requests always fail with 500", async () => {
    const injector = new InjectorPolicyFactory(() => {
      return new RestError("Server Internal Error", "ServerInternalError", 500);
    });

    const credential =
      queueURL.pipeline.factories[
        queueURL.pipeline.factories.length - 1
      ];
    const factories = StorageURL.newPipeline(credential, {
      retryOptions: { maxTries: 3 }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectqueueURL = queueURL.withPipeline(pipeline);

    let hasError = false;
    try {
      const metadata = {
        key0: "val0",
        keya: "vala",
        keyb: "valb"
      };
      await injectqueueURL.setMetadata(Aborter.none, metadata);
    } catch (err) {
      hasError = true;
    }
    assert.ok(hasError);
  });

  it("Retry policy should work for secondary endpoint", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter++ < 1) {
        return new RestError(
          "Server Internal Error",
          "ServerInternalError",
          500
        );
      }
    });

    const url = serviceURL.url;
    const urlParsed = URLBuilder.parse(url);
    const host = urlParsed.getHost()!;
    const hostParts = host.split(".");
    const account = hostParts.shift();
    const secondaryAccount = `${account}-secondary`;
    hostParts.unshift(secondaryAccount);
    const secondaryHost = hostParts.join(".");

    const credential =
      queueURL.pipeline.factories[
        queueURL.pipeline.factories.length - 1
      ];
    const factories = StorageURL.newPipeline(credential, {
      retryOptions: { maxTries: 2, secondaryHost }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectqueueURL = queueURL.withPipeline(pipeline);

    let finalRequestURL = "";
    try {
      const response = await injectqueueURL.getProperties(Aborter.none);
      finalRequestURL = response._response.request.url;
    } catch (err) {
      finalRequestURL = err.request ? err.request.url : "";
    }

    assert.deepStrictEqual(
      URLBuilder.parse(finalRequestURL).getHost(),
      secondaryHost
    );
  });
});
