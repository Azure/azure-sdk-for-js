// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { UsageManagementClient } = require("@azure/arm-commerce");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to query aggregated Azure subscription consumption data for a date range.
 *
 * @summary query aggregated Azure subscription consumption data for a date range.
 * x-ms-original-file: 2015-06-01-preview/GetUsageAggregatesList.json
 */
async function getUsageAggregatesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "f68815e6-3c41-45ef-bbd8-5f83303c396b";
  const client = new UsageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usageAggregates.list(
    new Date("2014-05-01T00:00:00+00:00"),
    new Date("2015-06-01T00:00:00+00:00"),
    { showDetails: true },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getUsageAggregatesList();
}

main().catch(console.error);
