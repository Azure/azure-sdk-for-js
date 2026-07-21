// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a billing statistic
 *
 * @summary gets a billing statistic
 * x-ms-original-file: 2025-07-01-preview/billingStatistics/GetBillingStatistic.json
 */
async function getABillingStatistic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.billingStatistics.get("myRg", "myWorkspace", "sapSolutionUsage");
  console.log(result);
}

async function main() {
  await getABillingStatistic();
}

main().catch(console.error);
