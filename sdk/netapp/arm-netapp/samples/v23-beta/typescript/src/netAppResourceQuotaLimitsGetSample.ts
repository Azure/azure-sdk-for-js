// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the default and current quota limit
 *
 * @summary get the default and current quota limit
 * x-ms-original-file: 2025-09-01-preview/NetAppResourceQuotaLimits_Get.json
 */
async function quotaLimits(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.netAppResourceQuotaLimits.get(
    "eastus",
    "totalCoolAccessVolumesPerSubscription",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await quotaLimits();
}

main().catch(console.error);
