// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import { assert } from "chai";
import { Context } from "mocha";
import { env, isLiveMode } from "@azure-tools/test-recorder";
import { PublicClientApplication } from "@azure/msal-node";
import { UsernamePasswordCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/nodeCommon";

describe("UsernamePasswordCredential (internal)", function() {
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
      "acquireTokenByUsernamePassword"
    );
  });

  afterEach(async function() {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("Should throw if the parameteres are not correctly specified", async function() {
    const errors: Error[] = [];
    try {
      new UsernamePasswordCredential(
        undefined as any,
        env.AZURE_CLIENT_ID,
        env.AZURE_USERNAME,
        env.AZURE_PASSWORD
      );
    } catch (e) {
      errors.push(e);
    }
    try {
      new UsernamePasswordCredential(
        env.AZURE_TENANT_ID,
        undefined as any,
        env.AZURE_USERNAME,
        env.AZURE_PASSWORD
      );
    } catch (e) {
      errors.push(e);
    }
    try {
      new UsernamePasswordCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        undefined as any,
        env.AZURE_PASSWORD
      );
    } catch (e) {
      errors.push(e);
    }
    try {
      new UsernamePasswordCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        env.AZURE_USERNAME,
        undefined as any
      );
    } catch (e) {
      errors.push(e);
    }

    try {
      new UsernamePasswordCredential(
        undefined as any,
        undefined as any,
        undefined as any,
        undefined as any
      );
    } catch (e) {
      errors.push(e);
    }
    assert.equal(errors.length, 5);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "UsernamePasswordCredential: tenantId, clientId, username and password are required parameters."
      );
    });
  });

  it("Authenticates silently after the initial request", async function(this: Context) {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD
    );

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 2);
    assert.equal(doGetTokenSpy.callCount, 1);
  });
});
