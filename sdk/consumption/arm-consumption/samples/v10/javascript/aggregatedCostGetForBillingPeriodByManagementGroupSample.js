// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides the aggregate cost of a management group and all child management groups by specified billing period
 *
 * @summary provides the aggregate cost of a management group and all child management groups by specified billing period
 * x-ms-original-file: 2026-06-01/AggregatedCostForBillingPeriodByManagementGroup.json
 */
async function aggregatedCostListForBillingPeriodByManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.aggregatedCost.getForBillingPeriodByManagementGroup(
    "managementGroupForTest",
    "201807",
  );
  console.log(result);
}

async function main() {
  await aggregatedCostListForBillingPeriodByManagementGroup();
}

main().catch(console.error);
