// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get the certificate associated with a certificate order.
 *
 * @summary description for Get the certificate associated with a certificate order.
 * x-ms-original-file: 2024-11-01/GetAppServiceCertificate.json
 */
async function getAppServiceCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  const result = await client.appServiceCertificateOrders.getCertificate(
    "testrg123",
    "SampleCertificateOrderName",
    "SampleCertName1",
  );
  console.log(result);
}

async function main() {
  await getAppServiceCertificate();
}

main().catch(console.error);
