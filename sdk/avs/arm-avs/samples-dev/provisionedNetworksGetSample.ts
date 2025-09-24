// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a ProvisionedNetwork
 *
 * @summary get a ProvisionedNetwork
 * x-ms-original-file: 2024-09-01/ProvisionedNetworks_Get.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function provisionedNetworksGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.provisionedNetworks.get("group1", "cloud1", "vsan");
  console.log(result);
}

async function main(): Promise<void> {
  await provisionedNetworksGet();
}

main().catch(console.error);
