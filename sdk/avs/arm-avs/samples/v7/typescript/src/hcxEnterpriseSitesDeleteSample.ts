// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a HcxEnterpriseSite
 *
 * @summary delete a HcxEnterpriseSite
 * x-ms-original-file: 2024-09-01/HcxEnterpriseSites_Delete.json
 */
async function hcxEnterpriseSitesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.hcxEnterpriseSites.delete("group1", "cloud1", "site1");
}

async function main(): Promise<void> {
  await hcxEnterpriseSitesDelete();
}

main().catch(console.error);
