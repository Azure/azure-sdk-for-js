// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import assert from "assert";
import * as path from "path";
import { AbortController } from "@azure/abort-controller";
import { env, isPlaybackMode, delay } from "@azure/test-utils-recorder";
import { MsalTestCleanup, msalNodeTestSetup, testTracing } from "../../msalTestUtils";
import { ClientCertificateCredential } from "../../../src";
import { Context } from "mocha";

describe("ClientCertificateCredential", function() {
  let cleanup: MsalTestCleanup;
  beforeEach(function(this: Context) {
    cleanup = msalNodeTestSetup(this).cleanup;
  });
  afterEach(async function() {
    await cleanup();
  });

  const certificatePath = path.resolve(__dirname, "../test/assets/cert.pem");
  const scope = "https://vault.azure.net/.default";

  it("authenticates", async function(this: Context) {
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

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("authenticates with sendCertificateChain", async function(this: Context) {
    if (isPlaybackMode()) {
      // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
      // This assertion could be provided as parameters, but we don't have that in the public API yet,
      // and I'm trying to avoid having to generate one ourselves.
      this.skip();
    }

    const credential = new ClientCertificateCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      certificatePath,
      { sendCertificateChain: true }
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("allows cancelling the authentication", async function() {
    const credential = new ClientCertificateCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      certificatePath
    );

    const controller = new AbortController();
    const getTokenPromise = credential.getToken(scope, {
      abortSignal: controller.signal
    });

    await delay(5);
    controller.abort();

    let error: Error | undefined;
    try {
      await getTokenPromise;
    } catch (e) {
      error = e;
    }
    assert.equal(error?.name, "CredentialUnavailable");
    assert.ok(error?.message.includes("could not resolve endpoints"));
  });

  it("supports tracing", async function(this: Context) {
    if (isPlaybackMode()) {
      // MSAL creates a client assertion based on the certificate that I haven't been able to mock.
      // This assertion could be provided as parameters, but we don't have that in the public API yet,
      // and I'm trying to avoid having to generate one ourselves.
      this.skip();
    }
    await testTracing({
      test: async (spanOptions) => {
        const credential = new ClientCertificateCredential(
          env.AZURE_TENANT_ID,
          env.AZURE_CLIENT_ID,
          certificatePath
        );

        await credential.getToken(scope, {
          tracingOptions: {
            spanOptions
          }
        });
      },
      children: [
        {
          name: "Azure.Identity.ClientCertificateCredential.getToken",
          children: []
        }
      ]
    });
  });
});
