// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { SecretClient } = require("@azure/keyvault-secrets");
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
  const client = new SecretClient(url, credential);

  const uniqueString = new Date().getTime();
  const bankAccountSecretName = `bankSecret${uniqueString}`;
  const storageAccountSecretName = `storageSecret${uniqueString}`;

  // Create our secrets
  await client.setSecret(bankAccountSecretName, "ABC123");
  await client.setSecret(storageAccountSecretName, "XYZ789");

  // List the secrets we have, by page
  console.log("Listing secrets by page");
  let listPropertiesOfSecrets = client.listPropertiesOfSecrets().byPage({ maxPageSize: 2 });
  while (true) {
    let { done, value } = await listPropertiesOfSecrets.next();
    if (done) {
      break;
    }

    for (const secretProperties of value) {
      if (secretProperties.enabled) {
        const secret = await client.getSecret(secretProperties.name);
        console.log("secret: ", secret);
      }
    }
    console.log("--page--");
  }

  // List the secrets we have, all at once
  console.log("Listing secrets all at once");
  listPropertiesOfSecrets = client.listPropertiesOfSecrets();
  while (true) {
    let { done, value } = await listPropertiesOfSecrets.next();
    if (done) {
      break;
    }

    if (value.enabled) {
      const secret = await client.getSecret(value.name);
      console.log("secret: ", secret);
    }
  }

  await client.setSecret(bankAccountSecretName, "ABC567");

  // List the versions of BankAccountPassword
  console.log("Listing all versions of a secret");
  let listPropertiesOfSecretVersions = client.listPropertiesOfSecretVersions(bankAccountSecretName);
  while (true) {
    let { done, value } = await listPropertiesOfSecretVersions.next();
    if (done) {
      break;
    }

    if (value.enabled) {
      const secret = await client.getSecret(value.name);
      console.log("version: ", secret);
    }
  }

  await client.beginDeleteSecret(bankAccountSecretName);
  await client.beginDeleteSecret(storageAccountSecretName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
