// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates, updates, and deletes certificate contacts.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { CertificateClient } from "@azure/keyvault-certificates";

let client: CertificateClient;

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
  try {
    await client.getContacts();
  } catch (e: any) {
    // getContacts throws a 404 when no contacts have been set
    console.log("No contacts found (expected):", e.code);
  }
}

async function deleteCertificateContacts() {
  await client.setContacts([
    {
      email: "b@b.com",
      name: "b",
      phone: "222222222222",
    },
  ]);
  await client.deleteContacts();
}

async function setCertificateContacts() {
  await client.setContacts([
    {
      email: "b@b.com",
      name: "b",
      phone: "222222222222",
    },
  ]);
}

async function getCertificateContacts() {
  try {
    const contacts = await client.getContacts();
    for (const contact of contacts) {
      console.log(contact);
    }
  } catch (e: any) {
    // getContacts throws a 404 if no contacts have been set
    console.log("No contacts found:", e.message);
  }
}

export async function main(): Promise<void> {
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
