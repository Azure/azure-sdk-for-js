// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all available tag keys for the defined scope
 *
 * @summary get all available tag keys for the defined scope
 * x-ms-original-file: 2026-06-01/Tags.json
 */
async function tagsGet() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.tags.get("providers/Microsoft.CostManagement/billingAccounts/1234");
  console.log(result);
}

async function main() {
  await tagsGet();
}

main().catch(console.error);
