// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Description for Creates or updates a certificate and associates with key vault secret.
 *
 * @summary Description for Creates or updates a certificate and associates with key vault secret.
 * x-ms-original-file: specification/certificateregistration/resource-manager/Microsoft.CertificateRegistration/CertificateRegistration/stable/2024-11-01/examples/UpdateAppServiceCertificate.json
 */
async function updateCertificate() {
  const subscriptionId =
    process.env["CERTIFICATEREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["CERTIFICATEREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const certificateOrderName = "SampleCertificateOrderName";
  const name = "SampleCertName1";
  const keyVaultCertificate = {
    keyVaultId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/testrg123/providers/microsoft.keyvault/vaults/SamplevaultName",
    keyVaultSecretName: "SampleSecretName1",
  };
  const credential = new DefaultAzureCredential();
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  const result = await client.appServiceCertificateOrders.updateCertificate(
    resourceGroupName,
    certificateOrderName,
    name,
    keyVaultCertificate,
  );
  console.log(result);
}

async function main() {
  await updateCertificate();
}

main().catch(console.error);
