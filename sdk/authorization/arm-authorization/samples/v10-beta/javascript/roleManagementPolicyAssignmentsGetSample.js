// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified role management policy assignment for a resource scope
 *
 * @summary get the specified role management policy assignment for a resource scope
 * x-ms-original-file: 2024-09-01-preview/GetRoleManagementPolicyAssignmentByName.json
 */
async function getConfigurations() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleManagementPolicyAssignments.get(
    "providers/Microsoft.Subscription/subscriptions/129ff972-28f8-46b8-a726-e497be039368",
    "b959d571-f0b5-4042-88a7-01be6cb22db9_a1705bd2-3a8f-45a5-8683-466fcfd5cc24",
  );
  console.log(result);
}

async function main() {
  await getConfigurations();
}

main().catch(console.error);
