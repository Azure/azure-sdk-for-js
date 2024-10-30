// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getBearerTokenProvider, TokenCredential } from "../../../src";
import type { MsalTestCleanup } from "../../node/msalNodeTestSetup";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import { delay, isPlaybackMode } from "@azure-tools/test-recorder";
import type { Context } from "mocha";
import { assert } from "@azure-tools/test-utils";

describe("getBearerTokenProvider", function () {
  let cleanup: MsalTestCleanup;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
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
          token: "token",
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
      assert.isString(token);
    }
  });
});
