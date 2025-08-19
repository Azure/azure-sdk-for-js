// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists impacted resources in the tenant by an event (Security Advisory).
 *
 * @summary Lists impacted resources in the tenant by an event (Security Advisory).
 * x-ms-original-file: specification/resourcehealth/resource-manager/Microsoft.ResourceHealth/preview/2023-10-01-preview/examples/SecurityAdvisoryImpactedResources_ListByTenantId_ListByEventId.json
 */

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listSecurityAdvisoryImpactedResourcesByTenantId(): Promise<void> {
  const eventTrackingId = "BC_1-FXZ";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const resArray = new Array();
  for await (const item of client.securityAdvisoryImpactedResources.listByTenantIdAndEventId(
    eventTrackingId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecurityAdvisoryImpactedResourcesByTenantId();
}

main().catch(console.error);
