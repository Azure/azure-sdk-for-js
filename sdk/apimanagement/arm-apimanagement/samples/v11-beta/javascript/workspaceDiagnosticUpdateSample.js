// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the details of the Diagnostic specified by its identifier.
 *
 * @summary updates the details of the Diagnostic specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateWorkspaceDiagnostic.json
 */
async function apiManagementUpdateWorkspaceDiagnostic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceDiagnostic.update(
    "rg1",
    "apimService1",
    "wks1",
    "applicationinsights",
    "*",
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
  await apiManagementUpdateWorkspaceDiagnostic();
}

main().catch(console.error);
