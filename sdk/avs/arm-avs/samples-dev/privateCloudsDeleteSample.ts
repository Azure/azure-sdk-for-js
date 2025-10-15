// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a PrivateCloud
 *
 * @summary delete a PrivateCloud
 * x-ms-original-file: 2024-09-01/PrivateClouds_Delete.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function privateCloudsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.privateClouds.delete("group1", "cloud1");
}

async function main(): Promise<void> {
  await privateCloudsDelete();
}

main().catch(console.error);
