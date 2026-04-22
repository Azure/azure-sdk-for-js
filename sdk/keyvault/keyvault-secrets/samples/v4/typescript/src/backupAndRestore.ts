// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Backs up an Azure Key Vault secret to a local file and restores from it.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Backs up an Azure Key Vault secret to a local file and restores from it.
 */
import { readFile, writeFile } from "node:fs/promises";

export async function main(): Promise<void> {
  const client: SecretClient = new SecretClient(process.env["KEYVAULT_URI"] || "<keyvault-url>", new DefaultAzureCredential());
  const secretName = "MySecretName";
  // Create our secret
  await client.setSecret(secretName, "XYZ789");

  // Backup secret
  const backupResult = await client.backupSecret(secretName);

  // Write the backup to a file
  await writeFile("secret_backup.dat", backupResult!);
  // Delete the secret
  console.log("about to delete");
  const deletePoller = await client.beginDeleteSecret(secretName);
  await deletePoller.pollUntilDone();
  // Purge the deleted secret
  console.log("about to purge");
  await client.purgeDeletedSecret(secretName);

  // Read our backup from a file
  console.log("about to restore secret");
  const backupContents = await readFile("secret_backup.dat");

  // Restore the secret
  let result;
  for (let attempt = 0; attempt < 5; attempt++) {
      try {
          result = await client.restoreSecretBackup(backupContents);
          break;
      }
      catch (error) {
          if (attempt === 4) {
              throw error;
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));
      }
  }
  console.log("Restored secret: ", result);

  // If we don't want to purge the secret later, we don't need to wait until this finishes
  await client.beginDeleteSecret(secretName);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
