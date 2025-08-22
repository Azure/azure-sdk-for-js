// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check if a quota is available.
 *
 * @summary Check if a quota is available.
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2025-06-01/examples/CheckQuotaAvailability.json
 */

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function checkQuotaAvailability(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const location = "eastus";
  const name = "resource1";
  const typeParam = "Microsoft.NetApp/netAppAccounts";
  const resourceGroup = "myRG";
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResource.checkQuotaAvailability(
    location,
    name,
    typeParam,
    resourceGroup,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkQuotaAvailability();
}

main().catch(console.error);
