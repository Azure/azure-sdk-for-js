// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a role definition.
 *
 * @summary deletes a role definition.
 * x-ms-original-file: 2022-05-01-preview/DeleteRoleDefinition.json
 */
async function deleteRoleDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleDefinitions.delete("scope", "roleDefinitionId");
  console.log(result);
}

async function main(): Promise<void> {
  await deleteRoleDefinition();
}

main().catch(console.error);
