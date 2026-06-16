// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the result of the specified operation. The link with this operationId is provided as a response header of the initial request.
 *
 * @summary gets the result of the specified operation. The link with this operationId is provided as a response header of the initial request.
 * x-ms-original-file: 2025-03-01/GenerateDetailedCostReportOperationResultsBySubscriptionScope.json
 */
async function getDetailsOfTheOperationResult() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateDetailedCostReportOperationResults.get(
    "00000000-0000-0000-0000-000000000000",
    "subscriptions/00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await getDetailsOfTheOperationResult();
}

main().catch(console.error);
