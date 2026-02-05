// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CheckNameAvailabilityRequest} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Check the availability of name for resource
 *
 * @summary Check the availability of name for resource
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/NameAvailabilityCheckWithLocation.json
 */
async function checkTheValidityAndAvailabilityOfTheGivenNameInTheGivenLocationToAssignItToANewServerOrToUseItAsTheBaseNameOfANewPairOfVirtualEndpoints(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const locationName = "eastus";
  const parameters: CheckNameAvailabilityRequest = {
    name: "exampleserver",
    type: "Microsoft.DBforPostgreSQL/flexibleServers",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.nameAvailability.checkWithLocation(
    locationName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkTheValidityAndAvailabilityOfTheGivenNameInTheGivenLocationToAssignItToANewServerOrToUseItAsTheBaseNameOfANewPairOfVirtualEndpoints();
}

main().catch(console.error);
