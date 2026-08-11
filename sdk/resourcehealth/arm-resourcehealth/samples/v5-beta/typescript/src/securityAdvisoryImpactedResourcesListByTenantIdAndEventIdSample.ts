// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists impacted resources in the tenant by an event (Security Advisory).
 *
 * @summary lists impacted resources in the tenant by an event (Security Advisory).
 * x-ms-original-file: 2025-05-01/SecurityAdvisoryImpactedResources_ListByTenantId_ListByEventId.json
 */
async function listSecurityAdvisoryImpactedResourcesByTenantId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const resArray = new Array();
  for await (const item of client.securityAdvisoryImpactedResources.listByTenantIdAndEventId(
    "BC_1-FXZ",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecurityAdvisoryImpactedResourcesByTenantId();
}

main().catch(console.error);
