// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to service health event details in the tenant by event tracking id. This can be used to fetch sensitive properties for Security Advisory events. Please see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access
 *
 * @summary service health event details in the tenant by event tracking id. This can be used to fetch sensitive properties for Security Advisory events. Please see https://learn.microsoft.com/en-us/azure/service-health/security-advisories-elevated-access
 * x-ms-original-file: 2025-05-01/Event_fetchDetailsByTenantIdAndTrackingId.json
 */
async function eventDetailsByTenantIdAndTrackingId() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const result = await client.event.fetchDetailsByTenantIdAndTrackingId("eventTrackingId");
  console.log(result);
}

async function main() {
  await eventDetailsByTenantIdAndTrackingId();
}

main().catch(console.error);
