// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific function of a Container App from the latest Revision.
 *
 * @summary get a specific function of a Container App from the latest Revision.
 * x-ms-original-file: 2025-10-02-preview/ContainerAppsFunctions_Get.json
 */
async function getContainerAppFunction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789abc";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsFunctions.get(
    "myResourceGroup",
    "myContainerApp",
    "HttpExample",
  );
  console.log(result);
}

async function main() {
  await getContainerAppFunction();
}

main().catch(console.error);
