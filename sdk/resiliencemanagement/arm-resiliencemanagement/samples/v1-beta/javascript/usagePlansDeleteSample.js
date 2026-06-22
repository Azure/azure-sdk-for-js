// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a UsagePlan
 *
 * @summary delete a UsagePlan
 * x-ms-original-file: 2026-04-01-preview/UsagePlans_Delete_MaximumSet_Gen.json
 */
async function usagePlansDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new AzureResilienceManagementClient(credential, subscriptionId);
  await client.usagePlans.delete("MyResourceGroup", "myUsagePlan");
}

async function main() {
  await usagePlansDeleteMaximumSet();
}

main().catch(console.error);
