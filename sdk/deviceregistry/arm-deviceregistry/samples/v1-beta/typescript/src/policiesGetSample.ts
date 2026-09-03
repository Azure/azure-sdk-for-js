// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Policy
 *
 * @summary get a Policy
 * x-ms-original-file: 2026-03-01-preview/Get_Policies.json
 */
async function getPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.policies.get("rgdeviceregistry", "mynamespace", "myPolicy");
  console.log(result);
}

async function main(): Promise<void> {
  await getPolicies();
}

main().catch(console.error);
