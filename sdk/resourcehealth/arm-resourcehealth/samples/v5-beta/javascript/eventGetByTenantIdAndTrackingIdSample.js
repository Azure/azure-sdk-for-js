// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to service health event in the tenant by event tracking id
 *
 * @summary service health event in the tenant by event tracking id
 * x-ms-original-file: 2025-05-01/Event_GetByTenantIdAndTrackingId.json
 */
async function eventByTenantIdAndTrackingId() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const result = await client.event.getByTenantIdAndTrackingId("eventTrackingId", {
    filter: "properties/status eq 'Active'",
    queryStartTime: "7/10/2022",
  });
  console.log(result);
}

async function main() {
  await eventByTenantIdAndTrackingId();
}

main().catch(console.error);
