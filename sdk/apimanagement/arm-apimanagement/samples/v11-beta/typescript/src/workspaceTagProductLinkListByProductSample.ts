// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a collection of the product links associated with a tag.
 *
 * @summary lists a collection of the product links associated with a tag.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspaceTagProductLinks.json
 */
async function apiManagementListWorkspaceTagProductLinks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaceTagProductLink.listByProduct(
    "rg1",
    "apimService1",
    "wks1",
    "tag1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListWorkspaceTagProductLinks();
}

main().catch(console.error);
