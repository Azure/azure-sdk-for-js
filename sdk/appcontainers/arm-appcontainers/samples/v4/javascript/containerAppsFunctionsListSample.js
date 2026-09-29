// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the functions available in the latest revision of a Container App.
 *
 * @summary lists the functions available in the latest revision of a Container App.
 * x-ms-original-file: 2026-07-01/ContainerAppsFunctions_List.json
 */
async function listContainerAppFunctions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789abc";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containerAppsFunctions.list(
    "myResourceGroup",
    "myContainerApp",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listContainerAppFunctions();
}

main().catch(console.error);
