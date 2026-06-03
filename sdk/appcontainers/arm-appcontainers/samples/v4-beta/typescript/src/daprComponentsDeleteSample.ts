// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Dapr Component from a Managed Environment.
 *
 * @summary delete a Dapr Component from a Managed Environment.
 * x-ms-original-file: 2025-10-02-preview/DaprComponents_Delete.json
 */
async function deleteDaprComponent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.daprComponents.delete("examplerg", "myenvironment", "reddog");
}

async function main(): Promise<void> {
  await deleteDaprComponent();
}

main().catch(console.error);
