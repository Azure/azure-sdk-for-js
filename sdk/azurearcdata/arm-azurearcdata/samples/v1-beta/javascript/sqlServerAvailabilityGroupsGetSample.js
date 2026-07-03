// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves an Arc Sql Server availability group.
 *
 * @summary retrieves an Arc Sql Server availability group.
 * x-ms-original-file: 2026-03-01-preview/GetArcSqlServerAvailabilityGroup.json
 */
async function retrievesAnArcSqlServerAvailabilityGroupResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerAvailabilityGroups.get(
    "testrg",
    "testSqlServer_INST1",
    "testAG",
  );
  console.log(result);
}

async function main() {
  await retrievesAnArcSqlServerAvailabilityGroupResource();
}

main().catch(console.error);
