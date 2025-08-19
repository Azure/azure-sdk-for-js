// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a role definition by ID.
 *
 * @summary Gets a role definition by ID.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2022-05-01-preview/examples/GetRoleDefinitionByRoleId.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getRoleDefinitionByRoleId(): Promise<void> {
  const roleId = "roleDefinitionId";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleDefinitions.getById(roleId);
  console.log(result);
}

async function main(): Promise<void> {
  await getRoleDefinitionByRoleId();
}

main().catch(console.error);
