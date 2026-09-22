// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a specific Query defined within an Log Analytics QueryPack.
 *
 * @summary deletes a specific Query defined within an Log Analytics QueryPack.
 * x-ms-original-file: 2025-07-01/QueryPackQueriesDelete.json
 */
async function queryDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4918";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.queries.delete(
    "my-resource-group",
    "my-querypack",
    "a449f8af-8e64-4b3a-9b16-5a7165ff98c4",
  );
}

async function main() {
  await queryDelete();
}

main().catch(console.error);
