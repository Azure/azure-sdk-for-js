// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a role definition by ID.
 *
 * @summary gets a role definition by ID.
 * x-ms-original-file: 2022-05-01-preview/GetRoleDefinitionByRoleId.json
 */
async function getRoleDefinitionByRoleID() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleDefinitions.getById("roleDefinitionId");
  console.log(result);
}

async function main() {
  await getRoleDefinitionByRoleID();
}

main().catch(console.error);
