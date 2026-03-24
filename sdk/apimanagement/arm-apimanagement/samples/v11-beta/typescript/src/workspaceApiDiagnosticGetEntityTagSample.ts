// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the Diagnostic for an API specified by its identifier.
 *
 * @summary gets the entity state (Etag) version of the Diagnostic for an API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadWorkspaceApiDiagnostic.json
 */
async function apiManagementHeadWorkspaceApiDiagnostic(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceApiDiagnostic.getEntityTag(
    "rg1",
    "apimService1",
    "wks1",
    "57d1f7558aa04f15146d9d8a",
    "applicationinsights",
  );
}

async function main(): Promise<void> {
  await apiManagementHeadWorkspaceApiDiagnostic();
}

main().catch(console.error);
