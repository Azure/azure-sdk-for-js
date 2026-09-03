// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the functions for a given Container App from the latest Revision.
 *
 * @summary list the functions for a given Container App from the latest Revision.
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsFunctions_List.json
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
