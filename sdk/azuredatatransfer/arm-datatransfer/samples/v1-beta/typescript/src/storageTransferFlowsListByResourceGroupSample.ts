// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets storage transfer flows in a resource group.
 *
 * @summary gets storage transfer flows in a resource group.
 * x-ms-original-file: 2026-06-29-preview/listStorageTransferFlowsByResourceGroup.json
 */
async function listsTheStorageTransferFlowsInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageTransferFlows.listByResourceGroup("testRG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheStorageTransferFlowsInAResourceGroup();
}

main().catch(console.error);
