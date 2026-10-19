// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the .NET components in a managed environment.
 *
 * @summary lists the .NET components in a managed environment.
 * x-ms-original-file: 2026-07-01/DotNetComponents_List.json
 */
async function listNETComponents(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dotNetComponents.list("examplerg", "myenvironment")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the .NET components in a managed environment.
 *
 * @summary lists the .NET components in a managed environment.
 * x-ms-original-file: 2026-07-01/DotNetComponents_List_ServiceBind.json
 */
async function listNETComponentsWithServiceBinds(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dotNetComponents.list("examplerg", "myenvironment")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNETComponents();
  await listNETComponentsWithServiceBinds();
}

main().catch(console.error);
