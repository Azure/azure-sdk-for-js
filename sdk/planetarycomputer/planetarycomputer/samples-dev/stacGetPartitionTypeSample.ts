// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the partitiontype for a GeoCatalog Collection.
 *
 * @summary get the partitiontype for a GeoCatalog Collection.
 * x-ms-original-file: 2025-04-30-preview/StacCollectionPartitionTypes_Get.json
 */
async function stacCollectionPartitionTypesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getPartitionType("naip-atl");
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionPartitionTypesGet();
}

main().catch(console.error);
