// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the details of the tag specified by its identifier.
 *
 * @summary updates the details of the tag specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateTag.json
 */
async function apiManagementUpdateTag(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tag.update("rg1", "apimService1", "temptag", "*", {
    displayName: "temp tag",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdateTag();
}

main().catch(console.error);
