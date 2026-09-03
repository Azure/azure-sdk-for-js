// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the result of the specified operation. This link is provided in the CostDetails creation request response Location header.
 *
 * @summary get the result of the specified operation. This link is provided in the CostDetails creation request response Location header.
 * x-ms-original-file: 2025-03-01/CostDetailsOperationResultsBySubscriptionScope.json
 */
async function getDetailsOfTheOperationResult() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateCostDetailsReport.getOperationResults(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await getDetailsOfTheOperationResult();
}

main().catch(console.error);
