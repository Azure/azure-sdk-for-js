// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if a quota is available.
 *
 * @summary check if a quota is available.
 * x-ms-original-file: 2025-09-01-preview/CheckQuotaAvailability.json
 */
async function checkQuotaAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResource.checkQuotaAvailability("eastus", {
    name: "resource1",
    type: "Microsoft.NetApp/netAppAccounts",
    resourceGroup: "myRG",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkQuotaAvailability();
}

main().catch(console.error);
