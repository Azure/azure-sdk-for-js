// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to execute listSupportInfo
 *
 * @summary execute listSupportInfo
 * x-ms-original-file: 2025-10-08/PaloAltoNetworksCloudngfwOperations_listSupportInfo_MaximumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsListSupportInfoMaximumSetGen() {
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
async function paloAltoNetworksCloudngfwOperationsListSupportInfoMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.listSupportInfo();
  console.log(result);
}

async function main() {
  await paloAltoNetworksCloudngfwOperationsListSupportInfoMaximumSetGen();
  await paloAltoNetworksCloudngfwOperationsListSupportInfoMinimumSetGen();
}

main().catch(console.error);
