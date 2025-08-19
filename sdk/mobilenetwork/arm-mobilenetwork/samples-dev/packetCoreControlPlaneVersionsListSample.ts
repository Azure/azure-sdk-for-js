// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all supported packet core control planes versions.
 *
 * @summary Lists all supported packet core control planes versions.
 * x-ms-original-file: specification/mobilenetwork/resource-manager/Microsoft.MobileNetwork/stable/2024-04-01/examples/PacketCoreControlPlaneVersionList.json
 */

import { MobileNetworkManagementClient } from "@azure/arm-mobilenetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSupportedPacketCoreControlPlaneVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MobileNetworkManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.packetCoreControlPlaneVersions.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getSupportedPacketCoreControlPlaneVersions();
}

main().catch(console.error);
