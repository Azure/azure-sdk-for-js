// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a dapr component.
 *
 * @summary get a dapr component.
 * x-ms-original-file: 2025-10-02-preview/DaprComponents_Get_SecretStoreComponent.json
 */
async function getDaprComponentWithSecretStoreComponent() {
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
async function getDaprComponentWithSecrets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponents.get("examplerg", "myenvironment", "reddog");
  console.log(result);
}

async function main() {
  await getDaprComponentWithSecretStoreComponent();
  await getDaprComponentWithSecrets();
}

main().catch(console.error);
