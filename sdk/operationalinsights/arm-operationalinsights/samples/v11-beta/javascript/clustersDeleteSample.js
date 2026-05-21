// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a cluster instance.
 *
 * @summary deletes a cluster instance.
 * x-ms-original-file: 2025-07-01/ClustersDelete.json
 */
async function clustersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53bc36c5-91e1-4d09-92c9-63b89e571926";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.clusters.delete("oiautorest6685", "oiautorest6685");
}

async function main() {
  await clustersDelete();
}

main().catch(console.error);
