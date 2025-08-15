// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RoleAssignmentCreateParameters } from "@azure/arm-authorization-profile-2020-09-01-hybrid";
import { AuthorizationManagementClient } from "@azure/arm-authorization-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a role assignment by ID.
 *
 * @summary Creates a role assignment by ID.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/PutRoleAssignmentById.json
 */
async function createRoleAssignmentById(): Promise<void> {
  const subscriptionId =
    process.env["AUTHORIZATION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const roleAssignmentId = "roleAssignmentId";
  const parameters: RoleAssignmentCreateParameters = {
    properties: {
      principalId: "d93a38bc-d029-4160-bfb0-fbda779ac214",
      roleDefinitionId:
        "/subscriptions/4004a9fd-d58e-48dc-aeb2-4a4aec58606f/providers/Microsoft.Authorization/roleDefinitions/de139f84-1756-47ae-9be6-808fbbe84772",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const result = await client.roleAssignments.createById(roleAssignmentId, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await createRoleAssignmentById();
}

main().catch(console.error);
