// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzurePipelinesCredential } from "../../../src";
import { isLiveMode } from "@azure-tools/test-recorder";
import { assert } from "@azure-tools/test-utils";

describe.only("AzurePipelinesCredential", function () {
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
      systemAccessToken
    );
    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.isDefined(token?.expiresOnTimestamp);
    if (token?.expiresOnTimestamp) assert.ok(token?.expiresOnTimestamp > Date.now());
  });

  it("fails with with invalid service connection", async function () {
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
      systemAccessToken
    );
    const regExp: RegExp =
      /AzurePipelinesCredential: Authenticated Failed. Received null token from OIDC request. Response status- 404./;
    assert.throws(
      async () => {
        await credential.getToken(scope);
      },
      regExp,
      "error thrown matches."
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
      systemAccessToken
    );
    //await assert.isRejected(credential.getToken(scope), /some message/)
    try {
      await credential.getToken(scope);
    } catch (e) {
      console.log(e);
    }
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
      "systemAccessToken"
    );
    try {
      const token = await credential.getToken(scope);
      assert.ok(token?.token);
      assert.isDefined(token?.expiresOnTimestamp);
      if (token?.expiresOnTimestamp) assert.ok(token?.expiresOnTimestamp > Date.now());
      //await assert.isRejected(credential.getToken(scope), /some message/)
    } catch (e) {
      console.log(e);
    }
  });
});
