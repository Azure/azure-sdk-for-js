// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to rotate the NSX-T Manager password
 *
 * @summary rotate the NSX-T Manager password
 * x-ms-original-file: 2024-09-01/PrivateClouds_RotateNsxtPassword.json
 */
async function privateCloudsRotateNsxtPassword(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.privateClouds.rotateNsxtPassword("group1", "cloud1");
}

async function main(): Promise<void> {
  await privateCloudsRotateNsxtPassword();
}

main().catch(console.error);
