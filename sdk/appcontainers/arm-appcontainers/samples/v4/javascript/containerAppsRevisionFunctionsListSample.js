// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the functions available in a specific Container App revision.
 *
 * @summary lists the functions available in a specific Container App revision.
 * x-ms-original-file: 2026-07-01/ContainerAppsRevisionFunctions_List.json
 */
async function listContainerAppRevisionFunctions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789abc";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsRevisionFunctions.list(
    "myResourceGroup",
    "myContainerApp",
    "myContainerApp-abc123",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listContainerAppRevisionFunctions();
}

main().catch(console.error);
