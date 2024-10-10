// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePipelinesCredential } from "../../../src";
import { isLiveMode } from "@azure-tools/test-recorder";
import { assert } from "@azure-tools/test-utils";

describe("AzurePipelinesCredential", function () {
  const scope = "https://vault.azure.net/.default";
  const tenantId = process.env.AZURE_SERVICE_CONNECTION_TENANT_ID!;

  it("authenticates with a valid service connection", async function () {
    if (!isLiveMode() || !process.env.AZURE_SERVICE_CONNECTION_ID) {
      this.skip();
    }
    // this serviceConnection corresponds to the Azure SDK Test Resources - LiveTestSecrets service
    const existingServiceConnectionId = process.env.AZURE_SERVICE_CONNECTION_ID!;
    // clientId for above service connection
    const clientId = process.env.AZURE_SERVICE_CONNECTION_CLIENT_ID!;
    const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN!;
    const credential = new AzurePipelinesCredential(
      tenantId,
      clientId,
      existingServiceConnectionId,
      systemAccessToken,
    );
    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.isDefined(token?.expiresOnTimestamp);
    if (token?.expiresOnTimestamp) assert.ok(token?.expiresOnTimestamp > Date.now());
  });

  it("fails with invalid service connection", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    // clientId for above service connection
    const clientId = process.env.AZURE_SERVICE_CONNECTION_CLIENT_ID!;
    const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN!;
    const credential = new AzurePipelinesCredential(
      tenantId,
      clientId,
      "existingServiceConnectionId",
      systemAccessToken,
    );
    const regExp: RegExp =
      /invalid_client: Error\(s\): 700213 .* AADSTS700213: No matching federated identity record found for presented assertion subject .* Please note that the matching is done using a case-sensitive comparison. Check your federated identity credential Subject, Audience and Issuer against the presented assertion/;
    await assert.isRejected(
      credential.getToken(scope),
      regExp,
      "error thrown doesn't match or promise not rejected",
    );
  });

  it("failure includes the expected response headers", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    // clientId for above service connection
    const clientId = process.env.AZURE_SERVICE_CONNECTION_CLIENT_ID!;
    const existingServiceConnectionId = process.env.AZURE_SERVICE_CONNECTION_ID!;
    const credential = new AzurePipelinesCredential(
      tenantId,
      clientId,
      existingServiceConnectionId,
      "invalidSystemAccessToken",
    );
    const regExpHeader1: RegExp = /"x-vss-e2eid"/gm;
    const regExpHeader2: RegExp = /"x-msedge-ref"/gm;

    await assert.isRejected(
      credential.getToken(scope),
      regExpHeader1,
      "error thrown doesn't contain expected header 'x-vss-e2eid'",
    );

    await assert.isRejected(
      credential.getToken(scope),
      regExpHeader2,
      "error thrown doesn't contain expected header 'x-msedge-ref'",
    );
  });

  it("fails with with invalid client id", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    const existingServiceConnectionId = process.env.AZURE_SERVICE_CONNECTION_ID!;
    const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN!;
    const credential = new AzurePipelinesCredential(
      tenantId,
      "clientId",
      existingServiceConnectionId,
      systemAccessToken,
    );
    const regExp: RegExp =
      /AADSTS700016: Application with identifier 'clientId' was not found in the directory 'Microsoft'/;
    await assert.isRejected(
      credential.getToken(scope),
      regExp,
      "error thrown doesn't match or promise not rejected",
    );
  });

  it("fails with with invalid system access token", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    const clientId = process.env.AZURE_SERVICE_CONNECTION_CLIENT_ID!;
    const existingServiceConnectionId = process.env.AZURE_SERVICE_CONNECTION_ID!;
    const credential = new AzurePipelinesCredential(
      tenantId,
      clientId,
      existingServiceConnectionId,
      "invalidSystemAccessToken",
    );
    await assert.isRejected(credential.getToken(scope), /Status code: 401/);
  });
});
