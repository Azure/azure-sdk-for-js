// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError, URL } from "@azure/core-https";
import * as assert from "assert";
import * as dotenv from "dotenv";

import { AbortController } from "@azure/abort-controller";
import { ContainerClient, BlobServiceClient } from "../src";
import { newPipeline, Pipeline } from "../src";
import { getBSU, recorderEnvSetup } from "./utils";
import { record, Recorder } from "@azure/test-utils-recorder";
import { InjectorPolicy } from "./utils/InjectorPolicy";

dotenv.config();

describe("RetryPolicy", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async function() {
    await containerClient.delete();
    await recorder.stop();
  });

  it("Retry Policy should work when first request fails with 500", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicy(() => {
      if (injectCounter === 0) {
        injectCounter++;
        return new RestError("Server Internal Error", {
          code: "ServerInternalError",
          statusCode: 500
        });
      }
      return;
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

    assert.equal(injectCounter, 1);
    const result = await containerClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("Retry Policy should abort when abort event trigger during retry interval", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicy(() => {
      if (injectCounter < 2) {
        injectCounter++;
        return new RestError("Server Internal Error", {
          code: "ServerInternalError",
          statusCode: 500
        });
      }
      return;
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

    let hasError = false;
    try {
      // Default exponential retry delay is 4000ms. Wait for 2000ms to abort which makes sure the aborter
      // happens between 2 requests
      await injectContainerClient.setMetadata(metadata, {
        abortSignal: AbortController.timeout(2 * 1000)
      });
    } catch (err) {
      hasError = true;
    }
    assert.ok(hasError);
  });

  it("Retry Policy should failed when requests always fail with 500", async () => {
    const injector = new InjectorPolicy(() => {
      return new RestError("Server Internal Error", {
        code: "ServerInternalError",
        statusCode: 500
      });
    });

    const credential = (containerClient as any).pipeline.factories[
      (containerClient as any).pipeline.factories.length - 1
    ];
    const factories = newPipeline(credential, {
      retryOptions: { maxTries: 3 }
    }).factories;
    factories.addPolicy(injector);
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
    const injector = new InjectorPolicy(() => {
      if (injectCounter++ < 1) {
        return new RestError("Server Internal Error", {
          code: "ServerInternalError",
          statusCode: 500
        });
      }
      return;
    });

    const url = blobServiceClient.url;
    const urlParsed = new URL(url);
    const host = urlParsed.host;
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
    factories.addPolicy(injector);
    const pipeline = new Pipeline(factories);
    const injectContainerClient = new ContainerClient(containerClient.url, pipeline);

    let finalRequestURL = "";
    try {
      await injectContainerClient.getProperties({
        onResponse: (rawResponse) => {
          finalRequestURL = rawResponse.request.url;
        }
      });
    } catch (err) {
      finalRequestURL = err.request ? err.request.url : "";
    }

    assert.deepStrictEqual(new URL(finalRequestURL).host, secondaryHost);
  });

  it("Retry Policy should work when on PARSE_ERROR with unclosed root tag", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicy(() => {
      if (injectCounter === 0) {
        injectCounter++;
        return new RestError(`Error "Error: Unclosed root tag`, { code: RestError.PARSE_ERROR });
      }
      return;
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

    assert.equal(injectCounter, 1);
    const result = await containerClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });
});
