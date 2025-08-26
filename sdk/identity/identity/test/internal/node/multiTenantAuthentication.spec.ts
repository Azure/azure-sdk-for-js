// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MsalTestCleanup } from "../../node/msalNodeTestSetup.js";
import { msalNodeTestSetup } from "../../node/msalNodeTestSetup.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { ClientSecretCredential } from "@azure/identity";
import { IdentityClient } from "$internal/client/identityClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("MultiTenantAuthentication", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const setup = await msalNodeTestSetup(ctx);
    cleanup = setup.cleanup;
    recorder = setup.recorder;
  });

  afterEach(async function () {
    await cleanup();
  });

  it("supports calling graph with client secret", async function (ctx) {
    const [tenantId, clientId, clientSecret] = [
      env.AZURE_IDENTITY_MULTI_TENANT_TENANT_ID,
      env.AZURE_IDENTITY_MULTI_TENANT_CLIENT_ID,
      env.AZURE_IDENTITY_MULTI_TENANT_CLIENT_SECRET,
    ];

    if (!tenantId || !clientId || !clientSecret) {
      // multi-tenant credentials live in a shared keyvault whose values are mounted in CI, but not in local dev
      console.log("Multi-tenant credentials not provided, skipping test");
      ctx.skip();
    }

    const credential = new ClientSecretCredential(
      tenantId!,
      clientId!,
      clientSecret!,
      recorder.configureClientOptions({}),
    );

    const token = await credential.getToken("https://graph.microsoft.com/.default");
    const client = new IdentityClient(recorder.configureClientOptions({}));

    const request = createPipelineRequest({
      url: "https://graph.microsoft.com/v1.0/applications/$count",
      method: "GET",
      headers: createHttpHeaders({
        Authorization: `Bearer ${token.token}`,
        ConsistencyLevel: "eventual",
      }),
    });

    const response = await client.sendRequest(request);
    assert.equal(response.status, 200);
    assert.isNotEmpty(response.bodyAsText);
    assert.isAbove(Number.parseInt(response.bodyAsText!, 10), 0);
  });
});
