// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to execute listCloudManagerTenants
 *
 * @summary execute listCloudManagerTenants
 * x-ms-original-file: 2025-10-08/PaloAltoNetworksCloudngfwOperations_listCloudManagerTenants_MaximumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsListCloudManagerTenantsMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.listCloudManagerTenants();
  console.log(result);
}

/**
 * This sample demonstrates how to execute listCloudManagerTenants
 *
 * @summary execute listCloudManagerTenants
 * x-ms-original-file: 2025-10-08/PaloAltoNetworksCloudngfwOperations_listCloudManagerTenants_MinimumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsListCloudManagerTenantsMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.listCloudManagerTenants();
  console.log(result);
}

async function main(): Promise<void> {
  await paloAltoNetworksCloudngfwOperationsListCloudManagerTenantsMaximumSetGen();
  await paloAltoNetworksCloudngfwOperationsListCloudManagerTenantsMinimumSetGen();
}

main().catch(console.error);
