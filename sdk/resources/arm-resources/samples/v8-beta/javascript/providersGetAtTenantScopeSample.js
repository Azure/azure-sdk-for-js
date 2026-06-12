// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceManagementClient } = require("@azure/arm-resources");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified resource provider at the tenant level.
 *
 * @summary gets the specified resource provider at the tenant level.
 * x-ms-original-file: 2025-04-01/GetNamedProviderAtTenant.json
 */
async function getAResourceProviderAtTenantScope() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.providers.getAtTenantScope("Microsoft.Storage", {
    expand: "resourceTypes/aliases",
  });
  console.log(result);
}

async function main() {
  await getAResourceProviderAtTenantScope();
}

main().catch(console.error);
