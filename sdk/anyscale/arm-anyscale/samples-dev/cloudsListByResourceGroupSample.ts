// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list cloud resources by resource group
 *
 * @summary list cloud resources by resource group
 * x-ms-original-file: 2026-09-01/Clouds_ListByResourceGroup.json
 */
async function cloudsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clouds.listByResourceGroup("rganyscale")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cloudsListByResourceGroup();
}

main().catch(console.error);
