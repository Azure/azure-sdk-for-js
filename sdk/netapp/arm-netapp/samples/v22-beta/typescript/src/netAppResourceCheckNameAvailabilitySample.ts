// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if a resource name is available.
 *
 * @summary check if a resource name is available.
 * x-ms-original-file: 2025-09-01-preview/CheckNameAvailability.json
 */
async function checkNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResource.checkNameAvailability("eastus", {
    name: "accName",
    type: "Microsoft.NetApp/netAppAccounts",
    resourceGroup: "myRG",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailability();
}

main().catch(console.error);
