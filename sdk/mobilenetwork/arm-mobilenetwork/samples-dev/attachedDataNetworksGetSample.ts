// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets information about the specified attached data network.
 *
 * @summary Gets information about the specified attached data network.
 * x-ms-original-file: specification/mobilenetwork/resource-manager/Microsoft.MobileNetwork/stable/2024-04-01/examples/AttachedDataNetworkGet.json
 */

import { MobileNetworkManagementClient } from "@azure/arm-mobilenetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAttachedDataNetwork(): Promise<void> {
  const subscriptionId =
    process.env["MOBILENETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MOBILENETWORK_RESOURCE_GROUP"] || "rg1";
  const packetCoreControlPlaneName = "TestPacketCoreCP";
  const packetCoreDataPlaneName = "TestPacketCoreDP";
  const attachedDataNetworkName = "TestAttachedDataNetwork";
  const credential = new DefaultAzureCredential();
  const client = new MobileNetworkManagementClient(credential, subscriptionId);
  const result = await client.attachedDataNetworks.get(
    resourceGroupName,
    packetCoreControlPlaneName,
    packetCoreDataPlaneName,
    attachedDataNetworkName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAttachedDataNetwork();
}

main().catch(console.error);
