// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified resource provider at the tenant level.
 *
 * @summary Gets the specified resource provider at the tenant level.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2025-04-01/examples/GetNamedProviderAtTenant.json
 */

import {
  ProvidersGetAtTenantScopeOptionalParams,
  ResourceManagementClient,
} from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAResourceProviderAtTenantScope(): Promise<void> {
  const expand = "resourceTypes/aliases";
  const resourceProviderNamespace = "Microsoft.Storage";
  const options: ProvidersGetAtTenantScopeOptionalParams = { expand };
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential);
  const result = await client.providers.getAtTenantScope(
    resourceProviderNamespace,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAResourceProviderAtTenantScope();
}

main().catch(console.error);
