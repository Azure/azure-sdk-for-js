// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceConnectorManagementClient } from "@azure/arm-resourceconnector";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an Appliance with the specified Resource Name in the specified Resource Group and Subscription.
 *
 * @summary updates an Appliance with the specified Resource Name in the specified Resource Group and Subscription.
 * x-ms-original-file: 2025-03-01-preview/AppliancesPatch.json
 */
async function updateAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const result = await client.appliances.update("testresourcegroup", "appliance01", {
    tags: { key: "value" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAppliance();
}

main().catch(console.error);
