// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Point value for a dataset.
 *
 * @summary get Point value for a dataset.
 * x-ms-original-file: 2025-04-30-preview/TilerPoints_GetPoint.json
 */
async function tilerPointsGetPoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getPoint(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114",
    -84.386,
    33.676,
    { assets: ["image"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tilerPointsGetPoint();
}

main().catch(console.error);
