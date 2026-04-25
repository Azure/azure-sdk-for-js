// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Backs up an Azure Key Vault secret to a local file and restores from it.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { readFile, writeFile } from "node:fs/promises";
import { retryWithBackoff } from "./utils.js";

export async function main(): Promise<void> {
  const client: SecretClient = new SecretClient(
    process.env["KEYVAULT_URI"],
    new DefaultAzureCredential(),
  );
  const secretName = "MySecretName";
  // Create our secret
  await client.setSecret(secretName, "XYZ789");

  // Backup secret
  const backupResult = await client.backupSecret(secretName);

  // Write the backup to a file
  await writeFile("secret_backup.dat", backupResult!);
  // Delete the secret
  const deletePoller = await client.beginDeleteSecret(secretName);
  await deletePoller.pollUntilDone();
  // Purge the deleted secret
  await client.purgeDeletedSecret(secretName);

  // Read our backup from a file
  const backupContents = await readFile("secret_backup.dat");

  // Restore the secret
  const result = await retryWithBackoff(() => client.restoreSecretBackup(backupContents));
  console.log("Restored secret: ", result);

  // If we don't want to purge the secret later, we don't need to wait until this finishes
  await client.beginDeleteSecret(secretName);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
