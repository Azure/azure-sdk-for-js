// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import { assert } from "chai";
import { PublicClientApplication } from "@azure/msal-node";
import { env, isLiveMode } from "@azure-tools/test-recorder";
import { DeviceCodeCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/msalNodeCommon";
import { Context } from "mocha";

describe("DeviceCodeCredential (internal)", function() {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;

  beforeEach(function(this: Context) {
    const setup = msalNodeTestSetup(this);
    cleanup = setup.cleanup;

    getTokenSilentSpy = setup.sandbox.spy(MsalNode.prototype, "getTokenSilent");

    // MsalClientSecret calls to this method underneath.
    doGetTokenSpy = setup.sandbox.spy(
      PublicClientApplication.prototype,
      "acquireTokenByDeviceCode"
    );
  });
  afterEach(async function() {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("Authenticates silently after the initial request", async function(this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential({
      tenantId: env.AZURE_TENANT_ID,
      clientId: env.AZURE_CLIENT_ID
    });

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 1, "getTokenSilentSpy.callCount should have been 1");
    assert.equal(doGetTokenSpy.callCount, 1, "doGetTokenSpy.callCount should have been 1");

    await credential.getToken(scope);
    assert.equal(
      getTokenSilentSpy.callCount,
      2,
      "getTokenSilentSpy.callCount should have been 2 (2nd time)"
    );
    assert.equal(
      doGetTokenSpy.callCount,
      1,
      "doGetTokenSpy.callCount should have been 1 (2nd time)"
    );
  });
});
