// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Recorder } from "@azure-tools/test-recorder";
import { KeyClient } from "../../src/index.js";
import { authenticate, envSetupForPlayback } from "./utils/testAuthentication.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Keys client - time sensitive tests", () => {
  let client: KeyClient;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    recorder = new Recorder(ctx);
    await recorder.start(envSetupForPlayback);
    const authentication = await authenticate(recorder);
    client = authentication.client;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should wait for key expiration", async function () {
    // This test has timing issues in playback mode
    const startTime = Date.now();
    
    // Wait for 5 seconds - this will fail in playback
    await new Promise((resolve) => setTimeout(resolve, 5000));
    
    const elapsed = Date.now() - startTime;
    assert.ok(elapsed >= 4900, "Should have waited at least 5 seconds");
  });
});
