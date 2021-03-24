// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import assert from "assert";
import { env, delay } from "@azure/test-utils-recorder";
import { AbortController } from "@azure/abort-controller";
import { UsernamePasswordCredential } from "../../../src";
import { MsalTestCleanup, msalNodeTestSetup, testTracing } from "../../msalTestUtils";

describe("UsernamePasswordCredential", function() {
  let cleanup: MsalTestCleanup;
  beforeEach(function() {
    cleanup = msalNodeTestSetup(this).cleanup;
  });
  afterEach(async function() {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("authenticates", async function() {
    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("allows cancelling the authentication", async function() {
    const credential = new UsernamePasswordCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_USERNAME,
      env.AZURE_PASSWORD
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

  it(
    "supports tracing",
    testTracing({
      test: async (spanOptions) => {
        const credential = new UsernamePasswordCredential(
          env.AZURE_TENANT_ID,
          env.AZURE_CLIENT_ID,
          env.AZURE_USERNAME,
          env.AZURE_PASSWORD
        );

        await credential.getToken(scope, {
          tracingOptions: {
            spanOptions
          }
        });
      },
      children: [
        {
          name: "Azure.Identity.UsernamePasswordCredential.getToken",
          children: []
        }
      ]
    })
  );
});
