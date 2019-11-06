import { CertificateClient, CertificatePolicy } from "../../src";
import { DefaultAzureCredential } from "@azure/identity";

// This sample creates a self-signed certificate, reads it in various ways,
// updates the tags of the certificate and finaly deletes the certificate.

async function main(): Promise<void> {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
  const url = `https://${vaultName}.vault.azure.net`;
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  const certificateName = "MyCertificate";

  // Creating a self-signed certificate
  const certificate = await client.createCertificate(certificateName, CertificatePolicy.Default);

  console.log("Certificate: ", certificate);

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

  const updatedCertificate = await client.updateCertificate(certificateName, "", {
    tags: {
      customTag: "value"
    }
  });
  console.log("Updated certificate:", updatedCertificate);

  // Updating the certificate's policy:
  await client.updateCertificatePolicy(certificateName, {
    issuerName: "Self",
    subject: "cn=MyOtherCert"
  });
  certificateWithPolicy = await client.getCertificate(certificateName);
  console.log("updatedCertificate certificate's policy:", certificateWithPolicy.policy);

  const result = await client.deleteCertificate(certificateName);
  console.log("Recovery Id: ", result.recoveryId);
  console.log("Deleted Date: ", result.deletedOn);
  console.log("Scheduled Purge Date: ", result.scheduledPurgeDate);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
