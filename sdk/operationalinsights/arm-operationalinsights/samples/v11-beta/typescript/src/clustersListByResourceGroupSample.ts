// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets Log Analytics clusters in a resource group.
 *
 * @summary gets Log Analytics clusters in a resource group.
 * x-ms-original-file: 2025-07-01/ClustersListByResourceGroup.json
 */
async function clustersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53bc36c5-91e1-4d09-92c9-63b89e571926";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listByResourceGroup("oiautorest6685")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await clustersGet();
}

main().catch(console.error);
