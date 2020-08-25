// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// purgeAllCertificates.js
// helps remove any existing keys from the KeyVault.

const { CertificateClient } = require("@azure/keyvault-certificates");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  const client = new CertificateClient(url, credential, {
    // The KEY_VAULT_API_VERSION environment variable is used by our CI pipelines to run the samples and check their validity automatically.
    // The serviceVersion is an optional parameter that allows users to specify a Key Vault service API version.
    serviceVersion: process.env.KEY_VAULT_API_VERSION
  });

  let listPropertiesOfCertificates = client.listPropertiesOfCertificates();
  while (true) {
    let { done, value } = await listPropertiesOfCertificates.next();
    if (done) {
      break;
    }

    try {
      const poller = await client.beginDeleteCertificate(value.name);
      await poller.pollUntilDone();
    } catch(e) {
      // We don't care about the error because this script is intended to just clean up the KeyVault.
    }
}

  let listDeletedCertificates = client.listPropertiesOfCertificates();
  while (true) {
    let { done, value } = await listDeletedCertificates.next();
    if (done) {
      break;
    }

    try {
      // This will take a while.
      await client.purgeDeletedCertificate(deletedCertificate.name);
    } catch(e) {
      // We don't care about the error because this script is intended to just clean up the KeyVault.
    }
  }
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
