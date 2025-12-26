// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return Info Geojson
 *
 * @summary return Info Geojson
 * x-ms-original-file: 2025-04-30-preview/TilerInfoGeoJsonOperations_Get.json
 */
async function tilerInfoGeoJsonOperationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getInfoGeoJson(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114",
    { assets: ["image"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tilerInfoGeoJsonOperationsGet();
}

main().catch(console.error);
