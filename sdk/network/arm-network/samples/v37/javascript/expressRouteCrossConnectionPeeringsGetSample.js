// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified peering for the ExpressRouteCrossConnection.
 *
 * @summary gets the specified peering for the ExpressRouteCrossConnection.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionBgpPeeringGet.json
 */
async function getExpressRouteCrossConnectionBgpPeering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteCrossConnectionPeerings.get(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
    "AzurePrivatePeering",
  );
  console.log(result);
}

async function main() {
  await getExpressRouteCrossConnectionBgpPeering();
}

main().catch(console.error);
