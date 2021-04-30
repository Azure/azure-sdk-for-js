// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import assert from "assert";
import * as path from "path";
import { env, isPlaybackMode } from "@azure/test-utils-recorder";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { ClientCertificateCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/nodeCommon";
import { Context } from "mocha";

const ASSET_PATH = "assets";

describe.skip("ClientCertificateCredential (internal)", function() {
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

  const certificatePath = path.join(ASSET_PATH, "cert.pem");
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
});
