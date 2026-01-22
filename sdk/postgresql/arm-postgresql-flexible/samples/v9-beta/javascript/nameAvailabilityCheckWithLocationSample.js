// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the availability of name for resource
 *
 * @summary check the availability of name for resource
 * x-ms-original-file: 2026-01-01-preview/NameAvailabilityCheckWithLocation.json
 */
async function checkTheValidityAndAvailabilityOfTheGivenNameInTheGivenLocationToAssignItToANewServerOrToUseItAsTheBaseNameOfANewPairOfVirtualEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.nameAvailability.checkWithLocation("eastus", {
    name: "exampleserver",
    type: "Microsoft.DBforPostgreSQL/flexibleServers",
  });
  console.log(result);
}

async function main() {
  await checkTheValidityAndAvailabilityOfTheGivenNameInTheGivenLocationToAssignItToANewServerOrToUseItAsTheBaseNameOfANewPairOfVirtualEndpoints();
}

main().catch(console.error);
