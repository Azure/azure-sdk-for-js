import { SecretsClient } from "../src";
import { EnvironmentCredential } from "@azure/identity";

export function delay<T>(t: number, value?: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}

async function main(): Promise<void> {
  // EnvironmentCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const vaultName = process.env["KEYVAULT_NAME"] || "<keyvault-name>"
  const url = `https://${vaultName}.vault.azure.net`;
  const credential = new EnvironmentCredential();
  const client = new SecretsClient(url, credential);

  const bankAccountSecretName = "BankAccountPassword11";
  const storageAccountSecretName = "StorageAccountPassword11";

  // Create our secrets
  console.log("Creating our secrets");
  await client.setSecret(bankAccountSecretName, "ABC123");
  await client.setSecret(storageAccountSecretName, "XYZ789");
  await delay(5000);

  // Oops, what happens if we delete the wrong one?
  console.log("Deleting secret: ", bankAccountSecretName);
  await client.deleteSecret(bankAccountSecretName);
  await delay(30000);

  console.log("Showing deleted secrets");
  for await (let deletedSecret of client.listDeletedSecrets()) {
    console.log(deletedSecret);
  }

  // That's okay, it's not gone until it's fully deleted (purged)
  // Note: this only works if soft-delete is enabled on your vault
  console.log("Recovering secret");
  const recoveredSecret = await client.recoverDeletedSecret(bankAccountSecretName);
  await delay(30000);
  console.log(recoveredSecret);

  // To actually delete it, we delete and then purge the secret
  // Delete the secret
  console.log("about to delete");
  await client.deleteSecret(bankAccountSecretName);
  await delay(30000);

  // Purge the deleted secret
  console.log("about to purge");
  await client.purgeDeletedSecret(bankAccountSecretName);
  await delay(30000);

  for await (let deletedSecret of client.listDeletedSecrets()) {
    console.log(deletedSecret);
  }

  await client.deleteSecret(storageAccountSecretName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
