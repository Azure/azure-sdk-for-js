// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a render option for a given collection
 *
 * @summary get a render option for a given collection
 * x-ms-original-file: 2025-04-30-preview/StacCollectionRenderOptions_Get.json
 */
async function stacCollectionRenderOptionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getRenderOption(
    "naip-atl",
    "test-natural-color",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionRenderOptionsGet();
}

main().catch(console.error);
