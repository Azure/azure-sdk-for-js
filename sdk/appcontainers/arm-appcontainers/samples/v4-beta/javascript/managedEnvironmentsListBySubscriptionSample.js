// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all Managed Environments for a subscription.
 *
 * @summary get all Managed Environments for a subscription.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironments_ListBySubscription.json
 */
async function listEnvironmentsBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedEnvironments.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listEnvironmentsBySubscription();
}

main().catch(console.error);
