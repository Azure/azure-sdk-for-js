// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import assert from "assert";
import * as path from "path";

import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { ConfidentialClientApplication } from "@azure/msal-node";

import {
  ClientCertificateCredential,
  TokenCachePersistenceOptions
} from "../../../../identity/src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../../../identity/test/msalTestUtils";
import { MsalNode } from "../../../../identity/src/msal/nodeFlows/nodeCommon";

import { createPersistence } from "./setup.spec";

const ASSET_PATH = "assets";

describe("ClientCertificateCredential (internal)", function(this: Mocha.Suite) {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;

  beforeEach(function(this: Mocha.Context) {
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

  // We use AZURE_CLIENT_CERTIFICATE_PATH if it is defined, and otherwise we will use the dummy cert
  const certificatePath =
    process.env.AZURE_CLIENT_CERTIFICATE_PATH ?? path.join(ASSET_PATH, "fake-cert.pem");
  const scope = "https://graph.microsoft.com/.default";

  it("Accepts tokenCachePersistenceOptions", async function(this: Mocha.Context) {
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
      enabled: true,
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      allowUnencryptedStorage: true
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    persistence?.save("{}");

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

  it("Authenticates silently with tokenCachePersistenceOptions", async function(this: Mocha.Context) {
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
      enabled: true,
      name: this.test?.title.replace(/[^a-zA-Z]/g, "_"),
      allowUnencryptedStorage: true
    };

    // Emptying the token cache before we start.
    const persistence = await createPersistence(tokenCachePersistenceOptions);
    await persistence?.save("{}");

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
