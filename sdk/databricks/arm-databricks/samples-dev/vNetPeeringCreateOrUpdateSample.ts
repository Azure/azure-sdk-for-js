// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates vNet Peering for workspace.
 *
 * @summary creates vNet Peering for workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceVirtualNetworkPeeringCreateOrUpdate.json
 */
async function createVNetPeeringForWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0140911e-1040-48da-8bc9-b99fb3dd88a6/";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.vNetPeering.createOrUpdate(
    "subramantest",
    "adbworkspace",
    "vNetPeeringTest",
    {
      allowForwardedTraffic: false,
      allowGatewayTransit: false,
      allowVirtualNetworkAccess: true,
      remoteVirtualNetwork: {
        id: "/subscriptions/0140911e-1040-48da-8bc9-b99fb3dd88a6/resourceGroups/subramantest/providers/Microsoft.Network/virtualNetworks/subramanvnet",
      },
      useRemoteGateways: false,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createVNetPeeringForWorkspace();
}

main().catch(console.error);
