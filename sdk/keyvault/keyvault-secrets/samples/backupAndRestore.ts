import { SecretsClient } from "../src";
import fs = require("fs");
import { EnvironmentCredential } from "@azure/identity";

function writeFile(filename: string, text: Uint8Array) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, text, err => {
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

async function main(): Promise<void> {
  // EnvironmentCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new EnvironmentCredential();

  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"
  const url = `https://${vaultName}.vault.azure.net`;
  const client = new SecretsClient(url, credential);

  const secretName = "StorageAccountPassword";

  // Create our secret
  await client.setSecret(secretName, "XYZ789");

  // Backup secret
  let backupResult = await client.backupSecret(secretName);

  // Write the backup to a file
  await writeFile("secret_backup.dat", backupResult);

  // Delete the secret
  console.log("about to delete");
  await client.deleteSecret(secretName);
  await delay(30000);

  // Purge the deleted secret
  console.log("about to purge");
  await client.purgeDeletedSecret(secretName);
  await delay(30000);

  // Read our backup from a file
  console.log("about to restore secret");
  let backupContents = await readFile("secret_backup.dat");

  // Restore the secret
  let result = await client.restoreSecret(backupContents);
  console.log("Restored secret: ", result);

  await client.deleteSecret(secretName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
