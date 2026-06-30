// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the Azure Front Door Standard, Azure Front Door Premium, and CDN profiles within a resource group.
 *
 * @summary lists all of the Azure Front Door Standard, Azure Front Door Premium, and CDN profiles within a resource group.
 * x-ms-original-file: 2025-12-01/Profiles_ListByResourceGroup.json
 */
async function profilesListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.profiles.listByResourceGroup("RG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await profilesListByResourceGroup();
}

main().catch(console.error);
