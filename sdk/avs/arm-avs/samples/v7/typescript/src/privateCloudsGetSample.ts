// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a PrivateCloud
 *
 * @summary get a PrivateCloud
 * x-ms-original-file: 2024-09-01/PrivateClouds_Get.json
 */
async function privateCloudsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.privateClouds.get("group1", "cloud1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a PrivateCloud
 *
 * @summary get a PrivateCloud
 * x-ms-original-file: 2024-09-01/PrivateClouds_Get_Stretched.json
 */
async function privateCloudsGetStretched(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.privateClouds.get("group1", "cloud1");
  console.log(result);
}

async function main(): Promise<void> {
  await privateCloudsGet();
  await privateCloudsGetStretched();
}

main().catch(console.error);
