// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Restarts a server.
 *
 * @summary Restarts a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/ServerRestart.json
 */

import {
  RestartParameter,
  ServersRestartOptionalParams,
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function serverRestart(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginRestartAndWait(resourceGroupName, serverName);
  console.log(result);
}

/**
 * This sample demonstrates how to Restarts a server.
 *
 * @summary Restarts a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/ServerRestartWithFailover.json
 */
async function serverRestartWithFailover(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const parameters: RestartParameter = {
    failoverMode: "ForcedFailover",
    restartWithFailover: true,
  };
  const options: ServersRestartOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.beginRestartAndWait(resourceGroupName, serverName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await serverRestart();
  await serverRestartWithFailover();
}

main().catch(console.error);
