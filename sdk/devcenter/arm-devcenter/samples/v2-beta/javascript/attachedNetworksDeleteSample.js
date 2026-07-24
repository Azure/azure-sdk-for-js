// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to un-attach a NetworkConnection.
 *
 * @summary un-attach a NetworkConnection.
 * x-ms-original-file: 2026-01-01-preview/AttachedNetworks_Delete.json
 */
async function attachedNetworksDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.attachedNetworks.delete("rg1", "Contoso", "network-uswest3");
}

async function main() {
  await attachedNetworksDelete();
}

main().catch(console.error);
