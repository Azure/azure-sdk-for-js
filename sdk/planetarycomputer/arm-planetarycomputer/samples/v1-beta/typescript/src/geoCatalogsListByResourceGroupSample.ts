// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SpatioClient } from "@azure/arm-planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list GeoCatalog resources by resource group
 *
 * @summary list GeoCatalog resources by resource group
 * x-ms-original-file: 2025-02-11-preview/GeoCatalogs_ListByResourceGroup.json
 */
async function geoCatalogsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cd9b6cdf-dcf0-4dca-ab19-82be07b74704";
  const client = new SpatioClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.geoCatalogs.listByResourceGroup("MyResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await geoCatalogsListByResourceGroup();
}

main().catch(console.error);
