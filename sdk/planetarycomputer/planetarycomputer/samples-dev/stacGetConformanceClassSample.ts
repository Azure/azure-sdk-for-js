// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the STAC conformance classes.
 *
 * @summary returns the STAC conformance classes.
 * x-ms-original-file: 2025-04-30-preview/StacConformanceClass_Get.json
 */
async function stacConformanceClassGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getConformanceClass();
  console.log(result);
}

async function main(): Promise<void> {
  await stacConformanceClassGet();
}

main().catch(console.error);
