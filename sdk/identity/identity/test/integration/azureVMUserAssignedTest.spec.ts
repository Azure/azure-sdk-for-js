// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isLiveMode } from "@azure-tools/test-recorder";
import { ManagedIdentityCredential } from "@azure/identity";
import { describe, it, assert } from "vitest";

describe("AzureVM UserAssigned Integration test", function () {
  it.skipIf(!isLiveMode())("works with a user assigned clientId", async function () {
    const userAssignedClientId = process.env.IDENTITY_USER_DEFINED_CLIENT_ID;
    if (!userAssignedClientId) {
      console.log("IDENTITY_USER_DEFINED_CLIENT_ID is not set");
      throw new Error("IDENTITY_USER_DEFINED_CLIENT_ID is not set");
    }
    const credential = new ManagedIdentityCredential({ clientId: userAssignedClientId });
    const accessToken = await credential.getToken("https://management.azure.com/.default");
    assert.exists(accessToken.token);
  });

  it.skipIf(!isLiveMode())("works with a user assigned objectId", async function (ctx) {
    const userAssignedObjectId = process.env.IDENTITY_USER_DEFINED_OBJECT_ID;
    if (!userAssignedObjectId) {
      console.log("IDENTITY_USER_DEFINED_OBJECT_ID is not set");
      throw new Error("IDENTITY_USER_DEFINED_OBJECT_ID is not set");
    }
    const credential = new ManagedIdentityCredential({ objectId: userAssignedObjectId });
    const accessToken = await credential.getToken("https://management.azure.com/.default");
    assert.exists(accessToken.token);
  });
});
