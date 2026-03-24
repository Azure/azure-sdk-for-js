// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new Diagnostic for an API or updates an existing one.
 *
 * @summary creates a new Diagnostic for an API or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateApiDiagnostic.json
 */
async function apiManagementCreateApiDiagnostic(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiDiagnostic.createOrUpdate(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
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
      loggerId: "/loggers/applicationinsights",
      sampling: { percentage: 50, samplingType: "fixed" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateApiDiagnostic();
}

main().catch(console.error);
