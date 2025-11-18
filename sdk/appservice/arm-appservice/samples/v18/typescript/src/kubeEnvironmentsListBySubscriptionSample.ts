// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Get all Kubernetes Environments for a subscription.
 *
 * @summary Description for Get all Kubernetes Environments for a subscription.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/AppService/stable/2025-03-01/examples/KubeEnvironments_ListBySubscription.json
 */
async function listKubeEnvironmentsBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const credential = new DefaultAzureCredential();
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
