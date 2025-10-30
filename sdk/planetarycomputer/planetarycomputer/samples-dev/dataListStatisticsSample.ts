// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to merged assets statistics.
 *
 * @summary merged assets statistics.
 * x-ms-original-file: 2025-04-30-preview/TilerStatistics_GetAll.json
 */
async function tilerStatisticsGetAll(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.listStatistics(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114",
    { assets: ["image"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tilerStatisticsGetAll();
}

main().catch(console.error);
