// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a HcxEnterpriseSite
 *
 * @summary create a HcxEnterpriseSite
 * x-ms-original-file: 2024-09-01/HcxEnterpriseSites_CreateOrUpdate.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function hcxEnterpriseSitesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.hcxEnterpriseSites.createOrUpdate("group1", "cloud1", "site1", {});
  console.log(result);
}

async function main(): Promise<void> {
  await hcxEnterpriseSitesCreateOrUpdate();
}

main().catch(console.error);
