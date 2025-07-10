// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzurePlaywrightServiceClient } from "@azure/arm-playwrighttesting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list quotas for a given account.
 *
 * @summary list quotas for a given account.
 * x-ms-original-file: 2024-12-01/AccountQuotas_ListByAccount.json
 */
async function accountQuotasListByAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzurePlaywrightServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accountQuotas.listByAccount("dummyrg", "myPlaywrightAccount")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await accountQuotasListByAccount();
}

main().catch(console.error);
