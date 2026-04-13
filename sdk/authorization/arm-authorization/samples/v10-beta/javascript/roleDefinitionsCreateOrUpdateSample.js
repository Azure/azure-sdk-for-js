// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a role definition.
 *
 * @summary creates or updates a role definition.
 * x-ms-original-file: 2022-05-01-preview/PutRoleDefinition.json
 */
async function createRoleDefinition() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleDefinitions.createOrUpdate("scope", "roleDefinitionId", {});
  console.log(result);
}

async function main() {
  await createRoleDefinition();
}

main().catch(console.error);
