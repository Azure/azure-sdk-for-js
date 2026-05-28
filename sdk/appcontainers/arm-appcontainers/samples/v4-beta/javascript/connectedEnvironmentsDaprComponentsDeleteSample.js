// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Dapr Component from a connected environment.
 *
 * @summary delete a Dapr Component from a connected environment.
 * x-ms-original-file: 2025-10-02-preview/ConnectedEnvironmentsDaprComponents_Delete.json
 */
async function deleteDaprComponent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.connectedEnvironmentsDaprComponents.delete("examplerg", "myenvironment", "reddog");
}

async function main() {
  await deleteDaprComponent();
}

main().catch(console.error);
