// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new Diagnostic or updates an existing one.
 *
 * @summary creates a new Diagnostic or updates an existing one.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateDiagnostic.json
 */
async function apiManagementCreateDiagnostic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.diagnostic.createOrUpdate(
    "rg1",
    "apimService1",
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
      loggerId: "/loggers/azuremonitor",
      sampling: { percentage: 50, samplingType: "fixed" },
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateDiagnostic();
}

main().catch(console.error);
