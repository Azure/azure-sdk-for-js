// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { InteractiveBrowserCredentialNodeOptions } from "@azure/identity";
import { InteractiveBrowserCredential, useIdentityPlugin } from "@azure/identity";

import { env, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import { nativeBrokerPlugin } from "../../../src";
import { isNodeLike } from "@azure/core-util";
import { sendGraphRequest } from "./popTokenClient";
import { assert } from "@azure-tools/test-utils";

describe("InteractiveBrowserCredential", function (this: Mocha.Suite) {
  it("supports pop token authentication", async function (this: Mocha.Context) {
    if (isNodeLike) {
      // OSX asks for passwords on CI, so we need to skip these tests from our automation
      if (process.platform !== "win32") {
        this.skip();
      }
      if (isLiveMode() || isPlaybackMode()) {
        this.skip();
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
    } else {
      this.skip();
    }
  });
});
