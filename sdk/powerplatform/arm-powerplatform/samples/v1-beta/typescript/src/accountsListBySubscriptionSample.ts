// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PowerPlatformClient } from "@azure/arm-powerplatform";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve a list of accounts within a subscription.
 *
 * @summary retrieve a list of accounts within a subscription.
 * x-ms-original-file: 2020-10-30-preview/listAccountsBySubscription.json
 */
async function listAccountsBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAccountsBySubscription();
}

main().catch(console.error);
