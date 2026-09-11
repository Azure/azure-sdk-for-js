// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete container group virtual network association links. The operation does not delete other resources provided by the user.
 *
 * @summary delete container group virtual network association links. The operation does not delete other resources provided by the user.
 * x-ms-original-file: 2026-07-01/SubnetServiceAssociationLinkDelete.json
 */
async function subnetServiceAssociationLinkDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  await client.subnetServiceAssociationLink.delete("demo", "demo2", "demo3");
}

async function main() {
  await subnetServiceAssociationLinkDelete();
}

main().catch(console.error);
