// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzurePipelinesServiceConnectionCredential } from "../../../src";
import { env, isLiveMode } from "@azure-tools/test-recorder";
import { assert } from "@azure-tools/test-utils";

describe("AzurePipelinesServiceConnectionCredential", function () {
  const scope = "https://vault.azure.net/.default";
  const tenantId = env.IDENTITY_SP_TENANT_ID || env.AZURE_TENANT_ID!;
  // const clientId = env.IDENTITY_SP_CLIENT_ID || env.AZURE_CLIENT_ID!;

  it("authenticates with a valid service connection", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    // this serviceConnection corresponds to the Azure SDK Test Resources - LiveTestSecrets service
    const existingServiceConnectionId = "0dec29c2-a766-4121-9c2e-1894f5aca5cb";
    // clientId for above service connection
    const clientId = "203c27cb-6778-4ecc-9bfd-9f03a61f3408";
    const credential = new AzurePipelinesServiceConnectionCredential(
      tenantId,
      clientId,
      existingServiceConnectionId,
    );
    try {
      const token = await credential.getToken(scope);
      assert.ok(token?.token);
      assert.isDefined(token?.expiresOnTimestamp);
      if (token?.expiresOnTimestamp) assert.ok(token?.expiresOnTimestamp > Date.now());
    } catch (e) {
      console.log(e);
    }
  });
});
