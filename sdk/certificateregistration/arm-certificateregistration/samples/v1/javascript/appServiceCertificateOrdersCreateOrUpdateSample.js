// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Create or update a certificate purchase order.
 *
 * @summary description for Create or update a certificate purchase order.
 * x-ms-original-file: 2024-11-01/CreateAppServiceCertificateOrder.json
 */
async function createCertificateOrder() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  const result = await client.appServiceCertificateOrders.createOrUpdate(
    "testrg123",
    "SampleCertificateOrderName",
    {
      location: "Global",
      autoRenew: true,
      certificates: {
        SampleCertName1: {
          keyVaultId:
            "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/testrg123/providers/microsoft.keyvault/vaults/SamplevaultName",
          keyVaultSecretName: "SampleSecretName1",
        },
        SampleCertName2: {
          keyVaultId:
            "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/testrg123/providers/microsoft.keyvault/vaults/SamplevaultName",
          keyVaultSecretName: "SampleSecretName2",
        },
      },
      distinguishedName: "CN=SampleCustomDomain.com",
      keySize: 2048,
      productType: "StandardDomainValidatedSsl",
      validityInYears: 2,
    },
  );
  console.log(result);
}

async function main() {
  await createCertificateOrder();
}

main().catch(console.error);
