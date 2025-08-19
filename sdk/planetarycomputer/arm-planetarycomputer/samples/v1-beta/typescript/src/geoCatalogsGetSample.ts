// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SpatioClient } from "@azure/arm-planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a GeoCatalog
 *
 * @summary get a GeoCatalog
 * x-ms-original-file: 2025-02-11-preview/GeoCatalogs_Get.json
 */
async function geoCatalogsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cd9b6cdf-dcf0-4dca-ab19-82be07b74704";
  const client = new SpatioClient(credential, subscriptionId);
  const result = await client.geoCatalogs.get("MyResourceGroup", "MyCatalog");
  console.log(result);
}

async function main(): Promise<void> {
  await geoCatalogsGet();
}

main().catch(console.error);
