// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists impacted resources in the tenant by an event.
 *
 * @summary lists impacted resources in the tenant by an event.
 * x-ms-original-file: 2025-05-01/ImpactedResources_ListByTenantId_ListByEventId.json
 */
async function listEventsByTenantId() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const resArray = new Array();
  for await (const item of client.impactedResources.listByTenantIdAndEventId("BC_1-FXZ", {
    filter: "targetRegion eq 'westus'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listEventsByTenantId();
}

main().catch(console.error);
