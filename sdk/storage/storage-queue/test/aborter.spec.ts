import * as assert from "assert";
import { AbortController } from "@azure/abort-controller";

import { QueueClient } from "../src/QueueClient";
import { getQSU } from "./utils";
import * as dotenv from "dotenv";
import { recorderEnvSetup } from "./utils/testutils.common";
import { Recorder, record } from "@azure/test-utils-recorder";
dotenv.config();

// tslint:disable:no-empty
describe("Aborter", () => {
  let queueName: string;
  let queueClient: QueueClient;

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const queueServiceClient = getQSU();
    queueName = recorder.getUniqueName("queue");
    queueClient = queueServiceClient.getQueueClient(queueName);
  });

  afterEach(async function() {
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
    } catch (err) {
      assert.equal(err.name, "AbortError");
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
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
      await queueClient.create({ abortSignal: AbortController.timeout(1) });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
  });

  it("should abort after parent aborter calls abort()", async () => {
    try {
      const aborter = new AbortController();
      const childAborter = new AbortController(
        aborter.signal,
        AbortController.timeout(10 * 60 * 1000)
      );
      const response = queueClient.create({ abortSignal: childAborter.signal });
      aborter.abort();
      await response;
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
  });
});
