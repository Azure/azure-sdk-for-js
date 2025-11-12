// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates, using Put verb, the value assigned to a specific modifiable configuration (also known as server parameter) of a server.
 *
 * @summary Updates, using Put verb, the value assigned to a specific modifiable configuration (also known as server parameter) of a server.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ConfigurationsUpdateUsingPut.json
 */
async function updateUsingPutVerbTheValueAssignedToASpecificModifiableConfigurationAlsoKnownAsServerParameterOfAServer() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const configurationName = "constraint_exclusion";
  const parameters = {
    source: "user-override",
    value: "on",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.beginPutAndWait(
    resourceGroupName,
    serverName,
    configurationName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateUsingPutVerbTheValueAssignedToASpecificModifiableConfigurationAlsoKnownAsServerParameterOfAServer();
}

main().catch(console.error);
