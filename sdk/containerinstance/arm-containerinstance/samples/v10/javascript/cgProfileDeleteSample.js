// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a container group profile.
 *
 * @summary deletes a container group profile.
 * x-ms-original-file: 2026-07-01/ContainerGroupProfilesDelete.json
 */
async function containerGroupProfilesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.cgProfile.delete("demo", "demo1");
}

async function main() {
  await containerGroupProfilesDelete();
}

main().catch(console.error);
