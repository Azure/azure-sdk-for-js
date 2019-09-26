import * as assert from "assert";
import * as dotenv from "dotenv";

import { RestError, StorageURL } from "../src";
import { Aborter } from "../src/Aborter";
import { Pipeline } from "../src/Pipeline";
import { ShareURL } from "../src/ShareURL";
import { getBSU } from "./utils";
import { InjectorPolicyFactory } from "./utils/InjectorPolicyFactory";
import { record } from "./utils/recorder";

dotenv.config({ path: "../.env" });

describe("RetryPolicy", () => {
  const serviceURL = getBSU();
  let shareName: string;
  let shareURL: ShareURL;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    shareName = recorder.getUniqueName("share");
    shareURL = ShareURL.fromServiceURL(serviceURL, shareName);
    await shareURL.create(Aborter.none);
  });

  afterEach(async () => {
    await shareURL.delete(Aborter.none);
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
    const factories = shareURL.pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectShareURL = shareURL.withPipeline(pipeline);

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await injectShareURL.setMetadata(Aborter.none, metadata);

    const result = await shareURL.getProperties(Aborter.none);
    assert.deepEqual(result.metadata, metadata);
  });

  it("Retry Policy should abort when abort event trigger during retry interval", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter < 2) {
        injectCounter++;
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
    });

    const factories = shareURL.pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectShareURL = shareURL.withPipeline(pipeline);

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };

    let hasError = false;
    try {
      // Default exponential retry delay is 4000ms. Wait for 2000ms to abort which makes sure the aborter
      // happens between 2 requests
      await injectShareURL.setMetadata(Aborter.timeout(2 * 1000), metadata);
    } catch (err) {
      hasError = true;
    }
    assert.ok(hasError);
  });

  it("Retry Policy should fail when requests always fail with 500", async () => {
    const injector = new InjectorPolicyFactory(() => {
      return new RestError("Server Internal Error", "ServerInternalError", 500);
    });

    const credential = shareURL.pipeline.factories[shareURL.pipeline.factories.length - 1];
    const factories = StorageURL.newPipeline(credential, {
      retryOptions: { maxTries: 3 }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectShareURL = shareURL.withPipeline(pipeline);

    let hasError = false;
    try {
      const metadata = {
        key0: "val0",
        keya: "vala",
        keyb: "valb"
      };
      await injectShareURL.setMetadata(Aborter.none, metadata);
    } catch (err) {
      hasError = true;
    }
    assert.ok(hasError);
  });
});
