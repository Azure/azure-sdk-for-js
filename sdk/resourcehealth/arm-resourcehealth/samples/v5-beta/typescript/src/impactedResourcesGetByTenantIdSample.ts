// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specific impacted resource in the tenant by an event.
 *
 * @summary gets the specific impacted resource in the tenant by an event.
 * x-ms-original-file: 2025-05-01/ImpactedResources_GetByTenantId.json
 */
async function impactedResourcesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const result = await client.impactedResources.getByTenantId("BC_1-FXZ", "abc-123-ghj-456");
  console.log(result);
}

async function main(): Promise<void> {
  await impactedResourcesGet();
}

main().catch(console.error);
