// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Log Analytics cluster instance.
 *
 * @summary gets a Log Analytics cluster instance.
 * x-ms-original-file: 2025-07-01/ClustersGet.json
 */
async function clustersGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53bc36c5-91e1-4d09-92c9-63b89e571926";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.clusters.get("oiautorest6685", "oiautorest6685");
  console.log(result);
}

async function main() {
  await clustersGet();
}

main().catch(console.error);
