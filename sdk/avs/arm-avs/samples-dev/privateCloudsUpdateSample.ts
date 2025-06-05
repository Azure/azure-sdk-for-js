// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a PrivateCloud
 *
 * @summary update a PrivateCloud
 * x-ms-original-file: 2024-09-01/PrivateClouds_Update.json
 */
async function privateCloudsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.privateClouds.update("group1", "cloud1");
  console.log(result);
}

/**
 * This sample demonstrates how to update a PrivateCloud
 *
 * @summary update a PrivateCloud
 * x-ms-original-file: 2024-09-01/PrivateClouds_Update_Stretched.json
 */
async function privateCloudsUpdateStretched(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.privateClouds.update("group1", "cloud1");
  console.log(result);
}

async function main(): Promise<void> {
  await privateCloudsUpdate();
  await privateCloudsUpdateStretched();
}

main().catch(console.error);
