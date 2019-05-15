import { URLBuilder } from "@azure/ms-rest-js";
import * as assert from "assert";

import { RestError, StorageClient } from "../src";
import { Aborter } from "../src/Aborter";
import { ContainerClient } from "../src/ContainerClient";
import { Pipeline } from "../src/Pipeline";
import { getBSU, getUniqueName } from "./utils";
import { InjectorPolicyFactory } from "./utils/InjectorPolicyFactory";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("RetryPolicy", () => {
  const serviceClient = getBSU();
  let containerName: string = getUniqueName("container");
  let containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);

  beforeEach(async () => {
    containerName = getUniqueName("container");
    containerClient = ContainerClient.fromServiceClient(serviceClient, containerName);
    await containerClient.create(Aborter.none);
  });

  afterEach(async () => {
    await containerClient.delete(Aborter.none);
  });

  it("Retry Policy should work when first request fails with 500", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter === 0) {
        injectCounter++;
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
    });
    const factories = containerClient.pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectContainerClient = containerClient.withPipeline(pipeline);

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await injectContainerClient.setMetadata(Aborter.none, metadata);

    const result = await containerClient.getProperties(Aborter.none);
    assert.deepEqual(result.metadata, metadata);
  });

  it("Retry Policy should failed when requests always fail with 500", async () => {
    const injector = new InjectorPolicyFactory(() => {
      return new RestError("Server Internal Error", "ServerInternalError", 500);
    });

    const credential =
      containerClient.pipeline.factories[containerClient.pipeline.factories.length - 1];
    const factories = StorageClient.newPipeline(credential, {
      retryOptions: { maxTries: 3 }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectContainerClient = containerClient.withPipeline(pipeline);

    let hasError = false;
    try {
      const metadata = {
        key0: "val0",
        keya: "vala",
        keyb: "valb"
      };
      await injectContainerClient.setMetadata(Aborter.none, metadata);
    } catch (err) {
      hasError = true;
    }
    assert.ok(hasError);
  });

  it("Retry Policy should work for secondary endpoint", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter++ < 1) {
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
    });

    const url = serviceClient.url;
    const urlParsed = URLBuilder.parse(url);
    const host = urlParsed.getHost()!;
    const hostParts = host.split(".");
    const account = hostParts.shift();
    const secondaryAccount = `${account}-secondary`;
    hostParts.unshift(secondaryAccount);
    const secondaryHost = hostParts.join(".");

    const credential =
      containerClient.pipeline.factories[containerClient.pipeline.factories.length - 1];
    const factories = StorageClient.newPipeline(credential, {
      retryOptions: { maxTries: 2, secondaryHost }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectContainerClient = containerClient.withPipeline(pipeline);

    let finalRequestURL = "";
    try {
      const response = await injectContainerClient.getProperties(Aborter.none);
      finalRequestURL = response._response.request.url;
    } catch (err) {
      finalRequestURL = err.request ? err.request.url : "";
    }

    assert.deepStrictEqual(URLBuilder.parse(finalRequestURL).getHost(), secondaryHost);
  });
});
