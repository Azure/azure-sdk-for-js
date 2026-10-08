// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of a private link resource supported by a Container App.
 *
 * @summary gets the details of a private link resource supported by a Container App.
 * x-ms-original-file: 2026-07-01/ContainerAppPrivateLinkResources_Get.json
 */
async function getAPrivateLinkResourceByContainerApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppPrivateLinkResources.get(
    "examplerg",
    "testcontainerapp0",
    "containerApps",
  );
  console.log(result);
}

async function main() {
  await getAPrivateLinkResourceByContainerApp();
}

main().catch(console.error);
