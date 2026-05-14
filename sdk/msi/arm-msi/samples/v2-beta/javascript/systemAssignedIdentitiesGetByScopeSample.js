// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedServiceIdentityClient } = require("@azure/arm-msi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the systemAssignedIdentity available under the specified RP scope.
 *
 * @summary gets the systemAssignedIdentity available under the specified RP scope.
 * x-ms-original-file: 2025-05-31-preview/SystemAssignedIdentityGet.json
 */
async function systemAssignedIdentityGet() {
  const credential = new DefaultAzureCredential();
  const client = new ManagedServiceIdentityClient(credential);
  const result = await client.systemAssignedIdentities.getByScope(
    "subscriptions/subId/resourceGroups/resourceGroupName/providers/Resource.Provider/resourceType/resourceName/identities/default",
  );
  console.log(result);
}

async function main() {
  await systemAssignedIdentityGet();
}

main().catch(console.error);
