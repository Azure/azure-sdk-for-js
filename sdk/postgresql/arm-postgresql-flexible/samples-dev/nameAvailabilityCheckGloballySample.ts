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
 * This sample demonstrates how to Checks the validity and availability of the given name, to assign it to a new server or to use it as the base name of a new pair of virtual endpoints.
 *
 * @summary Checks the validity and availability of the given name, to assign it to a new server or to use it as the base name of a new pair of virtual endpoints.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/NameAvailabilityCheckGlobally.json
 */
async function checkTheValidityAndAvailabilityOfTheGivenNameToAssignItToANewServerOrToUseItAsTheBaseNameOfANewPairOfVirtualEndpoints(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const parameters: CheckNameAvailabilityRequest = {
    name: "exampleserver",
    type: "Microsoft.DBforPostgreSQL/flexibleServers",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.nameAvailability.checkGlobally(parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await checkTheValidityAndAvailabilityOfTheGivenNameToAssignItToANewServerOrToUseItAsTheBaseNameOfANewPairOfVirtualEndpoints();
}

main().catch(console.error);
