// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified peering from the ExpressRouteCrossConnection.
 *
 * @summary deletes the specified peering from the ExpressRouteCrossConnection.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionBgpPeeringDelete.json
 */
async function deleteExpressRouteCrossConnectionBgpPeering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.expressRouteCrossConnectionPeerings.delete(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
    "AzurePrivatePeering",
  );
}

async function main() {
  await deleteExpressRouteCrossConnectionBgpPeering();
}

main().catch(console.error);
