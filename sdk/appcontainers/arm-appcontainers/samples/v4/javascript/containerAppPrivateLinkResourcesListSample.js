// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the private link resources supported by a Container App.
 *
 * @summary lists the private link resources supported by a Container App.
 * x-ms-original-file: 2026-07-01/ContainerAppPrivateLinkResources_List.json
 */
async function listPrivateLinkResourcesByContainerApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppPrivateLinkResources.list(
    "examplerg",
    "testcontainerapp0",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateLinkResourcesByContainerApp();
}

main().catch(console.error);
