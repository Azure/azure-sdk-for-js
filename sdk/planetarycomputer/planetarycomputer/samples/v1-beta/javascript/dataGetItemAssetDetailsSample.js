// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to return dataset's basic info.
 *
 * @summary return dataset's basic info.
 * x-ms-original-file: 2025-04-30-preview/TilerInfoOperations_Get.json
 */
async function tilerInfoOperationsGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.getItemAssetDetails(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114",
    { assets: ["image"] },
  );
  console.log(result);
}

async function main() {
  await tilerInfoOperationsGet();
}

main().catch(console.error);
