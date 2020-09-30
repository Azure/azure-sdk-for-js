// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

function delay(t, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

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
  console.log("Creating our secrets");
  await client.setSecret(bankAccountSecretName, "ABC123");
  await client.setSecret(storageAccountSecretName, "XYZ789");
  await delay(5000);

  // Oops, what happens if we delete the wrong one?
  console.log("Deleting secret: ", bankAccountSecretName);
  let deletePoller = await client.beginDeleteSecret(bankAccountSecretName);
  await deletePoller.pollUntilDone();

  console.log("Showing deleted secrets");
  let listDeletedSecrets = client.listDeletedSecrets();
  while (true) {
    let { done, value } = await listDeletedSecrets.next();
    if (done) {
      break;
    }
    console.log(value);
  }

  // That's okay, it's not gone until it's fully deleted (purged)
  // Note: this only works if soft-delete is enabled on your vault
  console.log("Recovering secret");
  const recoverPoller = await client.beginRecoverDeletedSecret(bankAccountSecretName);
  const recoveredSecret = await recoverPoller.pollUntilDone();
  console.log(recoveredSecret);

  // To actually delete it, we delete and then purge the secret
  // Delete the secret
  console.log("about to delete");
  deletePoller = await client.beginDeleteSecret(bankAccountSecretName);
  await deletePoller.pollUntilDone();

  // Purge the deleted secret
  console.log("about to purge");
  await client.purgeDeletedSecret(bankAccountSecretName);
  await delay(30000);

  let listDeletedSecrets2 = client.listDeletedSecrets();
  while (true) {
    let { done, value } = await listDeletedSecrets2.next();
    if (done) {
      break;
    }
    console.log(value);
  }

  // If we don't want to purge the secret later, we don't need to wait until this finishes
  await client.beginDeleteSecret(storageAccountSecretName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
