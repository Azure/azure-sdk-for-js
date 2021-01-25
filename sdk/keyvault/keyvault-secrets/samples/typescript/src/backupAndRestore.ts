// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";

import { SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

function writeFile(filename: string, text: Uint8Array): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, text, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function readFile(filename: string): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

export function delay<T>(t: number, value?: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

export async function main(): Promise<void> {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
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
  await writeFile("secret_backup.dat", backupResult!);

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

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
