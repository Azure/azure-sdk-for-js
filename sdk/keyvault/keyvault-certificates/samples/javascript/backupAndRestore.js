const { CertificatesClient } = require("../../src");
const { DefaultAzureCredential } = require("@azure/identity");

// This sample creates a self-signed certificate, then makes a backup from it,
// then deletes it and purges it, and finally restores it.

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

  const certificateName = "MyCertificate123129";

  // Creating a self-signed certificate
  const certificate = await client.createCertificate(certificateName, {
    issuerName: "Self",
    subjectName: "cn=MyCert"
  });

  console.log("Certificate: ", certificate);

  const backup = await client.backupCertificate(certificateName);

  // It might take less time, or more, depending on your location, internet speed and other factors.
  await client.deleteCertificate(certificateName);
  await delay(30000);

  await client.purgeDeletedCertificate(certificateName);
  await delay(30000);

  await client.restoreCertificateBackup(backup.value);

  const restoredCertificate = await client.getCertificate(certificateName);

  console.log("Restored certificate: ", restoredCertificate);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
