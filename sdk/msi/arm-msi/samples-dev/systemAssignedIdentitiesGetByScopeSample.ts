// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the systemAssignedIdentity available under the specified RP scope.
 *
 * @summary Gets the systemAssignedIdentity available under the specified RP scope.
 * x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/SystemAssignedIdentityGet.json
 */

import { ManagedServiceIdentityClient } from "@azure/arm-msi";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function msiOperationsList(): Promise<void> {
  const scope =
    "subscriptions/subId/resourceGroups/resourceGroupName/providers/Resource.Provider/resourceType/resourceName/identities/default";
  const credential = new DefaultAzureCredential();
  const client = new ManagedServiceIdentityClient(credential);
  const result = await client.systemAssignedIdentities.getByScope(scope);
  console.log(result);
}

async function main(): Promise<void> {
  await msiOperationsList();
}

main().catch(console.error);
