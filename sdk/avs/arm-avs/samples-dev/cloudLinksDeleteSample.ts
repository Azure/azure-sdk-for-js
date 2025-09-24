// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a CloudLink
 *
 * @summary delete a CloudLink
 * x-ms-original-file: 2024-09-01/CloudLinks_Delete.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function cloudLinksDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.cloudLinks.delete("group1", "cloud1", "cloudLink1");
}

async function main(): Promise<void> {
  await cloudLinksDelete();
}

main().catch(console.error);
