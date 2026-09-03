// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a .NET Component.
 *
 * @summary get a .NET Component.
 * x-ms-original-file: 2025-10-02-preview/DotNetComponents_Get.json
 */
async function getNETComponent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.dotNetComponents.get(
    "examplerg",
    "myenvironment",
    "mydotnetcomponent",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a .NET Component.
 *
 * @summary get a .NET Component.
 * x-ms-original-file: 2025-10-02-preview/DotNetComponents_Get_ServiceBind.json
 */
async function getNETComponentWithServiceBinds(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.dotNetComponents.get(
    "examplerg",
    "myenvironment",
    "mydotnetcomponent",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getNETComponent();
  await getNETComponentWithServiceBinds();
}

main().catch(console.error);
