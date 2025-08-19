// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates vNet Peering for workspace.
 *
 * @summary Creates vNet Peering for workspace.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceVirtualNetworkPeeringCreateOrUpdate.json
 */

import type { VirtualNetworkPeering } from "@azure/arm-databricks";
import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createVNetPeeringForWorkspace(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const peeringName = "vNetPeeringTest";
  const virtualNetworkPeeringParameters: VirtualNetworkPeering = {
    allowForwardedTraffic: false,
    allowGatewayTransit: false,
    allowVirtualNetworkAccess: true,
    remoteVirtualNetwork: {
      id: "/subscriptions/0140911e-1040-48da-8bc9-b99fb3dd88a6/resourceGroups/subramantest/providers/Microsoft.Network/virtualNetworks/subramanvnet",
    },
    useRemoteGateways: false,
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.vNetPeering.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    peeringName,
    virtualNetworkPeeringParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createVNetPeeringForWorkspace();
}

main().catch(console.error);
