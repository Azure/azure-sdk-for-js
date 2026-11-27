// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets storage transfer flows in a subscription.
 *
 * @summary gets storage transfer flows in a subscription.
 * x-ms-original-file: 2026-06-29-preview/listStorageTransferFlowsBySubscription.json
 */
async function listsTheStorageTransferFlowsInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageTransferFlows.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheStorageTransferFlowsInASubscription();
}

main().catch(console.error);
