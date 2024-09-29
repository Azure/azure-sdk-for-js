// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";

import { getBSU, recorderEnvSetup, getUniqueName, uriSanitizers } from "./utils";
import { Recorder } from "@azure-tools/test-recorder";
import { ShareClient } from "../src";
import { Context } from "mocha";

describe("Aborter", () => {
  let shareName: string;
  let shareClient: ShareClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const serviceClient = getBSU(recorder);
    shareName = recorder.variable("share", getUniqueName("share"));
    shareClient = serviceClient.getShareClient(shareName);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should abort after aborter timeout", async () => {
    try {
      await shareClient.create({ abortSignal: AbortSignal.timeout(1) });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
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
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("Should not abort when calling abort() after request finishes", async () => {
    const aborter = new AbortController();
    await shareClient.create();
    aborter.abort();
  });
});
