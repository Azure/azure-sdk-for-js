// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified Diagnostic.
 *
 * @summary deletes the specified Diagnostic.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceDiagnostic.json
 */
async function apiManagementDeleteWorkspaceDiagnostic(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceDiagnostic.delete(
    "rg1",
    "apimService1",
    "wks1",
    "applicationinsights",
    "*",
  );
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspaceDiagnostic();
}

main().catch(console.error);
