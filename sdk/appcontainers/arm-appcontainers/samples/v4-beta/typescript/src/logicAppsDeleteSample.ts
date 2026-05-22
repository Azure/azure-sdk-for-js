// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Logic App extension resource
 *
 * @summary deletes a Logic App extension resource
 * x-ms-original-file: 2025-10-02-preview/LogicApps_Delete.json
 */
async function createLogicAppExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.logicApps.delete("examplerg", "testcontainerApp0", "testcontainerApp0");
}

async function main(): Promise<void> {
  await createLogicAppExtension();
}

main().catch(console.error);
