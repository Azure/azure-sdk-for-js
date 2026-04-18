// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates, updates, and deletes certificate contacts.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");
// Load the .env file if it exists
require("dotenv/config");

let client;

async function manageCertificateContacts() {
  // Contacts are created independently of the certificates.
  const contacts = [
    {
      email: "a@a.com",
      name: "a",
      phone: "111111111111",
    },
    {
      email: "b@b.com",
      name: "b",
      phone: "222222222222",
    },
  ];
  await client.setContacts(contacts);
  const getResponse = await client.getContacts();
  console.log("Contact List:", getResponse);
  await client.deleteContacts();
  let error;
  try {
    await client.getContacts();
    throw Error("Expecting an error but not catching one.");
  } catch (e) {
    error = e;
  }
  console.log("err: ", error);
}

async function deleteCertificateContacts() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const keyVaultUrl = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(keyVaultUrl, credential);

  await client.deleteContacts();
}

async function setCertificateContacts() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const keyVaultUrl = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(keyVaultUrl, credential);

  await client.setContacts([
    {
      email: "b@b.com",
      name: "b",
      phone: "222222222222",
    },
  ]);
}

async function getCertificateContacts() {
  const credential = new DefaultAzureCredential();

  const vaultName = "<YOUR KEYVAULT NAME>";
  const keyVaultUrl = `https://${vaultName}.vault.azure.net`;

  const client = new CertificateClient(keyVaultUrl, credential);

  const contacts = await client.getContacts();
  for (const contact of contacts) {
    console.log(contact);
  }
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
  await manageCertificateContacts();
  await deleteCertificateContacts();
  await setCertificateContacts();
  await getCertificateContacts();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
