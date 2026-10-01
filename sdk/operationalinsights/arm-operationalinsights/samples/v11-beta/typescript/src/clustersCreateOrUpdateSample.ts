// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Log Analytics cluster.
 *
 * @summary create or update a Log Analytics cluster.
 * x-ms-original-file: 2025-07-01/ClustersCreate.json
 */
async function clustersCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53bc36c5-91e1-4d09-92c9-63b89e571926";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.clusters.createOrUpdate("oiautorest6685", "oiautorest6685", {
    location: "eastus",
    sku: { name: "CapacityReservation", capacity: 100 },
    tags: { tag1: "val1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await clustersCreate();
}

main().catch(console.error);
