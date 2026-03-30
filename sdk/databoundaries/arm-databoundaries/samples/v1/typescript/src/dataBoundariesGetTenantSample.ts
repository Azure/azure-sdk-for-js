// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataboundariesManegementClient } from "@azure/arm-databoundaries";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get data boundary of tenant.
 *
 * @summary get data boundary of tenant.
 * x-ms-original-file: 2024-08-01/GetTenantDataBoundary.json
 */
async function getDataBoundaryForTenant(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DataboundariesManegementClient(credential);
  const result = await client.dataBoundaries.getTenant("default");
  console.log(result);
}

async function main(): Promise<void> {
  await getDataBoundaryForTenant();
}

main().catch(console.error);
