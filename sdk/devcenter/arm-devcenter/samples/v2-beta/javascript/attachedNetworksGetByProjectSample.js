// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an attached NetworkConnection.
 *
 * @summary gets an attached NetworkConnection.
 * x-ms-original-file: 2026-01-01-preview/AttachedNetworks_GetByProject.json
 */
async function attachedNetworksGetByProject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.attachedNetworks.getByProject("rg1", "DevProject", "network-uswest3");
  console.log(result);
}

async function main() {
  await attachedNetworksGetByProject();
}

main().catch(console.error);
