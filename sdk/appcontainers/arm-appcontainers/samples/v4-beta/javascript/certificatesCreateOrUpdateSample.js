// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or Update a Certificate.
 *
 * @summary create or Update a Certificate.
 * x-ms-original-file: 2025-10-02-preview/Certificate_CreateOrUpdate.json
 */
async function createOrUpdateCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.certificates.createOrUpdate(
    "examplerg",
    "testcontainerenv",
    "certificate-firendly-name",
    {
      certificateEnvelope: {
        location: "East US",
        properties: {
          certificateType: "ImagePullTrustedCA",
          password: "private key password",
          value: Buffer.from("Y2VydA==", "base64"),
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or Update a Certificate.
 *
 * @summary create or Update a Certificate.
 * x-ms-original-file: 2025-10-02-preview/Certificate_CreateOrUpdate_FromKeyVault.json
 */
async function createOrUpdateCertificateUsingManagedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.certificates.createOrUpdate(
    "examplerg",
    "testcontainerenv",
    "certificate-firendly-name",
    {
      certificateEnvelope: {
        location: "East US",
        properties: {
          certificateKeyVaultProperties: {
            identity:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/test-rg/providers/microsoft.managedidentity/userassignedidentities/test-user-mi",
            keyVaultUrl: "https://xxxxxxxx.vault.azure.net/certificates/certName",
          },
          certificateType: "ServerSSLCertificate",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateCertificate();
  await createOrUpdateCertificateUsingManagedIdentity();
}

main().catch(console.error);
