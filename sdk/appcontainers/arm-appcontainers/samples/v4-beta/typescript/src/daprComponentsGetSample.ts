// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a dapr component.
 *
 * @summary get a dapr component.
 * x-ms-original-file: 2025-10-02-preview/DaprComponents_Get_SecretStoreComponent.json
 */
async function getDaprComponentWithSecretStoreComponent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponents.get("examplerg", "myenvironment", "reddog");
  console.log(result);
}

/**
 * This sample demonstrates how to get a dapr component.
 *
 * @summary get a dapr component.
 * x-ms-original-file: 2025-10-02-preview/DaprComponents_Get_Secrets.json
 */
async function getDaprComponentWithSecrets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponents.get("examplerg", "myenvironment", "reddog");
  console.log(result);
}

async function main(): Promise<void> {
  await getDaprComponentWithSecretStoreComponent();
  await getDaprComponentWithSecrets();
}

main().catch(console.error);
