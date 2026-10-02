// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the .NET components in a managed environment.
 *
 * @summary lists the .NET components in a managed environment.
 * x-ms-original-file: 2026-07-01/DotNetComponents_List.json
 */
async function listNETComponents() {
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
async function listNETComponentsWithServiceBinds() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dotNetComponents.list("examplerg", "myenvironment")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listNETComponents();
  await listNETComponentsWithServiceBinds();
}

main().catch(console.error);
