// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Uses a CertificateClient in various ways to read a certificate as well as update a certificate's tags.
 */

import { CertificateClient, DefaultCertificatePolicy, UpdateCertificateOptions, CertificatePolicy } from "@azure/keyvault-certificates";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  // Create unique certificate name
  const uniqueString = new Date().getTime();
  const certificateName = `cert${uniqueString}`;

  // Creating a self-signed certificate
  const createPoller = await client.beginCreateCertificate(
    certificateName,
    DefaultCertificatePolicy
  );

  // Get the pending certificate before the creation operation is complete
  const pendingCertificate = createPoller.getResult();
  console.log("Certificate: ", pendingCertificate);

  // To read a certificate with their policy
  // Note: It will always read the latest version of the certificate.
  let certificateWithPolicy = await client.getCertificate(certificateName);
  console.log("Certificate with policy:", certificateWithPolicy);

  // To read a certificate from a specific version
  // Note: It will not retrieve the certificate's policy.
  const certificateFromVersion = await client.getCertificateVersion(
    certificateName,
    certificateWithPolicy.properties.version!
  );
  console.log("Certificate from a specific version:", certificateFromVersion);

  // Update certificate properties
  const version = ""; // latest certificate
  const properties: UpdateCertificateOptions = {
    tags: {
      projectName: "certificate-sample",
      projectOwner: "REPLACE-WITH-YOUR-NAME"
    },
    enabled: true
  };
  const updatedCertificate = await client.updateCertificateProperties(
    certificateName,
    version,
    properties
  );
  console.log("Updated certificate:", updatedCertificate);

  // Updating the certificate's policy:
  const policy: CertificatePolicy = {
    issuerName: "Self",
    subject: "cn=MyOtherCert",
    exportable: true,
    enabled: true
  };  
  await client.updateCertificatePolicy(certificateName, policy);
  
  // Get updated certificate with policy
  certificateWithPolicy = await client.getCertificate(certificateName);
  console.log("updatedCertificate certificate's policy:", certificateWithPolicy.policy);

  // Delete certificate, wait until complete
  const deletePoller = await client.beginDeleteCertificate(certificateName);
  const deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Recovery Id: ", deletedCertificate.recoveryId);
  console.log("Deleted Date: ", deletedCertificate.deletedOn);
  console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
