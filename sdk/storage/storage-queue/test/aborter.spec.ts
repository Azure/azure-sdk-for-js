// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { QueueClient } from "../src/QueueClient";
import { getQSU } from "./utils";
import { getUniqueName, recorderEnvSetup, uriSanitizers } from "./utils/testutils.common";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("Aborter", () => {
  let queueName: string;
  let queueClient: QueueClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["record", "playback"]);
    const queueServiceClient = getQSU(recorder);
    queueName = recorder.variable("queue", getUniqueName("queue"));
    queueClient = queueServiceClient.getQueueClient(queueName);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should not abort after calling abort()", async () => {
    const cResp = await queueClient.create();
    assert.ok(cResp.date);
    await queueClient.delete();
  });

  it("should abort when calling abort() before request finishes", async () => {
    const aborter = new AbortController();
    const response = queueClient.create({ abortSignal: aborter.signal });
    aborter.abort();
    try {
      await response;
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("should not abort when calling abort() after request finishes", async () => {
    const aborter = new AbortController();
    await queueClient.create({ abortSignal: aborter.signal });
    aborter.abort();
    await queueClient.delete();
  });

  it("should abort after aborter timeout", async () => {
    try {
      await queueClient.create({ abortSignal: AbortSignal.timeout(1) });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });
});
