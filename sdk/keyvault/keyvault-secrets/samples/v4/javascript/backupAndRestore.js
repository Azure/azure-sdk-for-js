// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Backs up an Azure Key Vault secret to a local file and restores from it.
 */

const fs = require("fs");

const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

function writeFile(filename, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, text, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function delay(t, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const client = new SecretClient(url, credential);

  const uniqueString = new Date().getTime();
  const secretName = `secret${uniqueString}`;

  // Create our secret
  await client.setSecret(secretName, "XYZ789");

  // Backup secret
  const backupResult = await client.backupSecret(secretName);

  // Write the backup to a file
  await writeFile("secret_backup.dat", backupResult);

  // Delete the secret
  console.log("about to delete");
  let deletePoller = await client.beginDeleteSecret(secretName);
  await deletePoller.pollUntilDone();

  // Purge the deleted secret
  console.log("about to purge");
  await client.purgeDeletedSecret(secretName);
  await delay(30000);

  // Read our backup from a file
  console.log("about to restore secret");
  const backupContents = await readFile("secret_backup.dat");

  // Restore the secret
  const result = await client.restoreSecretBackup(backupContents);
  console.log("Restored secret: ", result);

  // If we don't want to purge the secret later, we don't need to wait until this finishes
  await client.beginDeleteSecret(secretName);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});

module.exports = { main };
