import * as assert from "assert";
import { RestError, StorageClient } from "../src";
import { Pipeline } from "../src/Pipeline";
import { getBSU, getUniqueName } from "./utils";
import { InjectorPolicyFactory } from "./utils/InjectorPolicyFactory";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

describe("RetryPolicy", () => {
  const serviceClient = getBSU();
  let shareName: string = getUniqueName("share");
  let shareClient = serviceClient.createShareClient(shareName);

  beforeEach(async () => {
    shareName = getUniqueName("share");
    shareClient = serviceClient.createShareClient(shareName);
    await shareClient.create();
  });

  afterEach(async () => {
    await shareClient.delete();
  });

  it("Retry Policy should work when first request fails with 500", async () => {
    let injectCounter = 0;
    const injector = new InjectorPolicyFactory(() => {
      if (injectCounter === 0) {
        injectCounter++;
        return new RestError("Server Internal Error", "ServerInternalError", 500);
      }
    });
    const factories = shareClient.pipeline.factories.slice(); // clone factories array
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectShareClient = shareClient.withPipeline(pipeline);

    const metadata = {
      key0: "val0",
      keya: "vala",
      keyb: "valb"
    };
    await injectShareClient.setMetadata(metadata);

    const result = await shareClient.getProperties();
    assert.deepEqual(result.metadata, metadata);
  });

  it("Retry Policy should failed when requests always fail with 500", async () => {
    const injector = new InjectorPolicyFactory(() => {
      return new RestError("Server Internal Error", "ServerInternalError", 500);
    });

    const credential = shareClient.pipeline.factories[shareClient.pipeline.factories.length - 1];
    const factories = StorageClient.newPipeline(credential, {
      retryOptions: { maxTries: 3 }
    }).factories;
    factories.push(injector);
    const pipeline = new Pipeline(factories);
    const injectShareClient = shareClient.withPipeline(pipeline);

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
