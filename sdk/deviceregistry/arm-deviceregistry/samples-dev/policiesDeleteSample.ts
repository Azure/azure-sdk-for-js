// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Policy
 *
 * @summary delete a Policy
 * x-ms-original-file: 2026-03-01-preview/Delete_Policies.json
 */
async function deletePolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.policies.delete("rgdeviceregistry", "mynamespace", "mypolicy");
}

async function main(): Promise<void> {
  await deletePolicies();
}

main().catch(console.error);
