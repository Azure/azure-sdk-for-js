// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get storage for a connectedEnvironment.
 *
 * @summary get storage for a connectedEnvironment.
 * x-ms-original-file: 2025-10-02-preview/ConnectedEnvironmentsStorages_Get.json
 */
async function getAEnvironmentsStoragePropertiesBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.connectedEnvironmentsStorages.get("examplerg", "env", "jlaw-demo1");
  console.log(result);
}

async function main() {
  await getAEnvironmentsStoragePropertiesBySubscription();
}

main().catch(console.error);
