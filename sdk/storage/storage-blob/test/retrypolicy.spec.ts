// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Pipeline } from "@azure/core-rest-pipeline";

import { AbortController } from "@azure/abort-controller";
import { ContainerClient, RestError, BlobServiceClient } from "../src";
import { getBSU, recorderEnvSetup } from "./utils";
import { injectorPolicy, injectorPolicyName } from "./utils/InjectorPolicy";
import { record, Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("RetryPolicy", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async function () {
    const pipeline: Pipeline = (containerClient as any).storageClientContext.pipeline;
    pipeline.removePolicy({ name: injectorPolicyName });
    await containerClient.delete();
    await recorder.stop();
  });

  it("Retry Policy should work when first request fails with 500", async () => {
    let injectCounter = 0;
    const injector = injectorPolicy(() => {
      if (injectCounter === 0) {
        injectCounter++;
        return new RestError("Server Internal Error", {
          code: "ServerInternalError",
          statusCode: 500,
        });
      }
      return;
    });

    const pipeline: Pipeline = (containerClient as any).storageClientContext.pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    await containerClient.setMetadata(metadata);

    assert.equal(injectCounter, 1);
    const result = await containerClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("Retry Policy should abort when abort event trigger during retry interval", async () => {
    let injectCounter = 0;
    const injector = injectorPolicy(() => {
      if (injectCounter < 2) {
        injectCounter++;
        return new RestError("Server Internal Error", {
          code: "ServerInternalError",
          statusCode: 500,
        });
      }
      return;
    });

    const pipeline: Pipeline = (containerClient as any).storageClientContext.pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };

    let hasError = false;
    try {
      // Default exponential retry delay is 4000ms. Wait for 2000ms to abort which makes sure the aborter
      // happens between 2 requests
      await containerClient.setMetadata(metadata, {
        abortSignal: AbortController.timeout(2 * 1000),
      });
    } catch (err: any) {
      hasError = true;
    }
    assert.ok(hasError);
  });

  it("Retry Policy should failed when requests always fail with 500", async () => {
    const injector = injectorPolicy(() => {
      return new RestError("Server Internal Error", {
        code: "ServerInternalError",
        statusCode: 500,
      });
    });

    blobServiceClient = getBSU({ retryOptions: { maxTries: 3 } });
    containerClient = blobServiceClient.getContainerClient(containerName);
    const pipeline: Pipeline = (containerClient as any).storageClientContext.pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });

    let hasError = false;
    try {
      const metadata = {
        key0: "val0",
        keya: "vala",
        keyb: "valb",
      };
      await containerClient.setMetadata(metadata);
    } catch (err: any) {
      hasError = true;
    }
    assert.ok(hasError);
  });

  it("Retry Policy should work for secondary endpoint", async () => {
    let injectCounter = 0;
    const injector = injectorPolicy(() => {
      if (injectCounter++ < 1) {
        return new RestError("Server Internal Error", {
          code: "ServerInternalError",
          statusCode: 500,
        });
      }
      return;
    });

    const url = blobServiceClient.url;
    const urlParsed = new URL(url);
    const host = urlParsed.hostname;
    const hostParts = host.split(".");
    const account = hostParts.shift();
    const secondaryAccount = `${account}-secondary`;
    hostParts.unshift(secondaryAccount);
    const secondaryHost = hostParts.join(".");

    blobServiceClient = getBSU({ retryOptions: { maxTries: 2, secondaryHost } });
    containerClient = blobServiceClient.getContainerClient(containerName);

    const pipeline: Pipeline = (containerClient as any).storageClientContext.pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });

    let finalRequestURL = "";
    try {
      const response = await containerClient.getProperties();
      finalRequestURL = response._response.request.url;
    } catch (err: any) {
      finalRequestURL = err.request ? err.request.url : "";
    }

    assert.deepStrictEqual(new URL(finalRequestURL).hostname, secondaryHost);
  });

  it("Retry Policy should work when on PARSE_ERROR with unclosed root tag", async () => {
    let injectCounter = 0;
    const injector = injectorPolicy(() => {
      if (injectCounter === 0) {
        injectCounter++;
        return new RestError(`Error "Error: Unclosed root tag`, { code: "PARSE_ERROR" });
      }
      return;
    });
    const pipeline: Pipeline = (containerClient as any).storageClientContext.pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    await containerClient.setMetadata(metadata);

    assert.equal(injectCounter, 1);
    const result = await containerClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });
});
