// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Pipeline, PipelineRequest, SendRequest } from "@azure/core-rest-pipeline";

import { AbortController } from "@azure/abort-controller";
import { ContainerClient, RestError, BlobServiceClient } from "../src";
import { getBSU, getUniqueName, recorderEnvSetup, uriSanitizers } from "./utils";
import { injectorPolicy, injectorPolicyName } from "./utils/InjectorPolicy";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("RetryPolicy", () => {
  let blobServiceClient: BlobServiceClient;
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["playback", "record"]);
    blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.create();
  });

  afterEach(async function () {
    const pipeline: Pipeline = (containerClient as any).storageClientContext.pipeline;
    pipeline.removePolicy({ name: injectorPolicyName });
    await containerClient.delete();
    await recorder.stop();
  });

  it("Retry Policy should work when first request fails with 500", async function () {
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

  it("Retry Policy should abort when abort event trigger during retry interval", async function () {
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

  it("Retry Policy should failed when requests always fail with 500", async function () {
    const injector = injectorPolicy(() => {
      return new RestError("Server Internal Error", {
        code: "ServerInternalError",
        statusCode: 500,
      });
    });

    blobServiceClient = getBSU(recorder, { retryOptions: { maxTries: 3 } });
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

  it("Retry Policy should work for secondary endpoint", async function () {
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

    blobServiceClient = getBSU(recorder, { retryOptions: { maxTries: 2, secondaryHost } });
    containerClient = blobServiceClient.getContainerClient(containerName);

    const pipeline: Pipeline = (containerClient as any).storageClientContext.pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });

    if (isPlaybackMode()) {
      // Recorder looks into the recording for the request hitting secondary host and throws a request mismatch error.
      // This policy is a workaround instead to mimic the live test behavior, to throw a 404 ENOTFOUND error when the request hits secondary host that does not exist
      pipeline.addPolicy(
        {
          name: "secondaryHost-policy",
          sendRequest: (req: PipelineRequest, next: SendRequest) => {
            if (req.url.includes(secondaryHost)) {
              throw new RestError(`getaddrinfo ENOTFOUND`, {
                code: "ENOTFOUND",
                statusCode: 404,
                request: req,
              });
            }
            return next(req);
          },
        },
        { afterPhase: "Retry" }
      );
    }

    let finalRequestURL = "";
    try {
      const response = await containerClient.getProperties();
      finalRequestURL = response._response.request.url;
    } catch (err: any) {
      finalRequestURL = err.request ? err.request.url : "";
    }

    assert.deepStrictEqual(new URL(finalRequestURL).hostname, secondaryHost);
  });

  it("Retry Policy should work when on PARSE_ERROR with unclosed root tag", async function () {
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
