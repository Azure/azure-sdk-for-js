// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists current service health events in the tenant.
 *
 * @summary lists current service health events in the tenant.
 * x-ms-original-file: 2025-05-01/Events_ListByTenantId.json
 */
async function listEventsByTenantId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const resArray = new Array();
  for await (const item of client.events.listByTenantId({
    filter: "service eq 'Virtual Machines' or region eq 'West US'",
    queryStartTime: "7/24/2020",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listEventsByTenantId();
}

main().catch(console.error);
