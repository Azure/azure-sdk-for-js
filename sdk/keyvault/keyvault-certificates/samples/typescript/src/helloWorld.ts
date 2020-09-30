// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CertificateClient, DefaultCertificatePolicy } from "@azure/keyvault-certificates";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// This sample creates a self-signed certificate, reads it in various ways,
// updates the tags of the certificate and finally deletes the certificate.

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
  const createPoller = await client.beginCreateCertificate(
    certificateName,
    DefaultCertificatePolicy
  );

  const pendingCertificate = createPoller.getResult();
  console.log("Certificate: ", pendingCertificate);

  // To read a certificate with their policy:
  let certificateWithPolicy = await client.getCertificate(certificateName);
  // Note: It will always read the latest version of the certificate.

  console.log("Certificate with policy:", certificateWithPolicy);

  // To read a certificate from a specific version:
  const certificateFromVersion = await client.getCertificateVersion(
    certificateName,
    certificateWithPolicy.properties.version!
  );
  // Note: It will not retrieve the certificate's policy.
  console.log("Certificate from a specific version:", certificateFromVersion);

  const updatedCertificate = await client.updateCertificateProperties(certificateName, "", {
    tags: {
      customTag: "value",
    },
  });
  console.log("Updated certificate:", updatedCertificate);

  // Updating the certificate's policy:
  await client.updateCertificatePolicy(certificateName, {
    issuerName: "Self",
    subject: "cn=MyOtherCert",
  });
  certificateWithPolicy = await client.getCertificate(certificateName);
  console.log("updatedCertificate certificate's policy:", certificateWithPolicy.policy);

  const deletePoller = await client.beginDeleteCertificate(certificateName);
  const deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Recovery Id: ", deletedCertificate.recoveryId);
  console.log("Deleted Date: ", deletedCertificate.deletedOn);
  console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
