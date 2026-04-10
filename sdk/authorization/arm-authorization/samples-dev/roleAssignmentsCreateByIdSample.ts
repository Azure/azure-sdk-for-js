// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a role assignment by ID.
 *
 * @summary create or update a role assignment by ID.
 * x-ms-original-file: 2022-04-01/RoleAssignments_CreateById.json
 */
async function createOrUpdateRoleAssignmentByID(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleAssignments.createById(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/providers/Microsoft.Authorization/roleAssignments/b0f43c54-e787-4862-89b1-a653fa9cf747",
    {
      roleDefinitionId:
        "/providers/Microsoft.Authorization/roleDefinitions/0b5fe924-9a61-425c-96af-cfe6e287ca2d",
      principalId: "ce2ce14e-85d7-4629-bdbc-454d0519d987",
      principalType: "User",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateRoleAssignmentByID();
}

main().catch(console.error);
