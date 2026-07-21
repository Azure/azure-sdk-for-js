// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a cost allocation rule by rule name and billing account or enterprise enrollment.
 *
 * @summary get a cost allocation rule by rule name and billing account or enterprise enrollment.
 * x-ms-original-file: 2025-03-01/CostAllocationRuleGet.json
 */
async function costAllocationRules() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.costAllocationRules.get("100", "testRule");
  console.log(result);
}

async function main() {
  await costAllocationRules();
}

main().catch(console.error);
