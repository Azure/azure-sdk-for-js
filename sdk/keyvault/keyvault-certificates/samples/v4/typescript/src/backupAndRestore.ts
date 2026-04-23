// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates a self-signed certificate, then makes a backup from it, then deletes it and purges it, and finally restores it.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { CertificateClient } from "@azure/keyvault-certificates";
import { retryWithBackoff } from "./utils.js";

let client: CertificateClient;
let certificateName: string;

async function backupAndRestoreACertificate() {
  // Creating a self-signed certificate
  const createPoller = await client.beginCreateCertificate(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  await createPoller.pollUntilDone();
  const pendingCertificate = createPoller.getResult();
  console.log("Certificate: ", pendingCertificate);
  const backup = await client.backupCertificate(certificateName);
  const deletePoller = await client.beginDeleteCertificate(certificateName);
  await deletePoller.pollUntilDone();
  await client.purgeDeletedCertificate(certificateName);
  await retryWithBackoff(() => client.restoreCertificateBackup(backup!), {
    shouldRetry: (e) => /conflict restoring the certificate/i.test((e as Error).message),
  });
  const restoredCertificate = await client.getCertificate(certificateName);
  console.log("Restored certificate: ", restoredCertificate);
}

async function backUpACertificate() {
  const createPoller = await client.beginCreateCertificate(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  await createPoller.pollUntilDone();
  const backup = await client.backupCertificate(certificateName);
  console.log("Certificate backup buffer length:", backup?.length);
}

async function restoreACertificateFromBackup() {
  const createPoller = await client.beginCreateCertificate(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  await createPoller.pollUntilDone();
  const backup = await client.backupCertificate(certificateName);

  const poller = await client.beginDeleteCertificate(certificateName);
  await poller.pollUntilDone();
  await client.purgeDeletedCertificate(certificateName);

  // Some time is required before we're able to restore the certificate
  await retryWithBackoff(() => client.restoreCertificateBackup(backup!), {
    shouldRetry: (e) => /conflict restoring the certificate/i.test((e as Error).message),
  });
}

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  client = new CertificateClient(process.env["KEYVAULT_URI"], new DefaultAzureCredential());
  certificateName = `backup-restore-${new Date().getTime()}`;
  await backupAndRestoreACertificate();
  await backUpACertificate();
  await restoreACertificateFromBackup();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
