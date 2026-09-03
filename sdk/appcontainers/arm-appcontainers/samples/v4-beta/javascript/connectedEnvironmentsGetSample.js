// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of an connectedEnvironment.
 *
 * @summary get the properties of an connectedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ConnectedEnvironments_Get.json
 */
async function getConnectedEnvironmentByConnectedEnvironmentName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironments.get("examplerg", "examplekenv");
  console.log(result);
}

async function main() {
  await getConnectedEnvironmentByConnectedEnvironmentName();
}

main().catch(console.error);
