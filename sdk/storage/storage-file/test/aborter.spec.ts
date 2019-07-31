import * as assert from "assert";

import { AbortController } from "@azure/abort-controller";
import { getBSU } from "./utils";
import { record } from "./utils/recorder";
import * as dotenv from "dotenv";
import { ShareClient } from "../src";
dotenv.config({ path: "../.env" });

// tslint:disable:no-empty
describe.only("Aborter", () => {
  const serviceClient = getBSU();
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    shareName = recorder.getUniqueName("share");
    shareClient = serviceClient.getShareClient(shareName);
  });

  afterEach(function() {
    recorder.stop();
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
    } catch (err) {}
  });

  it("Should not abort when calling abort() after request finishes", async () => {
    const aborter = new AbortController();
    await shareClient.create();
    aborter.abort();
  });

  it("Should abort after aborter timeout", async () => {
    try {
      await shareClient.create({ abortSignal: AbortController.timeout(1) });
      assert.fail();
    } catch (err) {}
  });

  it("Should abort after parent aborter calls abort()", async () => {
    try {
      const aborter = new AbortController();
      const response = shareClient.create({
        abortSignal: AbortController.timeout(10 * 60 * 1000)
      });
      aborter.abort();
      await response;
      assert.fail();
    } catch (err) {}
  });
});
