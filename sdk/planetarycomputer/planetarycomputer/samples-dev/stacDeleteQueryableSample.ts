// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete queryables by name for specified collection.
 *
 * @summary delete queryables by name for specified collection.
 * x-ms-original-file: 2025-04-30-preview/StacQueryables_Delete.json
 */
async function stacQueryablesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.stac.deleteQueryable("naip-atl", "test%3Aproperty");
}

async function main(): Promise<void> {
  await stacQueryablesDelete();
}

main().catch(console.error);
