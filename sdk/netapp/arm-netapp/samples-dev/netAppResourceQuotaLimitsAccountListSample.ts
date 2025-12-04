// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of quota limits for all quotas that are under account. Currently PoolsPerAccount is the only one.
 *
 * @summary gets a list of quota limits for all quotas that are under account. Currently PoolsPerAccount is the only one.
 * x-ms-original-file: 2025-09-01-preview/NetAppResourceQuotaLimitsAccount_List.json
 */
async function quotaLimits(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D633CC2E-722B-4AE1-B636-BBD9E4C60ED9";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.netAppResourceQuotaLimitsAccount.list("myRG", "myAccount")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await quotaLimits();
}

main().catch(console.error);
