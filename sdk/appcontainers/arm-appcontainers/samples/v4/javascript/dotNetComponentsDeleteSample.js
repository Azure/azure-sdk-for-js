// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a .NET component from a managed environment.
 *
 * @summary deletes a .NET component from a managed environment.
 * x-ms-original-file: 2026-07-01/DotNetComponents_Delete.json
 */
async function deleteNETComponent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.dotNetComponents.delete("examplerg", "myenvironment", "mydotnetcomponent");
}

async function main() {
  await deleteNETComponent();
}

main().catch(console.error);
