// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceConnectorManagementClient } from "@azure/arm-resourceconnector";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an Appliance with the specified Resource Name, Resource Group, and Subscription Id.
 *
 * @summary deletes an Appliance with the specified Resource Name, Resource Group, and Subscription Id.
 * x-ms-original-file: 2025-03-01-preview/AppliancesDelete.json
 */
async function deleteAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  await client.appliances.delete("testresourcegroup", "appliance01");
}

async function main(): Promise<void> {
  await deleteAppliance();
}

main().catch(console.error);
