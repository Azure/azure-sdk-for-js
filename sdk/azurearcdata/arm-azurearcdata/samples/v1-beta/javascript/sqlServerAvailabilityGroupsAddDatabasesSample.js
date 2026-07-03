// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to request adding database(s) to an existing availability group.
 *
 * @summary request adding database(s) to an existing availability group.
 * x-ms-original-file: 2026-03-01-preview/AddDatabasesToAvailabilityGroup.json
 */
async function addDatabasesToThisAvailabilityGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerAvailabilityGroups.addDatabases(
    "testrg",
    "testSqlServer_INST1",
    "testAG",
    { values: ["db1", "db2", "db3"] },
  );
  console.log(result);
}

async function main() {
  await addDatabasesToThisAvailabilityGroup();
}

main().catch(console.error);
