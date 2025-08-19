// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new server.
 *
 * @summary Creates a new server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/AdministratorAdd.json
 */

import {
  ActiveDirectoryAdministratorAdd,
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function addsAnMicrosoftEntraAdministratorForTheServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const objectId = "oooooooo-oooo-oooo-oooo-oooooooooooo";
  const parameters: ActiveDirectoryAdministratorAdd = {
    principalName: "testuser1@microsoft.com",
    principalType: "User",
    tenantId: "tttttttt-tttt-tttt-tttt-tttttttttttt",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.administrators.beginCreateAndWait(
    resourceGroupName,
    serverName,
    objectId,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await addsAnMicrosoftEntraAdministratorForTheServer();
}

main().catch(console.error);
