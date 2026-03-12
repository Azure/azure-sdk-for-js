// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to API to enumerate registered connected K8s clusters under a Subscription
 *
 * @summary API to enumerate registered connected K8s clusters under a Subscription
 * x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/GetClustersBySubscriptionExample.json
 */

import { ConnectedKubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getClustersBySubscriptionExample(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDKUBERNETES_SUBSCRIPTION_ID"] ||
    "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const credential = new DefaultAzureCredential();
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectedClusterOperations.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getClustersBySubscriptionExample();
}

main().catch(console.error);
