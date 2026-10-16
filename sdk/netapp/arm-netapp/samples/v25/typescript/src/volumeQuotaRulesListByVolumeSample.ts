// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all quota rules associated with the volume
 *
 * @summary list all quota rules associated with the volume
 * x-ms-original-file: 2026-07-01/VolumeQuotaRules_List.json
 */
async function volumeQuotaRulesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumeQuotaRules.listByVolume(
    "myRG",
    "account-9957",
    "pool-5210",
    "volume-6387",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await volumeQuotaRulesList();
}

main().catch(console.error);
