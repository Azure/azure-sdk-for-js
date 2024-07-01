// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MsalTestCleanup, msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import { Recorder, env } from "@azure-tools/test-recorder";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { ClientSecretCredential } from "../../../src/credentials/clientSecretCredential";
import { Context } from "mocha";
import { IdentityClient } from "../../../src/client/identityClient";
import { assert } from "@azure-tools/test-utils";

describe("MultiTenantAuthentication", function () {
  let cleanup: MsalTestCleanup;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
    recorder = setup.recorder;
  });

  afterEach(async function () {
    await cleanup();
  });

  it("supports calling graph with client secret", async function () {
    const [tenantId, clientId, clientSecret] = [
      env.AZURE_IDENTITY_MULTI_TENANT_TENANT_ID,
      env.AZURE_IDENTITY_MULTI_TENANT_CLIENT_ID,
      env.AZURE_IDENTITY_MULTI_TENANT_CLIENT_SECRET,
    ];

    if (!tenantId || !clientId || !clientSecret) {
      // multi-tenant credentials live in a shared keyvault whose values are mounted in CI, but not in local dev
      console.log("Multi-tenant credentials not provided, skipping test");
      this.skip();
    }

    const credential = new ClientSecretCredential(
      tenantId,
      clientId,
      clientSecret,
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
