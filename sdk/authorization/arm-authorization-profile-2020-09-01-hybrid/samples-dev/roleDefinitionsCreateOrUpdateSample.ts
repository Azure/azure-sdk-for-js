// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a role definition.
 *
 * @summary Creates or updates a role definition.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/PutRoleDefinition.json
 */

import type { RoleDefinition } from "@azure/arm-authorization-profile-2020-09-01-hybrid";
import { AuthorizationManagementClient } from "@azure/arm-authorization-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createRoleDefinition(): Promise<void> {
  const subscriptionId =
    process.env["AUTHORIZATION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "scope";
  const roleDefinitionId = "roleDefinitionId";
  const roleDefinition: RoleDefinition = {};
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const result = await client.roleDefinitions.createOrUpdate(
    scope,
    roleDefinitionId,
    roleDefinition,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createRoleDefinition();
}

main().catch(console.error);
