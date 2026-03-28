// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Diagnostic.
 *
 * @summary deletes the specified Diagnostic.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteDiagnostic.json
 */
async function apiManagementDeleteDiagnostic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.diagnostic.delete("rg1", "apimService1", "applicationinsights", "*");
}

async function main() {
  await apiManagementDeleteDiagnostic();
}

main().catch(console.error);
