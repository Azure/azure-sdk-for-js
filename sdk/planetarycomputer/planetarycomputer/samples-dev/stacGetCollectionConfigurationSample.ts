// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the complete user configuration for a given collection
 *
 * @summary get the complete user configuration for a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionConfig_Get.json
 */
async function stacCollectionConfigGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getCollectionConfiguration("naip-atl");
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionConfigGet();
}

main().catch(console.error);
