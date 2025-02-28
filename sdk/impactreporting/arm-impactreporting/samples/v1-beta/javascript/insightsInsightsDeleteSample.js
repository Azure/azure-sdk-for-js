// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ImpactClient } = require("@azure/arm-impactreporting");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Insight resource, This is Admin only operation
 *
 * @summary delete Insight resource, This is Admin only operation
 * x-ms-original-file: 2024-05-01-preview/Insights_Delete.json
 */
async function deleteAnInsight() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  await client.insights.delete("impactid22", "insightId12");
}

async function main() {
  await deleteAnInsight();
}

main().catch(console.error);
