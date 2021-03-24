// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import assert from "assert";
import * as path from "path";
import { env, isPlaybackMode } from "@azure/test-utils-recorder";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { ClientCertificateCredential, TokenCachePersistenceOptions } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { TokenCachePersistence } from "../../../src/tokenCache/TokenCachePersistence";
import { MsalNode } from "../../../src/msal/nodeFlows/nodeCommon";
import { Context } from "mocha";

describe("ClientCertificateCredential (internal)", function() {
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

  const certificatePath = path.resolve(__dirname, "../test/assets/cert.pem");
  const scope = "https://vault.azure.net/.default";

  it("throws when given a file that doesn't contain a PEM-formatted certificate", () => {
    assert.throws(() => {
      new ClientCertificateCredential(
        "tenant",
        "client",
        path.resolve(__dirname, "../src/index.ts")
      );
    });
  });

  it("Authenticates silently after the initial request", async function(this: Context) {
    if (isPlaybackMode()) {
      // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
      // This assertion could be provided as parameters, but we don't have that in the public API yet,
      // and I'm trying to avoid having to generate one ourselves.
      this.skip();
    }

    const credential = new ClientCertificateCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      certificatePath
    );

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 1);
    assert.equal(doGetTokenSpy.callCount, 1);

    await credential.getToken(scope);
    assert.equal(getTokenSilentSpy.callCount, 2);

    // Even though we're providing the same default in memory persistence cache that we use for DeviceCodeCredential,
    // The Client Credential flow does not return the account information from the authentication service,
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

    it("Accepts tokenCachePersistenceOptions", async function(this: Context) {
      if (isPlaybackMode()) {
        // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
        // This assertion could be provided as parameters, but we don't have that in the public API yet,
        // and I'm trying to avoid having to generate one ourselves.
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

      const credential = new ClientCertificateCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        certificatePath,
        { tokenCachePersistenceOptions }
      );

      await credential.getToken(scope);
      const result = await persistence?.load();
      const parsedResult = JSON.parse(result!);
      assert.ok(parsedResult.AccessToken);
    });

    it("Authenticates silently with tokenCachePersistenceOptions", async function(this: Context) {
      if (isPlaybackMode()) {
        // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
        // This assertion could be provided as parameters, but we don't have that in the public API yet,
        // and I'm trying to avoid having to generate one ourselves.
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

      const credential = new ClientCertificateCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        certificatePath,
        { tokenCachePersistenceOptions }
      );

      await credential.getToken(scope);
      assert.equal(getTokenSilentSpy.callCount, 1);
      assert.equal(doGetTokenSpy.callCount, 1);

      await credential.getToken(scope);
      assert.equal(getTokenSilentSpy.callCount, 2);
      // Even though we're providing a file persistence cache,
      // The Client Credential flow does not return the account information from the authentication service,
      // so each time getToken gets called, we will have to acquire a new token through the service.
      // MSAL also doesn't store the account in the cache (getAllAccounts returns an empty array).
      assert.equal(doGetTokenSpy.callCount, 2);
    });
  });
});
