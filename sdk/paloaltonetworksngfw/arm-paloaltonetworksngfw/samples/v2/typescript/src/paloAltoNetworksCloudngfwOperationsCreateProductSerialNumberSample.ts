// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to execute createProductSerialNumber
 *
 * @summary execute createProductSerialNumber
 * x-ms-original-file: 2025-10-08/PaloAltoNetworksCloudngfwOperations_createProductSerialNumber_MaximumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsCreateProductSerialNumberMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.createProductSerialNumber();
  console.log(result);
}

/**
 * This sample demonstrates how to execute createProductSerialNumber
 *
 * @summary execute createProductSerialNumber
 * x-ms-original-file: 2025-10-08/PaloAltoNetworksCloudngfwOperations_createProductSerialNumber_MinimumSet_Gen.json
 */
async function paloAltoNetworksCloudngfwOperationsCreateProductSerialNumberMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.paloAltoNetworksCloudngfwOperations.createProductSerialNumber();
  console.log(result);
}

async function main(): Promise<void> {
  await paloAltoNetworksCloudngfwOperationsCreateProductSerialNumberMaximumSetGen();
  await paloAltoNetworksCloudngfwOperationsCreateProductSerialNumberMinimumSetGen();
}

main().catch(console.error);
