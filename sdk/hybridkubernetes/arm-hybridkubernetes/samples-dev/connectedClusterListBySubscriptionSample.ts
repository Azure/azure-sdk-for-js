// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to enumerate registered connected K8s clusters under a Subscription
 *
 * @summary aPI to enumerate registered connected K8s clusters under a Subscription
 * x-ms-original-file: 2024-12-01-preview/GetClustersBySubscriptionExample.json
 */
async function getClustersBySubscriptionExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new KubernetesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectedCluster.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getClustersBySubscriptionExample();
}

main().catch(console.error);
