// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing backend.
 *
 * @summary updates an existing backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateBackend.json
 */
async function apiManagementUpdateBackend() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.backend.update("rg1", "apimService1", "proxybackend", "*", {
    description: "description5308",
    tls: { validateCertificateChain: false, validateCertificateName: true },
  });
  console.log(result);
}

async function main() {
  await apiManagementUpdateBackend();
}

main().catch(console.error);
