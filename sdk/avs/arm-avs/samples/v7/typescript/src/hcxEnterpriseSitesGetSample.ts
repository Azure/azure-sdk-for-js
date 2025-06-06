// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a HcxEnterpriseSite
 *
 * @summary get a HcxEnterpriseSite
 * x-ms-original-file: 2024-09-01/HcxEnterpriseSites_Get.json
 */
async function hcxEnterpriseSitesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.hcxEnterpriseSites.get("group1", "cloud1", "site1");
  console.log(result);
}

async function main(): Promise<void> {
  await hcxEnterpriseSitesGet();
}

main().catch(console.error);
