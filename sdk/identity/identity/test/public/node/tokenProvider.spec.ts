// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EnvironmentCredential, getBearerTokenProvider } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import { Recorder, delay, isPlaybackMode } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { assert } from "@azure-tools/test-utils";

describe("getBearerTokenProvider", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    recorder = setup.recorder;
    cleanup = setup.cleanup;
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("returns a callback that returns string tokens", async function () {
    const credential = new EnvironmentCredential(recorder.configureClientOptions({}));

    const getAccessToken = getBearerTokenProvider(credential, scope);

    for (let i = 0; i < 5; i++) {
      if (!isPlaybackMode()) {
        await delay(500);
      }
      const token = await getAccessToken();
      assert.isString(token);
    }
  });
});
