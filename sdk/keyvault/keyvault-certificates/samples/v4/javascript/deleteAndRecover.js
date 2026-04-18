// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates a self-signed certificate, deletes it, and then recovers it (soft-delete is required for this sample to run).
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");
// Load the .env file if it exists
require("dotenv/config");

let client;
let certificateName;

async function createACertificate() {
  // Creating a self-signed certificate
  const createPoller = await client.beginCreateCertificate(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  const pendingCertificate = createPoller.getResult();
  console.log("Certificate: ", pendingCertificate);
}

async function deleteAndRecoverACertificate() {
  const deletePoller = await client.beginDeleteCertificate(certificateName);
  const deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Deleted certificate: ", deletedCertificate);
  const recoverPoller = await client.beginRecoverDeletedCertificate(certificateName);
  const certificateWithPolicy = await recoverPoller.pollUntilDone();
  console.log("Certificate with policy:", certificateWithPolicy);
}

async function deleteACertificate() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const keyVaultUrl = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(keyVaultUrl, credential);

  const certificateName = "MyCertificate";

  const poller = await client.beginDeleteCertificate(certificateName);

  // You can use the deleted certificate immediately:
  const deletedCertificate = poller.getResult();

  // The certificate is being deleted. Only wait for it if you want to restore it or purge it.
  await poller.pollUntilDone();

  // You can also get the deleted certificate this way:
  await client.getDeletedCertificate(certificateName);

  // Deleted certificates can also be recovered or purged.

  // recoverDeletedCertificate returns a poller, just like beginDeleteCertificate.
  // const recoverPoller = await client.beginRecoverDeletedCertificate(certificateName);
  // await recoverPoller.pollUntilDone();

  // If a certificate is done and the Key Vault has soft-delete enabled, the certificate can be purged with:
  await client.purgeDeletedCertificate(certificateName);
}

async function listDeletedCertificates() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  for await (const deletedCertificate of client.listDeletedCertificates()) {
    console.log(deletedCertificate);
  }

  for await (const page of client.listDeletedCertificates().byPage()) {
    for (const deletedCertificate of page) {
      console.log(deletedCertificate);
    }
  }
}

async function getADeletedCertificate() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  const deletedCertificate = await client.getDeletedCertificate("MyDeletedCertificate");
  console.log("Deleted certificate:", deletedCertificate);
}

async function purgeADeletedCertificate() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  const deletePoller = await client.beginDeleteCertificate("MyCertificate");
  await deletePoller.pollUntilDone();

  // Deleting a certificate takes time, make sure to wait before purging it
  client.purgeDeletedCertificate("MyCertificate");
}

async function recoverADeletedCertificate() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(url, credential);

  const deletePoller = await client.beginDeleteCertificate("MyCertificate");
  await deletePoller.pollUntilDone();

  const recoverPoller = await client.beginRecoverDeletedCertificate("MyCertificate");

  // Waiting until it's done
  const certificate = await recoverPoller.pollUntilDone();
  console.log(certificate);
}

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  client = new CertificateClient(
    process.env["KEYVAULT_URI"] || "<keyvault-url>",
    new DefaultAzureCredential(),
  );
  certificateName = `delete-recover-${new Date().getTime()}`;
  await createACertificate();
  await deleteAndRecoverACertificate();
  await deleteACertificate();
  await listDeletedCertificates();
  await getADeletedCertificate();
  await purgeADeletedCertificate();
  await recoverADeletedCertificate();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
