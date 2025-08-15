// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes a role definition.
 *
 * @summary Deletes a role definition.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2022-05-01-preview/examples/DeleteRoleDefinition.json
 */
async function deleteRoleDefinition(): Promise<void> {
  const scope = "scope";
  const roleDefinitionId = "roleDefinitionId";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleDefinitions.delete(scope, roleDefinitionId);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteRoleDefinition();
}

main().catch(console.error);
