// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataboundariesManegementClient } = require("@azure/arm-databoundaries");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get data boundary at specified scope
 *
 * @summary get data boundary at specified scope
 * x-ms-original-file: 2024-08-01/GetScopedDataBoundary.json
 */
async function getDataBoundaryAtScope() {
  const credential = new DefaultAzureCredential();
  const client = new DataboundariesManegementClient(credential);
  const result = await client.dataBoundaries.getScope(
    "subscriptions/11111111-1111-1111-1111-111111111111/resourcegroups/my-resource-group",
    "default",
  );
  console.log(result);
}

async function main() {
  await getDataBoundaryAtScope();
}

main().catch(console.error);
