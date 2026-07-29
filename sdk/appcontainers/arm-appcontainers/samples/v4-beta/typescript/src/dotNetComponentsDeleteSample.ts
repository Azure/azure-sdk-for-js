// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a .NET Component.
 *
 * @summary delete a .NET Component.
 * x-ms-original-file: 2025-10-02-preview/DotNetComponents_Delete.json
 */
async function deleteNETComponent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.dotNetComponents.delete("examplerg", "myenvironment", "mydotnetcomponent");
}

async function main(): Promise<void> {
  await deleteNETComponent();
}

main().catch(console.error);
