// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a role definition by ID.
 *
 * @summary gets a role definition by ID.
 * x-ms-original-file: 2022-05-01-preview/GetRoleDefinitionByRoleId.json
 */
async function getRoleDefinitionByRoleID(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleDefinitions.getById("roleDefinitionId");
  console.log(result);
}

async function main(): Promise<void> {
  await getRoleDefinitionByRoleID();
}

main().catch(console.error);
