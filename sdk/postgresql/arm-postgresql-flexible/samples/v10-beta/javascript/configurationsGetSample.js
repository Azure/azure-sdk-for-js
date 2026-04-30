// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a specific configuration (also known as server parameter) of a server.
 *
 * @summary gets information about a specific configuration (also known as server parameter) of a server.
 * x-ms-original-file: 2026-01-01-preview/ConfigurationsGet.json
 */
async function getInformationAboutASpecificConfigurationAlsoKnownAsServerParameterOfAServer() {
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

async function main() {
  await getInformationAboutASpecificConfigurationAlsoKnownAsServerParameterOfAServer();
}

main().catch(console.error);
