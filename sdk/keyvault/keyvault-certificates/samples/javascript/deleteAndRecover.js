const { CertificatesClient } = require("../../src");
const { DefaultAzureCredential } = require("@azure/identity");

// This sample creates a self-signed certificate, then deletes it, then recovers it.
// Soft-delete is required for this sample to run: https://docs.microsoft.com/en-us/azure/key-vault/key-vault-ovw-soft-delete

function delay(t, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

async function main() {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
  const url = `https://${vaultName}.vault.azure.net`;
  const credential = new DefaultAzureCredential();

  const client = new CertificatesClient(url, credential);

  const certificateName = "MyCertificate234833";

  // Creating a self-signed certificate
  const certificate = await client.createCertificate(certificateName, {
    issuerName: "Self",
    subjectName: "cn=MyCert"
  });

  console.log("Certificate: ", certificate);

  await client.deleteCertificate(certificateName);

  // It might take less time, or more, depending on your location, internet speed and other factors.
  await delay(30000);

  const deletedCertificate = await client.getDeletedCertificate(certificateName);
  console.log("Deleted certificate: ", deletedCertificate);

  await client.recoverDeletedCertificate(certificateName);

  // It might take less time, or more, depending on your location, internet speed and other factors.
  await delay(30000);

  const certificateWithPolicy = await client.getCertificate(certificateName);
  console.log("Certificate with policy:", certificateWithPolicy);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
