// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a role assignment by ID.
 *
 * @summary get a role assignment by ID.
 * x-ms-original-file: 2022-04-01/RoleAssignments_GetById.json
 */
async function getRoleAssignmentByID(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleAssignments.getById(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/providers/Microsoft.Authorization/roleAssignments/b0f43c54-e787-4862-89b1-a653fa9cf747",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRoleAssignmentByID();
}

main().catch(console.error);
