// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified peering from the ExpressRouteCrossConnection.
 *
 * @summary Deletes the specified peering from the ExpressRouteCrossConnection.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteCrossConnectionBgpPeeringDelete.json
 */
async function deleteExpressRouteCrossConnectionBgpPeering(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["NETWORK_RESOURCE_GROUP"] || "CrossConnection-SiliconValley";
  const crossConnectionName = "<circuitServiceKey>";
  const peeringName = "AzurePrivatePeering";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.expressRouteCrossConnectionPeerings.beginDeleteAndWait(
      resourceGroupName,
      crossConnectionName,
      peeringName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteExpressRouteCrossConnectionBgpPeering();
}

main().catch(console.error);
