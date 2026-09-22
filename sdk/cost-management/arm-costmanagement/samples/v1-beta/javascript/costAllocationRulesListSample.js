// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the list of all cost allocation rules for a billing account or enterprise enrollment.
 *
 * @summary get the list of all cost allocation rules for a billing account or enterprise enrollment.
 * x-ms-original-file: 2025-03-01/CostAllocationRulesList.json
 */
async function costAllocationRulesList() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.costAllocationRules.list("100")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await costAllocationRulesList();
}

main().catch(console.error);
