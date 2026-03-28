// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specific certificate.
 *
 * @summary deletes specific certificate.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceCertificate.json
 */
async function apiManagementDeleteWorkspaceCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceCertificate.delete("rg1", "apimService1", "wks1", "tempcert", "*");
}

async function main() {
  await apiManagementDeleteWorkspaceCertificate();
}

main().catch(console.error);
