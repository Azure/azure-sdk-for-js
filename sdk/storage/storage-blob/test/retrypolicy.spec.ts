import { URLBuilder } from "@azure/core-http";
import * as assert from "assert";

import { ContainerClient, RestError } from "../src";
import { newPipeline, Pipeline } from "../src/Pipeline";
import { getBSU } from "./utils";
import { InjectorPolicyFactory } from "./utils/InjectorPolicyFactory";
import { record } from "./utils/recorder";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("RetryPolicy", () => {
  const blobServiceClient = getBSU();
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async function() {
    await containerClient.delete();
    recorder.stop();
  });

  it("Retry Policy should work when first request fails with 500", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter === 0) {
        injectCounter++;
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
    });
    const factories = (containerClient as any).pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectContainerClient = new ContainerClient(containerClient.url, pipeline);

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await injectContainerClient.setMetadata(metadata);

    const result = await containerClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("Retry Policy should failed when requests always fail with 500", async () => {
    const injector = new InjectorPolicyFactory(() => {
      return new RestError("Server Internal Error", "ServerInternalError", 500);
    });

    const credential = (containerClient as any).pipeline.factories[
      (containerClient as any).pipeline.factories.length - 1
    ];
    const factories = newPipeline(credential, {
      retryOptions: { maxTries: 3 }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectContainerClient = new ContainerClient(containerClient.url, pipeline);

    let hasError = false;
    try {
      const metadata = {
        key0: "val0",
        keya: "vala",
        keyb: "valb"
      };
      await injectContainerClient.setMetadata(metadata);
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

    const url = blobServiceClient.url;
    const urlParsed = URLBuilder.parse(url);
    const host = urlParsed.getHost()!;
    const hostParts = host.split(".");
    const account = hostParts.shift();
    const secondaryAccount = `${account}-secondary`;
    hostParts.unshift(secondaryAccount);
    const secondaryHost = hostParts.join(".");

    const credential = (containerClient as any).pipeline.factories[
      (containerClient as any).pipeline.factories.length - 1
    ];
    const factories = newPipeline(credential, {
      retryOptions: { maxTries: 2, secondaryHost }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectContainerClient = new ContainerClient(containerClient.url, pipeline);

    let finalRequestURL = "";
    try {
      const response = await injectContainerClient.getProperties();
      finalRequestURL = response._response.request.url;
    } catch (err) {
      finalRequestURL = err.request ? err.request.url : "";
    }

    assert.deepStrictEqual(URLBuilder.parse(finalRequestURL).getHost(), secondaryHost);
  });
});
