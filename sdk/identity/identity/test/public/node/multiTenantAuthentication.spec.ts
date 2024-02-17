// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MsalTestCleanup, msalNodeTestSetup } from "../../node/msalNodeTestSetup";
import { createDefaultHttpClient, createHttpHeaders } from "@azure/core-rest-pipeline";

import { ClientSecretCredential } from "../../../src/credentials/clientSecretCredential";
import { Context } from "mocha";

describe("MultiTenantAuthentication", function () {
  let cleanup: MsalTestCleanup;

  beforeEach(async function (this: Context) {
    const setup = await msalNodeTestSetup(this.currentTest);
    cleanup = setup.cleanup;
  });

  afterEach(async function () {
    await cleanup();
  });

  it.only("supports calling graph with client secret", async function () {
    // TODO: validate that env vars exist
    const credential = new ClientSecretCredential(
      process.env.AZURE_IDENTITY_MULTI_TENANT_TENANT_ID!,
      process.env.AZURE_IDENTITY_MULTI_TENANT_CLIENT_ID!,
      process.env.AZURE_IDENTITY_MULTI_TENANT_CLIENT_SECRET!,
    );

    const token = await credential.getToken("https://graph.microsoft.com/.default");
    const client = createDefaultHttpClient();
    const response = await client.sendRequest({
      headers: createHttpHeaders({
        Authorization: `Bearer ${token.token}`,
        ConsistencyLevel: "eventual",
      }),
      method: "GET",
      requestId: "request-id",
      timeout: 0,
      url: "https://graph.microsoft.com/v1.0/applications/$count",
      withCredentials: false,
    });

    console.log(response);
  });
});
