// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataboundariesManegementClient } = require("@azure/arm-databoundaries");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get data boundary of tenant.
 *
 * @summary get data boundary of tenant.
 * x-ms-original-file: 2024-08-01/GetTenantDataBoundary.json
 */
async function getDataBoundaryForTenant() {
  const credential = new DefaultAzureCredential();
  const client = new DataboundariesManegementClient(credential);
  const result = await client.dataBoundaries.getTenant("default");
  console.log(result);
}

async function main() {
  await getDataBoundaryForTenant();
}

main().catch(console.error);
