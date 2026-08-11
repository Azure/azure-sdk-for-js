// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a UsagePlan
 *
 * @summary create a UsagePlan
 * x-ms-original-file: 2026-04-01-preview/UsagePlans_CreateOrUpdate_MaximumSet_Gen.json
 */
async function usagePlansCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureResilienceManagementClient(credential, subscriptionId);
  const result = await client.usagePlans.createOrUpdate("MyResourceGroup", "myUsagePlan", {
    properties: { planType: "Standard" },
    location: "global",
    tags: { environment: "production" },
  });
  console.log(result);
}

async function main() {
  await usagePlansCreateOrUpdateMaximumSet();
}

main().catch(console.error);
