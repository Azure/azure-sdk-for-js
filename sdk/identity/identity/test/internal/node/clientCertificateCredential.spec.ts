// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import { assert } from "chai";
import * as path from "path";
import { AbortController } from "@azure/abort-controller";
import { env, isPlaybackMode, delay } from "@azure-tools/test-recorder";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { ClientCertificateCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/nodeCommon";
import { Context } from "mocha";

const ASSET_PATH = "assets";

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

  const certificatePath = path.join(ASSET_PATH, "fake-cert.pem");
  const scope = "https://vault.azure.net/.default";

  it("Should throw if the parameteres are not correctly specified", async function() {
    const errors: Error[] = [];
    try {
      new ClientCertificateCredential(
        undefined as any,
        env.AZURE_CLIENT_ID,
        env.AZURE_CLIENT_CERTIFICATE_PATH
      );
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientCertificateCredential(
        env.AZURE_TENANT_ID,
        undefined as any,
        env.AZURE_CLIENT_CERTIFICATE_PATH
      );
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientCertificateCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID, undefined as any);
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientCertificateCredential(undefined as any, undefined as any, undefined as any);
    } catch (e) {
      errors.push(e);
    }
    assert.equal(errors.length, 4);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "ClientCertificateCredential: tenantId, clientId, and certificatePath are required parameters."
      );
    });
  });

  it("throws when given a file that doesn't contain a PEM-formatted certificate", async function(this: Context) {
    const fullPath = path.resolve(__dirname, "../src/index.ts");
    const credential = new ClientCertificateCredential("tenant", "client", fullPath);

    let error: Error | undefined;
    try {
      await credential.getToken(scope);
    } catch (_error) {
      error = _error;
    }

    assert.ok(error);
    assert.deepEqual(error?.message, `ENOENT: no such file or directory, open '${fullPath}'`);
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

  // TODO: Enable again once we're ready to release this feature.
  it.skip("supports specifying the regional authority", async function() {
    const credential = new ClientCertificateCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      certificatePath,
      {
        // TODO: Uncomment once we're ready to release this feature.
        // regionalAuthority: RegionalAuthority.AutoDiscoverRegion
      }
    );

    // We'll abort since we only want to ensure the parameters are sent apporpriately.
    const controller = new AbortController();
    const getTokenPromise = credential.getToken(scope, {
      abortSignal: controller.signal
    });
    await delay(5);
    controller.abort();
    try {
      await getTokenPromise;
    } catch (e) {
      // Nothing to do here.
    }

    assert.equal(doGetTokenSpy.getCall(0).args[0].azureRegion, "AUTO_DISCOVER");
  });
});
