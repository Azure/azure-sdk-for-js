// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import { assert } from "chai";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { EnvironmentCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/msalNodeCommon";
import { Context } from "mocha";

describe("EnvironmentCredential (internal)", function() {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;

  beforeEach(function(this: Context) {
    const setup = msalNodeTestSetup(this);
    cleanup = setup.cleanup;

    getTokenSilentSpy = setup.sandbox.spy(MsalNode.prototype, "getTokenSilent");

    // MsalClientSecret calls to this method underneath.
    doGetTokenSpy = setup.sandbox.spy(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential"
    );
  });
  afterEach(async function() {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("Authenticates silently after the initial request", async function() {
    const credential = new EnvironmentCredential();

    const { token: firstToken } = await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    const { token: secondToken } = await credential.getToken(scope);
    assert.strictEqual(firstToken, secondToken);
    assert.equal(getTokenSilentSpy.callCount, 2);

    assert.equal(doGetTokenSpy.callCount, 1);
  });
});
