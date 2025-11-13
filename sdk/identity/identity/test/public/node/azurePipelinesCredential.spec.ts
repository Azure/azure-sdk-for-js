// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePipelinesCredential } from "@azure/identity";
import { isLiveMode } from "@azure-tools/test-recorder";
import { describe, it, assert, expect } from "vitest";

describe("AzurePipelinesCredential", function () {
  const scope = "https://vault.azure.net/.default";
  const tenantId = process.env.AZURE_SERVICE_CONNECTION_TENANT_ID!;

  it.skipIf(!isLiveMode() || !process.env.AZURE_SERVICE_CONNECTION_ID)(
    "authenticates with a valid service connection",
    async function () {
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
      assert.isDefined(token?.token);
      assert.isDefined(token?.expiresOnTimestamp);
      if (token?.expiresOnTimestamp) assert.isTrue(token?.expiresOnTimestamp > Date.now());
    },
  );

  it.skipIf(!isLiveMode())("fails with invalid service connection", async function () {
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
      /invalid_client: Error\(s\): 700213 .* AADSTS700213: No matching federated identity record found for presented assertion subject .*/;
    await expect(credential.getToken(scope)).rejects.toThrow(regExp);
  });

  it.skipIf(!isLiveMode())("failure includes the expected response headers", async function () {
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

    await expect(credential.getToken(scope)).rejects.toThrow(regExpHeader1);

    await expect(credential.getToken(scope)).rejects.toThrow(regExpHeader2);
  });

  // TODO: Unskip this test once service confirms expected behavior
  // Currently, the error message is unrelated to `clientId`
  it.skip("fails with invalid client id", async function () {
    if (!isLiveMode()) {
      // Note: This test is already skipped via it.skip, this check is redundant but kept for clarity
      return;
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
    await expect(credential.getToken(scope)).rejects.toThrow(regExp);
  });

  it.skipIf(!isLiveMode())("fails with with invalid system access token", async function () {
    const clientId = process.env.AZURE_SERVICE_CONNECTION_CLIENT_ID!;
    const existingServiceConnectionId = process.env.AZURE_SERVICE_CONNECTION_ID!;
    const credential = new AzurePipelinesCredential(
      tenantId,
      clientId,
      existingServiceConnectionId,
      "invalidSystemAccessToken",
    );
    await expect(credential.getToken(scope)).rejects.toThrow(/Status code: 401/);
  });
});
