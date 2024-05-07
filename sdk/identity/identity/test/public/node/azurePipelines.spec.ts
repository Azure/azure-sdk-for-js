// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzurePipelinesCredential } from "../../../src";
import { isLiveMode } from "@azure-tools/test-recorder";
import { assert } from "@azure-tools/test-utils";
describe("AzurePipelinesCredential", function () {
  const scope = "https://vault.azure.net/.default";
  const tenantId = process.env.AZURE_SERVICE_CONNECTION_TENANT_ID!;

  it("authenticates with a valid service connection", async function () {
    if (!isLiveMode()) {
      this.skip();
    }
    // this serviceConnection corresponds to the Azure SDK Test Resources - LiveTestSecrets service
    const existingServiceConnectionId = process.env.AZURE_SERVICE_CONNECTION_ID!;
    // clientId for above service connection
    const clientId = process.env.AZURE_SERVICE_CONNECTION_CLIENT_ID!;
    const credential = new AzurePipelinesCredential(
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
