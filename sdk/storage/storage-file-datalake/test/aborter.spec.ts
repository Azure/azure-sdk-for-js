// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { AbortController, AbortSignal } from "@azure/abort-controller";
import { DataLakeFileSystemClient } from "../src";
import { getDataLakeServiceClient, recorderEnvSetup } from "./utils";
import { record, Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("Aborter", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
    const serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("container");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should abort after aborter timeout", async () => {
    try {
      await fileSystemClient.create({ abortSignal: AbortController.timeout(1) });
      assert.fail();
    } catch (err: any) {
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
    } catch (err: any) {
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
        abortSignal: childAborter.signal,
      });
      aborter.abort();
      await response;
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
      assert.equal(err.message, "The operation was aborted.", "Unexpected error caught: " + err);
    }
  });
});
