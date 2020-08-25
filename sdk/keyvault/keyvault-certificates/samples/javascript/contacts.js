// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { CertificateClient } = require("@azure/keyvault-certificates");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

// This sample creates, updates and deletes certificate contacts.

async function main() {
  // If you're using MSI, DefaultAzureCredential should "just work".
  // Otherwise, DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential, {
    // The KEY_VAULT_API_VERSION environment variable is used by our CI pipelines to run the samples and check their validity automatically.
    // The serviceVersion is an optional parameter that allows users to specify a Key Vault service API version.
    serviceVersion: process.env.KEY_VAULT_API_VERSION
  });

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

  let getResponse;

  await client.setContacts(contacts);

  getResponse = await client.getContacts();
  console.log("Contact List:", getResponse);

  await client.deleteContacts();
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
