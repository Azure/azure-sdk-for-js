// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get all Kubernetes Environments for a subscription.
 *
 * @summary description for Get all Kubernetes Environments for a subscription.
 * x-ms-original-file: 2025-05-01/KubeEnvironments_ListBySubscription.json
 */
async function listKubeEnvironmentsBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.kubeEnvironments.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listKubeEnvironmentsBySubscription();
}

main().catch(console.error);
