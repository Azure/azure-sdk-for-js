// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Opt-in tenant to data boundary.
 *
 * @summary Opt-in tenant to data boundary.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-08-01/examples/PutDataBoundary.json
 */

import type { DataBoundaryDefinition } from "@azure/arm-databoundaries";
import { DataboundariesManegementClient } from "@azure/arm-databoundaries";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function optInToDataBoundary(): Promise<void> {
  const defaultParam = "default";
  const dataBoundaryDefinition: DataBoundaryDefinition = {
    properties: { dataBoundary: "EU" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataboundariesManegementClient(credential);
  const result = await client.dataBoundaries.put(defaultParam, dataBoundaryDefinition);
  console.log(result);
}

async function main(): Promise<void> {
  await optInToDataBoundary();
}

main().catch(console.error);
