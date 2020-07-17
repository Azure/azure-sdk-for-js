import * as assert from "assert";

import { AbortController, AbortSignal } from "@azure/abort-controller";
import { ContainerClient } from "../src";
import { getBSU, recorderEnvSetup } from "./utils";
import { record, Recorder } from "@azure/test-utils-recorder";
import * as dotenv from "dotenv";
dotenv.config();

// tslint:disable:no-empty
describe("Aborter", () => {
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    const blobServiceClient = getBSU();
    containerName = recorder.getUniqueName("container");
    containerClient = blobServiceClient.getContainerClient(containerName);
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("Should abort after aborter timeout", async () => {
    try {
      await containerClient.create({ abortSignal: AbortController.timeout(1) });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
  });

  it("Should not abort after calling abort()", async () => {
    await containerClient.create({ abortSignal: AbortSignal.none });
  });

  it("Should abort when calling abort() before request finishes", async () => {
    const aborter = new AbortController();
    const response = containerClient.create({ abortSignal: aborter.signal });
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
    await containerClient.create({ abortSignal: aborter.signal });
    aborter.abort();
  });

  it("Should abort after father aborter calls abort()", async () => {
    try {
      const aborter = new AbortController();
      const childAborter = new AbortController(
        aborter.signal,
        AbortController.timeout(10 * 60 * 1000)
      );
      const response = containerClient.create({
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
