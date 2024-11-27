// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates, updates, and deletes certificate contacts.
 */

import { CertificateClient } from "@azure/keyvault-certificates";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

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
  } catch (e: any) {
    error = e;
  }

  console.log("err: ", error);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
