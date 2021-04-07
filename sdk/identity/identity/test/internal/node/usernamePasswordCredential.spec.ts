// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import assert from "assert";
import { env, isLiveMode } from "@azure/test-utils-recorder";
import { PublicClientApplication } from "@azure/msal-node";
import { UsernamePasswordCredential, TokenCachePersistenceOptions } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { TokenCachePersistence } from "../../../src/tokenCache/TokenCachePersistence";
import { MsalNode } from "../../../src/msal/nodeFlows/nodeCommon";
import { isNode8, Node8NotSupportedError } from "../../../src/tokenCache/nodeVersion";
import { Context } from "mocha";

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

  // To test this, please install @azure/msal-node-extensions and un-skip these tests.
  describe("Persistent tests", function() {
    try {
      /* eslint-disable-next-line @typescript-eslint/no-require-imports, import/no-extraneous-dependencies */
      require("@azure/msal-node-extensions");
    } catch (e) {
      return;
    }

    it("Persistence throws on Node 8, as expected", async function(this: Context) {
      if (!isNode8) {
        this.skip();
      }

      const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
        name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
        allowUnencryptedStorage: true
      };

      // Emptying the token cache before we start.
      const tokenCache = new TokenCachePersistence(tokenCachePersistenceOptions);

      let error: Error | undefined;
      try {
        await tokenCache.getPersistence();
      } catch (e) {
        error = e;
      }

      assert.equal(error?.message, Node8NotSupportedError.message);
    });

    it("Accepts tokenCachePersistenceOptions", async function(this: Context) {
      // msal-node-extensions does not currently support Node 8.
      if (isNode8) {
        this.skip();
      }
      // OSX asks for passwords on CI, so we need to skip these tests from our automation
      if (process.platform === "darwin") {
        this.skip();
      }
      // These tests should not run live because this credential requires user interaction.
      if (isLiveMode()) {
        this.skip();
      }
      const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
        name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
        allowUnencryptedStorage: true
      };

      // Emptying the token cache before we start.
      const tokenCache = new TokenCachePersistence(tokenCachePersistenceOptions);
      const persistence = await tokenCache.getPersistence();
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

    it("Authenticates silently with tokenCachePersistenceOptions", async function(this: Context) {
      // msal-node-extensions does not currently support Node 8.
      if (isNode8) {
        this.skip();
      }
      // OSX asks for passwords on CI, so we need to skip these tests from our automation
      if (process.platform === "darwin") {
        this.skip();
      }
      // These tests should not run live because this credential requires user interaction.
      if (isLiveMode()) {
        this.skip();
      }

      const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
        name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
        allowUnencryptedStorage: true
      };

      // Emptying the token cache before we start.
      const tokenCache = new TokenCachePersistence(tokenCachePersistenceOptions);
      const persistence = await tokenCache.getPersistence();
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
});
