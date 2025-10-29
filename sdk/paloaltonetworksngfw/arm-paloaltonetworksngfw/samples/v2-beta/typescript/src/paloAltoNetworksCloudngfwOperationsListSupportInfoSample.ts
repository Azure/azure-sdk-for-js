// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to execute listSupportInfo
 *
 * @summary execute listSupportInfo
 * x-ms-original-file: 2025-10-08/PaloAltoNetworksCloudngfwOperations_listSupportInfo_MaximumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsListSupportInfoMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.listSupportInfo();
  console.log(result);
}

/**
 * This sample demonstrates how to execute listSupportInfo
 *
 * @summary execute listSupportInfo
 * x-ms-original-file: 2025-10-08/PaloAltoNetworksCloudngfwOperations_listSupportInfo_MinimumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsListSupportInfoMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.listSupportInfo();
  console.log(result);
}

async function main(): Promise<void> {
  await paloAltoNetworksCloudngfwOperationsListSupportInfoMaximumSetGen();
  await paloAltoNetworksCloudngfwOperationsListSupportInfoMinimumSetGen();
}

main().catch(console.error);
