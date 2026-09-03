// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the GroupQuotas enforcement settings for the ResourceProvider/location. The locations, where GroupQuota enforcement is not enabled will return Not Found.
 *
 * @summary gets the GroupQuotas enforcement settings for the ResourceProvider/location. The locations, where GroupQuota enforcement is not enabled will return Not Found.
 * x-ms-original-file: 2025-09-01/GroupQuotasEnforcement/GetGroupQuotaEnforcement.json
 */
async function groupQuotasEnforcementGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const result = await client.groupQuotaLocationSettings.get(
    "E7EC67B3-7657-4966-BFFC-41EFD36BAA09",
    "groupquota1",
    "Microsoft.Compute",
    "eastus",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await groupQuotasEnforcementGet();
}

main().catch(console.error);
