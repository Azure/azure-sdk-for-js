// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Resend domain verification ownership email containing steps on how to verify a domain for a given certificate order
 *
 * @summary Resend domain verification ownership email containing steps on how to verify a domain for a given certificate order
 * x-ms-original-file: specification/certificateregistration/resource-manager/Microsoft.CertificateRegistration/CertificateRegistration/stable/2024-11-01/examples/ResendDomainOwnershipVerificationEmail.json
 */
async function resendDomainOwnershipVerificationEmail() {
  const subscriptionId =
    process.env["CERTIFICATEREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["CERTIFICATEREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const certificateOrderName = "SampleCertificateOrderName";
  const nameIdentifier = { name: "Domain name" };
  const credential = new DefaultAzureCredential();
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  const result = await client.appServiceCertificateOrders.resendRequestEmails(
    resourceGroupName,
    certificateOrderName,
    nameIdentifier,
  );
  console.log(result);
}

async function main() {
  await resendDomainOwnershipVerificationEmail();
}

main().catch(console.error);
