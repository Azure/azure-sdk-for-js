// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a specific configuration (also known as server parameter) of a server.
 *
 * @summary gets information about a specific configuration (also known as server parameter) of a server.
 * x-ms-original-file: 2026-01-01-preview/ConfigurationsGet.json
 */
async function getInformationAboutASpecificConfigurationAlsoKnownAsServerParameterOfAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.get(
    "exampleresourcegroup",
    "exampleserver",
    "array_nulls",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutASpecificConfigurationAlsoKnownAsServerParameterOfAServer();
}

main().catch(console.error);
