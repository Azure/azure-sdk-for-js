// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Resend certificate email.
 *
 * @summary description for Resend certificate email.
 * x-ms-original-file: 2024-11-01/ResendAppServiceCertificateOrderEmail.json
 */
async function resendAppServiceCertificateOrderEmail() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  await client.appServiceCertificateOrders.resendEmail("testrg123", "SampleCertificateOrderName");
}

async function main() {
  await resendAppServiceCertificateOrderEmail();
}

main().catch(console.error);
