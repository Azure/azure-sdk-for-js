// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CertificateRegistrationManagementClient } = require("@azure/arm-certificateregistration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Verify domain ownership for this certificate order.
 *
 * @summary description for Verify domain ownership for this certificate order.
 * x-ms-original-file: 2024-11-01/VerifyDomainOwnership.json
 */
async function verifyDomainOwnership() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  await client.appServiceCertificateOrders.verifyDomainOwnership(
    "testrg123",
    "SampleCertificateOrderName",
  );
}

async function main() {
  await verifyDomainOwnership();
}

main().catch(console.error);
