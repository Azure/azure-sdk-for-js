// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Dapr subscriptions for a managed environment.
 *
 * @summary get the Dapr subscriptions for a managed environment.
 * x-ms-original-file: 2025-10-02-preview/DaprSubscriptions_List.json
 */
async function listDaprSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.daprSubscriptions.list("examplerg", "myenvironment")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDaprSubscriptions();
}

main().catch(console.error);
