// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import assert from "assert";
import { env, delay } from "@azure/test-utils-recorder";
import { AbortController } from "@azure/abort-controller";
import { MsalTestCleanup, msalNodeTestSetup, testTracing } from "../../msalTestUtils";
import { ClientSecretCredential } from "../../../src";
import { Context } from "mocha";

describe("ClientSecretCredential", function() {
  let cleanup: MsalTestCleanup;
  beforeEach(function(this: Context) {
    cleanup = msalNodeTestSetup(this).cleanup;
  });
  afterEach(async function() {
    await cleanup();
  });

  const scope = "https://vault.azure.net/.default";

  it("authenticates", async function() {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );

    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp! > Date.now());
  });

  it("allows cancelling the authentication", async function() {
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
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
    console.log(error);
    assert.equal(error?.name, "CredentialUnavailable");
    assert.ok(error?.message.includes("could not resolve endpoints"));
  });

  it(
    "supports tracing",
    testTracing({
      test: async (tracingOptions) => {
        const credential = new ClientSecretCredential(
          env.AZURE_TENANT_ID,
          env.AZURE_CLIENT_ID,
          env.AZURE_CLIENT_SECRET
        );

        await credential.getToken(scope, {
          tracingOptions
        });
      },
      children: [
        {
          name: "Azure.Identity.ClientSecretCredential.getToken",
          children: []
        }
      ]
    })
  );
});
