import * as assert from "assert";

import { AbortController } from "@azure/abort-controller";
import { getBSU, recorderEnvSetup } from "./utils";
import { record, Recorder } from "@azure/test-utils-recorder";
import * as dotenv from "dotenv";
import { ShareClient } from "../src";
dotenv.config();

// tslint:disable:no-empty
describe("Aborter", () => {
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getBSU();
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("Should abort after aborter timeout", async () => {
    try {
      await shareClient.create({ abortSignal: AbortController.timeout(1) });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
  });

  it("Should not abort after calling abort()", async () => {
    await shareClient.create();
    await shareClient.delete();
  });

  it("Should abort when calling abort() before request finishes", async () => {
    const aborter = new AbortController();
    const response = shareClient.create({ abortSignal: aborter.signal });
    aborter.abort();
    try {
      await response;
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
  });

  it("Should not abort when calling abort() after request finishes", async () => {
    const aborter = new AbortController();
    await shareClient.create();
    aborter.abort();
  });

  it("Should abort after parent aborter calls abort()", async () => {
    try {
      const aborter = new AbortController();
      const childAborter = new AbortController(aborter.signal, AbortController.timeout(100));
      const response = shareClient.create({
        abortSignal: childAborter.signal
      });
      aborter.abort();
      await response;
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
  });
});
