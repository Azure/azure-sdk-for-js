// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SpatioClient } from "@azure/arm-planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a GeoCatalog
 *
 * @summary delete a GeoCatalog
 * x-ms-original-file: 2025-02-11-preview/GeoCatalogs_Delete.json
 */
async function geoCatalogsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cd9b6cdf-dcf0-4dca-ab19-82be07b74704";
  const client = new SpatioClient(credential, subscriptionId);
  await client.geoCatalogs.delete("MyResourceGroup", "MyCatalog");
}

async function main(): Promise<void> {
  await geoCatalogsDelete();
}

main().catch(console.error);
