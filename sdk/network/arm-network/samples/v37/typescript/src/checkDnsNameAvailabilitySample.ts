// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks whether a domain name in the cloudapp.azure.com zone is available for use.
 *
 * @summary checks whether a domain name in the cloudapp.azure.com zone is available for use.
 * x-ms-original-file: 2025-05-01/CheckDnsNameAvailability.json
 */
async function checkDnsNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.checkDnsNameAvailability("westus", "testdns");
  console.log(result);
}

async function main(): Promise<void> {
  await checkDnsNameAvailability();
}

main().catch(console.error);
