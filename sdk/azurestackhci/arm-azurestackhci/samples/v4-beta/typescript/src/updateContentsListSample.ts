// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all update contents.
 *
 * @summary list all update contents.
 * x-ms-original-file: 2025-12-01-preview/UpdateContents_ListByLocation_MaximumSet_Gen.json
 */
async function updateContentsListByLocationMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2886575D-173A-44A0-80E2-7DBA57F18B46";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.updateContents.list("westus2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await updateContentsListByLocationMaximumSet();
}

main().catch(console.error);
