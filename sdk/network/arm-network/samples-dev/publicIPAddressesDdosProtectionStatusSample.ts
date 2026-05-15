// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Ddos Protection Status of a Public IP Address
 *
 * @summary gets the Ddos Protection Status of a Public IP Address
 * x-ms-original-file: 2025-05-01/PublicIpAddressGetDdosProtectionStatus.json
 */
async function getDdosProtectionStatusOfAPublicIPAddress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.ddosProtectionStatus("rg1", "test-pip");
  console.log(result);
}

async function main(): Promise<void> {
  await getDdosProtectionStatusOfAPublicIPAddress();
}

main().catch(console.error);
