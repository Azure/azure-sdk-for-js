// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a .NET Component.
 *
 * @summary get a .NET Component.
 * x-ms-original-file: 2025-10-02-preview/DotNetComponents_Get.json
 */
async function getNETComponent() {
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
async function getNETComponentWithServiceBinds() {
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

async function main() {
  await getNETComponent();
  await getNETComponentWithServiceBinds();
}

main().catch(console.error);
