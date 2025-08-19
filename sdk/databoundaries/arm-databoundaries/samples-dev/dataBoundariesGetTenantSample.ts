// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get data boundary of tenant.
 *
 * @summary Get data boundary of tenant.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-08-01/examples/GetTenantDataBoundary.json
 */

import { DataboundariesManegementClient } from "@azure/arm-databoundaries";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDataBoundaryForTenant(): Promise<void> {
  const defaultParam = "default";
  const credential = new DefaultAzureCredential();
  const client = new DataboundariesManegementClient(credential);
  const result = await client.dataBoundaries.getTenant(defaultParam);
  console.log(result);
}

async function main(): Promise<void> {
  await getDataBoundaryForTenant();
}

main().catch(console.error);
