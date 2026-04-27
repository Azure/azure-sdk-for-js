// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the STAC conformance classes.
 *
 * @summary returns the STAC conformance classes.
 * x-ms-original-file: 2025-04-30-preview/StacConformanceClass_Get.json
 */
async function stacConformanceClassGet() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getConformanceClass();
  console.log(result);
}

async function main() {
  await stacConformanceClassGet();
}

main().catch(console.error);
