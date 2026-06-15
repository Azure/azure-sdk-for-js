// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Java Component.
 *
 * @summary get a Java Component.
 * x-ms-original-file: 2025-10-02-preview/JavaComponents_Get.json
 */
async function getJavaComponent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.javaComponents.get("examplerg", "myenvironment", "myjavacomponent");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Java Component.
 *
 * @summary get a Java Component.
 * x-ms-original-file: 2025-10-02-preview/JavaComponents_Get_ServiceBind.json
 */
async function getJavaComponentWithServiceBinds() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.javaComponents.get("examplerg", "myenvironment", "myjavacomponent");
  console.log(result);
}

async function main() {
  await getJavaComponent();
  await getJavaComponentWithServiceBinds();
}

main().catch(console.error);
