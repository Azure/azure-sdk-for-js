// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a specific Log Analytics Query defined within a Log Analytics QueryPack.
 *
 * @summary gets a specific Log Analytics Query defined within a Log Analytics QueryPack.
 * x-ms-original-file: 2025-07-01/QueryPackQueriesGet.json
 */
async function queryGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4918";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.queries.get(
    "my-resource-group",
    "my-querypack",
    "a449f8af-8e64-4b3a-9b16-5a7165ff98c4",
  );
  console.log(result);
}

async function main() {
  await queryGet();
}

main().catch(console.error);
