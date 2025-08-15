// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get all role definitions that are applicable at scope and above.
 *
 * @summary Get all role definitions that are applicable at scope and above.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleDefinitionAtScope.json
 */
async function listRoleDefinitionsForScope(): Promise<void> {
  const subscriptionId =
    process.env["AUTHORIZATION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "scope";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.roleDefinitions.list(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listRoleDefinitionsForScope();
}

main().catch(console.error);
