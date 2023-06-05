// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { record, Recorder } from "@azure-tools/test-recorder";
import { AbortController } from "@azure/abort-controller";

import { RestError, ShareClient } from "../src";
import { Pipeline } from "@azure/core-rest-pipeline";
import { getBSU, recorderEnvSetup } from "./utils";
import { injectorPolicy, injectorPolicyName } from "./utils/InjectorPolicy";
import { useFakeTimers, SinonFakeTimers } from "sinon";

describe("RetryPolicy", () => {
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;
  let clock: SinonFakeTimers;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getBSU();
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
    clock = useFakeTimers();
  });

  afterEach(async function () {
    clock.restore();
    const pipeline: Pipeline = shareClient["storageClientContext"].pipeline;
    pipeline.removePolicy({ name: injectorPolicyName });
    await shareClient.delete();
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

    const pipeline: Pipeline = shareClient["storageClientContext"].pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    shareClient.setMetadata(metadata);
    await clock.tickAsync(2000);
    assert.equal(injectCounter, 1);
    const result = await shareClient.getProperties();
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

    const pipeline: Pipeline = shareClient["storageClientContext"].pipeline;
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
      const promise = shareClient.setMetadata(metadata, {
        abortSignal: AbortController.timeout(2 * 1000),
      });
      await clock.tickAsync(1000);
      clock.tick(1000);
      await promise;
    } catch (err: any) {
      hasError = true;
    }
    assert.ok(hasError);
  });

  it("Retry Policy should fail when requests always fail with 500", async () => {
    let failCount = 0;
    const injector = injectorPolicy(() => {
      failCount++;
      return new RestError("Server Internal Error", {
        code: "ServerInternalError",
        statusCode: 500,
      });
    });

    const pipeline: Pipeline = shareClient["storageClientContext"].pipeline;
    pipeline.addPolicy(injector, { afterPhase: "Retry" });

    let hasError = false;
    try {
      const metadata = {
        key0: "val0",
        keya: "vala",
        keyb: "valb",
      };
      const promise = shareClient.setMetadata(metadata);
      // first retry waits 0 seconds
      // second retry waits 4 seconds
      await clock.tickAsync(4000);
      // last retry waits 12 seconds
      clock.tick(12000);
      await promise;
    } catch (err: any) {
      hasError = true;
    }
    assert.ok(hasError);
    assert.strictEqual(failCount, 4);
  });
});
