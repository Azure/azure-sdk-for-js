// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a role management policy
 *
 * @summary delete a role management policy
 * x-ms-original-file: 2024-09-01-preview/DeleteRoleManagementPolicy.json
 */
async function deleteRoleManagementPolicy() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.roleManagementPolicies.delete(
    "providers/Microsoft.Subscription/subscriptions/129ff972-28f8-46b8-a726-e497be039368",
    "570c3619-7688-4b34-b290-2b8bb3ccab2a",
  );
}

async function main() {
  await deleteRoleManagementPolicy();
}

main().catch(console.error);
