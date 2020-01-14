import * as assert from "assert";

import { AbortController, AbortSignal } from "@azure/abort-controller";
import { DataLakeFileSystemClient } from "../src";
import { getDataLakeServiceClient, setupEnvironment } from "./utils";
import { record, Recorder } from "@azure/test-utils-recorder";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// tslint:disable:no-empty
describe("Aborter", () => {
  setupEnvironment();
  const serviceClient = getDataLakeServiceClient();
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;

  beforeEach(async function() {
    recorder = record(this);
    fileSystemName = recorder.getUniqueName("container");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
  });

  afterEach(function() {
    recorder.stop();
  });

  it("Should abort after aborter timeout", async () => {
    try {
      await fileSystemClient.create({ abortSignal: AbortController.timeout(1) });
      assert.fail();
    } catch (err) {
      assert.equal(err.name, "AbortError");
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
  });

  it("Should not abort after calling abort()", async () => {
    await fileSystemClient.create({ abortSignal: AbortSignal.none });
  });

  it("Should abort when calling abort() before request finishes", async () => {
    const aborter = new AbortController();
    const response = fileSystemClient.create({ abortSignal: aborter.signal });
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
    await fileSystemClient.create({ abortSignal: aborter.signal });
    aborter.abort();
  });

  it("Should abort after father aborter calls abort()", async () => {
    try {
      const aborter = new AbortController();
      const childAborter = new AbortController(
        aborter.signal,
        AbortController.timeout(10 * 60 * 1000)
      );
      const response = fileSystemClient.create({
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
