// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import { record, Recorder } from "@azure-tools/test-recorder";
import { AbortController } from "@azure/abort-controller";

import { RestError, ShareClient } from "../src";
import { newPipeline, Pipeline } from "../src/Pipeline";
import { getBSU, recorderEnvSetup } from "./utils";
import { InjectorPolicyFactory } from "./utils/InjectorPolicyFactory";

describe("RetryPolicy", () => {
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getBSU();
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async function () {
    await shareClient.delete();
    await recorder.stop();
  });

  it("Retry Policy should work when first request fails with 500", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter === 0) {
        injectCounter++;
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
      return;
    });
    const factories = (shareClient as any).pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectShareClient = new ShareClient(shareClient.url, pipeline);

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };
    await injectShareClient.setMetadata(metadata);

    const result = await shareClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("Retry Policy should abort when abort event trigger during retry interval", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter < 2) {
        injectCounter++;
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
      return;
    });

    const factories = (shareClient as any).pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectShareClient = new ShareClient(shareClient.url, pipeline);

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb",
    };

    let hasError = false;
    try {
      // Default exponential retry delay is 4000ms. Wait for 2000ms to abort which makes sure the aborter
      // happens between 2 requests
      await injectShareClient.setMetadata(metadata, {
        abortSignal: AbortController.timeout(2 * 1000),
      });
    } catch (err: any) {
      hasError = true;
    }
    assert.ok(hasError);
  });

  it("Retry Policy should fail when requests always fail with 500", async () => {
    const injector = new InjectorPolicyFactory(() => {
      return new RestError("Server Internal Error", "ServerInternalError", 500);
    });

    const credential = (shareClient as any).pipeline.factories[
      (shareClient as any).pipeline.factories.length - 1
    ];
    const factories = newPipeline(credential, {
      retryOptions: { maxTries: 3 },
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectShareClient = new ShareClient(shareClient.url, pipeline);

    let hasError = false;
    try {
      const metadata = {
        key0: "val0",
        keya: "vala",
        keyb: "valb",
      };
      await injectShareClient.setMetadata(metadata);
    } catch (err: any) {
      hasError = true;
    }
    assert.ok(hasError);
  });
});
