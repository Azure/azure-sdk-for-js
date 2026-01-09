// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch a quota rule
 *
 * @summary patch a quota rule
 * x-ms-original-file: 2025-09-01-preview/VolumeQuotaRules_Update.json
 */
async function volumeQuotaRulesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5275316f-a498-48d6-b324-2cbfdc4311b9";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumeQuotaRules.update(
    "myRG",
    "account-9957",
    "pool-5210",
    "volume-6387",
    "rule-0004",
    { properties: { quotaSizeInKiBs: 100009 } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeQuotaRulesUpdate();
}

main().catch(console.error);
