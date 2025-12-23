// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets information about a specific configuration (also known as server parameter) of a server.
 *
 * @summary Gets information about a specific configuration (also known as server parameter) of a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ConfigurationsGet.json
 */
async function getInformationAboutASpecificConfigurationAlsoKnownAsServerParameterOfAServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const configurationName = "array_nulls";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.configurations.get(
    resourceGroupName,
    serverName,
    configurationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutASpecificConfigurationAlsoKnownAsServerParameterOfAServer();
}

main().catch(console.error);
