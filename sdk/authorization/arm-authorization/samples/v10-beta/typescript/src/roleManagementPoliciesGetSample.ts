// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified role management policy for a resource scope
 *
 * @summary get the specified role management policy for a resource scope
 * x-ms-original-file: 2024-09-01-preview/GetRoleManagementPolicyByName.json
 */
async function getRoleManagementPolicyByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleManagementPolicies.get(
    "providers/Microsoft.Subscription/subscriptions/129ff972-28f8-46b8-a726-e497be039368",
    "570c3619-7688-4b34-b290-2b8bb3ccab2a",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRoleManagementPolicyByName();
}

main().catch(console.error);
