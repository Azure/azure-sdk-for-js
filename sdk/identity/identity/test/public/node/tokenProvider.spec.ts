// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, getBearerTokenProvider } from "../../../src/index.js";
import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { delay, isPlaybackMode } from "@azure-tools/test-recorder";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("getBearerTokenProvider", function () {
  let recorder: Recorder;
  let cleanup: MsalTestCleanup;

  beforeEach(async function (ctx) {
    const setup = await msalNodeTestSetup(ctx);
    recorder = setup.recorder;
    cleanup = setup.cleanup;
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("returns a callback that returns string tokens", async function () {
    // Create a fake credential similar to NoOpCredential
    const credential: TokenCredential = {
      getToken: () =>
        Promise.resolve({
          token: "Example-token",
          tokenType: "Bearer",
          expiresOnTimestamp: new Date().getTime() + 10000,
        }),
    };

    const getAccessToken = getBearerTokenProvider(credential, scope);

    for (let i = 0; i < 5; i++) {
      if (!isPlaybackMode()) {
        await delay(500);
      }
      const token = await getAccessToken();
      assert.equal(token, "Example-token");
      assert.isString(token);
    }
  });
});
