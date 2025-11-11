// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { InteractiveBrowserCredentialNodeOptions } from "@azure/identity";
import { InteractiveBrowserCredential, useIdentityPlugin } from "@azure/identity";

import { env, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import { nativeBrokerPlugin } from "../../../src/index.js";
import { isNodeLike } from "@azure/core-util";
import { sendGraphRequest } from "./popTokenClient.js";
import { describe, it, assert } from "vitest";

describe("InteractiveBrowserCredential", function () {
  it("supports pop token authentication", async function (ctx) {
    if (!isNodeLike) {
      return ctx.skip();
    }
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform !== "win32") {
      return ctx.skip();
    }
    if (isLiveMode() || isPlaybackMode()) {
      return ctx.skip();
    }
    useIdentityPlugin(nativeBrokerPlugin);
    const winHandle = Buffer.from("srefleqr93285329lskadjffa");
    const interactiveBrowserCredentialOptions: InteractiveBrowserCredentialNodeOptions = {
      tenantId: env.AZURE_TENANT_ID,
      clientId: env.AZURE_CLIENT_ID,
      brokerOptions: {
        enabled: true,
        parentWindowHandle: winHandle,
      },
    };

    const credential = new InteractiveBrowserCredential(interactiveBrowserCredentialOptions);
    const response = await sendGraphRequest(credential);
    assert.equal(response.status, 200);
    assert.exists(response.bodyAsText);
  });
});
