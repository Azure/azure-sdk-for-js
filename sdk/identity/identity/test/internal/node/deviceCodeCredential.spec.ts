// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { MsalTestCleanup, msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import { Recorder, env, isLiveMode } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { DeviceCodeCredential } from "../../../src";
import { PublicClientApplication } from "@azure/msal-node";
import Sinon from "sinon";
import { assert } from "chai";

describe("DeviceCodeCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    // MsalClient calls to this method underneath when silent authentication can be attempted.
    getTokenSilentSpy = setup.sandbox.spy(PublicClientApplication.prototype, "acquireTokenSilent");

    // MsalClient calls to this method underneath for interactive auth.
    doGetTokenSpy = setup.sandbox.spy(
      PublicClientApplication.prototype,
      "acquireTokenByDeviceCode",
    );
  });
  afterEach(async function () {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("Authenticates silently after the initial request", async function (this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
      }),
    );

    await credential.getToken(scope);
    assert.equal(doGetTokenSpy.callCount, 1, "doGetTokenSpy.callCount should have been 1.");

    await credential.getToken(scope);
    assert.equal(
      getTokenSilentSpy.callCount,
      1,
      "getTokenSilentSpy.callCount should have been 1 (Silent authentication after the initial request).",
    );
    assert.equal(
      doGetTokenSpy.callCount,
      1,
      "Expected no additional calls to doGetTokenSpy after the initial request.",
    );
  });

  it("Authenticates with tenantId on getToken", async function (this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential(
      recorder.configureClientOptions({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
      }),
    );

    await credential.getToken(scope, { tenantId: env.AZURE_TENANT_ID });
    assert.equal(doGetTokenSpy.callCount, 1, "doGetTokenSpy.callCount should have been 1");
  });
});
