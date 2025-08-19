// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a CloudLink
 *
 * @summary get a CloudLink
 * x-ms-original-file: 2024-09-01/CloudLinks_Get.json
 */
async function cloudLinksGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.cloudLinks.get("group1", "cloud1", "cloudLink1");
  console.log(result);
}

async function main(): Promise<void> {
  await cloudLinksGet();
}

main().catch(console.error);
