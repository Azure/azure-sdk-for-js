// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Uses a CertificateClient in various ways to read a certificate as well as update a certificate's tags.
 */

// Load the .env file if it exists
const dotenv = require("dotenv");

const { CertificateClient, DefaultCertificatePolicy } = require("@azure/keyvault-certificates");

const { DefaultAzureCredential } = require("@azure/identity");

dotenv.config();

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  // Create unique certificate name
  const uniqueString = new Date().getTime();
  const certificateName = `hello-world-${uniqueString}`;

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
    certificateWithPolicy.properties.version
  );
  console.log("Certificate from a specific version:", certificateFromVersion);

  // Update certificate properties
  const version = ""; // latest certificate
  const properties = {
    tags: {
      projectName: "certificate-sample",
      projectOwner: "REPLACE-WITH-YOUR-NAME",
    },
    enabled: true,
  };
  const updatedCertificate = await client.updateCertificateProperties(
    certificateName,
    version,
    properties
  );
  console.log("Updated certificate:", updatedCertificate);

  // Updating the certificate's policy:
  const policy = {
    issuerName: "Self",
    subject: "cn=MyOtherCert",
    exportable: true,
    enabled: true,
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

module.exports = { main };
