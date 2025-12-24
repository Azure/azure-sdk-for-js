// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Cluster} from "@azure/arm-operationalinsights";
import {
  OperationalInsightsManagementClient,
} from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a Log Analytics cluster.
 *
 * @summary Create or update a Log Analytics cluster.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/ClustersCreate.json
 */
async function clustersCreate(): Promise<void> {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] ||
    "53bc36c5-91e1-4d09-92c9-63b89e571926";
  const resourceGroupName =
    process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "oiautorest6685";
  const clusterName = "oiautorest6685";
  const parameters: Cluster = {
    location: "eastus",
    sku: { name: "CapacityReservation", capacity: 100 },
    tags: { tag1: "val1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.clusters.beginCreateOrUpdateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await clustersCreate();
}

main().catch(console.error);
