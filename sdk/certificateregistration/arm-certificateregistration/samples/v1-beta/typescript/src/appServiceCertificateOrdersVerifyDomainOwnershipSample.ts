// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificateRegistrationManagementClient } from "@azure/arm-certificateregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Verify domain ownership for this certificate order.
 *
 * @summary Description for Verify domain ownership for this certificate order.
 * x-ms-original-file: specification/certificateregistration/resource-manager/Microsoft.CertificateRegistration/CertificateRegistration/stable/2024-11-01/examples/VerifyDomainOwnership.json
 */
async function verifyDomainOwnership(): Promise<void> {
  const subscriptionId =
    process.env["CERTIFICATEREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["CERTIFICATEREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const certificateOrderName = "SampleCertificateOrderName";
  const credential = new DefaultAzureCredential();
  const client = new CertificateRegistrationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.appServiceCertificateOrders.verifyDomainOwnership(
    resourceGroupName,
    certificateOrderName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await verifyDomainOwnership();
}

main().catch(console.error);
