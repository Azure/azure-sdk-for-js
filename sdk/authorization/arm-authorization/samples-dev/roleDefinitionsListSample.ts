// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all role definitions that are applicable at scope and above.
 *
 * @summary get all role definitions that are applicable at scope and above.
 * x-ms-original-file: 2022-05-01-preview/GetRoleDefinitionAtScope.json
 */
async function listRoleDefinitionsForScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.roleDefinitions.list("scope")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRoleDefinitionsForScope();
}

main().catch(console.error);
