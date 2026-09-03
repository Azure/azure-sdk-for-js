// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a dapr component.
 *
 * @summary get a dapr component.
 * x-ms-original-file: 2025-10-02-preview/ConnectedEnvironmentsDaprComponents_Get.json
 */
async function getDaprComponent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironmentsDaprComponents.get(
    "examplerg",
    "myenvironment",
    "reddog",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDaprComponent();
}

main().catch(console.error);
