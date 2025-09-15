// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the Ddos Protection Status of a Public IP Address
 *
 * @summary Gets the Ddos Protection Status of a Public IP Address
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/PublicIpAddressGetDdosProtectionStatus.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDdosProtectionStatusOfAPublicIPAddress(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const publicIpAddressName = "test-pip";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.publicIPAddresses.beginDdosProtectionStatusAndWait(
      resourceGroupName,
      publicIpAddressName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getDdosProtectionStatusOfAPublicIPAddress();
}

main().catch(console.error);
