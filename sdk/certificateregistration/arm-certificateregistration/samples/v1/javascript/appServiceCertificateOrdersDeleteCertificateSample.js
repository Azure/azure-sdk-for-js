// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Delete the certificate associated with a certificate order.
 *
 * @summary description for Delete the certificate associated with a certificate order.
 * x-ms-original-file: 2024-11-01/DeleteAppServiceCertificate.json
 */
async function deleteAppServiceCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  await client.appServiceCertificateOrders.deleteCertificate(
    "testrg123",
    "SampleCertificateOrderName",
    "SampleCertName1",
  );
}

async function main() {
  await deleteAppServiceCertificate();
}

main().catch(console.error);
