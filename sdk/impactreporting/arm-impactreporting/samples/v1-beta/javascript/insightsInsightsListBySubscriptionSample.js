// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImpactClient } = require("@azure/arm-impactreporting");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Insight resources by workloadImpactName
 *
 * @summary list Insight resources by workloadImpactName
 * x-ms-original-file: 2024-05-01-preview/Insights_ListBySubscription.json
 */
async function listInsightResourcesByWorkloadImpactName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.insights.listBySubscription("impactid22")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listInsightResourcesByWorkloadImpactName();
}

main().catch(console.error);
