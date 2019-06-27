import * as assert from "assert";
import { RestError, ShareClient } from "../src";
import { newPipeline, Pipeline } from "../src/Pipeline";
import { getBSU } from "./utils";
import { InjectorPolicyFactory } from "./utils/InjectorPolicyFactory";
import { record } from "./utils/recorder";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("RetryPolicy", () => {
  const serviceClient = getBSU();
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async function() {
    await shareClient.delete();
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
    const factories = (shareClient as any).pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectShareClient = new ShareClient(shareClient.url, pipeline);

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await injectShareClient.setMetadata(metadata);

    const result = await shareClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("Retry Policy should fail when requests always fail with 500", async () => {
    const injector = new InjectorPolicyFactory(() => {
      return new RestError("Server Internal Error", "ServerInternalError", 500);
    });

    const credential = (shareClient as any).pipeline.factories[
      (shareClient as any).pipeline.factories.length - 1
    ];
    const factories = newPipeline(credential, {
      retryOptions: { maxTries: 3 }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectShareClient = new ShareClient(shareClient.url, pipeline);

    let hasError = false;
    try {
      const metadata = {
        key0: "val0",
        keya: "vala",
        keyb: "valb"
      };
      await injectShareClient.setMetadata(metadata);
    } catch (err) {
      hasError = true;
    }
    assert.ok(hasError);
  });
});
