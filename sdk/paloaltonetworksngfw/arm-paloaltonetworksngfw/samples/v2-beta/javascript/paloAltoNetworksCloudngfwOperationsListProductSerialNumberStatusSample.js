// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to execute listProductSerialNumberStatus
 *
 * @summary execute listProductSerialNumberStatus
 * x-ms-original-file: 2025-10-08/PaloAltoNetworksCloudngfwOperations_listProductSerialNumberStatus_MaximumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.listProductSerialNumberStatus();
  console.log(result);
}

/**
 * This sample demonstrates how to execute listProductSerialNumberStatus
 *
 * @summary execute listProductSerialNumberStatus
 * x-ms-original-file: 2025-10-08/PaloAltoNetworksCloudngfwOperations_listProductSerialNumberStatus_MinimumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.listProductSerialNumberStatus();
  console.log(result);
}

async function main() {
  await paloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusMaximumSetGen();
  await paloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusMinimumSetGen();
}

main().catch(console.error);
