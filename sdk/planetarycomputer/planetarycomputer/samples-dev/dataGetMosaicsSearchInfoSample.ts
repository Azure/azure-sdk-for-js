// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Search query metadata.
 *
 * @summary get Search query metadata.
 * x-ms-original-file: 2025-04-30-preview/MosaicsInfoSearch_Get.json
 */
async function mosaicsInfoSearchGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getMosaicsSearchInfo(
    "ba13fc7947b9b585690d84ee61aaa653",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await mosaicsInfoSearchGet();
}

main().catch(console.error);
