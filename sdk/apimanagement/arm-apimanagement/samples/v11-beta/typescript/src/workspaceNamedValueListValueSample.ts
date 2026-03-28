// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the secret of the named value specified by its identifier.
 *
 * @summary gets the secret of the named value specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementWorkspaceNamedValueListValue.json
 */
async function apiManagementWorkspaceNamedValueListValue(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceNamedValue.listValue(
    "rg1",
    "apimService1",
    "wks1",
    "testarmTemplateproperties2",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementWorkspaceNamedValueListValue();
}

main().catch(console.error);
