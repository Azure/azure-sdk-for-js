// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates a self-signed certificate, then makes a backup from it, then deletes it and purges it, and finally restores it.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { CertificateClient } from "@azure/keyvault-certificates";

let client: CertificateClient;
let certificateName: string;

async function backupAndRestoreACertificate() {
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
  await client.restoreCertificateBackup(backup!);
  const restoredCertificate = await client.getCertificate(certificateName);
  console.log("Restored certificate: ", restoredCertificate);
}

async function backUpACertificate() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  await client.beginCreateCertificate("MyCertificate", {
      issuerName: "Self",
      subject: "cn=MyCert",
  });
  const backup = await client.backupCertificate("MyCertificate");

}

async function restoreACertificateFromBackup() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  await client.beginCreateCertificate("MyCertificate", {
      issuerName: "Self",
      subject: "cn=MyCert",
  });
  const backup = await client.backupCertificate("MyCertificate");

  const poller = await client.beginDeleteCertificate("MyCertificate");
  await poller.pollUntilDone();

  // Some time is required before we're able to restore the certificate
  await client.restoreCertificateBackup(backup!);

}

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  client =
      new CertificateClient(process.env["KEYVAULT_URI"] || "<keyvault-url>", new DefaultAzureCredential());
  certificateName =
      `backup-restore-${new Date().getTime()}`;
  await backupAndRestoreACertificate();
  await backUpACertificate();
  await restoreACertificateFromBackup();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
