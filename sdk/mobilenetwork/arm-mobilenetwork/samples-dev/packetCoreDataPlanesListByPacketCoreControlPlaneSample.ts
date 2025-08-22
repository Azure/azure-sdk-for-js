// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the packet core data planes associated with a packet core control plane.
 *
 * @summary Lists all the packet core data planes associated with a packet core control plane.
 * x-ms-original-file: specification/mobilenetwork/resource-manager/Microsoft.MobileNetwork/stable/2024-04-01/examples/PacketCoreDataPlaneListByPacketCoreControlPlane.json
 */

import { MobileNetworkManagementClient } from "@azure/arm-mobilenetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listPacketCoreDataPlanesInAControlPlane(): Promise<void> {
  const subscriptionId =
    process.env["MOBILENETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MOBILENETWORK_RESOURCE_GROUP"] || "rg1";
  const packetCoreControlPlaneName = "testPacketCoreCP";
  const credential = new DefaultAzureCredential();
  const client = new MobileNetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.packetCoreDataPlanes.listByPacketCoreControlPlane(
    resourceGroupName,
    packetCoreControlPlaneName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listPacketCoreDataPlanesInAControlPlane();
}

main().catch(console.error);
