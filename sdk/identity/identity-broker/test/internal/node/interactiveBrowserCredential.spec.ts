// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { dump } from "wtfnode";
import {
  InteractiveBrowserCredential,
  InteractiveBrowserCredentialNodeOptions,
  useIdentityPlugin,
} from "@azure/identity";
import { MsalTestCleanup, msalNodeTestSetup } from "@azure/identity/test/node/msalNodeTestSetup";
import { PublicClientApplication } from "@azure/msal-node";
import Sinon from "sinon";
import { Recorder, isLiveMode, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { nativeBrokerPlugin } from "../../../src";
import { isNode } from "@azure/core-util";
import { assert } from "@azure/test-utils";
import http from "http";

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
  it("Accepts interactiveBrowserCredentialOptions", async function (this: Mocha.Context) {
    if (isNode) {
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
      let winHandle = Buffer.from("srefleqr93285329lskadjffa");
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
        recorder.configureClientOptions(interactiveBrowserCredentialOptions)
      );

      try {
        const accessToken = await credential.getToken(scope);
        assert.exists(accessToken.token);
        assert.equal(doGetTokenSpy.callCount, 1);
        let result = await doGetTokenSpy.lastCall.returnValue;
        assert.equal(result.fromNativeBroker, true);
        dump();
      } catch (e) {
        console.log(e);
        assert.equal(doGetTokenSpy.callCount, 1);
      }
    } else {
      this.skip();
    }
  });
});
