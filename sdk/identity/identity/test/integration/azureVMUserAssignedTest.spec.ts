// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isLiveMode } from "@azure-tools/test-recorder";
import { ManagedIdentityCredential } from "@azure/identity";
import { describe, it, assert } from "vitest";
import { requireEnvVar } from "../authTestUtils.js";

// TODO: Re-enable these tests when we create VM resource
describe.skip("AzureVM UserAssigned Integration test", function () {
  it.skipIf(!isLiveMode())("works with a user assigned clientId", async function () {
    const userAssignedClientId = requireEnvVar("IDENTITY_VM_USER_ASSIGNED_MI_CLIENT_ID");
    const credential = new ManagedIdentityCredential({ clientId: userAssignedClientId });
    const accessToken = await credential.getToken("https://management.azure.com/.default");
    assert.exists(accessToken.token);
  });

  it.skipIf(!isLiveMode())("works with a user assigned objectId", async function () {
    const userAssignedObjectId = requireEnvVar("IDENTITY_VM_USER_ASSIGNED_MI_OBJECT_ID");
    const credential = new ManagedIdentityCredential({ objectId: userAssignedObjectId });
    const accessToken = await credential.getToken("https://management.azure.com/.default");
    assert.exists(accessToken.token);
  });
});
