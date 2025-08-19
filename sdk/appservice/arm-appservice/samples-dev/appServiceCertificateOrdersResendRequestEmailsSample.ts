// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Resend domain verification ownership email containing steps on how to verify a domain for a given certificate order
 *
 * @summary Resend domain verification ownership email containing steps on how to verify a domain for a given certificate order
 * x-ms-original-file: specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2024-11-01/examples/ResendDomainOwnershipVerificationEmail.json
 */

import { NameIdentifier, WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function resendDomainOwnershipVerificationEmail(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const certificateOrderName = "SampleCertificateOrderName";
  const nameIdentifier: NameIdentifier = { name: "Domain name" };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceCertificateOrders.resendRequestEmails(
    resourceGroupName,
    certificateOrderName,
    nameIdentifier,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await resendDomainOwnershipVerificationEmail();
}

main().catch(console.error);
