// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to request removing database(s) from an existing availability group.
 *
 * @summary request removing database(s) from an existing availability group.
 * x-ms-original-file: 2026-03-01-preview/RemoveDatabasesFromAvailabilityGroup.json
 */
async function removeDatabasesFromThisAvailabilityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerAvailabilityGroups.removeDatabases(
    "testrg",
    "testSqlServer_INST1",
    "testAG",
    { values: ["db1"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await removeDatabasesFromThisAvailabilityGroup();
}

main().catch(console.error);
