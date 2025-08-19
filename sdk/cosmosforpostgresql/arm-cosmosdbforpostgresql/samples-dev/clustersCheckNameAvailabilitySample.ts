// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks availability of a cluster name. Cluster names should be globally unique; at least 3 characters and at most 40 characters long; they must only contain lowercase letters, numbers, and hyphens; and must not start or end with a hyphen.
 *
 * @summary Checks availability of a cluster name. Cluster names should be globally unique; at least 3 characters and at most 40 characters long; they must only contain lowercase letters, numbers, and hyphens; and must not start or end with a hyphen.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/CheckNameAvailability.json
 */

import type { NameAvailabilityRequest } from "@azure/arm-cosmosdbforpostgresql";
import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function checkNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const nameAvailabilityRequest: NameAvailabilityRequest = {
    name: "name1",
    type: "Microsoft.DBforPostgreSQL/serverGroupsv2",
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.clusters.checkNameAvailability(nameAvailabilityRequest);
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailability();
}

main().catch(console.error);
