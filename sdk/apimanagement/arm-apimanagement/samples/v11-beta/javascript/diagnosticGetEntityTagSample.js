// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the Diagnostic specified by its identifier.
 *
 * @summary gets the entity state (Etag) version of the Diagnostic specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadDiagnostic.json
 */
async function apiManagementHeadDiagnostic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.diagnostic.getEntityTag("rg1", "apimService1", "applicationinsights");
}

async function main() {
  await apiManagementHeadDiagnostic();
}

main().catch(console.error);
