// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { InteractiveBrowserCredentialNodeOptions } from "@azure/identity";
import { InteractiveBrowserCredential, useIdentityPlugin } from "@azure/identity";
import type { MsalTestCleanup } from "../../../../identity/test/node/msalNodeTestSetup";
import { msalNodeTestSetup } from "../../../../identity/test/node/msalNodeTestSetup";
import { PublicClientApplication } from "@azure/msal-node";
import type Sinon from "sinon";
import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { nativeBrokerPlugin } from "../../../src";
import { isNodeLike } from "@azure/core-util";
import { assert } from "@azure-tools/test-utils";
import type http from "http";

describe("InteractiveBrowserCredential (internal)", function (this: Mocha.Suite) {
  let cleanup: MsalTestCleanup;
  let listen: http.Server | undefined;
  let doGetTokenSpy: Sinon.SinonSpy;
  let recorder: Recorder;

  beforeEach(async function (this: Mocha.Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    // getTokenSilentSpy = setup.sandbox.spy(MsalNode.prototype, "getTokenSilent");

    doGetTokenSpy = setup.sandbox.spy(PublicClientApplication.prototype, "acquireTokenInteractive");
  });
  afterEach(async function () {
    if (listen) {
      listen.close();
    }

    await cleanup();
  });
  it("Throws error when no plugin is imported", async function (this: Mocha.Context) {
    if (isNodeLike) {
      // OSX asks for passwords on CI, so we need to skip these tests from our automation
      if (process.platform !== "win32") {
        this.skip();
      }
      // These tests should not run live because this credential requires user interaction.
      // currently test with broker is hanging, so skipping in playback mode for the ci
      if (isLiveMode() || isPlaybackMode()) {
        this.skip();
      }
      const winHandle = Buffer.from("srefleqr93285329lskadjffa");
      const interactiveBrowserCredentialOptions: InteractiveBrowserCredentialNodeOptions = {
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
        brokerOptions: {
          enabled: true,
          parentWindowHandle: winHandle,
        },
      };
      assert.throws(() => {
        new InteractiveBrowserCredential(
          recorder.configureClientOptions(interactiveBrowserCredentialOptions),
        );
      }, "Broker for WAM was requested to be enabled, but no native broker was configured.");
    } else {
      this.skip();
    }
  });
  it("Accepts interactiveBrowserCredentialOptions", async function (this: Mocha.Context) {
    if (isNodeLike) {
      // OSX asks for passwords on CI, so we need to skip these tests from our automation
      if (process.platform !== "win32") {
        this.skip();
      }
      // These tests should not run live because this credential requires user interaction.
      // currently test with broker is hanging, so skipping in playback mode for the ci
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
      const scope = "https://graph.microsoft.com/.default";

      const credential = new InteractiveBrowserCredential(
        recorder.configureClientOptions(interactiveBrowserCredentialOptions),
      );

      try {
        const accessToken = await credential.getToken(scope);
        assert.exists(accessToken.token);
        assert.equal(doGetTokenSpy.callCount, 1);
        const result = await doGetTokenSpy.lastCall.returnValue;
        assert.equal(result.fromNativeBroker, true);
      } catch (e) {
        console.log(e);
        assert.equal(doGetTokenSpy.callCount, 1);
      }
    } else {
      this.skip();
    }
  });
});
