// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the certificate being used for authentication with the backend.
 *
 * @summary creates or updates the certificate being used for authentication with the backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceCertificate.json
 */
async function apiManagementCreateWorkspaceCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceCertificate.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "tempcert",
    {
      data: "****************Base 64 Encoded Certificate *******************************",
      password: "****Certificate Password******",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates the certificate being used for authentication with the backend.
 *
 * @summary creates or updates the certificate being used for authentication with the backend.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceCertificateWithKeyVault.json
 */
async function apiManagementCreateWorkspaceCertificateWithKeyVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceCertificate.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "templateCertkv",
    {
      keyVault: {
        identityClientId: "ceaa6b06-c00f-43ef-99ac-f53d1fe876a0",
        secretIdentifier:
          "https://rpbvtkeyvaultintegration.vault-int.azure-int.net/secrets/msitestingCert",
      },
    },
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateWorkspaceCertificate();
  await apiManagementCreateWorkspaceCertificateWithKeyVault();
}

main().catch(console.error);
