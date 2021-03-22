// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import assert from "assert";
import { PublicClientApplication } from "@azure/msal-node";
import { env, isLiveMode } from "@azure/test-utils-recorder";
import { DeviceCodeCredential, TokenCachePersistenceOptions } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { TokenCachePersistence } from "../../../src/tokenCache/TokenCachePersistence";
import { MsalNode } from "../../../src/msal/nodeFlows/nodeCommon";
import { isNode15, isNode8 } from "../../../src/tokenCache/nodeVersion";

describe("DeviceCodeCredential (internal)", function() {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;

  beforeEach(function() {
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

  it("Authenticates silently after the initial request", async function() {
    // These tests should not run live because this credential requires user interaction.
    if (isLiveMode()) {
      this.skip();
    }
    const credential = new DeviceCodeCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID);

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
      /* eslint-disable-next-line @typescript-eslint/no-require-imports */
      require("@azure/msal-node-extensions");
    } catch (e) {
      return;
    }

    it("Accepts tokenCachePersistenceOptions", async function() {
      // msal-node-extensions does not currently support Node 8.
      if (isNode8 || isNode15) {
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
      persistence?.save("");

      const credential = new DeviceCodeCredential({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
        tokenCachePersistenceOptions
      });

      await credential.getToken(scope);
      const result = await persistence?.load();
      const parsedResult = JSON.parse(result!);
      assert.ok(parsedResult.AccessToken);
    });

    it("Authenticates silently with tokenCachePersistenceOptions", async function() {
      // msal-node-extensions does not currently support Node 8.
      if (isNode8 || isNode15) {
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
      persistence?.save("");

      const credential = new DeviceCodeCredential({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
        tokenCachePersistenceOptions
      });

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

    it("allows passing an authenticationRecord to avoid further manual authentications", async function() {
      // msal-node-extensions does not currently support Node 8.
      if (isNode8 || isNode15) {
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
      persistence?.save("");

      const credential = new DeviceCodeCredential({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
        // To be able to re-use the account, the Token Cache must also have been provided.
        // TODO: Perhaps make the account parameter part of the tokenCachePersistenceOptions?
        tokenCachePersistenceOptions
      });

      const account = await credential.authenticate(scope);
      assert.ok(account);
      assert.equal(getTokenSilentSpy.callCount, 1);
      assert.equal(doGetTokenSpy.callCount, 1);

      const credential2 = new DeviceCodeCredential({
        tenantId: env.AZURE_TENANT_ID,
        clientId: env.AZURE_CLIENT_ID,
        authenticationRecord: account,
        // To be able to re-use the account, the Token Cache must also have been provided.
        // TODO: Perhaps make the account parameter part of the tokenCachePersistenceOptions?
        tokenCachePersistenceOptions
      });

      // The cache should have a token a this point
      const result = await persistence?.load();
      const parsedResult = JSON.parse(result!);
      assert.ok(parsedResult.AccessToken);

      const token = await credential2.getToken(scope);
      assert.ok(token?.token);
      assert.ok(token?.expiresOnTimestamp! > Date.now());
      assert.equal(getTokenSilentSpy.callCount, 2);
      assert.equal(doGetTokenSpy.callCount, 1);
    });
  });
});
