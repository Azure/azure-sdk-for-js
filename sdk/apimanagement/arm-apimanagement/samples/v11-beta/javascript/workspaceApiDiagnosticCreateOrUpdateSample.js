// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new Diagnostic for an API or updates an existing one.
 *
 * @summary creates a new Diagnostic for an API or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceApiDiagnostic.json
 */
async function apiManagementCreateWorkspaceApiDiagnostic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceApiDiagnostic.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
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
      loggerId: "/workspaces/wks1/loggers/applicationinsights",
      sampling: { percentage: 50, samplingType: "fixed" },
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateWorkspaceApiDiagnostic();
}

main().catch(console.error);
