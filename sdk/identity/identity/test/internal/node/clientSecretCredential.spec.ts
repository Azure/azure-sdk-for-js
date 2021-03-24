// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import assert from "assert";
import { env } from "@azure/test-utils-recorder";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { ClientSecretCredential, TokenCachePersistenceOptions } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { TokenCachePersistence } from "../../../src/tokenCache/TokenCachePersistence";
import { MsalNode } from "../../../src/msal/nodeFlows/nodeCommon";
import { isNode15, isNode8 } from "../../../src/tokenCache/nodeVersion";

describe("ClientSecretCredential (internal)", function() {
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
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 2);

    // Even though we're providing the same default in memory persistence cache that we use for DeviceCodeCredential,
    // The Client Secret flow does not return the account information from the authentication service,
    // so each time getToken gets called, we will have to acquire a new token through the service.
    assert.equal(doGetTokenSpy.callCount, 2);
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

      const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
        name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
        allowUnencryptedStorage: true
      };

      // Emptying the token cache before we start.
      const tokenCache = new TokenCachePersistence(tokenCachePersistenceOptions);
      const persistence = await tokenCache.getPersistence();
      persistence?.save("");

      const credential = new ClientSecretCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        env.AZURE_CLIENT_SECRET,
        { tokenCachePersistenceOptions }
      );

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

      const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
        name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
        allowUnencryptedStorage: true
      };

      // Emptying the token cache before we start.
      const tokenCache = new TokenCachePersistence(tokenCachePersistenceOptions);
      const persistence = await tokenCache.getPersistence();
      persistence?.save("");

      const credential = new ClientSecretCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        env.AZURE_CLIENT_SECRET,
        { tokenCachePersistenceOptions }
      );

      await credential.getToken(scope);
      assert.equal(getTokenSilentSpy.callCount, 1);
      assert.equal(doGetTokenSpy.callCount, 1);

      await credential.getToken(scope);
      assert.equal(getTokenSilentSpy.callCount, 2);

      // Even though we're providing the same default in memory persistence cache that we use for DeviceCodeCredential,
      // The Client Secret flow does not return the account information from the authentication service,
      // so each time getToken gets called, we will have to acquire a new token through the service.
      assert.equal(doGetTokenSpy.callCount, 2);
    });
  });
});
