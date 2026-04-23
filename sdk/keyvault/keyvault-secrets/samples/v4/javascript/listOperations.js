// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a SecretClient to iterate over secrets and their versions.
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

let client;

async function createSecrets() {
  const uniqueString = new Date().getTime();
  const bankAccountSecretName = `bankSecret${uniqueString}`;
  const storageAccountSecretName = `storageSecret${uniqueString}`;
  // Create our secrets
  await client.setSecret(bankAccountSecretName, "ABC123");
  await client.setSecret(storageAccountSecretName, "XYZ789");
}

async function listSecretsByPage() {
  // List the secrets we have, by page
  console.log("Listing secrets by page");
  for await (const page of client.listPropertiesOfSecrets().byPage({ maxPageSize: 2 })) {
    for (const secretProperties of page) {
      if (secretProperties.enabled) {
        const secret = await client.getSecret(secretProperties.name);
        console.log("secret: ", secret);
      }
    }
    console.log("--page--");
  }
}

async function listAllSecrets() {
  // List the secrets we have, all at once
  console.log("Listing secrets all at once");
  for await (const secretProperties of client.listPropertiesOfSecrets()) {
    if (secretProperties.enabled) {
      const secret = await client.getSecret(secretProperties.name);
      console.log("secret: ", secret);
    }
  }
}

async function listSecretVersions() {
  const uniqueString = new Date().getTime();
  const bankAccountSecretName = `bankSecret${uniqueString}`;
  await client.setSecret(bankAccountSecretName, "ABC123");
  await client.setSecret(bankAccountSecretName, "ABC567");
  // List the versions of BankAccountPassword
  for await (const secretProperties of client.listPropertiesOfSecretVersions(
    bankAccountSecretName,
  )) {
    if (secretProperties.enabled) {
      const secret = await client.getSecret(secretProperties.name, {
        version: secretProperties.version,
      });
      console.log("secret version: ", secret);
    }
  }
  await client.beginDeleteSecret(bankAccountSecretName);
}

async function listAllSecretTypes() {
  const uniqueString = new Date().getTime();
  const secretName = `secret${uniqueString}`;
  await client.setSecret(secretName, "MySecretValue");

  for await (const secretProperties of client.listPropertiesOfSecrets()) {
    console.log("Secret properties: ", secretProperties);
  }

  for await (const deletedSecret of client.listDeletedSecrets()) {
    console.log("Deleted secret: ", deletedSecret);
  }

  for await (const versionProperties of client.listPropertiesOfSecretVersions(secretName)) {
    console.log("Version properties: ", versionProperties);
  }
}

async function listAllSecretTypesByPage() {
  const uniqueString = new Date().getTime();
  const secretName = `secret${uniqueString}`;
  await client.setSecret(secretName, "MySecretValue");

  for await (const page of client.listPropertiesOfSecrets().byPage()) {
    for (const secretProperties of page) {
      console.log("Secret properties: ", secretProperties);
    }
  }
  for await (const page of client.listDeletedSecrets().byPage()) {
    for (const deletedSecret of page) {
      console.log("Deleted secret: ", deletedSecret);
    }
  }
  for await (const page of client.listPropertiesOfSecretVersions(secretName).byPage()) {
    for (const versionProperties of page) {
      console.log("Version properties: ", versionProperties);
    }
  }
}

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  client = new SecretClient(
    process.env["KEYVAULT_URI"] || "<keyvault-url>",
    new DefaultAzureCredential(),
  );
  await createSecrets();
  await listSecretsByPage();
  await listAllSecrets();
  await listSecretVersions();
  await listAllSecretTypes();
  await listAllSecretTypesByPage();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
