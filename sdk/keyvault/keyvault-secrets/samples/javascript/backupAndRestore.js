const { SecretsClient } = require("../../src");
const { DefaultAzureCredential } = require("@azure/identity");
const fs = require("fs");

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
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>";
  const url = `https://${vaultName}.vault.azure.net`;
  const client = new SecretsClient(url, credential);

  const secretName = "StorageAccountPassword19312312";

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

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
