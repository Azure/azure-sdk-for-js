// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates a self-signed certificate, then makes a backup from it, then deletes it and purges it, and finally restores it.
 */

// Load the .env file if it exists
const dotenv = require("dotenv");

const { CertificateClient } = require("@azure/keyvault-certificates");
const { DefaultAzureCredential } = require("@azure/identity");

dotenv.config();

function delay(t, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  const uniqueString = new Date().getTime();
  const certificateName = `backup-restore-${uniqueString}`;

  // Creating a self-signed certificate
  const createPoller = await client.beginCreateCertificate(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert",
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

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

module.exports = { main };
