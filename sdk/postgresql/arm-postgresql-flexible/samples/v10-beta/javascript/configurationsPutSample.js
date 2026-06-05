// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates, using Put verb, the value assigned to a specific modifiable configuration (also known as server parameter) of a server.
 *
 * @summary updates, using Put verb, the value assigned to a specific modifiable configuration (also known as server parameter) of a server.
 * x-ms-original-file: 2026-01-01-preview/ConfigurationsUpdateUsingPut.json
 */
async function updateUsingPutVerbTheValueAssignedToASpecificModifiableConfigurationAlsoKnownAsServerParameterOfAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.put(
    "exampleresourcegroup",
    "exampleserver",
    "constraint_exclusion",
    { source: "user-override", value: "on" },
  );
  console.log(result);
}

async function main() {
  await updateUsingPutVerbTheValueAssignedToASpecificModifiableConfigurationAlsoKnownAsServerParameterOfAServer();
}

main().catch(console.error);
