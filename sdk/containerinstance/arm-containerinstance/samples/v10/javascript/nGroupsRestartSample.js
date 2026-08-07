// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restarts all container groups in the specified NGroups resource in place. If container image has updates, new image will be downloaded.
 *
 * @summary restarts all container groups in the specified NGroups resource in place. If container image has updates, new image will be downloaded.
 * x-ms-original-file: 2026-07-01/NGroupsRestart.json
 */
async function nGroupsRestart() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.nGroups.restart("demo", "demo-ngroup");
}

async function main() {
  await nGroupsRestart();
}

main().catch(console.error);
