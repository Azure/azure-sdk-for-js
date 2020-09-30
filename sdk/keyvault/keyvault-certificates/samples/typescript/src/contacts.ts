// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CertificateClient } from "@azure/keyvault-certificates";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// This sample creates, updates and deletes certificate contacts.

export async function main(): Promise<void> {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  // Contacts are created independently of the certificates.

  const contacts = [
    {
      email: "a@a.com",
      name: "a",
      phone: "111111111111"
    },
    {
      email: "b@b.com",
      name: "b",
      phone: "222222222222"
    }
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

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
