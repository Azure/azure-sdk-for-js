// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ConfigurationForUpdate} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the value assigned to a specific modifiable configuration (also known as server parameter) of a server.
 *
 * @summary Updates the value assigned to a specific modifiable configuration (also known as server parameter) of a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ConfigurationsUpdate.json
 */
async function updateTheValueAssignedToASpecificModifiableConfigurationAlsoKnownAsServerParameterOfAServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const configurationName = "constraint_exclusion";
  const parameters: ConfigurationForUpdate = {
    source: "user-override",
    value: "on",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.configurations.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    configurationName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateTheValueAssignedToASpecificModifiableConfigurationAlsoKnownAsServerParameterOfAServer();
}

main().catch(console.error);
