// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates partition type for a GeoCatalog Collection. This will
 * determine the partitioning scheme for items within the database,
 * and can only be set before any items are loaded.
 *
 * Ideal partitioning schemes result in partitions of roughly 100k items each.
 *
 * The default partitioning scheme is "none" which does not partition items.
 *
 * @summary updates partition type for a GeoCatalog Collection. This will
 * determine the partitioning scheme for items within the database,
 * and can only be set before any items are loaded.
 *
 * Ideal partitioning schemes result in partitions of roughly 100k items each.
 *
 * The default partitioning scheme is "none" which does not partition items.
 * x-ms-original-file: 2025-04-30-preview/StacCollectionPartitionTypes_Replace.json
 */
async function stacCollectionPartitionTypesReplace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.stac.replacePartitionType("test-partition-type-collection", {
    scheme: "year",
  });
}

async function main(): Promise<void> {
  await stacCollectionPartitionTypesReplace();
}

main().catch(console.error);
