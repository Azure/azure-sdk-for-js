// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a cluster instance.
 *
 * @summary deletes a cluster instance.
 * x-ms-original-file: 2025-07-01/ClustersDelete.json
 */
async function clustersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53bc36c5-91e1-4d09-92c9-63b89e571926";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.clusters.delete("oiautorest6685", "oiautorest6685");
}

async function main(): Promise<void> {
  await clustersDelete();
}

main().catch(console.error);
