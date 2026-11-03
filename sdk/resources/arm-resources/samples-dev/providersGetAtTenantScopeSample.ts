// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified resource provider at the tenant level.
 *
 * @summary gets the specified resource provider at the tenant level.
 * x-ms-original-file: 2025-04-01/GetNamedProviderAtTenant.json
 */
async function getAResourceProviderAtTenantScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.providers.getAtTenantScope("Microsoft.Storage", {
    expand: "resourceTypes/aliases",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getAResourceProviderAtTenantScope();
}

main().catch(console.error);
