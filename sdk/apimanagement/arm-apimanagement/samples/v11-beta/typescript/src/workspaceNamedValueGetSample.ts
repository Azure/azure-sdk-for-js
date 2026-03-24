// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the details of the named value specified by its identifier.
 *
 * @summary gets the details of the named value specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceNamedValue.json
 */
async function apiManagementGetWorkspaceNamedValue(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNamedValue.get(
    "rg1",
    "apimService1",
    "wks1",
    "testarmTemplateproperties2",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the details of the named value specified by its identifier.
 *
 * @summary gets the details of the named value specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspaceNamedValueWithKeyVault.json
 */
async function apiManagementGetWorkspaceNamedValueWithKeyVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNamedValue.get("rg1", "apimService1", "wks1", "testprop6");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspaceNamedValue();
  await apiManagementGetWorkspaceNamedValueWithKeyVault();
}

main().catch(console.error);
