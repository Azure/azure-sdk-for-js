// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified peering from the ExpressRouteCrossConnection.
 *
 * @summary deletes the specified peering from the ExpressRouteCrossConnection.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionBgpPeeringDelete.json
 */
async function deleteExpressRouteCrossConnectionBgpPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.expressRouteCrossConnectionPeerings.delete(
    "CrossConnection-SiliconValley",
    "<circuitServiceKey>",
    "AzurePrivatePeering",
  );
}

async function main(): Promise<void> {
  await deleteExpressRouteCrossConnectionBgpPeering();
}

main().catch(console.error);
