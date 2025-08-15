// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get role definition by ID (GUID).
 *
 * @summary Get role definition by ID (GUID).
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2022-05-01-preview/examples/GetRoleDefinitionById.json
 */
async function getRoleDefinitionById(): Promise<void> {
  const scope = "scope";
  const roleDefinitionId = "roleDefinitionId";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleDefinitions.get(scope, roleDefinitionId);
  console.log(result);
}

async function main(): Promise<void> {
  await getRoleDefinitionById();
}

main().catch(console.error);
