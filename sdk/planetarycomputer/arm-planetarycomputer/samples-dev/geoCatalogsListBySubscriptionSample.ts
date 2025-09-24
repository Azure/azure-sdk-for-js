// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list GeoCatalog resources by subscription ID
 *
 * @summary list GeoCatalog resources by subscription ID
 * x-ms-original-file: 2025-02-11-preview/GeoCatalogs_ListBySubscription.json
 */

import { SpatioClient } from "@azure/arm-planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

async function geoCatalogsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cd9b6cdf-dcf0-4dca-ab19-82be07b74704";
  const client = new SpatioClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.geoCatalogs.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await geoCatalogsListBySubscription();
}

main().catch(console.error);
