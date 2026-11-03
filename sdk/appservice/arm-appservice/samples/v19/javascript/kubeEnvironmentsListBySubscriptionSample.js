// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get all Kubernetes Environments for a subscription.
 *
 * @summary description for Get all Kubernetes Environments for a subscription.
 * x-ms-original-file: 2025-05-01/KubeEnvironments_ListBySubscription.json
 */
async function listKubeEnvironmentsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.kubeEnvironments.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listKubeEnvironmentsBySubscription();
}

main().catch(console.error);
