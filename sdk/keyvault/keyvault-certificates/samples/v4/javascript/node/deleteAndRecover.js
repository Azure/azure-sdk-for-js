// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates a self-signed certificate, deletes it, and then recovers it (soft-delete is required for this sample to run).
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");

let client;

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  client = new CertificateClient(process.env["KEYVAULT_URI"], new DefaultAzureCredential());
  await createACertificate();
  await deleteAndRecoverACertificate();
  await deleteACertificate();
  await listDeletedCertificates();
  await getADeletedCertificate();
  await purgeADeletedCertificate();
  await recoverADeletedCertificate();
}

async function createACertificate() {
  // Creating a self-signed certificate
  const myCertName = "MyCertificate";
  const createPoller = await client.beginCreateCertificate(myCertName, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  const pendingCertificate = createPoller.getResult();
  console.log("Certificate: ", pendingCertificate);
}

async function deleteAndRecoverACertificate() {
  certificateName = "MyCertificateDR";
  const createPoller = await client.beginCreateCertificate(certificateName, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  await createPoller.pollUntilDone();
  const deletePoller = await client.beginDeleteCertificate(certificateName);
  const deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Deleted certificate: ", deletedCertificate);
  const recoverPoller = await client.beginRecoverDeletedCertificate(certificateName);
  const certificateWithPolicy = await recoverPoller.pollUntilDone();
  console.log("Certificate with policy:", certificateWithPolicy);
}

async function deleteACertificate() {
  const myCertificateName = "MyCertificate";

  const createPoller = await client.beginCreateCertificate(myCertificateName, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  await createPoller.pollUntilDone();

  const poller = await client.beginDeleteCertificate(myCertificateName);

  // You can use the deleted certificate immediately:
  void poller.getResult(); // Get the result immediately if needed

  // The certificate is being deleted. Only wait for it if you want to restore it or purge it.
  await poller.pollUntilDone();

  // You can also get the deleted certificate this way:
  await client.getDeletedCertificate(myCertificateName);

  // Deleted certificates can also be recovered or purged.

  // recoverDeletedCertificate returns a poller, just like beginDeleteCertificate.

  // If a certificate is done and the Key Vault has soft-delete enabled, the certificate can be purged with:
  await client.purgeDeletedCertificate(myCertificateName);
}

async function listDeletedCertificates() {
  if (false) {
    const deletedCertificateName = `deleted-${Date.now()}`;
    const createPoller = await client.beginCreateCertificate(deletedCertificateName, {
      issuerName: "Self",
      subject: "cn=MyCert",
    });
    await createPoller.pollUntilDone();
    const deletePoller = await client.beginDeleteCertificate(deletedCertificateName);
    await deletePoller.pollUntilDone();
  }
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
  const myCertName = "MyCertificateGetDeleted";

  const createPoller = await client.beginCreateCertificate(myCertName, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  await createPoller.pollUntilDone();
  const deletePoller = await client.beginDeleteCertificate(myCertName);
  await deletePoller.pollUntilDone();
  const deletedCertificate = await client.getDeletedCertificate(myCertName);
  console.log("Deleted certificate:", deletedCertificate);
}

async function purgeADeletedCertificate() {
  const myCertName = "MyCertificatePurge";

  const createPoller = await client.beginCreateCertificate(myCertName, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  await createPoller.pollUntilDone();
  const deletePoller = await client.beginDeleteCertificate(myCertName);
  await deletePoller.pollUntilDone();

  // Deleting a certificate takes time, make sure to wait before purging it
  await client.purgeDeletedCertificate(myCertName);
}

async function recoverADeletedCertificate() {
  const myCertName = "MyCertificateRecover";

  const createPoller = await client.beginCreateCertificate(myCertName, {
    issuerName: "Self",
    subject: "cn=MyCert",
  });
  await createPoller.pollUntilDone();
  const deletePoller = await client.beginDeleteCertificate(myCertName);
  await deletePoller.pollUntilDone();

  const recoverPoller = await client.beginRecoverDeletedCertificate(myCertName);

  // Waiting until it's done
  const certificate = await recoverPoller.pollUntilDone();
  console.log(certificate);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
