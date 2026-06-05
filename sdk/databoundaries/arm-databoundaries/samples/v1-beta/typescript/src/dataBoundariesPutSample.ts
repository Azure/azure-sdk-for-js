// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataboundariesManegementClient } from "@azure/arm-databoundaries";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to opt-in tenant to data boundary.
 *
 * @summary opt-in tenant to data boundary.
 * x-ms-original-file: 2024-08-01/PutDataBoundary.json
 */
async function optInToDataBoundary(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DataboundariesManegementClient(credential);
  const result = await client.dataBoundaries.put("default", { properties: { dataBoundary: "EU" } });
  console.log(result);
}

async function main(): Promise<void> {
  await optInToDataBoundary();
}

main().catch(console.error);
