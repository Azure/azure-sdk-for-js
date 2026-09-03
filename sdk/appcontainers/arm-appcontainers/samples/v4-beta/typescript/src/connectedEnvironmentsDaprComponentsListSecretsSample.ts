// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list secrets for a dapr component
 *
 * @summary list secrets for a dapr component
 * x-ms-original-file: 2025-10-02-preview/ConnectedEnvironmentsDaprComponents_ListSecrets.json
 */
async function listContainerAppsSecrets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironmentsDaprComponents.listSecrets(
    "examplerg",
    "myenvironment",
    "reddog",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listContainerAppsSecrets();
}

main().catch(console.error);
