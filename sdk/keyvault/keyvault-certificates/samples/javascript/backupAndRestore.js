// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { CertificateClient } = require("@azure/keyvault-certificates");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

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
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential, {
    // KEYVAULT_API_VERSION is an option environment variable that can be used to override
    // the default API version that the Azure SDK uses to communicate with a service.
    // Set this environment variable if you want to run these samples in an environment
    // that requires a different API version.
    serviceVersion: process.env.KEYVAULT_API_VERSION
  });

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

  await client.restoreCertificateBackup(backup);

  const restoredCertificate = await client.getCertificate(certificateName);

  console.log("Restored certificate: ", restoredCertificate);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
