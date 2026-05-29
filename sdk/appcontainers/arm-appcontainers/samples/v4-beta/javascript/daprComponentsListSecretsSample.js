// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list secrets for a dapr component
 *
 * @summary list secrets for a dapr component
 * x-ms-original-file: 2025-10-02-preview/DaprComponents_ListSecrets.json
 */
async function listContainerAppsSecrets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.daprComponents.listSecrets("examplerg", "myenvironment", "reddog");
  console.log(result);
}

async function main() {
  await listContainerAppsSecrets();
}

main().catch(console.error);
