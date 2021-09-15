// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import assert from "assert";

import { env } from "@azure-tools/test-recorder";
import { PublicClientApplication } from "@azure/msal-node";

import { UsernamePasswordCredential, TokenCachePersistenceOptions } from "../../../../identity/src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../../../identity/test/msalTestUtils";
import { MsalNode } from "../../../../identity/src/msal/nodeFlows/nodeCommon";

import { createPersistence } from "./setup.spec";

describe("UsernamePasswordCredential (internal)", function(this: Mocha.Suite) {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;

  beforeEach(function(this: Mocha.Context) {
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

  const scope = "https://graph.microsoft.com/.default";

  it("Accepts tokenCachePersistenceOptions", async function(this: Mocha.Context) {
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      this.skip();
    }

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      enabled: true,
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      unsafeAllowUnencryptedStorage: true
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    persistence?.save("{}");

    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD,
      { tokenCachePersistenceOptions }
    );

    await credential.getToken(scope);
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);
  });

  it("Authenticates silently with tokenCachePersistenceOptions", async function(this: Mocha.Context) {
    // OSX asks for passwords on CI, so we need to skip these tests from our automation
    if (process.platform === "darwin") {
      this.skip();
    }

    const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
      enabled: true,
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      unsafeAllowUnencryptedStorage: true
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    persistence?.save("{}");

    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD,
      { tokenCachePersistenceOptions }
    );

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    // The cache should have a token a this point
    const result = await persistence?.load();
    const parsedResult = JSON.parse(result!);
    assert.ok(parsedResult.AccessToken);

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 2);
    assert.equal(doGetTokenSpy.callCount, 1);
  });
});
