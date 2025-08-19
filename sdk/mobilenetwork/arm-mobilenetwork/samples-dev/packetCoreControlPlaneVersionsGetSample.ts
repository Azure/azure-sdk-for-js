// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information about the specified packet core control plane version.
 *
 * @summary Gets information about the specified packet core control plane version.
 * x-ms-original-file: specification/mobilenetwork/resource-manager/Microsoft.MobileNetwork/stable/2024-04-01/examples/PacketCoreControlPlaneVersionGet.json
 */

import { MobileNetworkManagementClient } from "@azure/arm-mobilenetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getPacketCoreControlPlaneVersion(): Promise<void> {
  const versionName = "2404.0-1";
  const credential = new DefaultAzureCredential();
  const client = new MobileNetworkManagementClient(credential);
  const result = await client.packetCoreControlPlaneVersions.get(versionName);
  console.log(result);
}

async function main(): Promise<void> {
  await getPacketCoreControlPlaneVersion();
}

main().catch(console.error);
