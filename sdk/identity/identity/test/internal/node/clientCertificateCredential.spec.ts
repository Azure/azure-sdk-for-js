// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import Sinon from "sinon";
import { assert } from "chai";
import * as path from "path";
import { AbortController } from "@azure/abort-controller";
import { env, isPlaybackMode, delay, Recorder } from "@azure-tools/test-recorder";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { ClientCertificateCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup } from "../../msalTestUtils";
import { MsalNode } from "../../../src/msal/nodeFlows/msalNodeCommon";
import { Context } from "mocha";

const ASSET_PATH = "assets";

describe("ClientCertificateCredential (internal)", function () {
  let cleanup: MsalTestCleanup;
  let getTokenSilentSpy: Sinon.SinonSpy;
  let doGetTokenSpy: Sinon.SinonSpy;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;

    await recorder.setMatcher("BodilessMatcher");
    getTokenSilentSpy = setup.sandbox.spy(MsalNode.prototype, "getTokenSilent");

    // MsalClientSecret calls to this method underneath.
    doGetTokenSpy = setup.sandbox.spy(
      ConfidentialClientApplication.prototype,
      "acquireTokenByClientCredential"
    );
  });
  afterEach(async function () {
    await cleanup();
  });

  const certificatePath = path.join(ASSET_PATH, "fake-cert.pem");
  const scope = "https://vault.azure.net/.default";

  it("Should throw if the parameteres are not correctly specified", async function () {
    let errors: Error[] = [];
    try {
      new ClientCertificateCredential(undefined as any, env.AZURE_CLIENT_ID!, {
        certificatePath: env.AZURE_CLIENT_CERTIFICATE_PATH!,
      });
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientCertificateCredential(env.AZURE_TENANT_ID!, undefined as any, {
        certificatePath: env.AZURE_CLIENT_CERTIFICATE_PATH!,
      });
    } catch (e) {
      errors.push(e);
    }
    try {
      new ClientCertificateCredential(undefined as any, undefined as any, undefined as any);
    } catch (e) {
      errors.push(e);
    }
    assert.equal(errors.length, 3);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "ClientCertificateCredential: tenantId and clientId are required parameters."
      );
    });

    errors = [];
    try {
      // If configuration object is undefined. Relevant for JavaScript.
      new ClientCertificateCredential(env.AZURE_TENANT_ID!, env.AZURE_CLIENT_ID!, undefined as any);
    } catch (e) {
      errors.push(e);
    }
    try {
      // If configuration object is empty.
      new ClientCertificateCredential(env.AZURE_TENANT_ID!, env.AZURE_CLIENT_ID!, {} as any);
    } catch (e) {
      errors.push(e);
    }
    assert.equal(errors.length, 2);
    errors.forEach((e) => {
      assert.equal(
        e.message,
        "ClientCertificateCredential: Provide either a PEM certificate in string form, or the path to that certificate in the filesystem. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot."
      );
    });

    let error: unknown;
    try {
      // If both values are provided. Relevant for JavaScript.
      new ClientCertificateCredential(env.AZURE_TENANT_ID!, env.AZURE_CLIENT_ID!, {
        certificatePath: "some/path",
        certificate: "certificate-value",
      } as any);
    } catch (e) {
      error = e;
    }
    assert.ok(error);
    assert.equal(
      (error as Error).message,
      "ClientCertificateCredential: To avoid unexpected behaviors, providing both the contents of a PEM certificate and the path to a PEM certificate is forbidden. To troubleshoot, visit https://aka.ms/azsdk/js/identity/serviceprincipalauthentication/troubleshoot."
    );
  });

  it("throws when given a file that doesn't contain a PEM-formatted certificate", async function (this: Context) {
    const fullPath = path.resolve(__dirname, "../src/index.ts");
    const credential = new ClientCertificateCredential("tenant", "client", {
      certificatePath: fullPath,
    });

    let error: Error | undefined;
    try {
      await credential.getToken(scope);
    } catch (_error) {
      error = _error;
    }

    assert.ok(error);
    assert.deepEqual(error?.message, `ENOENT: no such file or directory, open '${fullPath}'`);
  });

  it("throws when given a certificate that isn't PEM-formatted", async function (this: Context) {
    const credential = new ClientCertificateCredential("tenant", "client", {
      certificate: "not-pem-formatted",
    });

    let error: Error | undefined;
    try {
      await credential.getToken(scope);
    } catch (_error) {
      error = _error;
    }

    assert.ok(error);
    assert.deepEqual(
      error?.message,
      `The file at the specified path does not contain a PEM-encoded certificate.`
    );
  });

  // TODO:
  // This is not the way to test persistence with acquireTokenByClientCredential,
  // since acquireTokenByClientCredential caches at the method level, and not with the same cache used for acquireTokenSilent.
  // I'm leaving this here so I can remember about this in the future.
  it.skip("Authenticates silently after the initial request", async function (this: Context) {
    if (isPlaybackMode()) {
      // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
      // This assertion could be provided as parameters, but we don't have that in the public API yet,
      // and I'm trying to avoid having to generate one ourselves.
      this.skip();
    }

    const credential = new ClientCertificateCredential(env.AZURE_TENANT_ID!, env.AZURE_CLIENT_ID!, {
      certificatePath,
    });

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
  it.skip("supports specifying the regional authority", async function () {
    const credential = new ClientCertificateCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      { certificatePath },
      {
        // TODO: Uncomment once we're ready to release this feature.
        // regionalAuthority: RegionalAuthority.AutoDiscoverRegion
      }
    );

    // We'll abort since we only want to ensure the parameters are sent appropriately.
    const controller = new AbortController();
    const getTokenPromise = credential.getToken(scope, {
      abortSignal: controller.signal,
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
