// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the tuning options of a server.
 *
 * @summary Gets the tuning options of a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/TuningOptionsGet.json
 */
async function getTheTuningOptionsOfAServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const tuningOption = "index";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.tuningOptionsOperations.get(
    resourceGroupName,
    serverName,
    tuningOption,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheTuningOptionsOfAServer();
}

main().catch(console.error);
