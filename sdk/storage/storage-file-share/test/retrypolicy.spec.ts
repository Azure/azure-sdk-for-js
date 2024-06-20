// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Pipeline } from "@azure/core-rest-pipeline";

import { AbortController } from "@azure/abort-controller";
import { ShareClient, RestError, ShareServiceClient } from "../src";
import { getBSU, getUniqueName, recorderEnvSetup, uriSanitizers } from "./utils";
import { injectorPolicy, injectorPolicyName } from "./utils/InjectorPolicy";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("RetryPolicy", () => {
  let shareServiceClient: ShareServiceClient;
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["playback", "record"]);
    shareServiceClient = getBSU(recorder);
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = shareServiceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async function () {
    const pipeline: Pipeline = (shareClient as any).storageClientContext.pipeline;
    pipeline.removePolicy({ name: injectorPolicyName });
    await shareClient.delete();
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

    const pipeline: Pipeline = (shareClient as any).storageClientContext.pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    await shareClient.setMetadata(metadata);

    assert.equal(injectCounter, 1);
    const result = await shareClient.getProperties();
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

    const pipeline: Pipeline = (shareClient as any).storageClientContext.pipeline;
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
      await shareClient.setMetadata(metadata, {
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

    const shareServiceClient_internal = getBSU(recorder, { retryOptions: { maxTries: 3 } });
    const shareClient_internal = shareServiceClient_internal.getShareClient(shareName);
    const pipeline: Pipeline = (shareClient_internal as any).storageClientContext.pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });

    let hasError = false;
    try {
      const metadata = {
        key0: "val0",
        keya: "vala",
        keyb: "valb",
      };
      await shareClient_internal.setMetadata(metadata);
    } catch (err: any) {
      hasError = true;
    }
    assert.ok(hasError);
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
    const pipeline: Pipeline = (shareClient as any).storageClientContext.pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    await shareClient.setMetadata(metadata);

    assert.equal(injectCounter, 1);
    const result = await shareClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });
});
