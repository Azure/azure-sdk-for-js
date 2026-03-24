// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all policy fragments defined within a workspace.
 *
 * @summary gets all policy fragments defined within a workspace.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspacePolicyFragments.json
 */
async function apiManagementListWorkspacePolicyFragments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspacePolicyFragment.listByService(
    "rg1",
    "apimService1",
    "wks1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiManagementListWorkspacePolicyFragments();
}

main().catch(console.error);
