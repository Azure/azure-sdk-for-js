// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificateRegistrationManagementClient } from "@azure/arm-certificateregistration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Verify domain ownership for this certificate order.
 *
 * @summary description for Verify domain ownership for this certificate order.
 * x-ms-original-file: 2024-11-01/VerifyDomainOwnership.json
 */
async function verifyDomainOwnership(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new CertificateRegistrationManagementClient(credential, subscriptionId);
  await client.appServiceCertificateOrders.verifyDomainOwnership(
    "testrg123",
    "SampleCertificateOrderName",
  );
}

async function main(): Promise<void> {
  await verifyDomainOwnership();
}

main().catch(console.error);
