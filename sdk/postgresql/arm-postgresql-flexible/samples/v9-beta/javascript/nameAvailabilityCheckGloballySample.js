// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks the validity and availability of the given name, to assign it to a new server or to use it as the base name of a new pair of virtual endpoints.
 *
 * @summary checks the validity and availability of the given name, to assign it to a new server or to use it as the base name of a new pair of virtual endpoints.
 * x-ms-original-file: 2026-01-01-preview/NameAvailabilityCheckGlobally.json
 */
async function checkTheValidityAndAvailabilityOfTheGivenNameToAssignItToANewServerOrToUseItAsTheBaseNameOfANewPairOfVirtualEndpoints() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.nameAvailability.checkGlobally({
    name: "exampleserver",
    type: "Microsoft.DBforPostgreSQL/flexibleServers",
  });
  console.log(result);
}

async function main() {
  await checkTheValidityAndAvailabilityOfTheGivenNameToAssignItToANewServerOrToUseItAsTheBaseNameOfANewPairOfVirtualEndpoints();
}

main().catch(console.error);
