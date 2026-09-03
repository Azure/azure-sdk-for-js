// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get role definition by ID (GUID).
 *
 * @summary get role definition by ID (GUID).
 * x-ms-original-file: 2022-05-01-preview/GetRoleDefinitionById.json
 */
async function getRoleDefinitionById(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleDefinitions.get("scope", "roleDefinitionId");
  console.log(result);
}

async function main(): Promise<void> {
  await getRoleDefinitionById();
}

main().catch(console.error);
