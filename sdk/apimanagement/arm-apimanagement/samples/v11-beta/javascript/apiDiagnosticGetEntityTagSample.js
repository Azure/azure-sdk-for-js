// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the Diagnostic for an API specified by its identifier.
 *
 * @summary gets the entity state (Etag) version of the Diagnostic for an API specified by its identifier.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadApiDiagnostic.json
 */
async function apiManagementHeadApiDiagnostic() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiDiagnostic.getEntityTag(
    "rg1",
    "apimService1",
    "57d1f7558aa04f15146d9d8a",
    "applicationinsights",
  );
}

async function main() {
  await apiManagementHeadApiDiagnostic();
}

main().catch(console.error);
