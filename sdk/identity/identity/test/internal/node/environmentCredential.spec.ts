// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import assert from "assert";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { EnvironmentCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/nodeCommon";

describe("EnvironmentCredential (internal)", function() {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;

  beforeEach(function() {
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

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 2);

    // Even though we're providing the same default in memory persistence cache that we use for DeviceCodeCredential,
    // The Client Credential and Client Secret flows do not return the account information from the authentication service,
    // so each time getToken gets called, we will have to acquire a new token through the service.
    assert.equal(doGetTokenSpy.callCount, 2);
  });
});
