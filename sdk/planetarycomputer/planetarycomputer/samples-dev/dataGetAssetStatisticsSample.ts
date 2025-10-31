// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to per Asset statistics
 *
 * @summary per Asset statistics
 * x-ms-original-file: 2025-04-30-preview/TilerAssetStatistics_GetAll.json
 */
async function tilerAssetStatisticsGetAll(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getAssetStatistics(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114",
    { assets: ["image"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tilerAssetStatisticsGetAll();
}

main().catch(console.error);
