// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the description of specified portal revision or makes it current.
 *
 * @summary updates the description of specified portal revision or makes it current.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdatePortalRevision.json
 */
async function apiManagementUpdatePortalRevision(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.portalRevision.update("rg1", "apimService1", "20201112101010", "*", {
    description: "portal revision update",
    isCurrent: true,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementUpdatePortalRevision();
}

main().catch(console.error);
