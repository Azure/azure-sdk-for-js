// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to refresh the secret of the named value specified by its identifier.
 *
 * @summary refresh the secret of the named value specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementRefreshWorkspaceNamedValue.json
 */
async function apiManagementRefreshWorkspaceNamedValue(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNamedValue.refreshSecret(
    "rg1",
    "apimService1",
    "wks1",
    "testprop2",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementRefreshWorkspaceNamedValue();
}

main().catch(console.error);
