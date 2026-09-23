// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of a specific function in a Container App revision.
 *
 * @summary gets the details of a specific function in a Container App revision.
 * x-ms-original-file: 2026-07-01/ContainerAppsRevisionFunctions_Get.json
 */
async function getContainerAppRevisionFunction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789abc";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsRevisionFunctions.get(
    "myResourceGroup",
    "myContainerApp",
    "myContainerApp-abc123",
    "HttpExample",
  );
  console.log(result);
}

async function main() {
  await getContainerAppRevisionFunction();
}

main().catch(console.error);
