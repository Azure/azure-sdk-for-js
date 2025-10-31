// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return all Bounds
 *
 * @summary return all Bounds
 * x-ms-original-file: 2025-04-30-preview/TilerBound_GetAll.json
 */
async function tilerBoundGetAll(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getBounds(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tilerBoundGetAll();
}

main().catch(console.error);
