// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list AgriServiceResource resources by resource group
 *
 * @summary list AgriServiceResource resources by resource group
 * x-ms-original-file: 2024-06-01-preview/AgriService_ListByResourceGroup_MaximumSet_Gen.json
 */

import { AgriculturePlatformClient } from "@azure/arm-agricultureplatform";
import { DefaultAzureCredential } from "@azure/identity";

async function agriServiceListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "83D293F5-DEFD-4D48-B120-1DC713BE338A";
  const client = new AgriculturePlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agriService.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await agriServiceListByResourceGroup();
}

main().catch(console.error);
