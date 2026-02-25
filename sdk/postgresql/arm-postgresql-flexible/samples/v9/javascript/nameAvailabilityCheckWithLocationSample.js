// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Check the availability of name for resource
 *
 * @summary Check the availability of name for resource
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/NameAvailabilityCheckWithLocation.json
 */
async function checkTheValidityAndAvailabilityOfTheGivenNameInTheGivenLocationToAssignItToANewServerOrToUseItAsTheBaseNameOfANewPairOfVirtualEndpoints() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const locationName = "eastus";
  const parameters = {
    name: "exampleserver",
    type: "Microsoft.DBforPostgreSQL/flexibleServers",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.nameAvailability.checkWithLocation(locationName, parameters);
  console.log(result);
}

async function main() {
  await checkTheValidityAndAvailabilityOfTheGivenNameInTheGivenLocationToAssignItToANewServerOrToUseItAsTheBaseNameOfANewPairOfVirtualEndpoints();
}

main().catch(console.error);
