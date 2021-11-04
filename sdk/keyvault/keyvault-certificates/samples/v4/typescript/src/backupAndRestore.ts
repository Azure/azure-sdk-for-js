// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Creates a self-signed certificate, then makes a backup from it, then deletes it and purges it, and finally restores it.
 */

import { CertificateClient } from "@azure/keyvault-certificates";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

function delay<T>(t: number, value?: T): Promise<T | void> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

export async function main(): Promise<void> {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  const uniqueString = new Date().getTime();
  const certificateName = `cert${uniqueString}`;

  // Creating a self-signed certificate
  const createPoller = await client.beginCreateCertificate(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert"
  });

  const pendingCertificate = createPoller.getResult();
  console.log("Certificate: ", pendingCertificate);

  const backup = await client.backupCertificate(certificateName);

  const deletePoller = await client.beginDeleteCertificate(certificateName);
  await deletePoller.pollUntilDone();

  await client.purgeDeletedCertificate(certificateName);
  await delay(30000);

  await client.restoreCertificateBackup(backup!);

  const restoredCertificate = await client.getCertificate(certificateName);

  console.log("Restored certificate: ", restoredCertificate);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
