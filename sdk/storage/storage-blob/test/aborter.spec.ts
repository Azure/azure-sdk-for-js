// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ContainerClient } from "../src/index.js";
import { getBSU, getUniqueName, recorderEnvSetup, uriSanitizers } from "./utils/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Aborter", () => {
  let containerName: string;
  let containerClient: ContainerClient;

  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderEnvSetup);
    await recorder.addSanitizers({ uriSanitizers }, ["playback", "record"]);
    const blobServiceClient = getBSU(recorder);
    containerName = recorder.variable("container", getUniqueName("container"));
    containerClient = blobServiceClient.getContainerClient(containerName);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("Should abort after aborter timeout", async () => {
    try {
      await containerClient.create({ abortSignal: AbortSignal.timeout(1) });
      assert.fail();
    } catch (err: any) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("Should not abort after calling abort()", async () => {
    await containerClient.create({ abortSignal: new AbortController().signal });
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
});
