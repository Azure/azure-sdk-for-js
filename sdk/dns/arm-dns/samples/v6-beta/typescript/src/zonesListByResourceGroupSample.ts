// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-dns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the DNS zones within a resource group.
 *
 * @summary lists the DNS zones within a resource group.
 * x-ms-original-file: 2023-07-01-preview/ListZonesByResourceGroup.json
 */
async function listZonesByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.zones.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listZonesByResourceGroup();
}

main().catch(console.error);
