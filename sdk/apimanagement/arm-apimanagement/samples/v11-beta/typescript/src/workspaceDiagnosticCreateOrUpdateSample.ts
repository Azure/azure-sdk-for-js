// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new Diagnostic or updates an existing one.
 *
 * @summary creates a new Diagnostic or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceDiagnostic.json
 */
async function apiManagementCreateWorkspaceDiagnostic(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceDiagnostic.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "applicationinsights",
    {
      alwaysLog: "allErrors",
      backend: {
        response: { body: { bytes: 512 }, headers: ["Content-type"] },
        request: { body: { bytes: 512 }, headers: ["Content-type"] },
      },
      frontend: {
        response: { body: { bytes: 512 }, headers: ["Content-type"] },
        request: { body: { bytes: 512 }, headers: ["Content-type"] },
      },
      loggerId: "/workspaces/wks1/loggers/azuremonitor",
      sampling: { percentage: 50, samplingType: "fixed" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceDiagnostic();
}

main().catch(console.error);
