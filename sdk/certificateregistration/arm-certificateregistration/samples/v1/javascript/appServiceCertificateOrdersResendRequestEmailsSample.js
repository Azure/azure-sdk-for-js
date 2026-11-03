// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resend domain verification ownership email containing steps on how to verify a domain for a given certificate order
 *
 * @summary resend domain verification ownership email containing steps on how to verify a domain for a given certificate order
 * x-ms-original-file: 2024-11-01/ResendDomainOwnershipVerificationEmail.json
 */
async function resendDomainOwnershipVerificationEmail() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  await client.appServiceCertificateOrders.resendRequestEmails(
    "testrg123",
    "SampleCertificateOrderName",
    { name: "Domain name" },
  );
}

async function main() {
  await resendDomainOwnershipVerificationEmail();
}

main().catch(console.error);
