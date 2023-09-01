// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { AbortController, AbortSignal } from "@azure/abort-controller";
import { ContainerClient } from "../src";
import { getBSU, getUniqueName, recorderEnvSetup, uriSanitizers } from "./utils";
import { Recorder } from "@azure-tools/test-recorder";
import { Context } from "mocha";

describe("Aborter", () => {
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["playback", "record"]);
    const blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Should abort after aborter timeout", async function () {
    try {
      await containerClient.create({ abortSignal: AbortController.timeout(1) });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
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
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
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
        AbortController.timeout(10 * 60 * 1000),
      );
      const response = containerClient.create({
        abortSignal: childAborter.signal,
      });
      aborter.abort();
      await response;
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });
});
