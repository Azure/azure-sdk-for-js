// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to from KeyVault, Refresh the certificate being used for authentication with the backend.
 *
 * @summary from KeyVault, Refresh the certificate being used for authentication with the backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementRefreshWorkspaceCertificate.json
 */
async function apiManagementRefreshWorkspaceCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceCertificate.refreshSecret(
    "rg1",
    "apimService1",
    "wks1",
    "templateCertkv",
  );
  console.log(result);
}

async function main() {
  await apiManagementRefreshWorkspaceCertificate();
}

main().catch(console.error);
